<? 
	
?>
<div class="row">
	<div class='col-sm-offset-3 col-sm-6'>
		<h1 class='text-center'><img src='static/img/consultOfDay.gif'>Who has a consultation planned?</h1>
		<fieldset>
			<legend>Date of the consultation</legend>
			Here, you can receive the list of patients that you planned for that day.<br>
			How to plan a patient for a day? Use the "next meeting" case in the consultations files (ricket, clubfoot, non-ricket).<br>
			The center where we suppose the person will come is the center of their last visit.
			<label>Date you want to see the planned consultations</label>
	       	<input ng-model="day" type="date" class="form-control" placeholder="Day">

			<label>Center</label>
	       	<?php
	       		(new t("RicketConsult.Center"))->writeOnly()->tr()->p();
	       	?>
	       	<br>
	       	<p class="text-center">
				<span class="btn btn-primary" ng-click="submit()">Search</span>
	       	</p>
		</fieldset>
	</div>
</div>

<div ng-if="searched">
	<div ng-if="listing.length == 0">No results</div>
	<div ng-if="listing.length > 0">
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
				<tr ng-repeat="c in listing">
					<td>{{c.c_type}}</td>
					<td>{{link(c.c_Center)}}</td>
					<td>{{c.entryyear}}-{{c.entryorder}}</td>
					<td>{{c.Firstname}} {{c.Lastname}}</td>
					<td>{{c.Telephone}}</td>
					<td>{{c.c_Date | date }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>