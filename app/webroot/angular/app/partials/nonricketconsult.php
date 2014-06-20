<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<div class="col-sm-6">
	<div ng-include="'partials/consult-introduction.php'"></div>
	<br/>
	<fieldset>
		<legend><?php (new t("NonricketConsult-OrthopedicData"))->label()->p(); ?></legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<?php (new t("NonricketConsult.Side"))->tr()->p(); ?>
			<?php (new t("NonricketConsult.Jointsorbonesaffected"))->tr()->p(); ?>
			<?php (new t("NonricketConsult.Deformity"))->tr()->p(); ?>
			<?php (new t("NonricketConsult.Articulationmobility"))->tr()->p(); ?>
			<?php (new t("NonricketConsult.Musclestrength"))->tr()->p(); ?>
			<?php (new t("NonricketConsult.Pain"))->tr()->p(); ?>
			<?php (new t("NonricketConsult.Walk"))->tr()->p(); ?>
			<?php (new t("NonricketConsult.XRay"))->tr()->p(); ?>
		</table>
	</fieldset>
</div>
<div class="col-sm-6">
	<div ng-include="'partials/patient-related.php'"></div>
	<fieldset>
		<legend><?php (new t("NonricketConsult-Conclusion"))->label()->p(); ?></legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<?php (new t("NonricketConsult.Physiotherapy61"))->tr()->p(); ?>
			<?php (new t("NonricketConsult.Plaster62"))->tr()->p(); ?>
			<?php (new t("NonricketConsult.Orthopedicdevice65"))->tr()->p(); ?>
			<?php (new t("NonricketConsult.Surgery66"))->tr()->p(); ?>
			<?php (new t("NonricketConsult.Othertreatment68"))->tr()->p(); ?>
			<?php (new t("NonricketConsult.Comment"))->tr()->p(); ?>
			<?php (new t("NonricketConsult.Nextappointment"))->tr()->p(); ?>
		</table>
	</fieldset>		
</div>