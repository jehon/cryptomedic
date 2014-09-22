<?php 
    t::setDefaultOption("baseExpression", "currentFile().");
    t::setDefaultOption("readOnly");
?>
<h1>Reporting for the patient</h1>
<div ng-controller="ctrl_patient">
    Get a complete report: TODO


Reporting is not yet implemented. Please go back to the old application and generate your reporting there:<br>
<br>
<a href='/amd/patients/view/{{id()}}' target='_new'>Go to the old application</a>

<!--
        <a target="_new" href="/amd/patients/view/{{id()}}.csv" >csv</a>&nbsp
        <a target="_new" href="/amd/patients/view/{{id()}}.csv?fr=1" >french-csv</a>&nbsp
        <a target="_new" href="/amd/patients/view/{{id()}}.xls" >xls</a>&nbsp
-->
</div>
