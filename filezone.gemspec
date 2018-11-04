$:.push File.expand_path("lib", __dir__)

# Maintain your gem's version:
require "filezone/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "filezone"
  s.version     = Filezone::VERSION
  s.authors     = ["Mateusz Michalski"]
  s.email       = ["nytorian@icloud.com"]
  s.homepage    = "https://github.com/Nytorian/filezone"
  s.summary     = "Gem for Ruby on Rails 5 facilitating file upload via Active Storage"
  s.description = "The solution is built using dropzonejs, sass, ajax, active storage and active record"
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  s.add_dependency "rails", "~> 5.2.1"

  s.add_development_dependency "mysql2"
end
