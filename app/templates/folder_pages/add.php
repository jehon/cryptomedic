<?php 
	require_once("../../../php/core.php");

	t::setDefaultOption("baseExpression", "currentFile().");
?>
<h1>Add a file</h1>
Here, you can add a new file to the patient: bill, consult, ...<br/>

<a ng-href="#/folder/{{id()}}/Bill/add" class="btn btn-default">
	Add a bill	
</a><br>
<a ng-href="#/folder/{{id()}}/RicketConsult/add" class="btn btn-default">
	Add a ricket consultation	
</a><br>
<a ng-href="#/folder/{{id()}}/ClubFoot/add" class="btn btn-default">
	Add a club foot consultation	
</a><br>
<a ng-href="#/folder/{{id()}}/NonricketConsult/add" class="btn btn-default">
	Add a non-ricket consultation	
</a><br>
<a ng-href="#/folder/{{id()}}/Picture/add" class="btn btn-default">
	Add a picture	
</a><br>
<a ng-href="#/folder/{{id()}}/Surgery/add" class="btn btn-default">
	Add a surgery	
</a><br>