<?php 
	t::setDefaultOption("baseExpression", "currentFile().");
	// Example: 71154
?>
<div class='container-fluid'>
	<div class='row'>
		<div class="col-lg-6">
			<div ng-include="'/rest/templates/consult-introduction.php'"></div>
			<br/>
			<fieldset>
				<legend>Orthopedic Data</legend>
				<table>
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
		<div class="col-lg-6">
			<div ng-include="'/rest/templates/patient-related.html'"></div>
			<fieldset>
				<legend>Conclusion</legend>
				<table>
					<?php //(new t("NonricketConsult.Physiotherapy61"))->tr()->p(); ?>
					<?php //(new t("NonricketConsult.Plaster62"))->tr()->p(); ?>
					<?php //(new t("NonricketConsult.Orthopedicdevice65"))->tr()->p(); ?>
					<?php (new t("NonricketConsult.Surgery66"))->tr()->p(); ?>
					<?php (new t("NonricketConsult.Othertreatment68"))->tr()->p(); ?>
					<?php //(new t("NonricketConsult.Comment"))->tr()->p(); ?>
					<?php (new t("NonricketConsult.Nextappointment"))->tr()->p(); ?>
					<?php (new t("NonricketConsult.NextCenter"))->tr()->p(); ?>
				</table>
			</fieldset>		
		</div>
	</div>
</div>