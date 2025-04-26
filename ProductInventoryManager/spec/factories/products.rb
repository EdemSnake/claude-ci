FactoryBot.define do
  factory :product do
    name { "Test Product" }
    description { "This is a test product description" }
    price { 19.99 }
    available { true }
  end
end
