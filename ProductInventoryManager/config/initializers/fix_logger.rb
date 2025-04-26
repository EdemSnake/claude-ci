
if RUBY_VERSION >= '3.1'
    module ActiveSupport
      module LoggerThreadSafeLevel
        Logger = ::Logger
      end
    end
  end
  