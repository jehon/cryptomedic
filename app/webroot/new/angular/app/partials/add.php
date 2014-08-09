<?php 
	require_once(dirname(dirname(dirname(__DIR__))) . "/libs/php/templates.php");
	t::setDefaultOption("baseExpression", "currentFile().");
?>
<h1>Add a file</h1>
Here, you can add a new file to the patient: bill, consult, ...<br/>

<a ng-href="#/folder/{{id()}}/bill/add" class="btn btn-default">
	Add a bill	
</a><br>
<a ng-href="#/folder/{{id()}}/ricketconsult/add" class="btn btn-default">
	Add a ricket consultation	
</a><br>
<a ng-href="#/folder/{{id()}}/clubfoot/add" class="btn btn-default">
	Add a club foot consultation	
</a><br>
<a ng-href="#/folder/{{id()}}/nonricketconsult/add" class="btn btn-default">
	Add a non-ricket consultation	
</a><br>
<a ng-href="#/folder/{{id()}}/picture/add" class="btn btn-default">
	Add a picture	
</a><br>
<a ng-href="#/folder/{{id()}}/surgery/add" class="btn btn-default">
	Add a surgery	
</a><br>