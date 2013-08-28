# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "canvas-chart/version"

Gem::Specification.new do |s|
  s.name        = "canvas-chart"
  s.version     = Canvas::Chart::VERSION
  s.authors     = ["Hare Ram Rai"]
  s.email       = ["harer@mindfiresolutions.com"]
  s.homepage    = "http://mindfiresolutions.com"
  s.summary     = "This gem provides jquery function for drawing various chart using canvas."
  s.description = "This is simple jquery library for drawing bar chart,bell curve, line chart and pie chart using canvas. It will  work with any rails application greater than  or equal to 3.1."

  s.rubyforge_project = "canvas-chart"

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]

  # specify any dependencies here; for example:
  s.add_dependency 'jquery-rails'
  s.add_dependency 'rails', '>= 3.1.0'
  # s.add_development_dependency "rspec"
  # s.add_runtime_dependency "rest-client"
end
