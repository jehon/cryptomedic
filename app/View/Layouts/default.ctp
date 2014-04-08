<?php
	$controller = array(
			"Bill" => "bills",
			"ClubFoot" => "club_foots",
			"NonricketConsult" => "nonricket_consults",
			"OrthopedicDevice" => "orthopedic_devices",
			"Patient" => "patients",
			"Picture" => "pictures",
			"RicketConsult" => "ricket_consults",
			"Surgery" => "surgeries",
			"SurgeryFollowup" => "surgery_followups",
	);

    if (($_SERVER['HTTP_HOST'] == 'localhost') || !file_exists(__DIR__ . "/../../../../amd.version")) {
        // Dev version: disable the whole caching system
        $dev = true;
        $version_db = $version = time();
    } else {
	    $dev = false;
    	$version = trim(file_get_contents(__DIR__ . "/../../../../amd.version"));
    	// TODO: calculate db version !
        $version_db = $version;
    }
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>AMD Medical Database</title>
	<?php echo $this->Html->charset() . "\n"; ?>
	<link href="<? echo $this->webroot ?>/favicon.ico" type="image/x-icon" rel="icon" />
	<link href="<? echo $this->webroot ?>/favicon.ico" type="image/x-icon" rel="shortcut icon" />
	
	<link rel="stylesheet" type="text/css" href="<? echo $this->webroot ?>/libs<? echo $version; ?>/jquery/jquery-ui.css" />
    <link rel="stylesheet" type="text/css" href="<? echo $this->webroot ?>/css<? echo $version; ?>/jehon.css" />
	<link rel="stylesheet" type="text/css" href="<? echo $this->webroot ?>/css<? echo $version; ?>/application.css" />

	<script type="text/javascript" src="<? echo $this->webroot ?>/libs<? echo $version; ?>/modernizr.js"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/libs<? echo $version; ?>/underscore.js"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/libs<? echo $version; ?>/jquery/jquery.js"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/libs<? echo $version; ?>/jquery/jquery-migrate.js"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/libs<? echo $version; ?>/jquery/jquery.metadata.js"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/libs<? echo $version; ?>/jquery/jquery.ui.js"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/libs<? echo $version; ?>/jquery/jquery.tablesorter.js"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/libs<? echo $version; ?>/jquery/jquery.tablesorter.pager.js"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/libs<? echo $version; ?>/jquery/jquery.tinysort.js"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/libs<? echo $version; ?>/dust/dust.js"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/libs<? echo $version; ?>/dust/dust.helpers.js"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/libs<? echo $version; ?>/path.js"></script>

    <script type="text/javascript" src="<? echo $this->webroot ?>/js<? echo $version; ?>/jehon.js"></script>
    <script type="text/javascript" src="<? echo $this->webroot ?>/js<? echo $version; ?>/application.js"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/js<? echo $version; ?>/amd_stats_datas.js"></script>

	<?php if (isset($login)) {
		foreach($controller as $m => $c) {
				echo "<script type='text/javascript' "
					. "src='" . $this->webroot . "/$c/structure.json?var=cryptomedic.structure.$m&version=$version_db'"
					. "></script>";
				echo "<script type='text/javascript' "
					. "src='" . $this->webroot . "/cryptomedic$version/dynamic/$m.compiled'"
					. "></script>";
				if ($m != "Patient") {
					echo "<script type='text/javascript' "
						. "src='" . $this->webroot . "/cryptomedic$version/dynamic/$m.history.compiled'"
						. "></script>";
				}
			}
		?>
		<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/history.compiled"></script>
		<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/patient_summary.compiled"></script>
		<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/graphics.compiled"></script>
		<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/related_header.compiled"></script>
		
		<script type="text/javascript" src="<? echo $this->webroot ?>/labels/index.json?var=cryptomedic.labels&version=<? echo $version_db; ?>"></script>
		<script type="text/javascript" src="<? echo $this->webroot ?>/prices/index.json?var=cryptomedic.prices&version=<? echo $version_db; ?>"></script>
	<?php } ?>
	<script>
		/* 
		 * Initialisation scripts (all style of initialisation, before apearing of elements on the page
		 * 	
		 * This initialisation pass informations from server to script
		 */
		 	
		version='<? echo $version; ?>';
		jehon.settings.denied=<? echo json_encode($denied); ?>;
		ajax=<?php 
			if (isset($ajax)) echo json_encode($ajax);
			else echo "[]";
		?>;
		cryptomedic.enhance(ajax);
		cryptomedic.settings.maxUploadSizeMb = <? echo min((int) ini_get('upload_max_filesize'), 
				(int)(ini_get('post_max_size') * 0.90), 
				(int)(ini_get('memory_limit') * 0.5)
			); 
		?>;

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
    <!-- ---------------------------------------------- main scripts end --------------------------------- -->
    <!-- ---------------------------------------------- top menu begin --------------------------------- -->
    <table style='margin-top: 0px; padding-top: 0px; border-spacing: 0px'>
    	<tr>
    		<td width='50px'>
				<img class="imgbutton" src="<? echo $this->webroot ?>/cryptomedic/img/amd.jpg" height='50px' alt="amd">
    		</td>
    		<td>
				<div class="menubar" id='application_header'>
					<?php if (isset($login)) { ?>
						<span id='identification'><? echo $login; ?></span>
						<a class='textbutton' href="/amd/"><img src="<? echo $this->webroot ?>/cryptomedic/img/home.gif" alt="" />Home</a>
						<a class='textbutton' href="/amd/users/logout"><img src="<? echo $this->webroot ?>/cryptomedic/img/exit.gif" alt="" /><label for="Logout">Logout</label></a>
						<a class='textbutton' href="/amd/patients"><img src="<? echo $this->webroot ?>/cryptomedic/img/patientsSearch.gif" alt="" /> Search a patient</a>
                        <a class='textbutton' href="/amd/?patientForm=1"><img src="<? echo $this->webroot ?>/cryptomedic/img/add.gif" alt="" /> Add a patient</a>
                        <a class='textbutton' href="/amd/ricket_consults/day/"><img src="<? echo $this->webroot ?>/cryptomedic/img/go.gif" alt="" />Day of consult</a>
					<?php } ?>
				</div>
    		</td>
    	</tr>
    </table>
    <? if (isset($ajax) && array_key_exists('id', $ajax)) { ?>
	    <div id='patient_menu' class='headerContainer'>
			<a class='textbutton' href='#read'>
				<img src="<? echo $this->webroot ?>/cryptomedic/img/Patient.gif"/>
				Patient
			</a>
			<a class='textbutton' href='#history'>
				<img src="<? echo $this->webroot ?>/cryptomedic/img/history.gif"/>
				History
			</a>
			<a class='textbutton' href='#graphics'>
				<img src="<? echo $this->webroot ?>/cryptomedic/img/graphics.gif"/>
				Graphics
			</a>
		</div>
	<? } ?>
    <!-- ---------------------------------------------- top menu end --------------------------------- -->
	<div id='application_content_TODO'>
        <!-- ---------------------------------------------- Content begin --------------------------------- -->
	    <div id="content">
	        <!-- ---------------------------------------------- errors begin --------------------------------- -->
		    <div id="generalForm_errors"></div>
	        <div id='flashMessages'>
			    <?php echo $this->Session->flash('auth'); ?>
			    <?php echo $this->Session->flash(); ?>
		    </div>
	        <!-- ---------------------------------------------- errors end --------------------------------- -->
	    	<?php echo $content_for_layout; ?>
			<div class='headerContainer' style='text-align: center'>
				<input modes='edit add' class="button" id="submitbutton" type="submit" value="Save">
			</div>
	    </div>
        <!-- ---------------------------------------------- Main Content end --------------------------------- -->
	</div>
	<div id='application_footer'>version <? echo $version; ?> <? if ($dev) echo "DEVELOPPEMENT VERSION"; ?></div>
	</body>
</html>
<script>
	if (typeof(cryptomedic.display.specifics.patient) == 'function')
		cryptomedic.display.specifics.patient();
</script>
