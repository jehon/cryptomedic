<form id="generalForm" enctype="multipart/form-data" method="post" action="<?php echo $this->request->here; ?>" accept-charset="utf-8">
<div align=center id='nojavascript'>
	<br/>
	Currently loading the page.<br/>
	If this message remain "too long", it could mean that you dont' have javascript enabled.<br/>
	Please contact jeanhonlet@gmail.com to solve this problem.<br/><br/>
	Access to the application is forbidden upto resolution of this problem.<br/>
	<br/>
</div>
<div align=center id='login' style='display: none'>
	<h1>New version available</h1>
	Do you know? A new version is available. Do you want to test it? Please follow this link:<br>
		<a href="/amd/new/angular/app/" class="textbutton">New version</a><br>
		Attention: This new version is "real": all modification that will be done there will be really done in the database.

	<h1 style='width: 25%; color: #94004A; padding: 10px'>Restricted access</h1>
	<table style='width: 30% !important; border: solid 1px; padding: 10px' >
		<col width='100px'>
		<col width='100px'>
		<tr><td><br></td></tr>
		<tr>
			<td>Login</td>
			<td><div class="input text"><input name="data[User][username]" type="text" maxlength="255" id="UserUsername" /></div>
		</tr>
		<tr>
			<td>Password</td>
			<td><div class="input password"><input type="password" name="data[User][password]" type="password" id="UserPassword" /></div>		
		</tr>
		<tr><td><br></td></tr>
	</table>
	<input type="hidden" name="data[browser]" id="browser" />
	<br>
		<div class="submit"><input type="submit" value="login" /></div><br>
		<br>
		You have problems to log in? Please try this link: <a href='<?php echo $this->request->webroot; ?>/pages/resetcookie'>reset</a><br>
</div>
</form>
<script>
    jQuery(function() {
    	jQuery("#nojavascript").hide();
    	jQuery("#login").show();
    	jQuery('#browser').val("jquery ready work");
        jQuery('#browser').val(jehon.utils.browserDescription());
    });
</script>
