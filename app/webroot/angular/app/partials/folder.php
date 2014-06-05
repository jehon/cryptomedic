<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<div class="col-md-2" class="btn-group btn-group-justified btn-group-vertical">
	<a ng-class="selected('summary')" href="#/patient/{{patientId}}/summary" class="btn btn-default" style="width: 100%">Summary</a>
	<a ng-class="selected('graphics')" href="#/patient/{{patientId}}/graphics" class="btn btn-default" style="width: 100%">Graphics</a>
	<span ng-repeat="f in folder.files">
		<a href="#/patient/{{patientId}}/{{$index}}" class="btn btn-default" style="width: 100%" ng-class="selected($index)">
			{{f.type}}<span ng-if="f.Date">[{{f.Date | date:'yyyy-MM-dd' }}]</span>
		</a>
	</span>
	<a ng-if="hasPermission('all.debug')" ng-class="selected('export')" href="#/patient/{{patientId}}/export" class="btn btn-default debug" style="width: 100%">Export</a>
</div>
<div class="col-md-10">
	<div ng-if="patient()" ng-controller="ctrl_patient">
        Get a complete report:
        	<a target="_new" href="/amd/patients/view/<?php rawValue("Patient.id"); ?>.csv" >csv</a>&nbsp
        	<a target="_new" href="/amd/patients/view/<?php rawValue("Patient.id"); ?>.csv?fr=1" >french-csv</a>&nbsp
    		<a target="_new" href="/amd/patients/view/<?php rawValue("Patient.id"); ?>.xls" >xls</a>&nbsp
	</div>
	<div ng-if="pageIsFile">
		Id: {{currentFile().id}} #
		Type: {{currentFile().type}} #
		Modified on: {{currentFile().modified}} #
		By: {{currentFile().lastuser}}
	</div>
	<span ng-controller="ctrl_file">
		<span ng-include="'partials/' + name() + '.php'">
			debug: Content {{page}}
		</span>
	</span>
</div>
