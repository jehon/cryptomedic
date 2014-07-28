<?php 
	require_once(__DIR__ . "/../php/templates.php"); 
	t::setDefaultOption("baseExpression", "currentFile().");
?>
<div class="col-lg-6">
	<FieldSet>
		<Legend><?php label("OrthopedicDevice-GeneralData"); ?></Legend>
		<table>
			<col width='30%' /><col width='*' /> 
			<?php (new t("OrthopedicDevice.Orthoname"))->tr()->p(); ?>
			<?php (new t("OrthopedicDevice.Goal"))->tr()->p(); ?>
			<?php (new t("OrthopedicDevice.UsingProposal"))->tr()->p(); ?>
			<?php (new t("OrthopedicDevice.TypeOfMaterial"))->tr()->p(); ?>
		</table>
	</FieldSet>
	<FieldSet>
		<Legend><?php label("OrthopedicDevice-Prescription"); ?></Legend>
		<table>
			<col width='30%' /><col width='*' /><col width='*' /> 
            <tr>
                <td></td>
				<td><?php label("Left"); ?></td>
				<td><?php label("Right"); ?></td>
            </tr>
            <tr>
                <td><?php label("OrthopedicDevice-Hip"); ?></td>
                <td></td>
                <td></td>
            </tr>
			<?php (new t("OrthopedicDevice.?HipJoint"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.?HipType"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.?HipROM"))->trLeftRight()->p(); ?>
            <tr>
                <td><?php label("OrthopedicDevice-Knee"); ?></td>
                <td></td>
                <td></td>
            </tr>
			<?php (new t("OrthopedicDevice.?KneeJoint"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.?KneeLock"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.?KneeType"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.?KneeROM"))->trLeftRight()->p(); ?>
            <tr>
                <td><?php label("OrthopedicDevice-Ankle"); ?></td>
                <td></td>
                <td></td>
            </tr>
			<?php (new t("OrthopedicDevice.?AnkleJoint"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.?AnkleType"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.?AnkleROM"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.?AnkleLimited"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.?AnkleBelt"))->trLeftRight()->p(); ?>
            <tr>
                <td><?php label("OrthopedicDevice-Foot"); ?></td>
                <td></td>
                <td></td>
            </tr>
			<?php (new t("OrthopedicDevice.?FootSupinatorPronator"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.?FootArchSupportCompensation"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.OtherTypeOfDevice"))->tr()->p(); ?>
		</table>
	</FieldSet>
	<FieldSet>
		<Legend><?php label("OrthopedicDevice-Measure"); ?></Legend>
		<table>
			<col width='30%' /><col width='*' /> 
			<?php (new t("OrthopedicDevice.MeasureDate"))->tr()->p(); ?>
			<?php (new t("OrthopedicDevice.MeasurePerson"))->tr()->p(); ?>
			<?php (new t("OrthopedicDevice.MeasureComments"))->tr()->p(); ?>
		</table>
	</FieldSet>
	<FieldSet>
		<Legend><?php label("OrthopedicDevice-Fitting"); ?></Legend>
		<table>
			<col width='30%' /><col width='*' /> 
			<?php (new t("OrthopedicDevice.FittingDate"))->tr()->p(); ?>
			<?php (new t("OrthopedicDevice.FittingPerson"))->tr()->p(); ?>
			<?php (new t("OrthopedicDevice.FittingComments"))->tr()->p(); ?>
		</table>
	</FieldSet>
	<FieldSet>
		<Legend><?php label("OrthopedicDevice-Delivery"); ?></Legend>
		<table>
			<col width='30%' /><col width='*' /> 
			<?php (new t("OrthopedicDevice.DeliveryDate"))->tr()->p(); ?>
			<?php (new t("OrthopedicDevice.DeliveryPerson"))->tr()->p(); ?>
			<?php (new t("OrthopedicDevice.DeliveryComments"))->tr()->p(); ?>
		</table>
	</FieldSet>
</div>
<div class="col-lg-6">
	<div ng-include="'partials/patient-related.php'"></div>
</div>