<?php
t::setDefaultOption("baseExpression", "currentFile().");
?>
<div ng-if='errors.dateInTheFuture'>
	<div class='alert alert-danger' id='errorDateFuture'>Error: The date can not be in the future!</div>
</div>
<x-two-columns>
	<div>
		<x-group-panel title='Surgical Report'>
			<?php (new t("Surgery.Date"))->tr2("Operation Date")->p(); ?>
			<?php (new t("Surgery.report_diagnostic"))->tr2()->p(); ?>
			<?php (new t("Surgery.report_surgeon"))->tr2()->p(); ?>
			<?php (new t("Surgery.ReportSideR"))->tr2()->p(); ?>
			<?php (new t("Surgery.ReportSideL"))->tr2()->p(); ?>
			<?php (new t("Surgery.report_procedure"))->tr2()->p(); ?>
		</x-group-panel>
		<x-group-panel title='Hospitalisation Follow-Up'>
			<?php (new t("Surgery.follow_up_complication"))->tr2()->p(); ?>
		</x-group-panel>
	</div>
	<div>
		<x-ff-patient-related></x-ff-patient-related>
		<x-ff-next-appointment></x-ff-next-appointment>
	</div>
</x-two-columns>