<?php ?><x-group-panel title='General Data'>
	<?php (new t("date"))->tr2("Date")->p(); ?>
	<?php (new t("examiner"))->tr2("Examiner Name")->p(); ?>
	<?php (new t("center"))->tr2("Center")->p(); ?>
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
		<div slot='stat' class='not-mode-write'>Standard deviation (statistic)</div>
	</x-fff-field>
	<x-fff-field field='weight_kg'>
		<div><?php (new t("weight_kg"))->value()->p(); ?></div>
		<x-fff-weight-sd slot='stat' class='not-mode-write'></x-fff-weight-sd>
	</x-fff-field>

	<x-fff-field field='height_cm'>
		<div><?php (new t("height_cm"))->value()->p(); ?></div>
		<x-fff-height-sd slot='stat' class='not-mode-write'></x-fff-height-sd>
	</x-fff-field>

	<?php (new t("brachial_circumference_cm"))->tr2("Brachial circumference (cm)")->p(); ?>

	<x-fff-field class='not-mode-write' field='height_cm' label='Weight/Height Ratio'>
		<x-fff-wh></x-fff-wh>
		<x-fff-wh-sd slot='stat'></x-fff-wh-sd>
	</x-fff-field>
	<x-fff-field label='BMI' field='height_cm' class='not-mode-write'>
		<x-fff-bmi></x-fff-bmi>
		<x-fff-bmi-sd slot='stat'></x-fff-bmi-sd>
	</x-fff-field>
</x-group-panel>