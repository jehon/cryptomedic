<div>
	Hello. You are viewing this file, and why not...<br>
	But you are not supposed to.<br>
	Please click on this link: <a href='#read'>here</a>
</div>
<script>
	console.log("going to read (from details in patient.ctp)");
	if (window.location.hash == "")
		window.location.hash = "#read";
</script>
