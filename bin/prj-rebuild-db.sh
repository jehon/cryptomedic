
php maintenance/patch_db.php

exit 0

php <<-PHP
  <?php

  // Set up the database

  // require_once(__DIR__ . "/bootstrap/autoload.php");

  require_once(__DIR__ . "/vendor/autoload.php");

  global \$myconfig;
  require_once(__DIR__ . "/config.php");

  \Jehon\Maintenance\Database::run(
      [
          __DIR__ . "/conf/database_scripts/dev_only/reset.sql",
          __DIR__ . "/conf/database_scripts/dev_only/testing.sql",
          __DIR__ . "/conf/database_scripts",
          __DIR__ . "/conf/database_scripts/dev_only"
      ],
      \$myconfig['database']['database'],
      \$myconfig['database']['username'],
      \$myconfig['database']['password'],
      \$myconfig['database']['options']
  );

PHP

#php api/v1.0/tests/bootstrap.php
