<?php
	t::setDefaultOption("baseExpression", "folder.getSubFile(\$index).");
	t::setDefaultOption("readOnly");
?>
<table style='width: 100%'>
	<colgroup span="2" width="50%"></colgroup>
	<tbody>
        <tr>
        	<td><img width='50px' ng-src="/api/v1.0/picture/{{folder.getSubFile($index).id}}"></td>
			<td><?php (new t("Picture.comment"))->read()->p(); ?></td>
		</tr>
	</tbody>
</table>
