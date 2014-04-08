<?php
if (!$this->request->query('month')) {
	?>
	Please select a month (yyyy-mm, ex: 2013-03):
	<form method='GET'>
		<input name="month" value='<? echo date('Y-m', time() - 29*25*60*60); ?>'>
		<input type='submit' value='submit'>
	</form>
	<?
	die("");
}
?>
Export it into: 
	<a href='/amd/reports/monthlyreport.csv?month=<?php echo $this->request->query('month'); ?>'>csv</a>
	<a href='/amd/reports/monthlyreport.csv?fr&month=<?php echo $this->request->query('month'); ?>'>csv (french)</a>
	<a href='/amd/reports/monthlyreport.xls?month=<?php echo $this->request->query('month'); ?>'>excel</a>
	<table class='colorize' style='width: 200px'>
<?php 
foreach($this->request->data as $v) {
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