<?php

require("/vagrant/config.php");

foreach($cfg['Servers'] as $i => $v) {
  // $cfg['Servers'][$i]['AllowNoPassword']      = true;

  # Authenticate automatically
  $cfg['Servers'][$i]['auth_type']            = 'config';
  $cfg['Servers'][$i]['host']                 = 'localhost';
  $cfg['Servers'][$i]['connect_type']         = 'tcp';
  $cfg['Servers'][$i]['user']                 = $myconfig['database']['rootuser']; //edit this line
  $cfg['Servers'][$i]['password']             = $myconfig['database']['rootpwd']; // edit this line
}

