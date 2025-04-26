require 'rails_helper'

RSpec.describe Product, type: :model do

  describe "validations" do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:price) }
    it { should validate_numericality_of(:price).is_greater_than_or_equal_to(0) }
    it { should validate_length_of(:description).is_at_most(1000) }
  end


  describe "factory" do
    it "has a valid factory" do
      expect(build(:product)).to be_valid
    end
  end


  describe "attributes" do
    it "has a default value of true for available" do
      product = Product.new
      expect(product.available).to eq(true)
    end
  end
end
