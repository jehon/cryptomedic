<?php
	t::setDefaultOption("baseExpression", "currentFile().");
?>
<div ng-if="!currentFile().file" class="notModeRead alert alert-success" role="alert">
	The uploading of the file is changed. Now, please select the file to upload at the first step.<br>
	The picture will be reduced automatically (to enhance upload speed), and you will see the result below.<br>
	Then you can save the file to the server with the "create/save" button.<br>
</div>
<div class='container-fluid'>
	<div class='row'>
		<div ng-if='errors.dateInTheFuture'>
		    <div class='alert alert-danger' id='errorDateFuture'>Error: The date can not be in the future!</div>
		</div>
	</div>
	<div class="row">
		<div class="col-md-6">
			<fieldset>
	 			<Legend>Picture informations</Legend>
				<table>
					<?php (new t("Picture.Date"))->tr()->p(); ?>
					<?php (new t("Picture.comment"))->tr()->p(); ?>
					<?php (new t("Picture.file"))->readOnly()->tr("File")->p(); ?>
					<tr class='notModeRead'
							ng-if="!currentFile().file"
							ng-class="{ error: errors.pictureRequired }"
						>
						<td>
                            <x-restricted value='folder.edit'>
                                Upload a file
                            </x-restricted>
						</td>
						<td>
	 						<x-restricted value='folder.edit'>
								<x-input-picture name='fileContent'></x-input-picture>
								<table>
									<tr>
										<td><img src='/static/img/smartphone.svg' style='width: 50px'></td>
										<td>If you are currently on smartphone, clicking on the button above ("browse" or "choose file") should allow you to take a photo with your camera, and to upload it immediately.</td>
									</tr>
								</table>
								<div ng-if='errors.pictureRequired'>
									<div class='jserror'>Error: you need to add the picture before saving the file.</div>
								</div>
                            </x-restricted>
	 					</td>
					</tr>
				</table>
			</fieldset>
		</div>
		<div class="col-md-6">
			<x-patient-related></x-patient-related>
		</div>
	</div>
	<div style='text-align: center' class="row">
		<div class="col-lg-offset-1 col-lg-10">
			<div ng-if="currentFile().file">
				<img id='img_file' style="width:100%; max-width: 600px" ng-src="{{currentFile().getPictureUrl()}}" alt="Sorry, image not found on the server." >
			</div>
		</div>
	</div>
</div>
