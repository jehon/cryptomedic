<form id="generalForm" enctype="multipart/form-data" method="post" action="<? echo $this->here ?>" accept-charset="utf-8">
	<div id='headerContainer' class='headerContainer'></div>
	<input type="hidden" name="_method" value="PUT" />
	<input type="hidden" name="data[id]" value="<? echo $kdm->getValue('Picture.id'); ?>" />
	<input type="hidden" name="data[patient_id]" value="<? echo $kdm->getValue('Picture.patient_id'); ?>" />
	<input type="hidden" name="data[type]" value="Picture" />
	<Table width='100%'>
		<tr>
			<td>
				<FieldSet>
					<Legend><label for="Picture-header" name="Picture-header">Picture</label></Legend>
					<table class='colorize'>
						<tr>
							<td><label for="PictureOriginalName" name="Picture.OriginalName">Original Name</label></td>
							<td><? echo $kdm->makeView('Picture.OriginalName'); ?></td>
						<tr>
							<td><label name="Picture.File">File</label></td>
							<td><? echo $kdm->makeView('Picture.file'); ?></td>
						<tr>
							<td><label for="PictureDate" name="Picture.Date">Taken on (date)</label></td>
							<td><? echo $kdm->makeInput('Picture.Date'); ?></td>
						</tr><tr>
							<td><label for="PictureComment" name="Picture.comment">Comment</label></td>
							<td><? echo $kdm->makeInput('Picture.comment'); ?></td>
						</tr>
							<?
		                        if (!array_key_exists('file', $this->data['Picture'])) {
		                            ?>
		                            <tr>
										<td><label for="PictureFile" name="Picture.file">File</label><br>(max size: <span id='maxUploadSizeMb'></span>Mb)</td>
		                                <td><input type="file" name="data[filecontent]" id="PictureFilecontent" /></td>
		                            </tr>
	                        	<? }; 
	                        ?>
	                </table>
				</FieldSet>
			</td>
			<td>
				<span id='belongsTo'><? echo $this->element('belongsTo'); ?></span>
			</td>
		</tr>
	</Table>
	<div style='text-align: center'>
		<?php 
			if (array_key_exists('fileweb', $this->data['Picture']))
				echo "<img width='80%' src='" . $kdm->getValue("Picture.fileweb") . "'>";
	    ?>
	</div>
</form>