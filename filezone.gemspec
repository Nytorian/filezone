$:.push File.expand_path("lib", __dir__)

require "filezone/version"

Gem::Specification.new do |s|
  s.name        = 'filezone'
  s.version     = Filezone::VERSION
  s.authors     = ['Mateusz Michalski']
  s.email       = ['nytorian@icloud.com']
  s.homepage    = 'https://github.com/Nytorian/filezone'
  s.summary     = 'Gem for Ruby on Rails 5.2 facilitating file upload via Active Storage'
  s.description = 'The solution is built using dropzonejs, sass, html, jquery, active storage and active record'
  s.license     = 'MIT'

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  s.add_dependency 'rails', '~> 5.2.1'
  s.add_dependency 'jquery-rails'
  s.add_dependency 'sass-rails', '~> 5.0'
  s.add_dependency 'dropzonejs-rails'
  s.add_dependency 'activestorage-openstack', '~> 0.1.0'

  s.add_development_dependency 'sqlite3'
end
