<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<div class="col-sm-6">
	<FieldSet>
		<Legend><label for="OrthopedicDevice-GeneralData" name="OrthopedicDevice-GeneralData">OrthopedicDevice-GeneralData</label></Legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<?php (new t("OrthopedicDevice.Orthoname"))->tr()->p(); ?>
			<?php (new t("OrthopedicDevice.Goal"))->tr()->p(); ?>
			<?php (new t("OrthopedicDevice.UsingProposal"))->tr()->p(); ?>
			<?php (new t("OrthopedicDevice.TypeOfMaterial"))->tr()->p(); ?>
		</table>
	</FieldSet>
	<FieldSet>
		<Legend><label for="OrthopedicDevice-Prescription" name="OrthopedicDevice-Prescription">OrthopedicDevice-Prescription</label></Legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /><col width='*' /> 
            <tr>
                <td></td>
				<td><?php (new t("Left"))->label()->p(); ?></td>
				<td><?php (new t("Right"))->label()->p(); ?></td>
            </tr>
            <tr>
                <td><label for="OrthopedicDevice-Hip" name="OrthopedicDevice-Hip">OrthopedicDevice-Hip</label></td>
                <td></td>
                <td></td>
            </tr>
			<?php (new t("OrthopedicDevice.?HipJoint"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.?HipType"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.?HipROM"))->trLeftRight()->p(); ?>
            <tr>
                <td><label for="OrthopedicDevice-Knee" name="OrthopedicDevice-Knee">OrthopedicDevice-Knee</label></td>
                <td></td>
                <td></td>
            </tr>
			<?php (new t("OrthopedicDevice.?KneeJoint"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.?KneeLock"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.?KneeType"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.?KneeROM"))->trLeftRight()->p(); ?>
            <tr>
                <td><label for="OrthopedicDevice-Ankle" name="OrthopedicDevice-Ankle">OrthopedicDevice-Ankle</label></td>
                <td></td>
                <td></td>
            </tr>
			<?php (new t("OrthopedicDevice.?AnkleJoint"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.?AnkleType"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.?AnkleROM"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.?AnkleLimited"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.?AnkleBelt"))->trLeftRight()->p(); ?>
            <tr>
                <td><label for="OrthopedicDevice-Foot" name="OrthopedicDevice-Foot">OrthopedicDevice-Foot</label></td>
                <td></td>
                <td></td>
            </tr>
			<?php (new t("OrthopedicDevice.?FootSupinatorPronator"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.?FootArchSupportCompensation"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.OtherTypeOfDevice"))->tr()->p(); ?>
		</table>
	</FieldSet>
	<FieldSet>
		<Legend><label for="OrthopedicDevice-Measure" name="OrthopedicDevice-Measure">OrthopedicDevice-Measure</label></Legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<?php (new t("OrthopedicDevice.MeasureDate"))->tr()->p(); ?>
			<?php (new t("OrthopedicDevice.MeasurePerson"))->tr()->p(); ?>
			<?php (new t("OrthopedicDevice.MeasureComments"))->tr()->p(); ?>
		</table>
	</FieldSet>
	<FieldSet>
		<Legend><label for="OrthopedicDevice-Fitting" name="OrthopedicDevice-Fitting">OrthopedicDevice-Fitting</label></Legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<?php (new t("OrthopedicDevice.FittingDate"))->tr()->p(); ?>
			<?php (new t("OrthopedicDevice.FittingPerson"))->tr()->p(); ?>
			<?php (new t("OrthopedicDevice.FittingComments"))->tr()->p(); ?>
		</table>
	</FieldSet>
	<FieldSet>
		<Legend><label for="OrthopedicDevice-Delivery" name="OrthopedicDevice-Delivery">OrthopedicDevice-Delivery</label></Legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<?php (new t("OrthopedicDevice.DeliveryDate"))->tr()->p(); ?>
			<?php (new t("OrthopedicDevice.DeliveryPerson"))->tr()->p(); ?>
			<?php (new t("OrthopedicDevice.DeliveryComments"))->tr()->p(); ?>
		</table>
	</FieldSet>
</div>
<div class="col-sm-6">
	<div ng-include="'partials/patient-related.php'"></div>
</div>