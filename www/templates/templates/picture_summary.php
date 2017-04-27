<?php
	t::setDefaultOption("baseExpression", "folder.getFilesRelatedToPatient(\$index).");
	t::setDefaultOption("readOnly");
?>
<table style='width: 100%'>
	<colgroup span="2" width="50%"></colgroup>
	<tbody>
        <tr>
        	<td><img width='50px' ng-src="{{folder.getFilesRelatedToPatient($index).getThumbnailUrl()}}"></td>
			<td><?php (new t("Picture.comment"))->read()->p(); ?></td>
		</tr>
	</tbody>
</table>
