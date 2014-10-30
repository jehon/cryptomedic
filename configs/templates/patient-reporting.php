<?php 
    t::setDefaultOption("baseExpression", "currentFile().");
    t::setDefaultOption("readOnly");
?>
<h1>Reporting for the patient</h1>
<div ng-controller="ctrl_patient">
<br>
	Get the whole patient file as a<br>
    <ul>
    	<li><a target="_new" href="/rest/reports/patients/{{id()}}.csv" >csv</a></li>
        <li><a target="_new" href="/rest/reports/patients/{{id()}}.csvfr" >french-csv</a></li>
        <li><a target="_new" href="/rest/reports/patients/{{id()}}.xls" >excel file</a></li>
    </ul>
</div>
