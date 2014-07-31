<?php 
	require_once(dirname(dirname(dirname(__DIR__))) . "/libs/php/templates.php");
	t::setDefaultOption("baseExpression", "params.");
	t::setDefaultOption("forceAllowNull");
	t::setDefaultOption("writeOnly");
?>
<div class='searchFields'>
	<h1>Search fields</h1>
	<div class="row">
		<div class="col-lg-6">
			<table>
				<?php (new t("Patient.entryyear"))->tr("Entry Year")->p(); ?>
				<?php (new t("Patient.entryorder"))->tr("Entry Order")->p(); ?>
				<?php (new t("Patient.Firstname"))->tr()->p(); ?>
				<?php (new t("Patient.Lastname"))->tr()->p(); ?>
				<?php (new t("Patient.Sex"))->tr()->p(); ?>
				<?php (new t("Patient.Yearofbirth"))->tr("Year of birth")->p(); ?>
				<?php (new t("Patient.Telephone"))->tr()->p(); ?>
			</table>
		</div>
		<div class="col-lg-6">
			<table>
	 			<?php (new t("Patient.pathology_Ricket"))->tr()->p(); ?>
				<?php (new t("Patient.pathology_Clubfoot"))->tr()->p(); ?>
				<?php (new t("Patient.pathology_Burn"))->tr()->p(); ?>
				<?php (new t("Patient.pathology_Polio"))->tr()->p(); ?>
				<?php (new t("Patient.pathology_CP"))->tr()->p(); ?>
				<?php (new t("Patient.pathology_Congenital"))->tr()->p(); ?>
				<?php (new t("Patient.pathology_Adult"))->tr()->p(); ?>
				<?php //(new t("Patient.pathology_other"))->tr()->p(); ?>
	 		</Table>
		</div>
	</div>
	<span class="btn btn-primary" ng-click="submit()">Submit</span>
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
	    			<a ng-href='#/folder/{{patient.id}}/'>
	    				<img src='img/go.gif'>
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
	    	</tr>
		</table>
    </div>
</div>
