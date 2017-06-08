<?php
	t::setDefaultOption("baseExpression", "params.");
	t::setDefaultOption("forceAllowNull");
	t::setDefaultOption("writeOnly");
?>
<div>
	<h1><img src='/static/img/patientsSearch.gif'>Search for a patient</h1>
	<form id='searchForm'>
		<div class='searchFields'>
			<div class="row">
				<div class="col-md-3">
				</div>
				<div class="col-md-6">
					<fieldset>
						<legend>Patient Criteria</legend>
						<table>
							<?php (new t("Patient.entryyear"))->tr("Entry Year")->p(); ?>
							<?php (new t("Patient.entryorder"))->tr("Entry Order")->p(); ?>
							<?php (new t("Patient.Name"))->tr("Name")->p(); ?>
							<?php (new t("Patient.Sex"))->tr()->p(); ?>
							<?php (new t("Patient.Yearofbirth"))->tr("Year of birth")->p(); ?>
							<?php (new t("Patient.Telephone"))->tr()->p(); ?>
				 			<?php (new t("Patient.Pathology"))->tr("Main Pathology")->p(); ?>
						</table>
					</fieldset>
				</div>
			</div>
		   	<p class="text-center">
				<span id='button_submit' class="btn btn-primary" ng-click="submit()">Submit</span>
				<span id='button_reset' class="btn btn-warning" ng-click="reset()">Reset</span>
			</p>
		</div>
	</form>
	<h1>Results</h1>
	<?php
		t::setDefaultOption("baseExpression", "patient.");
		t::setDefaultOption("writeOnly", false);
		t::setDefaultOption("readOnly");
	?>
	<div>
		<div id='search_no_results' ng-if="listing.length == 0">No results</div>
		<div ng-if="listing.length > 0">
	        <div style='text-align: center; color: red'>Only the first 100 results are shown</div>
		    <table id='search_results' class='table table-hover table-bordered tablesorter' pagesize="10">
		    	<thead>
		    		<tr>
		    			<th></th>
						<th>Entry Year - Entry order</th>
						<th>Name</th>
						<th>Sex</th>
						<th>Year of Birth</th>
						<th>Telephone</th>
						<th>Pathology</th>
					</tr>
		    	</thead>
		    	<tr ng-repeat="patient in listing" ng-click="go('#/folder/' + patient.id + '/')">
		    		<td>
		    		{{id}}
		    			<a ng-href='#/folder/{{patient.id}}'>
		    				<img src='/static/img/go.gif'>
		    			</a>
		    		</td>
		    		<td>
		    			<?php (new t("Patient.entryyear"))->read()->p(); ?>-<?php (new t("Patient.entryorder"))->read()->p(); ?>
		    		</td>
		    		<td><?php (new t("Patient.Name"))->read()->p(); ?></td>
		    		<td><?php (new t("Patient.Sex"))->read()->p(); ?></td>
		    		<td><?php (new t("Patient.Yearofbirth"))->read()->p(); ?></td>
		    		<td><?php (new t("Patient.Telephone"))->read()->p(); ?></td>
		    		<td><?php (new t("Patient.Pathology"))->read()->p(); ?></td>
		    	</tr>
			</table>
	    </div>
	</div>
</div>