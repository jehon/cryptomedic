<?php 
	require_once(dirname(dirname(dirname(__DIR__))) . "/new/libs/php/templates.php");
	t::setDefaultOption("baseExpression", "getCurrentFile().");
?>
<span class="modeRead">
	<div class="submenu .container-fluid">
		<div class="row">
			<div class="col-sm-4 text-left" style="font-size: x-small">
				Modified on {{currentFile().modified | date:'yyyy-MM-dd HH:mm:ss' }}
				by {{currentFile().lastuser}}
				<br>
				{{currentFile()._type}} / {{currentFile().id}} / {{page}}
			</div>
			<div class="col-sm-4" ng-if="patient()" ng-controller="ctrl_patient">
		        Get a complete report: TODO
	<!-- 	        	<a target="_new" href="/amd/patients/view/{{id()}}.csv" >csv</a>&nbsp
		        	<a target="_new" href="/amd/patients/view/{{id()}}.csv?fr=1" >french-csv</a>&nbsp
		    		<a target="_new" href="/amd/patients/view/{{id()}}.xls" >xls</a>&nbsp
	 -->		</div>
				<div class="col-sm-4 text-right" ng-if="pageIsFile || (page == '')" >
	 			<span class="notModeWrite btn btn-default" ng-click="go('/folder/' + folder.id + '/' + page + '/edit')">Edit</span>
	<!--
				<span class="notModeWrite btn btn-default">Delete</span>
				<span class="notModeRead btn btn-default" ng-click="actionSave()">Save</span>
	 -->
	 			<span class="notModeRead btn btn-default" ng-click="actionCancel()">Cancel</span>
			</div>
		</div>
	</div>

	<div class="col-sm-2" class="btn-group btn-group-justified btn-group-vertical">
		<a ng-class="{ 'btn-warning': page === 'summary'}" ng-href="#/folder/{{id()}}/summary" class="btn btn-default" style="width: 100%">Summary</a>
		<a ng-class="{ 'btn-warning': page === 'graphics'}" href="#/folder/{{id()}}/graphics" class="btn btn-default" style="width: 100%">Graphics</a>
		<a ng-class="{ 'btn-warning': page === ''}" href="#/folder/{{id()}}/" class="btn btn-default" style="width: 100%">Patient</a>
		<span ng-repeat="f in folder.getSubFiles()">
			<a href="#/folder/{{id()}}/{{$index}}" 
					class="btn btn-default left-menu-button"
					ng-class="{ 'btn-warning': page === $index }"
					>
				{{f._type}} <span ng-if="f.Date">[{{f.Date | date:'<?php echo $dateFormat; ?>'}}]</span> 
	<!-- 			| date:'yyyy-MM-dd' -->
			</a>
		</span>
	</div>
	<div class="col-sm-10">
		<span ng-controller="ctrl_file">
			<span ng-include="'partials/' + name() + '.php'">
				debug: Content {{page}}
			</span>
		</span>
	</div>
</span>