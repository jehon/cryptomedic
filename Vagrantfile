# Fix the locale before doing anything...
# @See https://www.vagrantup.com/docs/vagrantfile/tips.html
ENV["LC_ALL"] = "en_US.utf8"


# Configure the vagrant proxyconf plugin:
# @See http://digitaldrummerj.me/vagrant-behind-proxy-server/
if !Vagrant.has_plugin?("vagrant-proxyconf")
  system('vagrant plugin install vagrant-proxyconf')
  raise("vagrant-proxyconf installed. Run command again.");
end

Vagrant.configure(2) do |config|
  # https://docs.vagrantup.com.
  config.vm.box           = 'ubuntu/trusty64'

  config.vm.provider "virtualbox" do |v|
    v.memory = 1024
#    v.cpus = 2
  end

  if Vagrant.has_plugin?("vagrant-proxyconf")
    if ENV["http_proxy"]
      config.proxy.http     = ENV["http_proxy"]
    end
    if ENV["https_proxy"]
      config.proxy.https    = ENV["https_proxy"]
    end
    if ENV["no_proxy"]
      config.proxy.no_proxy = ENV["no_proxy"]
    end
  end

  config.vm.network "forwarded_port", auto_correct: true, guest:    80, host: 11080 # Default config
  config.vm.network "forwarded_port", auto_correct: true, guest:   443, host: 11443 # Default https
#  config.vm.network "forwarded_port", auto_correct: true, guest:  8080, host: 18080 # Dev server
  config.vm.network "forwarded_port", auto_correct: true, guest: 10000, host: 10000 # phpmyadmin

  config.vm.synced_folder ".", "/vagrant", owner: "vagrant", group: "www-data"

  config.vm.provision "shell", inline:
    "chmod +x /vagrant/bin/dev-configure.sh && /vagrant/bin/dev-configure.sh"
end
