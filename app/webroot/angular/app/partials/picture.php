<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<div class="col-sm-6">
	<FieldSet>
		<Legend><label for="Picture-header" name="Picture-header">Picture</label></Legend>
		<table class='colorize'>
			<tr>
				<td><?php label("Picture.OriginalName");?></td>
				<td><?php read("Picture.OriginalName"); ?></td>
			<tr>
				<td><label name="Picture.File">File</label></td>
				<td><?php read("Picture.file"); ?></td>
			<tr>
				<td><?php label("Picture.Date");?></td>
				<td><?php value("Picture.Date"); ?></td>
			</tr><tr>
				<td><?php label("Picture.comment");?></td>
				<td><?php value("Picture.comment"); ?></td>
			</tr>
			<tr mode='edit' ng-hide="currentFile().file">
				<td><?php label("Picture.file");?><br>(max size: <span id='maxUploadSizeMb'></span>Mb)</td>
            	<td><input type="file" name="data[filecontent]" id="PictureFilecontent" /></td>
			</tr>
		</table>
	</FieldSet>
</div>
<div class="col-sm-6">
	<div ng-include="'partials/patient-related.php'"></div>
</div>
<div style='text-align: center' ng-if="currentFile().file">
	<img width='80%' ng-src="/uploadedPictures/{{currentFile().file}}">
</div>
