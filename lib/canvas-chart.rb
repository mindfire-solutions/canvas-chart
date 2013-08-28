if defined? Rails && Rails::VERSION::MAJOR == 3 && Rails::VERSION::MINOR >= 1
  require "canvas-chart/version"
  require "canvas-chart/engine"
end