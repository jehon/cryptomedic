<?php require_once(__DIR__ . "/../php/templates.php"); ?>

<a href='/amd/patients/view/{{folder.getPatient().id}}.json'>live copy</a><br>

<textarea cols=150 rows=15>{{getCachedForExport(folder.getPatient().id)}}</textarea>
