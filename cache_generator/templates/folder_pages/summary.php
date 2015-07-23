<table class='summary table table-striped'>
	<thead>
		<tr>
			<th></th>
			<th>Element</th>
			<th>Date</th>
			<th>Details</th>
		</tr>
	</thead>
	<tr ng-controller="ctrl_file">
		<td></td>
		<td>
			<a href="#/folder/{{id()}}/" class="btn btn-default" style="width: 100%">
				Patient
			</a>
		</td>
		<td></td>
		<td ng-include="cryptomedic.templateRoot + '/summary/patient-summary.php'"></td>
	</tr>
	<tr ng-repeat="f in folder.getSubFiles()" ng-controller="ctrl_file">
		<td>#{{$index}}</td>
		<td>
			<a href="#/folder/{{id()}}/{{$index}}" class="btn btn-default" style="width: 100%">
				{{f._type}}
			</a>
		</td>
		<td>{{f.Date | date:'longDate' }}</td>
		<td><span ng-include="cryptomedic.templateRoot + '/summary/'+f._type.toLowerCase()+'-summary.php'"></span></td>
	</tr>
</table>