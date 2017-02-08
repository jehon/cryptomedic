<?php
namespace Jehon\Maintenance;

set_time_limit(5 * 60);

echo "# <pre>crc32b:\n";

require_once(__DIR__ . "/../../config.php");
require_once(__DIR__ . "/../../bin/lib/Database.php");

$root = dirname(dirname(__DIR__));

$list = myglob($root ."/*", true);
sort($list);

foreach($list as $f) {
  $fn = str_replace($root, "", $f);
  echo \hash_file('crc32b',$f) . ": " . $fn . "\n";
}

?>
# done
