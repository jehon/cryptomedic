<?php 
	require_once(__DIR__ . "/../php/templates.php"); 
	t::setDefaultOption("baseExpression", "getCurrentFile().");
?>
<span class="modeRead">
	<div class="col-sm-2" class="btn-group btn-group-justified btn-group-vertical">
		<a ng-class="{ 'btn-warning': page === 'summary'}" ng-href="#/folder/{{id()}}/summary" class="btn btn-default" style="width: 100%">Summary</a>
		<a ng-class="{ 'btn-warning': page === 'graphics'}" href="#/folder/{{id()}}/graphics" class="btn btn-default" style="width: 100%">Graphics</a>
		<a ng-class="{ 'btn-warning': page === ''}" href="#/folder/{{id()}}/" class="btn btn-default" style="width: 100%">Patient</a>
		<span ng-repeat="f in folder.getSubFiles()">
			<a href="#/folder/{{id()}}/{{$index}}" style="width: 100%" 
					class="btn btn-default"
					ng-class="{ 'btn-warning': page === $index }"
					>
				{{f._type}}<span ng-if="f.Date">[{{f.Date | date:'<?php echo $dateFormat; ?>'}}]</span> 
	<!-- 			| date:'yyyy-MM-dd' -->
			</a>
		</span>
	</div>
	<div class="col-sm-10">
		<div>
			<span ng-if="pageIsFile || (page == '')">
<!-- 				<span class="notModeWrite btn btn-default" ng-click="go('/folder/' + folder.id + '/' + page + '/edit')">Edit</span>
				<span class="notModeWrite btn btn-default">Delete</span>
				<span class="notModeRead btn btn-default" ng-click="actionSave()">Save</span>
				<span class="notModeRead btn btn-default" ng-click="actionCancel()">Cancel</span>
 -->			</span>
			<span ng-if="patient()" ng-controller="ctrl_patient">
		        Get a complete report:
		        	<a target="_new" href="/amd/patients/view/{{id()}}.csv" >csv</a>&nbsp
		        	<a target="_new" href="/amd/patients/view/{{id()}}.csv?fr=1" >french-csv</a>&nbsp
		    		<a target="_new" href="/amd/patients/view/{{id()}}.xls" >xls</a>&nbsp
			</span>
			Id: {{currentFile().id}} #
			Type: {{currentFile().type}} #
			Modified on: {{currentFile().modified | date:'yyyy-MM-dd HH:mm:ss' }} #
			By: {{currentFile().lastuser}} #
			Page: {{page}}
		</div>
		<span ng-controller="ctrl_file">
			<span ng-include="'partials/' + name() + '.php'">
				debug: Content {{page}}
			</span>
		</span>
	</div>
</span>