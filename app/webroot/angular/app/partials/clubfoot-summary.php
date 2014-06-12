<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<table width="100%">
	<colgroup span="2" width="50%"></colgroup>
	<tbody>
		<tr>
			<td><?php label("ClubFoot.DIMEGLIO");?></td>
			<td><?php read("ClubFoot.DIMEGLIO"); ?></td>
		</tr><tr>
			<td><?php label("ClubFoot.Treatment");?></td>
			<td><?php read("ClubFoot.Treatment"); ?></td>
		</tr>
	</tbody>
</table>
