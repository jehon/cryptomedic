# Build tools

## NPM
file: ``package.json``

Show all scripts necessary on the server to allow all our modules to build

``npm install``

## Bower
file: ``bower.json``

List all runtimes dependancies (i.e. files that will be part of the application and sent to the browser)

``npm install``: will run ``bower install`` in postinstall script

## Gulp
file: ``gulpfile.js``

Task runner to allow task to run to build the application

Gulp must be implemented globally (for ease of use): ``npm install gulp -g``

_Available tasks:_
* ``default``
* ``test-php``
* ``test-js``
* ``test-live``
