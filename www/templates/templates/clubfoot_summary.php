<?php
	t::setDefaultOption("baseExpression", "folder.getFilesRelatedToPatient(\$index).");
	t::setDefaultOption("readOnly");
?>
<table style='width: 100%'>
	<colgroup span="2" width="50%"></colgroup>
	<tbody>
		<?php (new t("ClubFoot.Treatment"))->tr()->p(); ?>
		<tr>
			<td>Pirani left</td>
			<td>{{currentFile().getPiraniLeft()}}</td>
		</tr>
		<tr>
			<td>Pirani right</td>
			<td>{{currentFile().getPiraniRight()}}</td>
		</tr>
		</tbody>
</table>
