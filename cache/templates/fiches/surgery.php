<?php
  require_once(__DIR__ . "/../../t.php");

	t::setDefaultOption("baseExpression", "currentFile().");
?>
<div class='container-fluid'>
	<div class='row'>
		<div class="col-md-6">
			<fieldSet>
				<legend>Surgical Report</legend>
				<table>
					<?php (new t("Surgery.Date"))->tr("Operation Date")->p(); ?>
					<?php (new t("Surgery.ReportDiagnostic"))->tr()->p(); ?>
					<?php (new t("Surgery.ReportSurgeon"))->tr()->p(); ?>
					<?php (new t("Surgery.ReportSideR"))->tr()->p(); ?>
					<?php (new t("Surgery.ReportSideL"))->tr()->p(); ?>
					<?php (new t("Surgery.report_procedure"))->tr()->p(); ?>
				</table>
			</fieldSet>
			<fieldSet>
				<legend>Hospitalisation Follow-Up</legend>
				<table>
					<?php (new t("Surgery.FollowUpComplication"))->tr()->p(); ?>
				</table>
			</fieldSet>
		</div>
		<div class="col-md-6">
			<?php require("partials/patient-related.php"); ?>
		</div>
	</div>
</div>
