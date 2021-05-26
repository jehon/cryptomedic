<?php
t::setDefaultOption("baseExpression", "currentFile().");
?>
<div class='container-fluid' ng-controller='ctrl_file_appointment'>
	<div class='row'>
		<div class="col-md-6">
			<x-group-panel title='Next appointment'>
				<x-fff-field variable label='Today' class='notModeRead'>
					<div>{{today}}</div>
				</x-fff-field>
				<?php (new t("Appointment.Date"))->tr2("Entry date")->p(); ?>
				<?php (new t("Appointment.purpose"))->tr2("Purpose")->p(); ?>
				<?php (new t("Appointment.Nextappointment"))->tr2("Next Appointment")->p(); ?>
				<?php (new t("Appointment.NextCenter"))->tr2("Next Center")->p(); ?>
				<x-fff-field>
					<div>
						<x-button action='Alternate' ng-click='nextMonth(3)'>Plan in 3 months</x-button>
						<x-button action='Alternate' ng-click='nextMonth(6)'>Plan in 6 months</x-button>
					</div>
				</x-fff-field>
			</x-group-panel>
		</div>
		<div class="col-md-6">
			<x-ff-patient-related></x-ff-patient-related>
			<x-ff-next-appointment></x-ff-next-appointment>
		</div>
	</div>
</div>