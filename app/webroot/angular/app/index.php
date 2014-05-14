<!DOCTYPE html>
<?php 
	$version_app = "1";
	$version_db = "1";
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
    <script src="js/application.js?<? echo $version_app; ?>"></script>
    <script src="js/service_rest.js?<? echo $version_app; ?>"></script>
    <script src="js/ctrl_login.js?<? echo $version_app; ?>"></script>
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
	<script type="text/javascript" src="/amd/labels/index.json?var=cryptomedic.labels&version=<? echo $version_db; ?>"></script>
    <script type="text/javascript" src="/amd/prices/index.json?var=cryptomedic.prices&version=<? echo $version_db; ?>"></script>
	
</head>
<body ng-app="app_cryptomedic" ng-controller="ctrl_cryptomedic">
	<span ng-if="!loggedIn" ng-include="'partials/login.html'"></span>
	<span ng-if="loggedIn">
		<div class="container" ng-view>
			here we are
		</div>
	</span>
</body>
</html>
