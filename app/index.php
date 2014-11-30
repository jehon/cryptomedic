<!DOCTYPE html>
<?php 
	require_once __DIR__ . "/../../rest/php/core.php";
	Script::$rootPath = __DIR__;
	
	$server = new Server();
	$request = new Request($server);

	// use $request?
    if ($request->isServedLocally()) {
    	// require_once("compileTemplates.php");
    }

?>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Cryptomedic</title>
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="img/favicon.ico" type="image/x-icon" rel="icon" />
	<link href="img/favicon.ico" type="image/x-icon" rel="shortcut icon" />
	
	<!-- Adapt upgrade.html also -->
	<!--[if lt IE 9]>
		<script type="text/javascript">
			window.location.href = "static/upgrade.html";
		</script>
	<![endif]-->
<?php 
	// jquery
	(new Script("bower_components/jquery/dist/jquery.min.js"))->dependFile()->toPrint();
	(new Script("bower_components/jquery-ui/jquery-ui.min.js"))->dependFile()->toPrint();
	(new Script("bower_components/jquery-ui/themes/ui-lightness/jquery-ui.min.css"))->dependFile()->toPrint();

	// Modernizr	
	(new Script("bower_components/modernizr/modernizr.js"))->dependFile()->toPrint();

	// bootstrap
	(new Script("bower_components/bootstrap/dist/js/bootstrap.min.js"))->dependFile()->toPrint();
	(new Script("bower_components/bootstrap/dist/css/bootstrap.min.css"))->dependFile()->toPrint();

	// angular
	(new Script("bower_components/angular/angular.min.js"))->dependFile()->toPrint();
	(new Script("bower_components/angular-route/angular-route.min.js"))->dependFile()->toPrint();

	// Other
	(new Script("bower_components/excellentexport/excellentexport.min.js"))->dependFile()->toPrint();
	
	// personnal
	(new Script("static/js/application.js"))->dependFile()->toPrint();
	(new Script("static/js/cryptomedic.js"))->dependFile()->toPrint();
	(new Script("static/js/amd_stats_datas.js"))->dependFile()->toPrint();
	(new Script("static/js/exceptions.js"))->dependFile()->toPrint();
	
	(new AllScripts("static/js/model_*.js"))->dependFile()->toPrint();
	(new AllScripts("static/js/service_*.js"))->dependFile()->toPrint();
	(new AllScripts("static/js/ctrl_*.js"))->dependFile()->toPrint();

	(new Script("static/css/application.css"))->dependFile()->toPrint();
	
	(new Script("/rest/authenticate/settings?JSONP=server.setSettings"))->js()->dependDBTable("settings")->live()->toPrint();
	(new Script("/rest/labels?JSONP=cryptomedic.setLabels"))->js()->dependDBTable("labels")->toPrint();
	(new Script("/rest/prices?JSONP=cryptomedic.setPrices"))->js()->dependDBTable("prices")->toPrint(); 
?>
</head>
<body ng-app="app_main" ng-controller="ctrl" id="ng-app">
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
        	<li><p class="navbar-text" id='login.logged.username'>{{server.settings.username}}</p></li>
	      	<li><a href="#/home" class="navbar-link">
		    	<img src="img/home.gif" height="20px"/>
				Home
		    </a></li>
	      	<li><a href="#/search" class="navbar-link">
	      		<img src="img/patientsSearch.gif" height="20px"/>
	      		Search a patient
	      	</a></li>
	      	<li><a href="#/day" class="navbar-link">
	      		<img src="img/consultOfDay.gif" height="20px"/>
	      		Consults of the day
	      	</a></li>
	      	<li><a href="#/reports" class="navbar-link">
	      		<img src="img/reports.gif" height="20px"/>
	      		Reports
	      	</a></li>
	      	<li><button type="button" class="btn btn-default navbar-btn" ng-click="doLogout()" >
	      		<img src="img/logout.gif"/>
	      		Logout
	      		</button></li>
	      </ul>
	    </div>
	  </div>
	</nav>
	<div class='container'>
		<!--  Login screen -->
		<div ng-if="!logged && !busy.shown" class="site-wrapper" id='loginForm'>
			<div class="site-wrapper-inner col-sm-offset-4 col-sm-4">
				<form class="form-signing" role="form">
		    		<h2 class="form-signin-heading">Please sign in</h2>
		    		<label for="username">Username</label>
		        	<input id="login_username" ng-model="username" class="form-control" placeholder="Username" required autofocus>
		    		<label for="password">Password</label>
		        	<input id="login_password" ng-model="password" class="form-control" placeholder="Password" required type="password">
					<br>
					<div ng-if="loginError">
					    <div id='login_error' class="alert alert-danger">
		        			<a href="#" class="close" data-dismiss="alert">&times;</a>
		        			Invalid username/password. Please try again
						</div>
					</div>
					<br>
		        	<button ng-disabled="{{pending}}" id="login.go" ng-click="doLogin()" class="btn btn-lg btn-primary btn-block">Log in</button>
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
		<div old-class="view-animate-container">
			<div ng-view></div>
		</div>
	</div>
	<footer class='footer'>
		<p class="text-muted">Place sticky footer content here.</p>		
	</footer>
</body>
</html>
