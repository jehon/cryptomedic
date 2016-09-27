# As a startup
You can use this template either inside a VM or in your bare metal machine.

## Bare usage
You should have:
- a mail-transport-agent (see mailhog through this setup)
- a phpmyadmin or anything else (to manage the database)
- connection to the database should be available for vagrant_admin / vagrant_admin_password (configured in config.php, overridable in config-site.php and/or config-custom.php).

## Vagrant (VM)
Using it in vagrant, this should be more simple since, all this above configuration is done for you.

# General
## Notation "vagrant:80"
We will use the notation vagrant:80 to note the vagrant port "80" forwarded to you host. To view
wich to which port this is mapped, you can use the command "vagrant port 80" in your host.

## dev vs. prj
- dev scripts are meant to be run only in the dev (i.e. vagrant) environnement. It can wipe out your database, so please be carefull with these.
- prj scripts are for any environnement, including production. They are safe to be used anywhere, and *should* not destroy anything.

# Configuration
The configuration of the vagrant is based on various scripts in the vagran/bin repertory. 
The various script can be customized by putting custom scripts in the corresponding ".d" folder.

The main configuration in hold in config.php.
This configuration could be overriden by:
- config-site.php: a file for site configuration override. This script is not managed by the prj-install-env.
- config-custom.php: a file to hold project configurations. This script should be managed by git and will be installed by prj-install-env.

## dev-configure.sh (dev-configure.d)
This will setup the vagrant environnement, install dependancies, etc...
It will call dev-reset.d
It will call the prj-install-dependancies.sh

## dev-reset.sh (dev-reset.d)
This script is used to reset the state of the application in the vagrant:
- reset the database (see below)
- reset the "live" folder

## prj-build.sh (prj-build.d)
Build up the application.
This will wipe out the ./www/build folder, which is suppose to hold dynamically builded assets.

## dev-test.sh (dev-test.d)
This script will test the application. I will search through the /tests folder, and for each of the subfolder, if a configuration file is found, it run the tests accordingly:
- nightwatch.json
- nightwatch.conf.js
- karma.conf.js
- phpunit.xml

## conf/root
Script in this place will be copied (by rsync) onto the root directory "/" of the vagrant, by dev-configure.d/01_install_root.sh script

## Customize steps
For each main script, there is a folder with scripts, cutom or not. You can add your scripts there, as soon as they are compatible with run-parts without arguments (ex. [a-zA-Z0-9]+). Take care that extensions are not authorized.

# Database handling
- dev-reset.sh
- prj-db-upgrade (need php)
- prj-db-backup.sh
- dev-db-createNewTestingSqlDump.sh

By default, the database is named "vagrant" inside the vagrant, and with the project folder name outside of it

# Email handling
- A fake smtp server run on port 1025
- The /usr/bin/sendmail command forward to that port
- Mailhog is used to view these emails live (on vagrant:8080/)

Mailhog allow you to forward your email to any external smtp server. Oniryx internal smtp server is preconfigured.

# Start developping
- dev-test.sh
- dev-logs.sh
- prj-xvfb-run.sh

# Put it in production
- prj-go-site ??? (not developped at this point)
