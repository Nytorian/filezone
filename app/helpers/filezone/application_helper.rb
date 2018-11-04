module Filezone
  module ApplicationHelper
    def svg(name)
      file_path = "#{Filezone::Engine.root}/app/assets/images/filezone/#{name}.svg"
      return File.read(file_path).html_safe if File.exists?(file_path)
      '(not found)'
    end
  end
end
