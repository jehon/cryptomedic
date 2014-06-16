<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<table class='table table-striped'>
	<thead>
		<th></th>
		<th>Element</th>
		<th>Date</th>
		<th>Details</th>
	</thead>
	<tr ng-controller="ctrl_file">
		<td></td>
		<td>
			<a href="#/patient/{{id()}}/" class="btn btn-default" style="width: 100%">
				Patient
			</a>
		</td>
		<td></td>
		<td ng-include="'partials/patient-summary.php'"></td>
	</tr>
	<tr ng-repeat="f in folder.getSubFiles()" ng-controller="ctrl_file">
		<td>#{{$index + 1}}</td>
		<td>
			<a href="#/patient/{{id()}}/{{$index}}" class="btn btn-default" style="width: 100%">
				{{f.type}}<span ng-if="f.Date">[{{f.Date}}]</span>
			</a>
		</td>
		<td>{{f.Date}}</td>
		<td><span ng-include="'partials/'+f.type+'-summary.php'"></span></td>
	</tr>
</span>