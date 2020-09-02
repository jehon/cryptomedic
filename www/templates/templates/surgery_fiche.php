<?php
	t::setDefaultOption("baseExpression", "currentFile().");
?>
<div class='container-fluid'>
	<div class='row'>
    	<div ng-if='errors.dateInTheFuture'>
		    <div class='alert alert-danger' id='errorDateFuture'>Error: The date can not be in the future!</div>
    	</div>
  	</div>
	<div class='row'>
		<div class="col-md-6">
			<x-group-panel title='Surgical Report'>
				<?php (new t("Surgery.Date"))->tr2("Operation Date")->p(); ?>
				<?php (new t("Surgery.ReportDiagnostic"))->tr2()->p(); ?>
				<?php (new t("Surgery.ReportSurgeon"))->tr2()->p(); ?>
				<?php (new t("Surgery.ReportSideR"))->tr2()->p(); ?>
				<?php (new t("Surgery.ReportSideL"))->tr2()->p(); ?>
				<?php (new t("Surgery.report_procedure"))->tr2()->p(); ?>
			</x-group-panel>
			<x-group-panel title='Hospitalisation Follow-Up'>
				<?php (new t("Surgery.FollowUpComplication"))->tr2()->p(); ?>
			</x-group-panel>
		</div>
		<div class="col-md-6">
			<x-ff-patient-related></x-ff-patient-related>
			<x-ff-next-appointment></x-ff-next-appointment>
		</div>
	</div>
</div>
