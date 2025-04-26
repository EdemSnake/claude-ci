require_relative "boot"
require "rails"
require "active_record/railtie"
require "action_controller/railtie"
require "sqlite3"
Bundler.require(*Rails.groups)

module ProductManagement
  class Application < Rails::Application
    config.load_defaults 6.1
    config.api_only = true
  end
end
