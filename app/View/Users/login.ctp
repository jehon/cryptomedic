<form id="generalForm" enctype="multipart/form-data" method="post" action="<? echo $this->request->here ?>" accept-charset="utf-8">
<div align=center id='nojavascript' class='error-message'>
	<br>
	You browser does not support javascript, or an error happend during page load.<br>
	This will cause problems in the rest of the application.<br>
	Please contact jeanhonlet@gmail.com to solve this problem<br><br>
	Access to the application is forbidden upto resolution of this problem<br>
	<br> 
</div>
<div align=center id='login' style='display: none'>
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
		You have problems to log in? Please try this link: <a href='?_resetcookie=1'>reset</a><br>
</div>
</form>
<script>
    jehon.ready(function() {
    	jQuery("#login").show();
    	jQuery("#nojavascript").hide();
    	jQuery('#browser').val("jquery ready work");
        jQuery('#browser').val(jehon.utils.browserDescription());
    });
</script>
