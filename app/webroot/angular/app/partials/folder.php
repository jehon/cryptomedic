<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<div class="col-md-2" class="btn-group btn-group-justified btn-group-vertical">
	<a ng-class="{ 'btn-warning': page === 'summary'}" ng-href="#/folder/{{id()}}/summary" class="btn btn-default" style="width: 100%">Summary</a>
	<a ng-class="{ 'btn-warning': page === 'graphics'}" href="#/folder/{{id()}}/graphics" class="btn btn-default" style="width: 100%">Graphics</a>
	<a ng-class="{ 'btn-warning': page === ''}" href="#/folder/{{id()}}/" class="btn btn-default" style="width: 100%">Patient</a>
	<span ng-repeat="f in folder.getSubFiles()">
		<a href="#/folder/{{id()}}/{{$index}}" style="width: 100%" 
				class="btn btn-default"
				ng-class="{ 'btn-warning': page === $index }"
				>
			{{f.type}}<span ng-if="f.Date">[{{f.Date}}]</span> 
<!-- 			| date:'yyyy-MM-dd' -->
		</a>
	</span>
	<a ng-if="hasPermission('all.debug')" ng-class="selected('export')" href="#/folder/{{id()}}/export" class="btn btn-default debug" style="width: 100%">Export</a>
</div>
<div class="col-md-10">
	<div ng-if="patient()" ng-controller="ctrl_patient">
        Get a complete report:
        	<a target="_new" href="/amd/patients/view/{{id()}}.csv" >csv</a>&nbsp
        	<a target="_new" href="/amd/patients/view/{{id()}}.csv?fr=1" >french-csv</a>&nbsp
    		<a target="_new" href="/amd/patients/view/{{id()}}.xls" >xls</a>&nbsp
	</div>
	<div ng-if="pageIsFile">
		Id: {{currentFile().id}} #
		Type: {{currentFile().type}} #
		Modified on: {{currentFile().modified | date:'yyyy-MM-dd HH:mm:ss' }} #
		By: {{currentFile().lastuser}}
	</div>
	<span ng-controller="ctrl_file" class="modeRead">
		<span ng-include="'partials/' + name() + '.php'">
			debug: Content {{page}}
		</span>
	</span>
</div>