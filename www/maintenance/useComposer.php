<?php
// http://stackoverflow.com/a/17244866/1954789

die();

define('EXTRACT_DIRECTORY', "../var/extractedComposer");


if (file_exists(EXTRACT_DIRECTORY.'/vendor/autoload.php') == true) {
    echo "Extracted autoload already exists. Skipping phar extraction as presumably it's already extracted.";
}
else{
    $composerPhar = new Phar("Composer.phar");
    //php.ini setting phar.readonly must be set to 0
    $composerPhar->extractTo(EXTRACT_DIRECTORY);
}

//This requires the phar to have been extracted successfully.
require_once (EXTRACT_DIRECTORY.'/vendor/autoload.php');

//Use the Composer classes
use Composer\Console\Application;
use Composer\Command\UpdateCommand;
use Symfony\Component\Console\Input\ArrayInput;

// change out of the webroot so that the vendors file is not created in
// a place that will be visible to the intahwebz
chdir('../');

//Create the commands
$input = new ArrayInput(array('command' => 'update'));

//Create the application and run it with the commands
$application = new Application();
$application->run($input);

?>




<?php
// If composer can be run once... we could use the local install of composer in vendor

// http://stackoverflow.com/a/25208897/1954789

require 'vendor/autoload.php' // require composer dependencies

use Composer\Console\Application;
use Symfony\Component\Console\Input\ArrayInput;

// Composer\Factory::getHomeDir() method
// needs COMPOSER_HOME environment variable set
putenv('COMPOSER_HOME=' . __DIR__ . '/vendor/bin/composer');

// call `composer install` command programmatically
$input = new ArrayInput(array('command' => 'install'));
$application = new Application();
$application->setAutoExit(false); // prevent `$application->run` method from exitting the script
$application->run($input);

echo "Done.";
