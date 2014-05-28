<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<div class="col-md-2" class="btn-group btn-group-justified btn-group-vertical">
	<a ng-class="selected('summary')" href="#/patient/{{patientId}}/summary" class="btn btn-default" style="width: 100%">Summary</a>
	<a ng-class="selected('graphics')" href="#/patient/{{patientId}}/graphics" class="btn btn-default" style="width: 100%">Graphics</a>
	<span ng-repeat="f in folder.files">
		<a href="#/patient/{{patientId}}/{{$index}}" class="btn btn-default" style="width: 100%" ng-class="selected($index)">
			{{f.type}} [{{f.Date}}]
		</a>
	</span>
	<a ng-if="hasPermission('all.debug')" ng-class="selected('export')" href="#/patient/{{patientId}}/export" class="btn btn-default debug" style="width: 100%">Export</a>
</div>
<div class="col-md-10">
	<div >
        Get a complete report:
        	<a target="_new" href="/amd/patients/view/<?php rawValue("Patient.id"); ?>.csv" >csv</a>&nbsp
        	<a target="_new" href="/amd/patients/view/<?php rawValue("Patient.id"); ?>.csv?fr=1" >french-csv</a>&nbsp
    		<a target="_new" href="/amd/patients/view/<?php rawValue("Patient.id"); ?>.xls" >xls</a>&nbsp
	</div>
	<div xng-if="isNumber(page)">
		Id: {{folder.files[page].id}} #
		Type: {{folder.files[page].type}} #
		Modified on: {{folder.files[page].modified}} #
		By: {{folder.files[page].lastuser}}
	</div>
	<span ng-include="'partials/' + name() + '.php'">
		debug: Content {{page}}
	</span>
</div>
