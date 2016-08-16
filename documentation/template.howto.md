# General
We will use the notation vagrant:80 to note the vagrant port "80" forwarded to you host. To view
wich to which port this is mapped, you can use "vagrant port 80" in your host.

## dev vs. prj
- dev scripts are meant to be run only in the dev (i.e. vagrant) environnement. It can wipe out your database, so please be carefull with these.
- prj scripts are for any environnement, including production. They are safe to be used anywhere, and *should* not destroy anything.

# Configuration
The configuration of the vagrant is based on various scripts in the vagran/bin repertory. 
The various script can be customized by putting custom scripts in the corresponding ".d" folder.

## dev-configure.sh (dev-configure.d)
This will setup the vagrant environnement, install dependancies, etc...
It will call dev-reset.d
It will call the prj-install-dependancies.sh

## dev-reset.sh (dev-reset.d)
This script is used to reset the state of the application in the vagrant:
- reset the database (see below)
- reset the "live" folder

## conf/root
Script in this place will be copied (by rsync) onto the root directory "/" of the vagrant, by dev-configure.d/01_install_root.sh script


# Email handling
- A fake smtp server run on port 1025
- The /usr/bin/sendmail command forward to that port
- Mailhog is used to view these emails live (on vagrant:8080/)
