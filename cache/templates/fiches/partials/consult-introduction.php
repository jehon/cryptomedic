<?php ?><fieldset>
	<legend>General data</legend>
	<table>
		<?php (new t("Date"))->tr("Date")->p(); ?>
		<?php (new t("ExaminerName"))->tr("Examiner Name")->p(); ?>
		<?php (new t("Center"))->tr("Center")->p(); ?>
		<tr class='notModeWrite'>
			<td>Age during consultation</td>
			<td><span catch-it ng-model="folder" tryit="currentFile().ageAtConsultTime()">{{currentFile().ageAtConsultTime() | number:0 }} years old at consultation time</span></td>
		</tr>
	</table>
</fieldset>
<br/>
<fieldset>
	<legend>Nutritional Data</legend>
	<table>
		<thead>
			<tr>
				<th/><th/>
				<th class='notModeWrite'>Standard deviation (statistic)</th>
			</tr>
		</thead>
		<tr ng-class='{ emptyValue: !currentFile().Weightkg}'>
			<td>Weight (kg)</td>
			<td class='tdright'><?php (new t("Weightkg"))->value()->p(); ?></td>
			<td class='notModeWrite'><span catch-it ng-model="folder" tryit="currentFile().ds_weight()">{{currentFile().ds_weight() | number:2 }} ds</span></td>
		</tr><tr ng-class='{ emptyValue: !currentFile().Heightcm}'>
			<td>Height (cm)</td>
			<td class='tdright'><?php (new t("Heightcm"))->value()->p(); ?></td>
			<td class='notModeWrite'><span catch-it ng-model="folder" tryit="currentFile().ds_height()">{{currentFile().ds_height() | number:2 }} ds</span></td>
		</tr>
		<?php (new t("Brachialcircumferencecm"))->tr("Brachial circumference (cm)")->p(); ?>
		<tr ng-class='{ emptyValue: !currentFile().Heightcm || !currentFile().Weightkg}'
				class='notModeWrite'
				>
			<td>Weight/Height Ratio</td>
			<td class='tdright'><span catch-it ng-model="folder" tryit="currentFile().wh()">{{currentFile().wh() | number:2 }}</span></td>
			<td class='notModeWrite'><span catch-it ng-model="folder" tryit="currentFile().ds_weight_height()">{{currentFile().ds_weight_height() | number:2 }} ds</span></td>
		</tr><tr ng-class='{ emptyValue: !currentFile().Heightcm || !currentFile().Weightkg}'
				class='notModeWrite'
				>
			<td>BMI</td>
			<td class='tdright'><span catch-it ng-model="folder" tryit="currentFile().bmi()">{{currentFile().bmi() | number:2 }}</span></td>
			<td class='notModeWrite'><span catch-it ng-model="folder" tryit="currentFile().ds_bmi()">{{currentFile().ds_bmi() | number:2 }} ds</span></td>
		</tr>
	</table>
</fieldset>
<!-- TODOJH: examiner name = list -->