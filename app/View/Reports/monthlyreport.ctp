<?php
if (!array_key_exists("month", $this->Html->request->query)) {
	?>
	Please select a month (yyyy-mm, ex: 2013-03):
	<form>
		<input name="month" value='<? echo date('Y-m', time() - 29*25*60*60); ?>'>
		<input type='submit' value='submit'>
	</form>
	<?
	die("");
}
?>
<table class='colorize' style='width: 200px'>
<?php 
foreach($data as $v) {
	echo "<tr>";
	if (count($v) == 1) {
		echo "<tr><td colspan=2 style='text-align: center'><h3>${v[0]}</h3></td></tr>\n";
	} elseif ((count($v) == 2) && ($v[0] === "")) {
		echo "<tr><td colspan=2 style='text-align: center'><h5>${v[1]}</h5></td></tr>\n";
	} else {
		foreach($v as $c) {
			echo "<td>$c</td>";
		}
	}
	echo "</tr>";
}
?>
</table>