Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  root "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update]
    resource :session, only: [:create, :destroy]
    resources :artists, only: [:index, :show]
    resources :albums, only: [:index, :show]
    resources :tracks, only: [:index, :show]
    resources :reviews, only: [:index, :show, :update, :create, :destroy]
    resources :lists, only: [:index, :show, :update, :create, :destroy]
    resources :list_items, only: :create
  end
end
