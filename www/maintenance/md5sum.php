<?php
namespace Jehon\Maintenance;

set_time_limit(5 * 60);

echo "# <pre>crc32b:\n";

require_once(__DIR__ . "/../../config.php");
require_once(__DIR__ . "/../../bin/lib/Database.php");

$root = dirname(dirname(__DIR__));

$list = myglob($root ."/*", true);
sort($list);

function startsWith($haystack, $needle)
{
  $length = strlen($needle);
  return (substr($haystack, 0, $length) === $needle);
}

function endsWith($haystack, $needle)
{
  $length = strlen($needle);
  if ($length == 0) {
    return true;
  }

  return (substr($haystack, -$length) === $needle);
}

function contains($haystack, $needle) 
{
  return strpos($haystack, $needle) !== false;
}

foreach($list as $f)
{
  $fn = str_replace($root, "", $f);

  ## 
  ## Data to be protected
  ##

  # Live folder
  if (startsWith($fn, "/live/")) { continue; }
  if (startsWith($fn, "/live-for-test/")) { continue; }

  # Live config
  if ($fn == "/config-site.php") { continue; }

  ## 
  ## Data transcient (temporary)
  ##
  if (contains($fn, "/tmp/")) { continue; }
  if (contains($fn, "/temp/")) { continue; }
  if (contains($fn, "/Temp/")) { continue; }
  if (endsWith($fn, ".log")) { continue; }
  if (startsWith($fn, "/target/")) { continue; }

  # Storage of Laravel
  if (contains($fn, "/api/") && contains($fn, "/storage/")) {
  	continue;
  }

  ## 
  ## Data not necessary on production
  ##
  if (contains($fn, "/.git/")) { continue; }
  if (startsWith($fn, "/node_modules/")) { continue; }
  if (startsWith($fn, "/documentation/")) { continue; }
  if (contains($fn, "/tests/")) { continue; }
  if (contains($fn, "/test/")) { continue; }
  if (contains($fn, "/unused/")) { continue; }
  if (startsWith($fn, "/conf")) {
    if (contains($fn, "dev/")) { continue; }
    if (endsWith($fn, "/base.sql")) { continue; }
  }
  if (startsWith($fn, "/backup")) { continue; }
  
  ##
  ## Protect old version of api
  ##
  if (startsWith($fn, "/www/api/v1.2/")) { continue; }

  echo \hash_file('crc32b',$f) . ": " . $fn . "\n";
}

?>
# done
