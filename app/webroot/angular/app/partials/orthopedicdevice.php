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
				<td><?php label("Left");?></td>
				<td><?php label("Right");?></td>
            </tr>
            <tr>
                <td><label for="OrthopedicDevice-Hip" name="OrthopedicDevice-Hip">OrthopedicDevice-Hip</label></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
				<td><label for="OrthopedicDevice-HipJoint" name="OrthopedicDevice-HipJoint">OrthopedicDevice-HipJoint</label></td>
				<td><?php value("OrthopedicDevice.LeftHipJoint"); ?></td>
				<td><?php value("OrthopedicDevice.RightHipJoint"); ?></td>
            </tr>
            <tr>
				<td><label for="OrthopedicDevice-HipType" name="OrthopedicDevice-HipType">OrthopedicDevice-HipType</label></td>
				<td><?php value("OrthopedicDevice.LeftHipType"); ?></td>
				<td><?php value("OrthopedicDevice.RightHipType"); ?></td>
            </tr>
            <tr>
				<td><label for="OrthopedicDevice-HipROM" name="OrthopedicDevice-HipROM">OrthopedicDevice-HipROM</label></td>
				<td><?php value("OrthopedicDevice.LeftHipROM"); ?></td>
				<td><?php value("OrthopedicDevice.RightHipROM"); ?></td>
            </tr>
            <tr>
                <td><label for="OrthopedicDevice-Knee" name="OrthopedicDevice-Knee">OrthopedicDevice-Knee</label></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
				<td><label for="OrthopedicDevice-KneeJoint" name="OrthopedicDevice-KneeJoint">OrthopedicDevice-KneeJoint</label></td>
				<td><?php value("OrthopedicDevice.LeftKneeJoint"); ?></td>
				<td><?php value("OrthopedicDevice.RightKneeJoint"); ?></td>
            </tr>
            <tr>
				<td><label for="OrthopedicDevice-KneeLock" name="OrthopedicDevice-KneeLock">OrthopedicDevice-KneeLock</label></td>
				<td><?php value("OrthopedicDevice.LeftKneeLock"); ?></td>
				<td><?php value("OrthopedicDevice.RightKneeLock"); ?></td>
            </tr>
            <tr>
				<td><label for="OrthopedicDevice-KneeType" name="OrthopedicDevice-KneeType">OrthopedicDevice-KneeType</label></td>
				<td><?php value("OrthopedicDevice.LeftKneeType"); ?></td>
				<td><?php value("OrthopedicDevice.RightKneeType"); ?></td>
            </tr>
            <tr>
				<td><label for="OrthopedicDevice-KneeROM" name="OrthopedicDevice-KneeROM">OrthopedicDevice-KneeROM</label></td>
				<td><?php value("OrthopedicDevice.LeftKneeROM"); ?></td>
				<td><?php value("OrthopedicDevice.RightKneeROM"); ?></td>
            </tr>
            <tr>
                <td><label for="OrthopedicDevice-Ankle" name="OrthopedicDevice-Ankle">OrthopedicDevice-Ankle</label></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
				<td><label for="OrthopedicDevice-AnkleJoint" name="OrthopedicDevice-AnkleJoint">OrthopedicDevice-AnkleJoint</label></td>
				<td><?php value("OrthopedicDevice.LeftAnkleJoint"); ?></td>
				<td><?php value("OrthopedicDevice.RightAnkleJoint"); ?></td>
            </tr>
            <tr>
				<td><label for="OrthopedicDevice-AnkleType" name="OrthopedicDevice-AnkleType">OrthopedicDevice-AnkleType</label></td>
				<td><?php value("OrthopedicDevice.LeftAnkleType"); ?></td>
				<td><?php value("OrthopedicDevice.RightAnkleType"); ?></td>
            </tr>
            <tr>
				<td><label for="OrthopedicDevice-AnkleROM" name="OrthopedicDevice-AnkleROM">OrthopedicDevice-AnkleROM</label></td>
				<td><?php value("OrthopedicDevice.LeftAnkleROM"); ?></td>
				<td><?php value("OrthopedicDevice.RightAnkleROM"); ?></td>
            </tr>
            <tr>
				<td><label for="OrthopedicDevice-AnkleLimited" name="OrthopedicDevice-AnkleLimited">OrthopedicDevice-AnkleLimited</label></td>
				<td><?php value("OrthopedicDevice.LeftAnkleLimited"); ?></td>
				<td><?php value("OrthopedicDevice.RightAnkleLimited"); ?></td>
            </tr>
            <tr>
				<td><label for="OrthopedicDevice-AnkleBelt" name="OrthopedicDevice-AnkleBelt">OrthopedicDevice-AnkleBelt</label></td>
				<td><?php value("OrthopedicDevice.LeftAnkleBelt"); ?></td>
				<td><?php value("OrthopedicDevice.RightAnkleBelt"); ?></td>
            </tr>
            <tr>
                <td><label for="OrthopedicDevice-Foot" name="OrthopedicDevice-Foot">OrthopedicDevice-Foot</label></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
				<td><label for="OrthopedicDevice-FootSupinatorPronator" name="OrthopedicDevice-FootSupinatorPronator">OrthopedicDevice-FootSupinatorPronator</label></td>
				<td><?php value("OrthopedicDevice.LeftFootSupinatorPronator"); ?></td>
				<td><?php value("OrthopedicDevice.RightFootSupinatorPronator"); ?></td>
            </tr>
            <tr>
				<td><label for="OrthopedicDevice-FootArchSupportCompensation" name="OrthopedicDevice-FootArchSupportCompensation">OrthopedicDevice-FootArchSupportCompensation</label></td>
				<td><?php value("OrthopedicDevice.LeftFootArchSupportCompensation"); ?></td>
				<td><?php value("OrthopedicDevice.RightFootArchSupportCompensation"); ?></td>
            </tr>
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