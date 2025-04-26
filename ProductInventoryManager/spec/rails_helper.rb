require 'spec_helper'
ENV['RAILS_ENV'] ||= 'test'
require 'active_record'
require 'sqlite3'
require_relative '../config/environment'
ActiveRecord::Base.establish_connection(:test)
abort("The Rails environment is running in production mode!") if Rails.env.production?
require 'rspec/rails'
ActiveRecord::Schema.define do
  unless ActiveRecord::Base.connection.table_exists?(:products)
    create_table :products do |t|
      t.string :name, null: false
      t.text :description
      t.decimal :price, precision: 8, scale: 2, null: false
      t.boolean :available, default: true
      t.timestamps
    end
  end
end
Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end
RSpec.configure do |config|
  config.fixture_path = "#{::Rails.root}/spec/fixtures"
  config.include FactoryBot::Syntax::Methods
  config.use_transactional_fixtures = true
  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!
end
