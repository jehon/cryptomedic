<table class='summary table table-striped'>
	<thead>
		<tr>
			<th></th>
			<th>Element</th>
			<th>Date</th>
			<th>Details</th>
		</tr>
	</thead>
	<tr>
		<td></td>
		<td>
			<a href="#/folder/{{id()}}/" class="btn btn-default" style="width: 100%">
				Patient
			</a>
		</td>
		<td></td>
		<td ng-include="template('patient', 'summary')"></td>
	</tr>
	<tr ng-repeat="f in folder.getFilesRelatedToPatient()">
		<td>#{{$index}}</td>
		<td>
			<a href="#/folder/{{folder.getId()}}/file/{{f.getModel()}}/{{f.id}}" class="btn btn-default" style="width: 100%">
				{{f.getModel()}}
			</a>
		</td>
		<td>{{f.Date | date:'longDate' }}</td>
		<td><span ng-include="template(f.getModel().toLowerCase(), 'summary')"></span></td>
	</tr>
</table>
