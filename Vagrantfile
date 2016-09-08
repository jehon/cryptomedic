
# Configure the vagrant proxyconf plugin:
# @See http://digitaldrummerj.me/vagrant-behind-proxy-server/
if !Vagrant.has_plugin?("vagrant-proxyconf")
  system('vagrant plugin install vagrant-proxyconf')
  raise("vagrant-proxyconf installed. Run command again.");
end

Vagrant.configure(2) do |config|
  # https://docs.vagrantup.com.
  config.vm.box      = 'ubuntu/trusty64'
  config.vm.hostname = 'vagrant-' + File.basename(File.dirname(__FILE__))
  config.vm.provider "virtualbox" do |v|
    v.memory = 1024
#    v.cpus = 2
  end

  # Forward X11 to host (thanks to https://coderwall.com/p/ozhfva/run-graphical-programs-within-vagrantboxes)
  config.ssh.forward_x11 = true

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

  config.vm.network "forwarded_port", auto_correct: true, guest:    80, host: 10080 # Default config
  config.vm.network "forwarded_port", auto_correct: true, guest:   443, host: 10443 # Default https
  config.vm.network "forwarded_port", auto_correct: true, guest: 10000, host: 10000 # phpmyadmin
  config.vm.network "forwarded_port", auto_correct: true, guest:  8080, host: 18080 # Dev server

  config.vm.synced_folder ".", "/vagrant", owner: "vagrant", group: "www-data"

  if ENV["LC_ALL"]
    # http://serverfault.com/questions/362903/how-do-you-set-a-locale-non-interactively-on-debian-ubuntu
    config.vm.provision :shell, inline: "locale-gen " + ENV['LC_ALL']
  end

  # Run our dev-configure.sh to configure anything
  config.vm.provision :shell, inline: "chmod +x /vagrant/bin/dev-configure.sh && /vagrant/bin/dev-configure.sh"

  # Run our dev-configure.sh to configure anything
  config.vm.provision :shell, inline: "/vagrant/bin/dev-configure.sh"

  # Run our dev-reset.sh to configure anything
  config.vm.provision :shell, inline: "/vagrant/bin/dev-reset.sh"

  # Run our prj-build.sh to configure anything
  config.vm.provision :shell, inline: "/vagrant/bin/prj-build.sh"
end
