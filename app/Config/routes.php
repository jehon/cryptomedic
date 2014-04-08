<?php
/**
 * Routes configuration
 *
 * In this file, you set up routes to your controllers and their actions.
 * Routes are very important mechanism that allows you to freely connect
 * different urls to chosen controllers and their actions (functions).
 *
 * PHP 5
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       app.Config
 * @since         CakePHP(tm) v 0.2.9
 * @license       MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
/**
 * Here, we are connecting '/' (base path) to controller called 'Pages',
 * its action called 'display', and we pass a param to select the view file
 * to use (in this case, /app/View/Pages/home.ctp)...
 */
	Router::connect('/', array('controller' => 'pages', 'action' => 'display', 'home'));
/**
 * ...and connect the rest of 'Pages' controller's urls.
 */
	Router::connect('/pages/*', array('controller' => 'pages', 'action' => 'display'));

/**
 * Load all plugin routes. See the CakePlugin documentation on
 * how to customize the loading of plugin routes.
 */
	CakePlugin::routes();

/**
 * JEHON:
 * --> saved from url=(0052)http://book.cakephp.org/2.0/en/development/rest.html
 *
 * Add REST services to every controller
 *
 *** Mapping of routes:
 * GET	/recipes.format	RecipesController::index()
 * GET	/recipes/123.format	RecipesController::view(123)
 * POST	/recipes.format	RecipesController::add()
 * PUT	/recipes/123.format	RecipesController::edit(123)
 * DELETE	/recipes/123.format	RecipesController::delete(123)
 * POST	/recipes/123.format	RecipesController::edit(123)
 *
 *** How to set the method?
 * The _method POST variable
 * The X_HTTP_METHOD_OVERRIDE
 * The REQUEST_METHOD header
 */
    Router::mapResources('patients');
    
    // Jehon: http://book.cakephp.org/2.0/en/development/routing.html#Router::parseExtensions
    Router::parseExtensions('json', 'xls', 'csv');
    
/**
 * Load the CakePHP default routes. Only remove this if you do not want to use
 * the built-in default routes.
 */
	require CAKE . 'Config' . DS . 'routes.php';
