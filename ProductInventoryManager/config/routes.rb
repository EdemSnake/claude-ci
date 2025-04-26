Rails.application.routes.draw do

  namespace :api do
    resources :products
  end


  resources :products
  

  

  root "products#index"
end
