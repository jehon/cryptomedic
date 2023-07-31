<?php
t::setDefaultOption("baseExpression", "currentFile().");
?>
<div ng-if="!currentFile().file" class="not-mode-read alert alert-success" role="alert">
	The uploading of the file is changed. Now, please select the file to upload at the first step.<br>
	The picture will be reduced automatically (to enhance upload speed), and you will see the result below.<br>
	Then you can save the file to the server with the "create/save" button.<br>
</div>
<div ng-if='errors.dateInTheFuture'>
	<div class='alert alert-danger' id='errorDateFuture'>Error: The date can not be in the future!</div>
</div>
<x-two-columns>
	<div>
		<x-group-panel title='Picture informations'>
			<?php (new t("Picture.date"))->tr2()->p(); ?>
			<?php (new t("Picture.type"))->tr2()->p(); ?>
			<?php (new t("Picture.comments"))->tr2()->p(); ?>
			<?php (new t("Picture.file"))->readOnly()->tr2("File")->p(); ?>
			<x-fff-field class='not-mode-read' label='Upload a file' ng-if="!currentFile().file" ng-class="{ error: errors.pictureRequired }">
				<x-restricted slot='label' restricted-by='folder.edit'>
					Upload a file
				</x-restricted>
			</x-fff-field>
			<x-fff-field class='not-mode-read' ng-if="!currentFile().file" ng-class="{ error: errors.pictureRequired }">
				<div>
					<x-restricted restricted-by='folder.edit'>
						Upload a file
						<x-input-picture name='fileContent'></x-input-picture>
						<img src='/static/img/smartphone.svg' style='width: 50px'>
						If you are currently on smartphone, clicking on the button above ("browse" or "choose file") should allow you to take a photo with your camera, and to upload it immediately.
					</x-restricted>
					<x-restricted restricted-by='folder.edit'>
						<div ng-if='errors.pictureRequired'>
							<div class='jserror'>Error: you need to add the picture before saving the file.</div>
						</div>
					</x-restricted>
				</div>
			</x-fff-field>
		</x-group-panel>
	</div>
	<div>
		<x-ff-patient-related></x-ff-patient-related>
		<x-ff-next-appointment></x-ff-next-appointment>
	</div>
</x-two-columns>
<div ng-if="currentFile().file">
	<img id='img_file' style="width:100%; max-width: 600px" ng-src="{{currentFile().getPictureUrl()}}" alt="Sorry, image not found on the server.">
</div>