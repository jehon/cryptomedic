<?php ?><div>
	<div ng-if="result.list.length == 0">No results</div>
	<div ng-if="result.list.length > 0">
		<table class='table table-hover table-bordered tablesorter' pagesize="10">
			<thead>
				<tr>
					<th>Type</th>
					<th>Center</th>
					<th>Patient</th>
					<th>Name</th>
					<th>Phone</th>
					<th>Appointment from Date</th>
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat="c in result.list">
					<td>{{c.c_type}}</td>
					<td>{{c.c_Center}}</td>
					<td>{{c.entryyear}}-{{c.entryorder}}</td>
					<td>{{c.Firstname}} {{c.Lastname}}</td>
					<td>{{c.Telephone}}</td>
					<td>{{c.c_Date | date }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>