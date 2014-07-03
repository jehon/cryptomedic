<!DOCTYPE html>
<?php 
	require "php/script.php";
	require("../../../Lib/cryptomedic.php");
?>
<!--[if lt IE 7]>      <html lang="en" ng-app="app_main" class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html lang="en" ng-app="app_main" class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html lang="en" ng-app="app_main" class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html lang="en" ng-app="app_main" class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Cryptomedic</title>
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="img/favicon.ico" type="image/x-icon" rel="icon" />
	<link href="img/favicon.ico" type="image/x-icon" rel="shortcut icon" />
	
	<!-- Adapt upgrade.html also -->
	<!--[if lt IE 7]>
		<script type="text/javascript">
			window.location.href = "/amd/cryptomedic/upgrade.html";
		</script>
	<![endif]-->
	
<?php 
	// jquery
	(new Script())->url("bower_components/jquery/dist/jquery.min.js")->cached()->js()->dependFile()->toPrint();
	(new Script())->url("bower_components/jquery-ui/ui/minified/jquery-ui.min.js")->cached()->js()->dependFile()->toPrint();
	(new Script())->url("bower_components/jquery-ui/themes/base/minified/jquery-ui.min.css")->cached()->css()->dependFile()->toPrint();
	
	// <!-- bootstrap -->
	(new Script())->url("bower_components/bootstrap/dist/js/bootstrap.min.js")->cached()->js()->dependFile()->toPrint();
	(new Script())->url("bower_components/bootstrap/dist/css/bootstrap.min.css")->cached()->css()->dependFile()->toPrint();


	// <!-- angular -->
	(new Script())->url("bower_components/html5-boilerplate/css/normalize.css")->cached()->css()->dependFile()->toPrint();
	(new Script())->url("bower_components/html5-boilerplate/css/main.css")->cached()->css()->dependFile()->toPrint();
	(new Script())->url("bower_components/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js")->cached()->js()->dependFile()->toPrint();
	(new Script())->url("bower_components/angular/angular.min.js")->cached()->js()->dependFile()->toPrint();
	(new Script())->url("bower_components/angular-route/angular-route.min.js")->cached()->js()->dependFile()->toPrint();
	
	// <!-- personnal -->
	(new Script())->url("js/cryptomedic.js")->cached()->js()->dependFile()->toPrint();
	(new Script())->url("js/application.js")->cached()->js()->dependFile()->toPrint();
	(new Script())->url("js/amd_stats_datas.js")->cached()->js()->dependFile()->toPrint();
	(new Script())->url("js/exceptions.js")->cached()->js()->dependFile()->toPrint();
	(new Script())->all("js/model*.js")->cached()->js()->dependFile()->toPrint();
	(new Script())->all("js/service*.js")->cached()->js()->dependFile()->toPrint();
	(new Script())->all("js/ctrl*.js")->cached()->js()->dependFile()->toPrint();
	// (new Script())->url("js/old_application.js")->cached()->css()->dependFile()->toPrint();

	(new Script())->url("css/application.css")->cached()->css()->dependFile()->toPrint();
	foreach ( $model2controller as $m => $c ) {
		(new Script())->url("/amd/$c/structure.json?var=cryptomedic.structure.$m")->cached()->js()->dependDB()->toPrint();
	}
	
	(new Script())->url("/amd/users/settings.json?var=cryptomedic.settings")->live()->js()->dependDBTable("settings")->toPrint();
	(new Script())->url("/amd/prices/index.json?var=cryptomedic.prices")->cached()->js()->dependDBTable("prices")->toPrint();
	(new Script())->url("/amd/labels/index.json?var=cryptomedic.labels")->cached()->js()->dependDBTable("labels")->toPrint(); 
?>
</head>
<body ng-app="app_main" ng-controller="ctrl" id="ng-app">
	<!--  Login screen -->
	<div ng-if="!logged && !busy.shown" class="site-wrapper">
		<div class="site-wrapper-inner col-sm-offset-4 col-sm-4">
			<form class="form-signin" role="form">
	    		<h2 class="form-signin-heading">Please sign in</h2>
	    		<label for="username">Username</label>
	        	<input id="username" ng-model="username" class="form-control" placeholder="Username" required autofocus>
	    		<label for="password">Password</label>
	        	<input id="password" ng-model="password" class="form-control" placeholder="Password" required type="password">
				<br>
				<div ng-if="loginError">
				    <div class="alert alert-danger">
	        			<a href="#" class="close" data-dismiss="alert">&times;</a>
	        			Invalid username/password. Please try again
					</div>
				</div>
				<br>
	        	<button ng-disabled="{{pending}}" id="login" ng-click="doLogin()" class="btn btn-lg btn-primary btn-block">Log in</button>
	      	</form>
	      	<br>
	      </div>
	    </div>
	  </div>
	</div>
	<!--  Pending screen -->
	<!-- Modal -->
	<div class="modal fade" id="busy" data-keyboard="false">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Waiting for:</h4>
				</div>
				<div class="modal-body">
					<div ng-repeat="m in busy.messages">
						<img ng-hide="m.status" src="img/waiting.gif" />
						<span ng-show="m.status" class="glyphicon glyphicon-ok"></span>
						{{m.message}}
					</div>
				</div>
				<div class="modal-footer" ng-if="busy.done">
					<button type="button" class="btn btn-default btn-success" data-dismiss="modal" ng-click="endbusy()">
						<span class="glyphicon glyphicon-time"></span>
						Dismiss
					</button>
				</div>
			</div><!-- /.modal-content -->
		</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	
	<!--  Navigation bar -->	
	<nav class="navbar navbar-default navbar-static-top" role="navigation" ng-if="logged">
	  <div class="container-fluid">
	    <!-- Brand and toggle get grouped for better mobile display -->
	    <div class="navbar-header">
	      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#menuMain">
	        <span class="sr-only">Toggle navigation</span>
	      </button>
	      <a class="navbar-brand" href="#">Menu</a>
	    </div>
	
	    <!-- Collect the nav links, forms, and other content for toggling -->
	    <div class="collapse navbar-collapse" id="menuMain">
	      <ul class="nav navbar-nav navbar-right">
        	<li><p class="navbar-text">{{username}}</p></li>
	      	<li><button type="button" class="btn btn-default navbar-btn"><a href="#/">
	      		<img src="img/home.gif"/>
	      		Home
	      		</a></button></li>
	      	<li><button type="button" class="btn btn-default navbar-btn"><a href="#/search">
	      		<img src="img/patientsSearch.gif"/>
	      		Search a patient
	      		</a></button></li>
	      	<li><button type="button" class="btn btn-default navbar-btn"><a href="/amd/pages/reports">
	      		<img src="img/reports.gif"/>
	      		Reports
	      		</a></button></li>
	      	<li><button type="button" class="btn btn-default navbar-btn" ng-click="doLogout()" >
	      		<img src="img/logout.gif"/>
	      		Logout
	      		</button></li>
	      </ul>
	    </div>
	  </div>
	</nav>
	<div class="view-animate-container">
		<div>&nbsp;</div>
		<div ng-view></div>
	</div>
</body>
</html>
