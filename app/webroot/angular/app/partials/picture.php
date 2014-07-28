<?php 
	require_once(dirname(dirname(dirname(__DIR__))) . "/new/libs/php/templates.php");
	t::setDefaultOption("baseExpression", "currentFile().");
?>
<div class="col-lg-6">
	<FieldSet>
		<Legend><? label("Picture-header"); ?></label></Legend>
		<table>
			<?php (new t("Picture.OriginalName"))->readOnly()->tr()->p(); ?>
			<?php (new t("Picture.file"))->readOnly()->tr()->p(); ?>
			<?php (new t("Picture.Date"))->tr()->p(); ?>
			<?php (new t("Picture.comment"))->tr()->p(); ?>
<!-- 			<tr mode='notModeWrite' ng-hide="currentFile().file">
				<td><?php label("Picture.file"); ?>
					<br>
					(max size: <span>{{cryptomedic.settings.maxUploadSizeMb}}</span>Mb)
				</td>
            	<td><input type="file" name="data[filecontent]" id="PictureFilecontent" /></td>
			</tr>
 -->
 		</table>
	</FieldSet>
</div>
<div class="col-lg-6">
	<div ng-include="'partials/patient-related.php'"></div>
</div>
<div style='text-align: center' ng-if="currentFile().file">
	<img width='80%' ng-src="/uploadedPictures/{{currentFile().file}}">
</div>
