<form id="generalForm" enctype="multipart/form-data" method="post" action="<? echo $this->here ?>" accept-charset="utf-8">
	<div id='headerContainer' class='headerContainer'></div>
	<input type="hidden" name="_method" value="PUT" />
	<input type="hidden" name="data[id]" value="<? echo $kdm->getValue('RicketConsult.id'); ?>" />
	<input type="hidden" name="data[patient_id]" value="<? echo $kdm->getValue('RicketConsult.patient_id'); ?>" />
	<input type="hidden" name="data[type]" value="RicketConsult" />
	<table>
		<col width='50%' /><col width='*' /> 
		<tr>
			<td>
				<fieldset>
					<legend><label for="RicketConsult-GeneralData" name="RicketConsult-GeneralData">General Data</label></legend>
					<table class='colorize'>
						<col width='30%' /><col width='*' /> 
						<tr>
							<td><label for="RicketConsultDate" name="RicketConsult.Date">Date</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.Date'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultExaminerName" name="RicketConsult.ExaminerName">Examiner Name</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.ExaminerName'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultCenter" name="RicketConsult.Center">RicketConsult.Center</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.Center'); ?></td>
						</tr><tr modes='read'>
								<td><label for="Patient-Age" name="Patient-Age">Age</label></td>
								<td><span id='stats_base_age'></span></td>
						</tr>
						<tr>
							<td><label for="RicketConsultSchoolClass" name="RicketConsult.SchoolClass">School Class</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.SchoolClass'); ?></td>
						</tr>
					</table>
				</fieldset>
				<br>
				<fieldset>
					<legend><label for="RicketConsult-NutritionnalData" name="RicketConsult-NutritionnalData">Nutritionnal Data</label></legend>
						<table class='colorize'>
						<col width='30%' /><col width='*' style='text-align: right' /><col width='20%' /> 
						<tr>
							<td><label for="RicketConsultWeightkg" name="RicketConsult.Weightkg">Weight (kg)</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.Weightkg'); ?></td>
							<td><div id='stats_ds_weight'></div></td>
						</tr>
						<tr>
							<td><label for="RicketConsultHeightcm" name="RicketConsult.Heightcm">Heightcm (standing/lying) (cm)</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.Heightcm'); ?></td>
							<td><div id='stats_ds_height'></div></td>
						</tr>
						<tr>
							<td><label for="RicketConsultHeightcmLying" name="RicketConsult.HeightcmLying">Height was taken lying instead of standing</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.HeightcmLying'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultSittingheightcm" name="RicketConsult.Sittingheightcm">RicketConsult.Sittingheightcm</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.Sittingheightcm'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultBrachialcircumferencecm" name="RicketConsult.Brachialcircumferencecm">Brachial Circumference</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.Brachialcircumferencecm'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultWeightHeightRatio" name="RicketConsult.Weight_Height_Ratio">RicketConsult.Weight_Height_Ratio</label></td>
							<td class='tdright'><div id='stats_base_wh'></div></td>
							<td class='tdleft'><div id='stats_ds_wh'></div></td>
						</tr><tr>
							<td><label for="RicketConsultBmi" name="RicketConsult.bmi">BMI</label></td>
							<td><div id='stats_base_bmi'></div></td>
							<td><div id='stats_ds_bmi'></div></td>
						</tr><tr>
							<td><label for="RicketConsultUndernutrited" name="RicketConsult.Undernutrited">Undernutrited</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.Undernutrited'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultWorms" name="RicketConsult.Worms">Worms</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.Worms'); ?></td>
						</tr>				
					</table>
				</fieldset>
				<br>
				<fieldset>
					<legend><label for="RicketConsult-FoodData" name="RicketConsult-FoodData">Food Data</label></legend>
					<table class='colorize'>
						<col width='30%' /><col width='*' /> 
						<tr>
							<td><label for="RicketConsultRicewithchun" name="RicketConsult.Ricewithchun">Rice with chun</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.Ricewithchun'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultOnebowlvegetables" name="RicketConsult.Onebowlvegetables">One bowl vegetables</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.Onebowlvegetables'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultTwospoonsesamseedgrounded" name="RicketConsult.Twospoonsesamseedgrounded">Two spoon sesam seed grounded</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.Twospoonsesamseedgrounded'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultLittlefishbowl" name="RicketConsult.Littlefishbowl">Little fish (bowl - with bones)</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.Littlefishbowl'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultMilkglass" name="RicketConsult.Milkglass">Milk (glass)</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.Milkglass'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultIodisedsalt" name="RicketConsult.Iodisedsalt">Use iodised salt</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.Iodisedsalt'); ?></td>
						</tr>
					</table>
				</fieldset>
				<br>
				<fieldset>
					<legend><label for="RicketConsult-RicketsData" name="RicketConsult-RicketsData">Rickets Data</label></legend>
					<table class='colorize'>
						<col width='30%' /><col width='*' /> 
						<tr>
							<td><label for="RicketConsultAgeofbeginningofthedeformitiesyear" name="RicketConsult.Ageofbeginningofthedeformitiesyear">Age of beginning of the deformities (year)</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.Ageofbeginningofthedeformitiesyear'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultTreatmenttaken" name="RicketConsult.Treatmenttaken">Treatment taken</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.Treatmenttaken'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultWalkingDifficulties" name="RicketConsult.WalkingDifficulties">Walking difficulties (palisano)</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.WalkingDifficulties'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultPain" name="RicketConsult.Pain">Pain</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.Pain'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultWristenlargement" name="RicketConsult.Wristenlargement">Wrist enlargement</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.Wristenlargement'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultRibbeading" name="RicketConsult.Ribbeading">Rib beading</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.Ribbeading'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultBossingforehead" name="RicketConsult.Bossingforehead">Bossing forehead</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.Bossingforehead'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultCubitusvarus" name="RicketConsult.Cubitusvarus">Cubitus varus</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.Cubitusvarus'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultLegs" name="RicketConsult.Legs">RicketConsult.Legs</label></td>
							<td><label for="RicketConsultLeft" name="RicketConsult.Left">RicketConsult.Left</label></td>
							<td><label for="RicketConsultRight" name="RicketConsult.Right">RicketConsult.Right</label></td>
						</tr><tr>
							<td><label for="RicketConsultMeasure" name="RicketConsult.Measure">RicketConsult.Measure</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.Rightleg'); ?></td>
							<td><? echo $kdm->makeInput('RicketConsult.Leftleg'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultAngle" name="RicketConsult.Angle">RicketConsult.Angle</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.RightlegAngle'); ?> degrees</td>
							<td><? echo $kdm->makeInput('RicketConsult.LeftlegAngle'); ?> degrees</td>
						</tr><tr>
							<td><label for="RicketConsult-Cross" name="RicketConsult-Cross">Cross</label></td>
							<td></td>
							<td></td>
						</tr><tr>
							<td><label for="T" name="T">T</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.CrossLeftT'); ?></td>
							<td><? echo $kdm->makeInput('RicketConsult.CrossRightT'); ?></td>
						</tr><tr>
							<td><label for="F" name="F">F</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.CrossLeftF'); ?></td>
							<td><? echo $kdm->makeInput('RicketConsult.CrossRightF'); ?></td>
						</tr><tr>
							<td><label for="RicketConsult-Laxity" name="RicketConsult-Laxity">Laxity</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.LaxityLeft'); ?></td>
							<td><? echo $kdm->makeInput('RicketConsult.LaxityRight'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultIMICDistance" name="RicketConsult.IMICDistance">IM/IC Distance</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.IMICDistance'); ?></td>
						</tr><tr>
							<td><label for="RicketConsult-Patelladislocation" name="RicketConsult-Patelladislocation">RicketConsult-Patelladislocation</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.PatelladislocationLeft'); ?></td>
							<td><? echo $kdm->makeInput('RicketConsult.PatelladislocationRight'); ?></td>
						</tr><tr>
							<td><label for="RicketConsult-KneeMobility" name="RicketConsult-KneeMobility">Knee mobility</label></td>
							<td>E</td>
							<td><? echo $kdm->makeInput('RicketConsult.KneeMobilityE'); ?></td>
						</tr><tr>
							<td></td>
							<td>F</td>
							<td><? echo $kdm->makeInput('RicketConsult.KneeMobilityF'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultXRay" name="RicketConsult.XRay">RicketConsult.XRay</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.XRay'); ?></td>
						</tr>
					</table>
				</fieldset>
			</td>
			<td>
				<span id='belongsTo'><? echo $this->element("belongsTo"); ?></span>
				<br>
				<fieldset>
					<legend><label for="RicketConsult-Conclusion" name="RicketConsult-Conclusion">Conclusion</label></legend>
					<table class='colorize'>
						<col width='30%' /><col width='*' /> 
						<tr>
							<td><label for="RicketConsultNutritionaladvice" name="RicketConsult.Nutritionaladvice">Nutritional advice</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.Nutritionaladvice'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultNutrisupport" name="RicketConsult.Nutrisupport">Nutri support</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.Nutrisupport'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultMedical" name="RicketConsult.Medical">Medical</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.Medical'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultConclusionMedicalCalcium500" name="RicketConsult.conclusion_medical_calcium500">Calcium 500</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.conclusion_medical_calcium500'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultConclusionMedicalCalcium1000" name="RicketConsult.conclusion_medical_calcium1000">Calcium 1000</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.conclusion_medical_calcium1000'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultConclusionMedicalCodLiverOil" name="RicketConsult.conclusion_medical_codLiverOil">Cod Liver Oil</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.conclusion_medical_codLiverOil'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultConclusionMedicalVitaminD" name="RicketConsult.conclusion_medical_vitaminD">Vitamin D</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.conclusion_medical_vitaminD'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultConclusionMedicalOther" name="RicketConsult.conclusion_medical_other">Other</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.conclusion_medical_other'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultSurgery" name="RicketConsult.Surgery">Surgery</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.Surgery'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultBrace" name="RicketConsult.Brace">Orthopedic device</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.Brace'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultCommentary" name="RicketConsult.Commentary">Commentary</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.Commentary'); ?></td>
						</tr><tr>
							<td><label for="RicketConsultNextappointment" name="RicketConsult.Nextappointment">Next appointment</label></td>
							<td><? echo $kdm->makeInput('RicketConsult.Nextappointment'); ?></td>
						</tr>
					</table>
				</fieldset>
			</td>
		</tr>
	</table>
</form>