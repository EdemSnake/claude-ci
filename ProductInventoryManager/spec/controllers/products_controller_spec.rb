require 'rails_helper'

RSpec.describe ProductsController, type: :controller do

  let!(:products) do
    [
      Product.create!(name: "Product 1", description: "Description 1", price: 9.99),
      Product.create!(name: "Product 2", description: "Description 2", price: 19.99),
      Product.create!(name: "Product 3", description: "Description 3", price: 29.99)
    ]
  end
  let(:product_id) { products.first.id }


  describe "GET #index" do
    before { get :index }

    it "returns a success response" do
      expect(response).to be_successful
    end

    it "returns all products" do
      expect(JSON.parse(response.body).size).to eq(3)
    end
  end


  describe "GET #show" do
    context "when the record exists" do
      before { get :show, params: { id: product_id } }

      it "returns a success response" do
        expect(response).to be_successful
      end

      it "returns the correct product" do
        expect(JSON.parse(response.body)['id']).to eq(product_id)
      end
    end

    context "when the record does not exist" do
      before { get :show, params: { id: 100 } }

      it "returns a not found response" do
        expect(response).to have_http_status(:not_found)
      end
    end
  end


  describe "POST #create" do
    context "with valid params" do
      let(:valid_attributes) { { product: { name: "New Product", description: "New Description", price: 39.99 } } }

      it "creates a new Product" do
        expect {
          post :create, params: valid_attributes
        }.to change(Product, :count).by(1)
      end

      it "renders a JSON response with the new product" do
        post :create, params: valid_attributes
        expect(response).to have_http_status(:created)
        expect(response.content_type).to match(/json/)
        expect(JSON.parse(response.body)['name']).to eq('New Product')
      end
    end

    context "with invalid params" do
      let(:invalid_attributes) { { product: { name: "", description: "Invalid Product" } } }

      it "does not create a new Product" do
        expect {
          post :create, params: invalid_attributes
        }.to change(Product, :count).by(0)
      end

      it "renders a JSON response with errors" do
        post :create, params: invalid_attributes
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(/json/)
      end
    end
  end


  describe "PUT #update" do
    context "with valid params" do
      let(:new_attributes) { { product: { name: "Updated Product" } } }

      it "updates the requested product" do
        put :update, params: { id: product_id, **new_attributes }
        products.first.reload
        expect(products.first.name).to eq("Updated Product")
      end

      it "renders a JSON response with the updated product" do
        put :update, params: { id: product_id, **new_attributes }
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to match(/json/)
        expect(JSON.parse(response.body)['name']).to eq('Updated Product')
      end
    end

    context "with invalid params" do
      let(:invalid_attributes) { { product: { name: "" } } }

      it "renders a JSON response with errors" do
        put :update, params: { id: product_id, **invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(/json/)
      end
    end

    context "when the record does not exist" do
      before { put :update, params: { id: 100, product: { name: "Update Failed" } } }

      it "returns a not found response" do
        expect(response).to have_http_status(:not_found)
      end
    end
  end


  describe "DELETE #destroy" do
    it "destroys the requested product" do
      expect {
        delete :destroy, params: { id: product_id }
      }.to change(Product, :count).by(-1)
    end

    it "returns a no content response" do
      delete :destroy, params: { id: product_id }
      expect(response).to have_http_status(:no_content)
    end

    context "when the record does not exist" do
      before { delete :destroy, params: { id: 100 } }

      it "returns a not found response" do
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
