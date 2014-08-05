<?php 
	require_once(dirname(dirname(dirname(__DIR__))) . "/libs/php/templates.php");
	t::setDefaultOption("baseExpression", "currentFile().");
	//t::setDefaultOption("readOnly");
?>
<fieldset>
	<legend>General data</legend>
	<table>
		<?php (new t("NonricketConsult.Date"))->tr("Date")->p(); ?>
		<?php (new t("NonricketConsult.ExaminerName"))->tr("Examiner Name")->p(); ?>
		<?php (new t("NonricketConsult.Center"))->tr("Center")->p(); ?>
		<?php (new t("NonricketConsult.SchoolClass"))->tr("Center")->p(); ?>
		<tr class='notModeWrite'>
			<td>Age during consultation</td>
			<td><span catch-it ng-model="folder" tryit="currentFile().ageAtConsultTime()">{{result | number:0 }} years old at consultation time</span></td>
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
			<td class='tdright'><?php (new t("NonricketConsult.Weightkg"))->value()->p(); ?></td>
			<td class='notModeWrite'><span catch-it ng-model="folder" tryit="currentFile().ds_weight()">{{result | number:2 }} ds</span></td>
		</tr><tr ng-class='{ emptyValue: !currentFile().Heightcm}'>
			<td>Height (cm)</td>
			<td class='tdright'><?php (new t("NonricketConsult.Heightcm"))->value()->p(); ?></td>
			<td class='notModeWrite'><span catch-it ng-model="folder" tryit="currentFile().ds_height()">{{result | number:2 }} ds</span></td>
		</tr>
		<?php (new t("NonricketConsult.Brachialcircumferencecm"))->tr()->p(); ?>
		<tr ng-class='{ emptyValue: !currentFile().Heightcm || !currentFile().Weightkg}'
				class='notModeWrite'
				>
			<td>Weight/Height Ratio</td>
			<td class='tdright'><span catch-it ng-model="folder" tryit="currentFile().wh()">{{result | number:2 }}</span></td>
			<td class='notModeWrite'><span catch-it ng-model="folder" tryit="currentFile().ds_weight_height()">{{result | number:2 }} ds</span></td>
		</tr><tr ng-class='{ emptyValue: !currentFile().Heightcm || !currentFile().Weightkg}'
				class='notModeWrite'
				>
			<td>BMI</td>
			<td class='tdright'><span catch-it ng-model="folder" tryit="currentFile().bmi()">{{result | number:2 }}</span></td>
			<td class='notModeWrite'><span catch-it ng-model="folder" tryit="currentFile().ds_bmi()">{{result | number:2 }} ds</span></td>
		</tr>
	</table>
</fieldset>

<!-- TODO: examiner name = list -->