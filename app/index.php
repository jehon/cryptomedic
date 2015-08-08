<?php 
	require_once(__DIR__ . "/../php/allscripts.php");
	require_once(__DIR__ . "/../php/core.php");
	Script::$rootPath = __DIR__;

?><!DOCTYPE html>
<html <?php 
	if (array_key_exists("online", $_REQUEST)) {
		$mode = "online";
	} else {
		$mode = "appcache";
// TODO: echo "manifest='../cache/manifest.manifest'";
	}
?> >
	<head>
		<title>Cryptomedic</title>
		<meta charset="utf-8">
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link href="static/img/favicon.ico" type="image/x-icon" rel="icon" />
		<link href="static/img/favicon.ico" type="image/x-icon" rel="shortcut icon" />
	<?php 
		// jquery
		(new Script("bower_components/jquery/dist/jquery.min.js"))->dependFile()->toPrint();
		(new Script("bower_components/jquery-ui/jquery-ui.min.js"))->dependFile()->toPrint();
		(new Script("bower_components/jquery-ui/themes/ui-lightness/jquery-ui.min.css"))->dependFile()->toPrint();
		
		// Modernizr	
		(new Script("bower_components/modernizr/modernizr.js"))->dependFile()->toPrint();
	?>
		<script type="text/javascript">
			// REQUIRED CAPACITIES
			if (!Promise || !Modernizr.indexeddb || !Modernizr.localstorage) {
			    window.location.href = "static/upgrade.html";
			}
			// support for class: class C {}; return typeof C === "	function";

			// CONFIGURE LATER LIBRARIES
			var cryptomedic = {};
			cryptomedic.version = '<?php echo getVersion(); ?>';
			cryptomedic.settings = {};
		</script>
	<?php 	
		// Custom bug reporting script:
		(new Script("static/js/bugreporting.js"))->dependFile()->toPrint();
		(new Script("static/js/html2canvas.js"))->dependFile()->toPrint();
?>
		<script type="text/javascript">
			window.bug_reporting.setApplicationState(function() {
				return { 'cryptomedic': cryptomedic, 'server': server };
			});
			window.bug_reporting.setUsernameFunction(function() {
				return server.settings.username;
			});
			window.bug_reporting.setEmailFunction(function() {
				return "";
			});
		</script>
<?php 
		
		// bootstrap
		(new Script("bower_components/bootstrap/dist/js/bootstrap.min.js"))->dependFile()->toPrint();
		(new Script("bower_components/bootstrap/dist/css/bootstrap.min.css"))->dependFile()->toPrint();
	
		// angular
		(new Script("bower_components/angular/angular.min.js"))->dependFile()->toPrint();
		(new Script("bower_components/angular-route/angular-route.min.js"))->dependFile()->toPrint();
	
		// Polyfill
		(new Script("bower_components/fetch/fetch.js"))->dependFile()->toPrint();
		
		// Other
		(new Script("bower_components/excellentexport/excellentexport.min.js"))->dependFile()->toPrint();
		(new Script("bower_components/dexie/dist/latest/Dexie.min.js"))->dependFile()->toPrint();
		
		// personnal
		(new Script("static/js/application.js"))->dependFile()->toPrint();
		(new Script("static/js/cryptomedic.js"))->dependFile()->toPrint();
		(new Script("static/js/amd_stats_datas.js"))->dependFile()->toPrint();
		(new Script("static/js/exceptions.js"))->dependFile()->toPrint();
		
		(new AllScripts("static/js/model_*.js"))->dependFile()->toPrint();
		(new AllScripts("static/js/service_*.js"))->dependFile()->toPrint();
		(new AllScripts("static/js/ctrl_*.js"))->dependFile()->toPrint();
	
		(new Script("static/css/application.css"))->dependFile()->toPrint();
		?>
	</head>
	<body ng-app="app_main" ng-controller="ctrl" id="ng-app" >
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
		      <ul class="nav navbar-nav">
	        	<li><p class="navbar-text" id='sync_status'>{{sync.final ? "up-to-date" : "syncing"}} - {{sync.checkpoint}}</p></li>
			  </ul>
		      <ul class="nav navbar-nav navbar-right">
	        	<li><p class="navbar-text" id='login_loggedusername' ng-if='server.settings.username'>{{server.settings.username}}</p></li>
	        	<li><p class="navbar-text" id='appCache_mode'><?php echo $mode; ?></p></li>
		      	<li><a href="#/home" class="navbar-link">
			    	<img src="static/img/home.gif" height="20px"/>
					Home
			    </a></li>
		      	<li><a id='menu_search' href="#/search" class="navbar-link">
		      		<img src="static/img/patientsSearch.gif" height="20px"/>
		      		Search a patient
		      	</a></li>
		      	<li><a id='menu_consults' href="#/reports/consultations" class="navbar-link">
		      		<img src="static/img/consultOfDay.gif" height="20px"/>
		      		Consults of the day
		      	</a></li>
		      	<li><a id='menu_reports' href="#/reports" class="navbar-link">
		      		<img src="static/img/reports.gif" height="20px"/>
		      		Reports
		      	</a></li>
		      	<li><a id='bug_reporting' href="javascript:bug_reporting()" class="navbar-link">
		      		<img src="static/img/bug.jpeg"/>
		      		Bug
		      		</a></li>
		      	<li><button type="button" class="btn btn-default navbar-btn" ng-click="doLogout()" >
		      		<img src="static/img/logout.gif"/>
		      		Logout
		      		</button></li>
		      	</ul>
		    </div>
		  </div>
		</nav>
		<div class='container-fluid'>
			<!--  Login screen -->
			<div ng-if="!logged && !busy.shown" class="site-wrapper" id='loginForm'>
				<div class="site-wrapper-inner col-sm-offset-4 col-sm-4">
					<form class="form-signing" role="form">
			    		<h2 class="form-signin-heading">Please sign in</h2>
			    		<label for="username">Username</label>
			        	<input id="login_username" ng-model="username" class="form-control" placeholder="Username" required autofocus>
			    		<label for="password">Password</label>
			        	<input id="login_password" ng-model="password" class="form-control" placeholder="Password" required type="password">
						<br />
						<div ng-if="loginError">
						    <div id='login_error' class="alert alert-danger">
			        			<a href="#" class="close" data-dismiss="alert">&times;</a>
			        			Invalid username/password. Please try again
							</div>
						</div>
						<br>
			        	<button ng-disabled="{{pending}}" id="login_go" ng-click="doLogin()" class="btn btn-lg btn-primary btn-block">Log in</button>
			      	</form>
			      	<br>
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
								<img ng-hide="m.status" src="static/img/waiting.gif" />
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
			<div>
				<span ng-repeat="m in messages">
					<div class="alert alert-dismissible" ng-class="'alert-' + m.level" alert-dismissible>
	 					<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						{{m.text}}
					</div>
 
					
				</span>
				<div ng-view></div>
			</div>
		</div>
		<div no-ng-if="logged" ng-controller='ctrl_offline'>
			<nav class="navbar navbar-default navbar-fixed-bottom" role="navigation" ng-if="info_available">
			 	<div class="container-fluid">
			 		<p ng-if="offline" class="navbar-text"><img src='static/img/sync.png'>{{offline}}</p>
			 		<button ng-if="refreshAvailable" type="button" class="btn btn-default navbar-btn" ng-click="applicationRefresh()">Refresh the application</button>
			 	</div>
			</nav>
		</div>
	</body>
	<script>
		// Display the application version into the header
// 		jQuery("#appCache_mode").html("v" + cryptomedic.version);
	</script>
</html>
