<?php

// require_once("../../libs/php/dbtable.php");
require_once(__DIR__ . "/../helpers/tableRoute.php");
require_once(__DIR__ . "/../../php/exceptions.php");

$users = new DBTable($config["database"], "users", $server, [DBTable::PRIVATE_COLUMNS => array("password")]);

// TODO: handle results
if (array_key_exists("id", $_POST)) {
	var_dump($_POST);
	if (array_key_exists("setPassword", $_POST) && $_POST["setPassword"] == "yes") {
		echo "Setting password";
	} else {
		echo "Saving user";
	}
	echo "<hr>";
}

if ($request->getParameter('id', false)) {
	if ($request->getParameter('id', false) == -1) {
		$u = array("id" => -1, "username" => "", "group" => "readonly", "notes" => "");
	} else {
		$u = $users->rowGet($request->getParameter('id', false));
	}
	var_dump($u);
	?>
		<form method='post' action='?'>
			<input type='hidden' name='_method' value='PUT'>
			<input type='hidden' name='id' value="<?php echo $u['id']; ?>">
			<table>
				<tr><td>Id</td><td><?php echo $u['id']; ?></td></tr>
				<?php
					if ($request->getParameter('password', false)) {
						?>
							<input type='hidden' name='setPassword' value="yes">
							<tr><td>Username</td><td><?php echo $u['username']?></td></tr>
							<tr><td>Password</td><td><input name='password'></td></tr>
						<?php
					} else {
						?>
							<tr><td>Username</td><td><input name='username' value="<?php echo $u['username']; ?>"></td></tr>
							<tr><td>Group</td><td>
								<select name='group'>
									<?php
										foreach(array("cdc", "readonly", "admin", "backup", "manager") as $g) {
											echo "<option ". ($u['group'] == $g ? "selected" : "") . ">$g</option>";
										}
									?>
								</select>
							</td></tr>
							<tr><td><a href="?id=<?php echo $u['id']; ?>&password=1">Change password</a></td></tr>
						<?php
					}
				?>
				</table>
			<button type='submit'>Submit</button>
		</form>
	<?php
}

?>
	<a href="?id=-1">Add a new one</a>
<?php

$list = $users->rowAll();
?>
	<table>
		<thead>
			<td>Id</td>
			<td>Username</td>
			<td>Group</td>
			<td>Created</td>
			<td>Modified</td>
			<td>Notes</td>
		</thead>
<?php

foreach($list as $u) {
	echo "<tr>";
	echo "<td><a href='?id=$u[id]'>$u[id]</a></td>";
	echo "<td>$u[username]</td>";
	echo "<td>$u[group]</td>";
	echo "<td>$u[created]</td>";
	echo "<td>$u[modified]</td>";
	// echo "<td>$u[notes]</td>";
	echo "</tr>";
}

?>
	</table>
<?php

throw new HttpAlreadyDone("Users route");
