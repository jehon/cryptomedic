<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<table width="100%">
	<colgroup span="2" width="50%"></colgroup>
	<tbody>
        <tr>
        	<td><img width='50px' ng-src="/uploadedPictures/{{currentFile().file}}"></td>
			<td><? (new t("Picture.comment"))->readOnly()->read()->p(); ?></td>
		</tr>
	</tbody>
</table>
