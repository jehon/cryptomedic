<?php ?><x-group-panel title='General Data'>
	<?php (new t("Date"))->tr2("Date")->p(); ?>
	<?php (new t("ExaminerName"))->tr2("Examiner Name")->p(); ?>
	<?php (new t("Center"))->tr2("Center")->p(); ?>
	<x-fff-field label='Age at consultation' not-write>
		<div id='ageAtConsultationTime'>
			<x-fff-age></x-fff-age> old at consultation time
		</div>
	</x-fff-field>
</x-group-panel>
<br />
<x-group-panel title='Nutritional Data'>
	<x-fff-field>
		<div></div>
		<div slot='stat' class='notModeWrite'>Standard deviation (statistic)</div>
	</x-fff-field>
	<x-fff-field field='Weightkg'>
		<div><?php (new t("Weightkg"))->value()->p(); ?></div>
		<x-fff-weight-sd slot='stat' class='notModeWrite'></x-fff-weight-sd>
	</x-fff-field>

	<x-fff-field field='Heightcm'>
		<div><?php (new t("Heightcm"))->value()->p(); ?></div>
		<x-fff-height-sd slot='stat' class='notModeWrite'></x-fff-height-sd>
	</x-fff-field>

	<?php (new t("Brachialcircumferencecm"))->tr2("Brachial circumference (cm)")->p(); ?>

	<x-fff-field class='notModeWrite' field='Heightcm' label='Weight/Height Ratio'>
		<x-fff-wh></x-fff-wh>
		<x-fff-wh-sd slot='stat'></x-fff-wh-sd>
	</x-fff-field>
	<x-fff-field label='BMI' field='Heightcm' class='notModeWrite'>
		<x-fff-bmi></x-fff-bmi>
		<x-fff-bmi-sd slot='stat'></x-fff-bmi-sd>
	</x-fff-field>
</x-group-panel>