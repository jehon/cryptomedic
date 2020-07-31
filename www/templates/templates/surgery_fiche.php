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
				<table>
					<?php (new t("Surgery.Date"))->tr("Operation Date")->p(); ?>
					<?php (new t("Surgery.ReportDiagnostic"))->tr()->p(); ?>
					<?php (new t("Surgery.ReportSurgeon"))->tr()->p(); ?>
					<?php (new t("Surgery.ReportSideR"))->tr()->p(); ?>
					<?php (new t("Surgery.ReportSideL"))->tr()->p(); ?>
					<?php (new t("Surgery.report_procedure"))->tr()->p(); ?>
				</table>
			</x-group-panel>
			<x-group-panel title='Hospitalisation Follow-Up'>
				<table>
					<?php (new t("Surgery.FollowUpComplication"))->tr()->p(); ?>
				</table>
			</x-group-panel>
		</div>
		<div class="col-md-6">
			<x-ff-patient-related></x-ff-patient-related>
			<x-ff-next-appointment></x-ff-next-appointment>
		</div>
	</div>
</div>
