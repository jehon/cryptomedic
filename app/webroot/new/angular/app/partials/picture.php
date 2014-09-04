<?php 
	require_once(__DIR__ . "/../../../../../../../rest/php/templates.php");
	t::setDefaultOption("baseExpression", "currentFile().");
?>
<span ng-controller="ctrl_picture">
	<div class="row">
		<div class="col-lg-6">
			<FieldSet>
				<Legend>Picture informations</label></Legend>
				<table>
					<?php (new t("Picture.Date"))->tr()->p(); ?>
					<?php (new t("Picture.comment"))->tr()->p(); ?>
					<?php (new t("Picture.OriginalName"))->readOnly()->tr("Original name")->p(); ?>
					<?php (new t("Picture.file"))->readOnly()->tr("File")->p(); ?>
		 		</table>
			</FieldSet>
		</div>
		<div class="col-lg-6">
			<div ng-include="'partials/patient-related.php'"></div>
		</div>
	</div>
	<div style='text-align: center' >
		<div ng-if="currentFile().file">
			<img width='80%' ng-src="/uploadedPictures/{{currentFile().file}}">
		</div>
		<div class='notModeWrite text-center' ng-if="!currentFile().file && hasPermission('folder.edit')">
			You didn't upload a file yet. Please do so!<br>
			<iframe ng-src="{{getURLUploadIFrame()}}" width='100%' height='300px'></iframe>
		</div>
	</div>
</span>