require 'rails_helper'

RSpec.describe "Products API", type: :request do

  def json
    JSON.parse(response.body)
  end

  let!(:products) { create_list(:product, 10) }
  let(:product_id) { products.first.id }


  describe "GET /products" do

    before { get '/products' }

    it "returns products" do
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it "returns status code 200" do
      expect(response).to have_http_status(200)
    end
  end


  describe "GET /products/:id" do
    before { get "/products/#{product_id}" }

    context "when the record exists" do
      it "returns the product" do
        expect(json).not_to be_empty
        expect(json['id']).to eq(product_id)
      end

      it "returns status code 200" do
        expect(response).to have_http_status(200)
      end
    end

    context "when the record does not exist" do
      let(:product_id) { 100 }

      it "returns status code 404" do
        expect(response).to have_http_status(404)
      end

      it "returns a not found message" do
        expect(response.body).to match(/Couldn't find Product/)
      end
    end
  end


  describe "POST /products" do

    let(:valid_attributes) { { product: { name: 'New Product', price: 19.99, description: 'A great product' } } }

    context "when the request is valid" do
      before { post '/products', params: valid_attributes }

      it "creates a product" do
        expect(json['name']).to eq('New Product')
      end

      it "returns status code 201" do
        expect(response).to have_http_status(201)
      end
    end

    context "when the request is invalid" do
      before { post '/products', params: { product: { name: nil, price: -10 } } }

      it "returns status code 422" do
        expect(response).to have_http_status(422)
      end

      it "returns a validation failure message" do
        expect(response.body).to match(/can't be blank/)
      end
    end
  end


  describe "PUT /products/:id" do
    let(:valid_attributes) { { product: { name: 'Updated Product' } } }

    context "when the record exists" do
      before { put "/products/#{product_id}", params: valid_attributes }

      it "updates the record" do
        expect(json['name']).to eq('Updated Product')
      end

      it "returns status code 200" do
        expect(response).to have_http_status(200)
      end
    end
  end


  describe "DELETE /products/:id" do
    before { delete "/products/#{product_id}" }

    it "returns status code 204" do
      expect(response).to have_http_status(204)
    end
  end
end
