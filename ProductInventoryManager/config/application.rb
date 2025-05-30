require_relative "boot"

require "logger"  
if RUBY_VERSION >= '3.1'
  module ActiveSupport
    module LoggerThreadSafeLevel
      Logger = ::Logger
    end
  end
end

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
