<?php ?><x-group-panel title='General Data'>
	<table>
		<?php (new t("Date"))->tr("Date")->p(); ?>
		<?php (new t("ExaminerName"))->tr("Examiner Name")->p(); ?>
		<?php (new t("Center"))->tr("Center")->p(); ?>
	</table>
	<x-fff-field label='Age at consultation' not-write>
		<div id='ageAtConsultationTime'><x-fff-age></x-fff-age> old at consultation time</div>
	</x-fff-field>
</x-group-panel>
<br/>
<x-group-panel title='Nutritional Data'>
	<table>
		<thead>
			<tr>
				<th></th>
				<th></th>
				<th class='notModeWrite'>Standard deviation (statistic)</th>
			</tr>
		</thead>
		<tr ng-class='{ emptyValue: !currentFile().Weightkg}'>
			<td>Weight (kg)</td>
			<td class='tdright'><?php (new t("Weightkg"))->value()->p(); ?></td>
			<td class='notModeWrite'><x-fff-weight-sd></x-fff-weight-sd></td>
		</tr><tr ng-class='{ emptyValue: !currentFile().Heightcm}'>
			<td>Height (cm)</td>
			<td class='tdright'><?php (new t("Heightcm"))->value()->p(); ?></td>
			<td class='notModeWrite'><x-fff-height-sd></x-fff-height-sd></td>
		</tr>
		<?php (new t("Brachialcircumferencecm"))->tr("Brachial circumference (cm)")->p(); ?>
		<tr ng-class='{ emptyValue: !currentFile().Heightcm || !currentFile().Weightkg}'
				class='notModeWrite'
				>
			<td>Weight/Height Ratio</td>
			<td class='tdright'>
				<x-fff-wh></x-fff-wh>
			</td>
			<td class='notModeWrite'><x-fff-wh-sd></x-fff-wh-sd></td>
		</tr><tr ng-class='{ emptyValue: !currentFile().Heightcm || !currentFile().Weightkg}'
				class='notModeWrite'
				>
			<td>BMI</td>
			<td class='tdright'>
				<x-fff-bmi></x-fff-bmi>
			</td>
			<td class='notModeWrite'><x-fff-bmi-sd></x-fff-bmi-sd></td>
		</tr>
	</table>
</x-group-panel>
