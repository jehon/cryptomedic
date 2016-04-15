<?php

foreach($cfg['Servers'] as $i => $v) {
  $cfg['Servers'][$i]['AllowNoPassword'] = true;
  $cfg['Servers'][$i]['table_uiprefs'] = 'pma__table_uiprefs';

  $cfg['Servers'][$i]['pma__bookmarktable']   = 'pma__bookmark';
  $cfg['Servers'][$i]['pma__relation']        = 'pma__relation';
  $cfg['Servers'][$i]['pma__table_info']      = 'pma__table_info';
  $cfg['Servers'][$i]['pma__table_coords']    = 'pma__table_coords';
  $cfg['Servers'][$i]['pma__pdf_pages']       = 'pma__pdf_pages';
  $cfg['Servers'][$i]['pma__column_info']     = 'pma__column_info';
  $cfg['Servers'][$i]['pma__history']         = 'pma__history';
  $cfg['Servers'][$i]['pma__table_uiprefs']   = 'pma__table_uiprefs';
  $cfg['Servers'][$i]['pma__designer_coords'] = 'pma__designer_coords';
  $cfg['Servers'][$i]['pma__tracking']        = 'pma__tracking';
  $cfg['Servers'][$i]['pma__userconfig']      = 'pma__userconfig';
  $cfg['Servers'][$i]['pma__recent']          = 'pma__recent';
  $cfg['Servers'][$i]['pma__table_uiprefs']   = 'pma__table_uiprefs';
}
