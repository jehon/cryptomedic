<form id="generalForm" enctype="multipart/form-data" method="post" action="<? echo $this->here ?>" accept-charset="utf-8">
	<div id='headerContainer' class='headerContainer'></div>
	<input type="hidden" name="_method" value="PUT" />
	<input type="hidden" name="data[id]" value="<? echo $kdm->getValue('OrthopedicDevice.id'); ?>" />
	<input type="hidden" name="data[patient_id]" value="<? echo $kdm->getValue('OrthopedicDevice.patient_id'); ?>" />
	<input type="hidden" name="data[type]" value="OrthopedicDevice" />
	<Table width='100%'>
		<tr>
			<td>
				<FieldSet>
					<Legend><label for="OrthopedicDevice-GeneralData" name="OrthopedicDevice-GeneralData">OrthopedicDevice-GeneralData</label></Legend>
					<table class='colorize'>
						<col width='30%' /><col width='*' /> 
						<tr>
							<td><label for="OrthopedicDeviceOrthoname" name="OrthopedicDevice.Orthoname">Ortho name</label></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.Orthoname'); ?></td>
						</tr><tr>
							<td><label for="OrthopedicDeviceGoal" name="OrthopedicDevice.Goal">OrthopedicDevice.Goal</label></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.Goal'); ?></td>
						</tr><tr>
							<td><label for="OrthopedicDeviceUsingProposal" name="OrthopedicDevice.UsingProposal">OrthopedicDevice.UsingProposal</label></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.UsingProposal'); ?></td>
						</tr><tr>
							<td><label for="OrthopedicDeviceTypeOfMaterial" name="OrthopedicDevice.TypeOfMaterial">OrthopedicDevice.TypeOfMaterial</label></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.TypeOfMaterial'); ?></td>
						</tr>
					</table>
				</FieldSet>
				<FieldSet>
					<Legend><label for="OrthopedicDevice-Prescription" name="OrthopedicDevice-Prescription">OrthopedicDevice-Prescription</label></Legend>
					<table class='colorize'>
						<col width='30%' /><col width='*' /><col width='*' /> 
	                    <tr>
	                        <td></td>
							<td><label for="Left" name="Left">Left</label></td>
							<td><label for="Right" name="Right">Right</label></td>
	                    </tr>
	                    <tr>
	                        <td><label for="OrthopedicDevice-Hip" name="OrthopedicDevice-Hip">OrthopedicDevice-Hip</label></td>
	                        <td></td>
	                        <td></td>
	                    </tr>
	                    <tr>
							<td><label for="OrthopedicDevice-HipJoint" name="OrthopedicDevice-HipJoint">OrthopedicDevice-HipJoint</label></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.LeftHipJoint'); ?></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.RightHipJoint'); ?></td>
	                    </tr>
	                    <tr>
							<td><label for="OrthopedicDevice-HipType" name="OrthopedicDevice-HipType">OrthopedicDevice-HipType</label></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.LeftHipType'); ?></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.RightHipType'); ?></td>
	                    </tr>
	                    <tr>
							<td><label for="OrthopedicDevice-HipROM" name="OrthopedicDevice-HipROM">OrthopedicDevice-HipROM</label></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.LeftHipROM'); ?></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.RightHipROM'); ?></td>
	                    </tr>
	                    <tr>
	                        <td><label for="OrthopedicDevice-Knee" name="OrthopedicDevice-Knee">OrthopedicDevice-Knee</label></td>
	                        <td></td>
	                        <td></td>
	                    </tr>
	                    <tr>
							<td><label for="OrthopedicDevice-KneeJoint" name="OrthopedicDevice-KneeJoint">OrthopedicDevice-KneeJoint</label></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.LeftKneeJoint'); ?></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.RightKneeJoint'); ?></td>
	                    </tr>
	                    <tr>
							<td><label for="OrthopedicDevice-KneeLock" name="OrthopedicDevice-KneeLock">OrthopedicDevice-KneeLock</label></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.LeftKneeLock'); ?></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.RightKneeLock'); ?></td>
	                    </tr>
	                    <tr>
							<td><label for="OrthopedicDevice-KneeType" name="OrthopedicDevice-KneeType">OrthopedicDevice-KneeType</label></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.LeftKneeType'); ?></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.RightKneeType'); ?></td>
	                    </tr>
	                    <tr>
							<td><label for="OrthopedicDevice-KneeROM" name="OrthopedicDevice-KneeROM">OrthopedicDevice-KneeROM</label></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.LeftKneeROM'); ?></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.RightKneeROM'); ?></td>
	                    </tr>
	                    <tr>
	                        <td><label for="OrthopedicDevice-Ankle" name="OrthopedicDevice-Ankle">OrthopedicDevice-Ankle</label></td>
	                        <td></td>
	                        <td></td>
	                    </tr>
	                    <tr>
							<td><label for="OrthopedicDevice-AnkleJoint" name="OrthopedicDevice-AnkleJoint">OrthopedicDevice-AnkleJoint</label></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.LeftAnkleJoint'); ?></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.RightAnkleJoint'); ?></td>
	                    </tr>
	                    <tr>
							<td><label for="OrthopedicDevice-AnkleType" name="OrthopedicDevice-AnkleType">OrthopedicDevice-AnkleType</label></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.LeftAnkleType'); ?></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.RightAnkleType'); ?></td>
	                    </tr>
	                    <tr>
							<td><label for="OrthopedicDevice-AnkleROM" name="OrthopedicDevice-AnkleROM">OrthopedicDevice-AnkleROM</label></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.LeftAnkleROM'); ?></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.RightAnkleROM'); ?></td>
	                    </tr>
	                    <tr>
							<td><label for="OrthopedicDevice-AnkleLimited" name="OrthopedicDevice-AnkleLimited">OrthopedicDevice-AnkleLimited</label></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.LeftAnkleLimited'); ?></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.RightAnkleLimited'); ?></td>
	                    </tr>
	                    <tr>
							<td><label for="OrthopedicDevice-AnkleBelt" name="OrthopedicDevice-AnkleBelt">OrthopedicDevice-AnkleBelt</label></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.LeftAnkleBelt'); ?></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.RightAnkleBelt'); ?></td>
	                    </tr>
	                    <tr>
	                        <td><label for="OrthopedicDevice-Foot" name="OrthopedicDevice-Foot">OrthopedicDevice-Foot</label></td>
	                        <td></td>
	                        <td></td>
	                    </tr>
	                    <tr>
							<td><label for="OrthopedicDevice-FootSupinatorPronator" name="OrthopedicDevice-FootSupinatorPronator">OrthopedicDevice-FootSupinatorPronator</label></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.LeftFootSupinatorPronator'); ?></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.RightFootSupinatorPronator'); ?></td>
	                    </tr>
	                    <tr>
							<td><label for="OrthopedicDevice-FootArchSupportCompensation" name="OrthopedicDevice-FootArchSupportCompensation">OrthopedicDevice-FootArchSupportCompensation</label></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.LeftFootArchSupportCompensation'); ?></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.RightFootArchSupportCompensation'); ?></td>
	                    </tr>
	   					<tr>
							<td><label for="OrthopedicDeviceOtherTypeOfDevice" name="OrthopedicDevice.OtherTypeOfDevice">OrthopedicDevice.OtherTypeOfDevice</label></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.OtherTypeOfDevice'); ?></td>
						</tr>
					</table>
				</FieldSet>
				<FieldSet>
					<Legend><label for="OrthopedicDevice-Measure" name="OrthopedicDevice-Measure">OrthopedicDevice-Measure</label></Legend>
					<table class='colorize'>
						<col width='30%' /><col width='*' /> 
						<tr>
							<td><label for="OrthopedicDeviceMeasureDate" name="OrthopedicDevice.MeasureDate">OrthopedicDevice.MeasureDate</label></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.MeasureDate'); ?></td>
						</tr><tr>
							<td><label for="OrthopedicDeviceMeasurePerson" name="OrthopedicDevice.MeasurePerson">OrthopedicDevice.MeasurePerson</label></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.MeasurePerson'); ?></td>
						</tr><tr>
							<td><label for="OrthopedicDeviceMeasureComments" name="OrthopedicDevice.MeasureComments">OrthopedicDevice.MeasureComments</label></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.MeasureComments'); ?></td>
						</tr>
					</table>
				</FieldSet>
				<FieldSet>
					<Legend><label for="OrthopedicDevice-Fitting" name="OrthopedicDevice-Fitting">OrthopedicDevice-Fitting</label></Legend>
					<table class='colorize'>
						<col width='30%' /><col width='*' /> 
						<tr>
							<td><label for="OrthopedicDeviceFittingDate" name="OrthopedicDevice.FittingDate">OrthopedicDevice.FittingDate</label></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.FittingDate'); ?></td>
						</tr><tr>
							<td><label for="OrthopedicDeviceFittingPerson" name="OrthopedicDevice.FittingPerson">OrthopedicDevice.FittingPerson</label></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.FittingPerson'); ?></td>
						</tr><tr>
							<td><label for="OrthopedicDeviceFittingComments" name="OrthopedicDevice.FittingComments">OrthopedicDevice.FittingComments</label></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.FittingComments'); ?></td>
						</tr>
					</table>
				</FieldSet>
				<FieldSet>
					<Legend><label for="OrthopedicDevice-Delivery" name="OrthopedicDevice-Delivery">OrthopedicDevice-Delivery</label></Legend>
					<table class='colorize'>
						<col width='30%' /><col width='*' /> 
						<tr>
							<td><label for="OrthopedicDeviceDeliveryDate" name="OrthopedicDevice.DeliveryDate">OrthopedicDevice.DeliveryDate</label></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.DeliveryDate'); ?></td>
						</tr><tr>
							<td><label for="OrthopedicDeviceDeliveryPerson" name="OrthopedicDevice.DeliveryPerson">OrthopedicDevice.DeliveryPerson</label></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.DeliveryPerson'); ?></td>
						</tr><tr>
							<td><label for="OrthopedicDeviceDeliveryComments" name="OrthopedicDevice.DeliveryComments">OrthopedicDevice.DeliveryComments</label></td>
							<td><? echo $kdm->makeInput('OrthopedicDevice.DeliveryComments'); ?></td>
						</tr>
					</table>
				</FieldSet>
			</td>
			<td>
				<span id='belongsTo'><? echo $this->element("belongsTo"); ?></span>
			</td>
		</tr>
	</Table>
</form>