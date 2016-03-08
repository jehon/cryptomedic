Vagrant.configure(2) do |config|
  # https://docs.vagrantup.com.
  config.vm.box           = 'ubuntu/trusty64'

  config.vm.provider "virtualbox" do |v|
#    v.memory = 1024
#    v.cpus = 2
  end

  #config.vm.define "customname" do |customname|
  #end

  config.vm.network "forwarded_port", guest:    80, host: 10080
  config.vm.network "forwarded_port", guest:   443, host: 10443

  config.vm.synced_folder "./www", "/var/www/html", owner: "www-data", group: "www-data"

  config.vm.provision "shell", inline: "chmod +x /vagrant/bin/prj-provision-dev.sh"

  config.vm.provision "shell", inline: "/vagrant/bin/prj-provision-dev.sh"
end
