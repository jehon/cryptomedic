<?php 
	require_once(__DIR__ . "/../php/templates.php"); 
	t::setDefaultOption("baseExpression", "params.");
	t::setDefaultOption("forceAllowNull");
	t::setDefaultOption("writeOnly");
?>
<div class='searchFields'>
	<Fieldset>
		<Legend><?php label("Search for"); ?>...</Legend>
		<table class='colorize'>
			<?php (new t("Patient.entryyear"))->tr()->p(); ?>
			<?php (new t("Patient.entryorder"))->tr()->p(); ?>
			<?php (new t("Patient.Firstname"))->tr()->p(); ?>
			<?php (new t("Patient.Lastname"))->tr()->p(); ?>
			<?php (new t("Patient.Yearofbirth"))->tr()->p(); ?>
			<?php (new t("Patient.Fathersname"))->tr()->p(); ?>
			<?php (new t("Patient.Telephone"))->tr()->p(); ?>
			<?php (new t("Patient.pathology_Ricket"))->tr()->p(); ?>
			<?php (new t("Patient.pathology_Clubfoot"))->tr()->p(); ?>
			<?php (new t("Patient.pathology_Burn"))->tr()->p(); ?>
			<?php (new t("Patient.pathology_Polio"))->tr()->p(); ?>
			<?php (new t("Patient.pathology_CP"))->tr()->p(); ?>
			<?php (new t("Patient.pathology_Congenital"))->tr()->p(); ?>
			<?php (new t("Patient.pathology_Adult"))->tr()->p(); ?>
			<?php (new t("Patient.pathology_other"))->tr()->p(); ?>
		</Table>
	</Fieldset>
	<span class="btn btn-primary" ng-click="submit()">Submit</span>
</div>
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
					<th>Yearofbirth</th>
					<th>Fathersname</th>
				</tr>
	    	</thead>
	    	<tr ng-repeat="patient in listing" ng-click="go('#/folder/' + patient.id + '/')">
	    		<td>
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
	    		<td><?php (new t("Patient.Fathersname"))->read()->p(); ?></td>
	    	</tr>
		</table>
    </div>
</div>
