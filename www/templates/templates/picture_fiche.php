<?php
	t::setDefaultOption("baseExpression", "currentFile().");
?>
<div ng-if="!currentFile().file" class="notModeRead alert alert-success" role="alert">
	The uploading of the file is changed. Now, please select the file to upload at the first step.<br>
	The picture will be reduced automatically (to enhance upload speed), and you will see the result below.<br>
	Then you can save the file to the server with the "create/save" button.<br>
</div>
<div class="row">
	<div class='row'>
    	<div ng-if='errors.dateInTheFuture'>
		    <div class='alert alert-danger' id='errorDateFuture'>Error: The date can not be in the future!</div>
    	</div>
  	</div>
	<div class="col-md-6">
		<FieldSet>
			<Legend>Picture informations</label></Legend>
			<table>
				<?php (new t("Picture.Date"))->tr()->p(); ?>
				<?php (new t("Picture.comment"))->tr()->p(); ?>
				<?php (new t("Picture.OriginalName"))->readOnly()->tr("Original name")->p(); ?>
				<?php (new t("Picture.file"))->readOnly()->tr("File")->p(); ?>
				<tr class='notModeRead'
						ng-if="!currentFile().file"
						ng-class="{ error: errors.pictureRequired }"
					>
					<td>
						<jh-authorized value='folder.edit'>
							Upload a file
						</jh-authorized>
					</td>
					<td>
						<input preview='preview' type="file" name="fileContent" id='file'>
						<div ng-if='errors.pictureRequired'>
							<div class='jserror'>Error: you need to add the picture before saving the file.</div>
						</div>
					</td>
				</tr>
			</table>
		</FieldSet>
	</div>
	<div class="col-md-6">
		<?php require(__DIR__ . "/../helpers/patient-related.php"); ?>
	</div>
</div>
<hr>
<div style='text-align: center' class="row">
	<div class="col-lg-offset-1 col-lg-10">
		<div ng-if="currentFile().file">
			<img id='img_file' style="width:100%; max-width: 600px" ng-src="{{currentFile().getPictureUrl()}}" alt="Sorry, image not found on the server." >
		</div>
		<div class='notModeRead text-center' ng-if="!currentFile().file">
			<jh-authorized value='folder.edit'>
				<canvas id='preview'></canvas>
			</jh-authorized>
		</div>
	</div>
</div>
