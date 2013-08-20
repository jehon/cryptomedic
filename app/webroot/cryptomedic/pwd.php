<?php
if (isset($_REQUEST['pwd'])) {
	$salt='e1b8c2f8d60f476c86dbc55fdcef5a28';
	$pwd = sha1($salt . $_REQUEST['pwd']);
	echo $pwd;
} else
	echo "Set pwd!";
echo "<br>";
if (isset($_REQUEST['cmp'])) {
	echo $_REQUEST['cmp'];
	if ($_REQUEST['cmp'] == $pwd) echo " ok";
} else
	echo "cmp";
echo "<hr>";
?>
<form action=''>
  pwd: <input name="pwd" type="text" maxlength="30"/><br>
  cmp: <input name="cmp" type="text" maxlength="200"/><br>
  <input type="submit" /><br>
</form>
