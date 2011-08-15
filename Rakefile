require 'rubygems'
require 'json'
require 'fileutils'
require 'yaml'
require 'coffee-script'
include FileUtils

namespace :webos do
  info = JSON.parse(File.open('appinfo.json').read)
  APP_VERSION = info['version']
  APP_PACKAGE = info['id']
  APP_IPK = "#{APP_PACKAGE}_#{APP_VERSION}_all.ipk"

  desc "Package for webOS"
  task :package do
    mkdir 'packages' unless File.exists? 'packages'
    STDOUT << `palm-package -o ./packages -X ./.gitignore --ignore-case ./`
  end

  desc "Remove from emulator/device"
  task :remove do
    STDOUT << ` palm-install -r #{APP_PACKAGE} `
  end

  desc "Deploy to emulator/device"
  task :deploy do
    Rake::Task['webos:remove'].invoke if ENV['REMOVE'] == 'true'
    Rake::Task['webos:package'].invoke
    STDOUT << `palm-install packages/#{APP_IPK}`
  end

  desc "Run"
  task :run do
    Rake::Task['webos:deploy'].invoke
    STDOUT << `palm-launch #{APP_PACKAGE}`
  end

  desc "Run with tests"
  task :run_tests do
    Rake::Task['webos:remove'].invoke
    Rake::Task['webos:deploy'].invoke
    STDOUT << `palm-launch -p "{mojoTest:true}" #{APP_PACKAGE}`
  end


end

desc "Compile Coffeescript"
task :compile do
  Dir['source/**/*.coffee'].each do |cs_file|
    js_file = cs_file.sub('source/', '').sub('.coffee', '.js')
    puts "Compiling #{cs_file} -> #{js_file}"

    begin
    cs = File.read cs_file
    js = CoffeeScript.compile cs, :bare => true
    rescue => e
      puts "Error compiling #{cs_file}"
      puts e.to_yaml
      exit 1
    end

    File.open(js_file, 'w') do |file|
      file.write js
    end

    puts "done"
  end
end
