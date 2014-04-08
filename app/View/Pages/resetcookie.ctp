<?php
	setcookie ("CAKEPHP", "", time() - 3600, "/");
?>

Your cookie should have been resetted<br>
Go back to <a href="<?php echo $this->webroot; ?>/users/login">login page</a>.
