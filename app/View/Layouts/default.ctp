<?php
	if (array_key_exists('_resetcookie', $_REQUEST) 
		|| (array_key_exists('query', $this->request->params)
			&& array_key_exists('_resetcookie', $this->request->params['query']) 
			&& ($this->request->params['query']['_resetcookie'] > 0)) 
		|| (array_key_exists('query', $this->request) && is_array($this->request['query']) 
			&& array_key_exists('_resetcookie', $this->request['query'])
			&& $this->request['query']['_resetcookie'] > 0)
		){
		setcookie ("CAKEPHP", "", time() - 3600, "/");
		?>
			Your cookie should have been resetted<br>
			Go back to <a href='/amd/'>login page</a>.
		<?
		die("Cookie reset");
	}

	/**
	 * Various exports formats 
	 * 
	 * 
	 * 
	 */

	if (array_key_exists('_format', $_REQUEST) && ($_REQUEST['_format'] > "")) {
		$CT = array(
				"xls" => "application/csv",
				"csv" => "application/csv",
				"csvfr" => "application/csv"
		);
		$EXT = array(
				"xls" => "xls",
				"csv" => "csv",
				"csvfr" => "csv"
		);
		
		$f = $_REQUEST['_format'];
		
		header('Content-Type: ' . $CT[$f]);
		header('Content-Description: File Transfer');
		header('Content-Disposition: attachment; filename=' . $this->request->data['filename'] . '.' . $EXT[$f]);
		
		echo $content_for_layout;
		// TODO: this is not the correct way of terminating the page???
		return ;
		/** 
		 *	Exports done
		 */
	}

	
	$version = trim(file_get_contents(__DIR__ . "/../../webroot/version.txt"));
	$dev = false;
	if ($_SERVER['HTTP_HOST'] == 'localhost') {
		// Dev version: disable the whole caching system
		$dev = true;
		$version = time();
	}
	if (array_key_exists("_noversion", $_REQUEST)) {
		$version = 1;
	}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>AMD Medical Database</title>
	<?php echo $this->Html->charset() . "\n"; ?>
	<link href="<? echo $this->webroot ?>/cryptomedic/favicon.ico" type="image/x-icon" rel="icon" />
	<link href="<? echo $this->webroot ?>/cryptomedic/favicon.ico" type="image/x-icon" rel="shortcut icon" />
	
	<link rel="stylesheet" type="text/css" href="/jehon<? echo $version; ?>/css/jehon.css" />
	<link rel="stylesheet" type="text/css" href="/jehon<? echo $version; ?>/css/jquery-ui.css" />
	<link rel="stylesheet" type="text/css" href="<? echo $this->webroot ?>/cryptomedic<? echo $version; ?>/application.css" />
	<link id='cssdebug' rel="stylesheet" type="text/css" href="/jehon<? echo $version; ?>/css/debug.css" />
	
	<script type="text/javascript" src="/jehon<? echo $version; ?>/js/modernizr.js"></script>
	<script type="text/javascript" src="/jehon<? echo $version; ?>/js/underscore.js"></script>
	<script type="text/javascript" src="/jehon<? echo $version; ?>/js/jquery.js"></script>
	<script type="text/javascript" src="/jehon<? echo $version; ?>/js/jquery-migrate.js"></script>
	<script type="text/javascript" src="/jehon<? echo $version; ?>/js/jquery.metadata.js"></script>
	<script type="text/javascript" src="/jehon<? echo $version; ?>/js/jquery.ui.js"></script>
	<script type="text/javascript" src="/jehon<? echo $version; ?>/js/jquery.tablesorter.js"></script>
	<script type="text/javascript" src="/jehon<? echo $version; ?>/js/jquery.tablesorter.pager.js"></script>
	<script type="text/javascript" src="/jehon<? echo $version; ?>/js/jquery.tinysort.js"></script>
	<script type="text/javascript" src="/jehon<? echo $version; ?>/js/jquery.notify.js"></script>
	<script type="text/javascript" src="/jehon<? echo $version; ?>/js/dust.js"></script>
	<script type="text/javascript" src="/jehon<? echo $version; ?>/js/dust.helpers.js"></script>
	<script type="text/javascript" src="/jehon<? echo $version; ?>/js/path.js"></script>
	<script type="text/javascript" src="/jehon<? echo $version; ?>/js/base64.js"></script>
	
	<script type="text/javascript" src="/jehon<? echo $version; ?>/jehon.js"></script>
	<script type="text/javascript" src="/jehon<? echo $version; ?>/jehon.math.js"></script>
	<script type="text/javascript" src="/jehon<? echo $version; ?>/jehon.csv.js"></script>
	
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version; ?>/application.js"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version; ?>/js/amd_stats_datas.js"></script>
	
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/Bill.compiled"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/ClubFoot.compiled"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/NonricketConsult.compiled"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/OrthopedicDevice.compiled"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/Patient.compiled"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/Picture.compiled"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/RicketConsult.compiled"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/Surgery.compiled"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/SurgeryFollowup.compiled"></script>

	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/history.compiled"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/Bill.history.compiled"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/ClubFoot.history.compiled"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/NonricketConsult.history.compiled"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/OrthopedicDevice.history.compiled"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/Picture.history.compiled"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/RicketConsult.history.compiled"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/Surgery.history.compiled"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/SurgeryFollowup.history.compiled"></script>

	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/patient_summary.compiled"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/graphics.compiled"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/related_header.compiled"></script>
	
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/cryptomedic.structure.Bill.cached"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/cryptomedic.structure.ClubFoot.cached"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/cryptomedic.structure.NonricketConsult.cached"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/cryptomedic.structure.OrthopedicDevice.cached"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/cryptomedic.structure.Patient.cached"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/cryptomedic.structure.Picture.cached"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/cryptomedic.structure.RicketConsult.cached"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/cryptomedic.structure.Surgery.cached"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/cryptomedic.structure.SurgeryFollowup.cached"></script>

	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/cryptomedic.labels.cached"></script>
	<script type="text/javascript" src="<? echo $this->webroot ?>/cryptomedic<? echo $version ?>/dynamic/cryptomedic.prices.cached"></script>
	
	<script>
		/* 
		 * Initialisation scripts (all style of initialisation, before apearing of elements on the page
		 * 	
		 * This initialisation pass informations from server to script
		 */
		 	
		version='<? echo $version; ?>';
		jehon.settings.denied=<? echo json_encode($denied); ?>;
		
		ajax =<? echo json_encode($ajax); ?>;
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
    <? if (array_key_exists('id', $ajax)) { ?>
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
