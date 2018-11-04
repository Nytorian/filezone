module Filezone
  class Engine < ::Rails::Engine
    isolate_namespace Filezone

    config.before_initialize do
      ActiveSupport.on_load :action_controller_base do
        helper Filezone::Engine.helpers
      end
    end
  end
end
