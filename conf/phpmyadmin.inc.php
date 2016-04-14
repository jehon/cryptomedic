<?php

foreach($cfg['Servers'] as $i => $v) {
  $cfg['Servers'][$i]['AllowNoPassword'] = true;
  $cfg['Servers'][$i]['table_uiprefs'] = 'pma__table_uiprefs';
}
