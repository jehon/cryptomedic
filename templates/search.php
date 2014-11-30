<?php 
	t::setDefaultOption("baseExpression", "params.");
	t::setDefaultOption("forceAllowNull");
	t::setDefaultOption("writeOnly");
?>
<h1><img src='static/img/patientsSearch.gif'>Search for a patient</h1>
<div class='searchFields'>
	<div class="row">
		<div class="col-lg-6">
			<fieldset>
				<legend>Patient Criteria</legend>
				<table>
					<?php (new t("Patient.entryyear"))->tr("Entry Year")->p(); ?>
					<?php (new t("Patient.entryorder"))->tr("Entry Order")->p(); ?>
					<?php (new t("Patient.Lastname"))->tr("Firtname or Lastname")->p(); ?>
					<?php (new t("Patient.Sex"))->tr()->p(); ?>
					<?php (new t("Patient.Yearofbirth"))->tr("Year of birth")->p(); ?>
					<?php (new t("Patient.Telephone"))->tr()->p(); ?>
				</table>
			</fieldset>
		</div>
		<div class="col-lg-6">
			<fieldset>
				<legend>Pathology Criteria</legend>
				<table>
		 			<?php (new t("Patient.pathology_Ricket"))->tr("Ricket [R]")->p(); ?>
					<?php (new t("Patient.pathology_Clubfoot"))->tr("Club Foot [CF]")->p(); ?>
					<?php (new t("Patient.pathology_Burn"))->tr("Burn [B]")->p(); ?>
					<?php (new t("Patient.pathology_Polio"))->tr("Polio [P]")->p(); ?>
					<?php (new t("Patient.pathology_CP"))->tr("CP [CP]")->p(); ?>
					<?php (new t("Patient.pathology_Congenital"))->tr("Congenital [C]")->p(); ?>
					<?php (new t("Patient.pathology_Adult"))->tr("Adult [A]")->p(); ?>
					<?php //(new t("Patient.pathology_other"))->tr()->p(); ?>
		 		</table>
			</fieldset>
		</div>
	</div>
   	<p class="text-center">
		<span class="btn btn-primary" ng-click="submit()">Submit</span>
	</p>
</div>
<h1>Results</h1>
<? 
	t::setDefaultOption("baseExpression", "patient.");
	t::setDefaultOption("writeOnly", false);
	t::setDefaultOption("readOnly");
?>
<div>
	<div ng-if="listing.length == 0">No results</div>
	<div ng-if="listing.length > 0">
        <div style='text-align: center; color: red'>Only the first 100 results are shown</div>
	    <table class='table table-hover table-bordered tablesorter' pagesize="10">
	    	<thead>
	    		<tr>
	    			<th></th>
					<th>Entry Year - Entry order</th>
					<th>Firstname</th>
					<th>Lastname</th>
					<th>Sex</th>
					<th>Year of Birth</th>
					<th>Telephone</th>
					<th>Pathology</th>
				</tr>
	    	</thead>
	    	<tr ng-repeat="patient in listing" ng-click="go('#/folder/' + patient.id + '/')">
	    		<td>
	    		{{id}}
	    			<a ng-href='#/folder/{{patient.id}}/patient'>
	    				<img src='static/img/go.gif'>
	    			</a>
	    		</td>
	    		<td>
	    			<?php (new t("Patient.entryyear"))->read()->p(); ?>
	    			-
	    			<?php (new t("Patient.entryorder"))->read()->p(); ?>
	    		</td>
	    		<td><?php (new t("Patient.Firstname"))->read()->p(); ?></td>
	    		<td><?php (new t("Patient.Lastname"))->read()->p(); ?></td>
	    		<td><?php (new t("Patient.Sex"))->read()->p(); ?></td>
	    		<td><?php (new t("Patient.Yearofbirth"))->read()->p(); ?></td>
	    		<td><?php (new t("Patient.Telephone"))->read()->p(); ?></td>
	    		<td>
	    			<span ng-if="patient.pathology_Ricket">[R]</span>
	    			<span ng-if="patient.pathology_Clubfoot">[CF]</span>
	    			<span ng-if="patient.pathology_Burn">[B]</span>
	    			<span ng-if="patient.pathology_Polio">[P]</span>
	    			<span ng-if="patient.pathology_CP">[CP]</span>
	    			<span ng-if="patient.pathology_Congenital">[C]</span>
	    			<span ng-if="patient.pathology_Adult">[A]</span>
	    		</td>
	    	</tr>
		</table>
    </div>
</div>
