<br>
<div style='text-align: center'>
	<div>
		What do you want to do?
	</div>
	<? if ($patient > 0) { ?>
		<? if ($type > "") { ?>
			<div>
				View the file: 
				<a class='textbutton' href="/amd/patients/view/<? echo $patient ?><? echo $mode; ?>/<? echo $type ?>-<? echo $related ?>/read">
					<img src="/amd/cryptomedic/img/<? echo $type; ?>.gif" alt="Related" />
					<? echo $type; ?>
				</a>
			</div>
		<? } ?>
		<div>
			View the patient: 
			<a class='textbutton' href="/amd/patients/view/<? echo $patient ?>#history">
				<img src="/amd/cryptomedic/img/Patient.gif" alt="Patient" />
				Patient
			</a>
		</div>
	<? } ?>
	<div>
		Go back home: 
		<a class='textbutton' href="/amd/"><img src="/amd/cryptomedic/img/home.gif" alt="Home" />Home</a><br>
	</div>
</div>
