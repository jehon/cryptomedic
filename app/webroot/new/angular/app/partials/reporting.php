<?php 
    require_once(dirname(dirname(dirname(__DIR__))) . "/libs/php/templates.php");
    t::setDefaultOption("baseExpression", "currentFile().");
    t::setDefaultOption("readOnly");
?>
<h1>Reporting for the patient</h1>
<div ng-if="patient()" ng-controller="ctrl_patient">
    Get a complete report: TODO
<!--
        <a target="_new" href="/amd/patients/view/{{id()}}.csv" >csv</a>&nbsp
        <a target="_new" href="/amd/patients/view/{{id()}}.csv?fr=1" >french-csv</a>&nbsp
        <a target="_new" href="/amd/patients/view/{{id()}}.xls" >xls</a>&nbsp
-->
</div>
