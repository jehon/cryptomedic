<?php
$controller = array (
		"Bill" => "bills",
		"ClubFoot" => "club_foots",
		"NonricketConsult" => "nonricket_consults",
		"OrthopedicDevice" => "orthopedic_devices",
		"Patient" => "patients",
		"Picture" => "pictures",
		"RicketConsult" => "ricket_consults",
		"Surgery" => "surgeries",
		"SurgeryFollowup" => "surgery_followups" 
);

$dev = false;
$version_app = trim ( file_get_contents ( __DIR__ . "/../../../../amd.version" ) );

ClassRegistry::init ( "Setting" );
$Setting = ClassRegistry::getObject ( "Setting" );
$version_db = $Setting->find ( 'first', array ('conditions' => array ('Setting.id' => "version")));
$version_db = $version_db ['Setting'] ['value'];
$version_db = str_replace ( array(":", " ",	"-"), "", $version_db );
if (($_SERVER ['HTTP_HOST'] == 'localhost') || ! file_exists ( __DIR__ . "/../../../../amd.version" )) {
	// Dev version: disable the whole caching system
	$dev = true;
	$version_db = $version_app = time();
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>AMD Medical Database</title>
	<?php echo $this->Html->charset() . "\n"; ?>
	<!-- Adapt upgrade.html also -->
	<!--[if lt IE 7]>
		<script type="text/javascript">
  			window.location.href = "/amd/cryptomedic/upgrade.html";
		</script>
	<![endif]-->
	
	<link href="<? echo $this->request->webroot; ?>/favicon.ico" type="image/x-icon" rel="icon" />
	<link href="<? echo $this->request->webroot; ?>/favicon.ico" type="image/x-icon" rel="shortcut icon" />

	<link rel="stylesheet" type="text/css" href="<? echo $this->request->webroot; ?>/libs/jquery/jquery-ui.css?<? echo $version_app; ?>" />
    <link rel="stylesheet" type="text/css" href="<? echo $this->request->webroot; ?>/css/jehon.css?<? echo $version_app; ?>" />
    <link rel="stylesheet" type="text/css" href="<? echo $this->request->webroot; ?>/css/application.css?<? echo $version_app; ?>" />
    
    <script type="text/javascript" src="<? echo $this->request->webroot; ?>/libs/modernizr.js?<? echo $version_app; ?>"></script>
    <script type="text/javascript" src="<? echo $this->request->webroot; ?>/libs/underscore.js?<? echo $version_app; ?>"></script>
    <script type="text/javascript" src="<? echo $this->request->webroot; ?>/libs/jquery/jquery.js?<? echo $version_app; ?>"></script>
    <script type="text/javascript" src="<? echo $this->request->webroot; ?>/libs/jquery/jquery-migrate.js?<? echo $version_app; ?>"></script>
    <script type="text/javascript" src="<? echo $this->request->webroot; ?>/libs/jquery/jquery.metadata.js?<? echo $version_app; ?>"></script>
    <script type="text/javascript" src="<? echo $this->request->webroot; ?>/libs/jquery/jquery.ui.js?<? echo $version_app; ?>"></script>
    <script type="text/javascript" src="<? echo $this->request->webroot; ?>/libs/jquery/jquery.tablesorter.js?<? echo $version_app; ?>"></script>
    <script type="text/javascript" src="<? echo $this->request->webroot; ?>/libs/jquery/jquery.tablesorter.pager.js?<? echo $version_app; ?>"></script>
    <script type="text/javascript" src="<? echo $this->request->webroot; ?>/libs/jquery/jquery.tinysort.js?<? echo $version_app; ?>"></script>
    <script type="text/javascript" src="<? echo $this->request->webroot; ?>/libs/dust/dust.js?<? echo $version_app; ?>"></script>
    <script type="text/javascript" src="<? echo $this->request->webroot; ?>/libs/dust/dust.helpers.js?<? echo $version_app; ?>"></script>
    <script type="text/javascript" src="<? echo $this->request->webroot; ?>/libs/path.js?<? echo $version_app; ?>"></script>
<!-- 
    <script type="text/javascript" src="<? echo $this->request->webroot; ?>/libs/bootstrap/bootstrap.js?<? echo $version_app; ?>"></script>
	<link rel="stylesheet" type="text/css" href="<? echo $this->request->webroot; ?>/libs/bootstrap/css/bootstrap.min.css?<? echo $version_app; ?>" />
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -- >
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-- >
-->    
    <script type="text/javascript" src="<? echo $this->request->webroot; ?>/js/jehon.js?<? echo $version_app; ?>"></script>
    <script type="text/javascript" src="<? echo $this->request->webroot; ?>/js/application.js?<? echo $version_app; ?>"></script>
    <script type="text/javascript" src="<? echo $this->request->webroot; ?>/js/amd_stats_datas.js?<? echo $version_app; ?>"></script>

	<?php if (isset ( $login )) {
		global $model2controller;
		foreach ( $model2controller as $m => $c ) {
			echo "<script type='text/javascript' "
			    . "src='" . $this->request->webroot . "/$c/structure.json?var=cryptomedic.structure.$m&version=$version_db'"
			    . "></script>";
			echo "<script type='text/javascript' "
			    . "src='" . $this->request->webroot . "/cryptomedic/dynamic/$m.compiled?$version_app'"
			    . "></script>";
			if ($m != "Patient") {
				echo "<script type='text/javascript' "
				    . "src='" . $this->request->webroot . "/cryptomedic/dynamic/$m.history.compiled?$version_app'"
				    . "></script>";
			}
		}
		?>
		<script type="text/javascript" src="<? echo $this->request->webroot; ?>/cryptomedic/dynamic/history.compiled?<? echo $version_app; ?>"></script>
        <script type="text/javascript" src="<? echo $this->request->webroot; ?>/cryptomedic/dynamic/patient_summary.compiled?<? echo $version_app; ?>"></script>
        <script type="text/javascript" src="<? echo $this->request->webroot; ?>/cryptomedic/dynamic/graphics.compiled?<? echo $version_app; ?>"></script>
        <script type="text/javascript" src="<? echo $this->request->webroot; ?>/cryptomedic/dynamic/related_header.compiled?<? echo $version_app; ?>"></script>

        <script type="text/javascript" src="<? echo $this->request->webroot; ?>/labels/index.json?var=cryptomedic.labels&version=<? echo $version_db; ?>"></script>
        <script type="text/javascript" src="<? echo $this->request->webroot; ?>/prices/index.json?var=cryptomedic.prices&version=<? echo $version_db; ?>"></script>

        <script type="text/javascript" src="<? echo $this->request->webroot; ?>/users/settings.json?var=cryptomedic.settings"></script>
	<?php } ?>

	<?php if ($this->Session->check("testing")) { ?>
        <script type="text/javascript" src="<? echo $this->request->webroot; ?>/testing/qbehavior.js?<? echo $version_app; ?>"></script>
    <?php } ?>
	
	<script>
		/* 
		 * Initialisation scripts (all style of initialisation, before apearing of elements on the page
		 * 	
		 * This initialisation pass informations from server to script
		 */
		jehon.settings.denied = cryptomedic.settings.denied;
			 		 	
		version_app='<? echo $version_app; ?>';
		version_db='<? echo $version_db; ?>';
		ajax=<?php
		if (isset($ajax))
			echo json_encode ( $ajax );
		else
			echo "[]";
		?>;
		cryptomedic.enhance(ajax);

		jehon.ready(function() {
			if (window.location.hash.length == 0) {
				cryptomedic.status.mode = '<?
					switch($this->action) {
						case 'day':
						case 'display':
						    echo "display";
						    break;
						case 'view':
						    echo "read";
						    break;
					    default:
						    echo $this->action;
						    break;
				}
				?>';
			}
		});
	</script>
</head>
<body>
    <div class="container">
		<!-- ---------------------------------------------- main scripts end --------------------------------- -->
		<!-- ---------------------------------------------- top menu begin --------------------------------- -->
		<table style='margin-top: 0px; padding-top: 0px; border-spacing: 0px'>
			<tr>
	    		<td width='50px'>
					<img class="imgbutton" src="<? echo $this->request->webroot; ?>/cryptomedic/img/amd.jpg" height='50px' alt="amd">
	    		</td>
				<td>
					<div class="menubar" id='application_header'>
						<?php if (isset($login)) { ?>
							<span id='identification'><? echo $login; ?></span>
							<a class='textbutton' href="/amd/"><img src="<? echo $this->request->webroot; ?>/cryptomedic/img/home.gif" alt="" />Home</a>
							<a class='textbutton' href="/amd/patients"><img src="<? echo $this->request->webroot; ?>/cryptomedic/img/patientsSearch.gif" alt="" /> Search a patient</a>
	                        <a class='textbutton' href="/amd/patients/reference"><img src="<? echo $this->request->webroot; ?>/cryptomedic/img/add.gif" alt="" /> Add a patient</a>
	                        <a class='textbutton' href="/amd/reports/day/"><img src="<? echo $this->request->webroot; ?>/cryptomedic/img/go.gif" alt="" />Day of consult</a>
	                        <a class='textbutton' href="/amd/home/reports"><img src="<? echo $this->request->webroot; ?>/cryptomedic/img/go.gif" alt="" />All reports</a>
	                        <a class='textbutton' href="/amd/users/logout"><img src="<? echo $this->request->webroot; ?>/cryptomedic/img/exit.gif" alt="" /><label for="Logout">Logout</label></a>
	                    <?php } ?>
					</div>
				</td>
			</tr>
		</table>
	    <? if (isset($ajax) && array_key_exists('id', $ajax)) { ?>
		    <div id='patient_menu' class='headerContainer'>
				<a class='textbutton' href='#read'>
					<img src="<? echo $this->request->webroot; ?>/cryptomedic/img/Patient.gif"/>
				    Patient
				</a>
				<a class='textbutton' href='#history'>
					<img src="<? echo $this->request->webroot; ?>/cryptomedic/img/history.gif"/>
				    History
				</a>
				<a class='textbutton' href='#graphics'>
					<img src="<? echo $this->request->webroot; ?>/cryptomedic/img/graphics.gif"/>
				    Graphics
			    </a>
		</div>
		<? } ?>
	    <!-- ---------------------------------------------- top menu end --------------------------------- -->
		<div id='application_content_TODO'>
			<!-- ---------------------------------------------- Content begin --------------------------------- -->
			<div id='flashMessages'><?php echo $this->Session->flash(); ?></div>
			<div id="content">
				<!-- ---------------------------------------------- errors begin --------------------------------- -->
				<div id="generalForm_errors"></div>
				<!-- ---------------------------------------------- errors end --------------------------------- -->
		    	<?php echo $content_for_layout; ?>
				<div class='headerContainer' style='text-align: center'>
					<input modes='edit add' class="button" id="submitbutton" type="submit" value="Save">
				</div>
			</div>
			<!-- ---------------------------------------------- Main Content end --------------------------------- -->
		</div>
		<div id='application_footer'>application: <? echo $version_app; ?> database: <?php echo $version_db; ?> <?php if ($dev) echo "DEVELOPPEMENT VERSION"; ?></div>
	</div>
</body>
</html>
<script>
	if (typeof(cryptomedic.display.specifics.patient) == 'function')
		cryptomedic.display.specifics.patient();
</script>
