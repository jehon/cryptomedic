<?php
t::setDefaultOption("baseExpression", "currentFile().");
?>
<x-two-columns ng-controller='ctrl_file_appointment'>
	<x-group-panel title='Next appointment'>
		<x-fff-field variable label='Today' class='not-mode-read'>
			<div>{{today}}</div>
		</x-fff-field>
		<?php (new t("Appointment.purpose"))->tr2("Purpose")->p(); ?>
		<?php (new t("Appointment.next_appointment"))->tr2("Next Appointment")->p(); ?>
		<?php (new t("Appointment.next_center"))->tr2("Next Center")->p(); ?>
		<x-fff-field>
			<div>
				<x-button action='Alternate' ng-click='nextMonth(3)'>Plan in 3 months</x-button>
				<x-button action='Alternate' ng-click='nextMonth(6)'>Plan in 6 months</x-button>
			</div>
		</x-fff-field>
	</x-group-panel>
	<div>
		<x-ff-patient-related></x-ff-patient-related>
		<x-ff-next-appointment></x-ff-next-appointment>
		<div>
		</div>
	</div>
</x-two-columns>