<?php 
	t::setDefaultOption("baseExpression", "currentFile().");
?>
<table class='summary table table-striped'>
	<thead>
		<th></th>
		<th>Element</th>
		<th>Date</th>
		<th>Details</th>
	</thead>
	<tr ng-controller="ctrl_file">
		<td></td>
		<td>
			<a href="#/folder/{{id()}}/" class="btn btn-default" style="width: 100%">
				Patient
			</a>
		</td>
		<td></td>
		<td ng-include="'/rest/templates/patient-summary.html'"></td>
	</tr>
	<tr ng-repeat="f in folder.getSubFiles()" ng-controller="ctrl_file">
		<td>#{{$index + 1}}</td>
		<td>
			<a href="#/folder/{{id()}}/{{$index}}" class="btn btn-default" style="width: 100%">
				{{f._type}}<span ng-if="f.Date">[{{ f.Date }}]</span>
			</a>
		</td>
		<td>{{f.Date | date:'longDate' }}</td>
		<td><span ng-include="'/rest/templates/'+f._type.toLowerCase()+'-summary.html'"></span></td>
	</tr>
</span>