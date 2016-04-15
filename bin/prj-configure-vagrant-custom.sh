#!/bin/bash

set -e

mkdir -p /var/www/uploadedPictures

cp /vagrant/resources/1.jpg /var/www/uploadedPictures/98141_2014-06-01_16-51-42.JPG
cp /vagrant/resources/1.jpg /var/www/uploadedPictures/10_2014-11-06_15-32-45.JPG
cp /vagrant/resources/1.jpg /var/www/uploadedPictures/3288.JPG
cp /vagrant/resources/1.jpg /var/www/uploadedPictures/98146_2015-04-28_3952.jpg

chown -R www-data /var/www/uploadedPictures
