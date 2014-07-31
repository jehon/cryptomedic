<?php 
	require_once(dirname(dirname(dirname(__DIR__))) . "/libs/php/templates.php");
	t::setDefaultOption("baseExpression", "currentFile().");
?>
<div class="col-lg-6">
	<FieldSet>
		<Legend>General Data</Legend>
		<table>
			<col width='30%' /><col width='*' /> 
			<?php (new t("OrthopedicDevice.Orthoname"))->tr()->p(); ?>
			<?php (new t("OrthopedicDevice.Goal"))->tr()->p(); ?>
			<?php (new t("OrthopedicDevice.UsingProposal"))->tr()->p(); ?>
			<?php (new t("OrthopedicDevice.TypeOfMaterial"))->tr()->p(); ?>
		</table>
	</FieldSet>
	<FieldSet>
		<Legend>Prescription</Legend>
		<table>
			<col width='30%' /><col width='*' /><col width='*' /> 
			<thead>
	            <th>
	                <td></td>
					<td>Left</td>
					<td>Right</td>
	            </th>
	        </thead>
            <tr>
                <td>Hip</td>
                <td></td>
                <td></td>
            </tr>
			<?php (new t("OrthopedicDevice.?HipJoint"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.?HipType"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.?HipROM"))->trLeftRight()->p(); ?>
            <tr>
                <td>Knee</td>
                <td></td>
                <td></td>
            </tr>
			<?php (new t("OrthopedicDevice.?KneeJoint"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.?KneeLock"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.?KneeType"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.?KneeROM"))->trLeftRight()->p(); ?>
            <tr>
                <td>Ankle</td>
                <td></td>
                <td></td>
            </tr>
			<?php (new t("OrthopedicDevice.?AnkleJoint"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.?AnkleType"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.?AnkleROM"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.?AnkleLimited"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.?AnkleBelt"))->trLeftRight()->p(); ?>
            <tr>
                <td>Foot</td>
                <td></td>
                <td></td>
            </tr>
			<?php (new t("OrthopedicDevice.?FootSupinatorPronator"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.?FootArchSupportCompensation"))->trLeftRight()->p(); ?>
			<?php (new t("OrthopedicDevice.OtherTypeOfDevice"))->tr()->p(); ?>
		</table>
	</FieldSet>
	<FieldSet>
		<Legend>Measure</Legend>
		<table>
			<col width='30%' /><col width='*' /> 
			<?php (new t("OrthopedicDevice.MeasureDate"))->tr()->p(); ?>
			<?php (new t("OrthopedicDevice.MeasurePerson"))->tr()->p(); ?>
			<?php (new t("OrthopedicDevice.MeasureComments"))->tr()->p(); ?>
		</table>
	</FieldSet>
	<FieldSet>
		<Legend>Fitting</Legend>
		<table>
			<col width='30%' /><col width='*' /> 
			<?php (new t("OrthopedicDevice.FittingDate"))->tr()->p(); ?>
			<?php (new t("OrthopedicDevice.FittingPerson"))->tr()->p(); ?>
			<?php (new t("OrthopedicDevice.FittingComments"))->tr()->p(); ?>
		</table>
	</FieldSet>
	<FieldSet>
		<Legend>Delivery</Legend>
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