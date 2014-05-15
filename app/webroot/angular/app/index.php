<!DOCTYPE html>
<?php 
	$dev = false;
	$version_db = $version_app = time();
	$version_app = trim ( file_get_contents ( __DIR__ . "/../../../../../amd.version" ) );
	
	//$version_db = $Setting->find ( 'first', array ('conditions' => array ('Setting.id' => "version")));
	//$version_db = $version_db ['Setting'] ['value'];
	//$version_db = str_replace ( array(":", " ",	"-"), "", $version_db );
	if (($_SERVER ['HTTP_HOST'] == 'localhost') || ! file_exists ( __DIR__ . "/../../../../amd.version" )) {
		// Dev version: disable the whole caching system
		$dev = true;
		$version_db = $version_app = time();
	}

	require("../../../Lib/cryptomedic.php");
?>
<!--[if lt IE 7]>      <html lang="en" ng-app="app_cryptomedic" class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html lang="en" ng-app="app_cryptomedic" class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html lang="en" ng-app="app_cryptomedic" class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html lang="en" ng-app="app_cryptomedic" class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Cryptomedic</title>
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="favicon.ico" type="image/x-icon" rel="icon" />
	<link href="favicon.ico" type="image/x-icon" rel="shortcut icon" />
	
	<!-- jquery -->
	<script src="bower_components/jquery/dist/jquery.min.js?<? echo $version_app; ?>"></script>
    <script src="bower_components/jquery-ui/ui/minified/jquery-ui.min.js?<? echo $version_app; ?>"></script>
	<link  href="bower_components/jquery-ui/themes/base/minified/jquery-ui.min.css?<? echo $version_app; ?>" rel="stylesheet" />
	
	<!-- angular -->
	<link  href="bower_components/html5-boilerplate/css/normalize.css" rel="stylesheet" >
	<link  href="bower_components/html5-boilerplate/css/main.css" rel="stylesheet" >
	<script src="bower_components/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js"></script>
	<script src="bower_components/angular/angular.js"></script>
	<script src="bower_components/angular-route/angular-route.min.js"></script>

	<!-- bootstrap -->
    <script src="bower_components/bootstrap/dist/js/bootstrap.min.js?<? echo $version_app; ?>"></script>
	<link  href="bower_components/bootstrap/dist/css/bootstrap.min.css?<? echo $version_app; ?>" rel="stylesheet" />

	<!-- Adapt upgrade.html also -->
	<!--[if lt IE 7]>
		<script type="text/javascript">
			window.location.href = "/amd/cryptomedic/upgrade.html";
		</script>
	<![endif]-->

	<!-- personnal -->
    <script src="js/cryptomedic.js?<? echo $version_app; ?>"></script>
    <script src="js/application.js?<? echo $version_app; ?>"></script>
    <script src="js/service_rest.js?<? echo $version_app; ?>"></script>
<!--     <script src="js/old_application.js?<? echo $version_app; ?>"></script> -->
<!--     <script src="js/amd_stats_datas.js?<? echo $version_app; ?>"></script> -->

    <link  href="css/application.css?<? echo $version_app; ?>" rel="stylesheet" />
	<?php
		foreach ( $model2controller as $m => $c ) {
			echo "<script type='text/javascript' "
			    . "src='/amd/$c/structure.json?var=cryptomedic.structure.$m&version=$version_db'"
			    . "></script>";
		}
	?>
	<script src="/amd/users/settings.json?var=cryptomedic.settings"></script>
	
	<script type="text/javascript" src="/amd/labels/index.json?var=cryptomedic.labels&version=<? echo $version_db; ?>"></script>
    <script type="text/javascript" src="/amd/prices/index.json?var=cryptomedic.prices&version=<? echo $version_db; ?>"></script>
	
</head>
<body ng-app="app_cryptomedic" ng-controller="ctrl_cryptomedic">
	<!--  Login screen -->
	<div ng-if="!logged && !pending" class="login site-wrapper">
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
	        	<button ng-disabled="{{pending}}" id="login" ng-click="doLogin()" class="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
	      	</form>
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
					<div ng-repeat="m in busyMessages">
						<span ng-if="!m.status" class="glyphicon glyphicon-asterisk"></span>
						<span ng-if="m.status" class="glyphicon glyphicon-ok"></span>
						{{m.message}}
					</div>
				</div>
				<div class="modal-footer" ng-if="busyMessagesDone">
					<button type="button" class="btn btn-default btn-success" data-dismiss="modal">Dismiss</button>
				</div>
			</div><!-- /.modal-content -->
		</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	<span>
	
	<!--  Navigation bar -->	
	<nav class="navbar navbar-default" role="navigation">
	  <div class="container-fluid">
	    <!-- Brand and toggle get grouped for better mobile display -->
	    <div class="navbar-header">
	      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
	        <span class="sr-only">Toggle navigation</span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	      </button>
	      <a class="navbar-brand" href="#">Brand</a>
	    </div>
	
	    <!-- Collect the nav links, forms, and other content for toggling -->
	    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
	      <ul class="nav navbar-nav">
	        <li class="active"><a href="#">Link</a></li>
	        <li><a href="#">Link</a></li>
	        <li class="dropdown">
	          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
	          <ul class="dropdown-menu">
	            <li><a href="#">Action</a></li>
	            <li><a href="#">Another action</a></li>
	            <li><a href="#">Something else here</a></li>
	            <li class="divider"></li>
	            <li><a href="#">Separated link</a></li>
	            <li class="divider"></li>
	            <li><a href="#">One more separated link</a></li>
	          </ul>
	        </li>
	      </ul>
	      <form class="navbar-form navbar-left" role="search">
	        <div class="form-group">
	          <input type="text" class="form-control" placeholder="Search">
	        </div>
	        <button type="submit" class="btn btn-default">Submit</button>
	      </form>
	      <ul class="nav navbar-nav navbar-right">
	        <li><a href="/amd/users/logout">ref Logout</a></li>
	        <li><a ng-clic="doLogout()">Logout</a></li>
	        <li class="dropdown">
	          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
	          <ul class="dropdown-menu">
	            <li><a href="#">Action</a></li>
	            <li><a href="#">Another action</a></li>
	            <li><a href="#">Something else here</a></li>
	            <li class="divider"></li>
	            <li><a href="#">Separated link</a></li>
	          </ul>
	        </li>
	      </ul>
	    </div><!-- /.navbar-collapse -->
	  </div><!-- /.container-fluid -->
	</nav>
	
	<div class="container" ng-view>
			here we are
		</div>
		End of Main content
	</span>
</body>
</html>
