<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<div class="col-sm-6">
	<FieldSet>
		<Legend><label for="Picture-header" name="Picture-header">Picture</label></Legend>
		<table class='colorize'>
			<?php (new t("Picture.OriginalName"))->readOnly()->tr()->p(); ?>
			<?php (new t("Picture.file"))->readOnly()->tr()->p(); ?>
			<?php (new t("Picture.Date"))->tr()->p(); ?>
			<?php (new t("Picture.comment"))->tr()->p(); ?>
			<tr mode='notModeWrite' ng-hide="currentFile().file">
				<td><?php (new t("Picture.file"))->label()->p(); ?>
					<br>
					(max size: <span>{{cryptomedic.settings.maxUploadSizeMb}}</span>Mb)
				</td>
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
