<?php
  require_once(__DIR__ . "/../../t.php");
?><table class='summary table table-striped'>
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
		<td ng-include="cryptomedic.templateRoot + '/summary/patient.html'"></td>
	</tr>
	<tr ng-repeat="f in folder.getSubFiles()">
		<td>#{{$index}}</td>
		<td>
			<a href="#/folder/{{patient_id}}/file/{{currentFile()._type}}/{{currentFile().id}}" class="btn btn-default" style="width: 100%">
				{{f._type}}
			</a>
		</td>
		<td>{{f.Date | date:'longDate' }}</td>
		<td><span ng-include="cryptomedic.templateRoot + '/summary/'+f._type.toLowerCase()+'.html'"></span></td>
	</tr>
</table>
