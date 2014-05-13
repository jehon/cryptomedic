<!DOCTYPE html>
<html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<?php 
		$version_app = "1";
		$version_db = "1";
		require("../../Lib/cryptomedic.php");
	?>
	<title>AMD Medical Database</title>
	<!-- Adapt upgrade.html also -->
	<!--[if lt IE 7]>
		<script type="text/javascript">
  			window.location.href = "/amd/cryptomedic/upgrade.html";
		</script>
	<![endif]-->
	
	<link href="favicon.ico" type="image/x-icon" rel="icon" />
	<link href="favicon.ico" type="image/x-icon" rel="shortcut icon" />

    <script type="text/javascript" src="bower_components/jquery/dist/jquery.min.js?<? echo $version_app; ?>"></script>
    <script type="text/javascript" src="bower_components/jquery-ui/ui/minified/jquery-ui.min.js?<? echo $version_app; ?>"></script>
	<link   type="text/css"       href="bower_components/jquery-ui/themes/base/minified/jquery-ui.min.css?<? echo $version_app; ?>" rel="stylesheet" />

<!--    <script type="text/javascript" src="libs/jquery/jquery-migrate.js?<? echo $version_app; ?>"></script>-->
<!--    <script type="text/javascript" src="libs/jquery/jquery.metadata.js?<? echo $version_app; ?>"></script>-->
<!--    <script type="text/javascript" src="libs/jquery/jquery.tablesorter.js?<? echo $version_app; ?>"></script>-->
<!--    <script type="text/javascript" src="libs/jquery/jquery.tablesorter.pager.js?<? echo $version_app; ?>"></script>-->
<!--    <script type="text/javascript" src="libs/jquery/jquery.tinysort.js?<? echo $version_app; ?>"></script>-->

    <script type="text/javascript" src="bower_components/bootstrap/dist/js/bootstrap.min.js?<? echo $version_app; ?>"></script>
	<link   type="text/css"       href="bower_components/bootstrap/dist/css/bootstrap.min.css?<? echo $version_app; ?>" rel="stylesheet" />

	<script type="text/javascript" src="bower_components/angular/angular.js"></script>

<!--    <script type="text/javascript" src="src/js/jehon.js?<? echo $version_app; ?>"></script>-->
<!--    <link   type="text/css"       href="src/css/jehon.css?<? echo $version_app; ?>" rel="stylesheet" />-->
    <script type="text/javascript" src="src/js/application.js?<? echo $version_app; ?>"></script>
    <script type="text/javascript" src="src/js/service_rest.js?<? echo $version_app; ?>"></script>
    <script type="text/javascript" src="src/js/old_application.js?<? echo $version_app; ?>"></script>
    <link   type="text/css"       href="src/css/application.css?<? echo $version_app; ?>" rel="stylesheet" />
<!--    <script type="text/javascript" src="src/js/amd_stats_datas.js?<? echo $version_app; ?>"></script>-->
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
<body ng-app="Cryptomedic_app" ng-controller="Cryptomedic_ctrl">
<span ng-if="!loggedIn" ng-include="'src/html/login.html'"></span>
<span ng-if="loggedIn">
	<div class="container">
		here we are
	</div>
</span>
</body>
</html>