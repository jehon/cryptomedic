<?php 
	require_once(__DIR__ . "/../../../../../../../rest/php/templates.php");
	t::setDefaultOption("baseExpression", "getcurrentFile().");
	t::setDefaultOption("readOnly");
?>
<table width="100%">
	<colgroup span="2" width="50%"></colgroup>
	<tbody>
        <tr>
        	<td><img width='50px' ng-src="/uploadedPictures/{{currentFile().file}}"></td>
			<td><? (new t("Picture.comment"))->read()->p(); ?></td>
		</tr>
	</tbody>
</table>
