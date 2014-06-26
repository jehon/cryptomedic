<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<div class='searchFields'>
	<Fieldset>
		<Legend><?php label("Search for"); ?>...</Legend>
		<table class='colorize'>
			<?php (new t("Patient.entryyear"))->writeOnly()->tr([ "forceAllowNull" => true ])->p(); ?>
			<?php (new t("Patient.entryorder"))->writeOnly()->tr([ "forceAllowNull" => true ])->p(); ?>
			<?php (new t("Patient.Firstname"))->writeOnly()->tr([ "forceAllowNull" => true ])->p(); ?>
			<?php (new t("Patient.Lastname"))->writeOnly()->tr([ "forceAllowNull" => true ])->p(); ?>
			<?php (new t("Patient.Yearofbirth"))->writeOnly()->tr([ "forceAllowNull" => true ])->p(); ?>
			<?php (new t("Patient.Fathersname"))->writeOnly()->tr([ "forceAllowNull" => true ])->p(); ?>
			<?php (new t("Patient.Telephone"))->writeOnly()->tr([ "forceAllowNull" => true ])->p(); ?>
			<?php (new t("Patient.pathology_Ricket"))->writeOnly()->tr()->p(); ?>
			<?php (new t("Patient.pathology_Clubfoot"))->writeOnly()->tr()->p(); ?>
			<?php (new t("Patient.pathology_Burn"))->writeOnly()->tr()->p(); ?>
			<?php (new t("Patient.pathology_Polio"))->writeOnly()->tr()->p(); ?>
			<?php (new t("Patient.pathology_CP"))->writeOnly()->tr()->p(); ?>
			<?php (new t("Patient.pathology_Congenital"))->writeOnly()->tr()->p(); ?>
			<?php (new t("Patient.pathology_Adult"))->writeOnly()->tr()->p(); ?>
			<?php (new t("Patient.pathology_other"))->writeOnly()->tr()->p(); ?>
		</Table>
	</Fieldset>
</div>


	<!-- ---------------------------------------------- Search results --------------------------------- -->
	<div id='searchResults'>
	<?php 
	    if (isset($data) && is_array($data) && (count($data) > 0)) {
	            ?>
	            <div style='text-align: center; color: red'>Only the first 100 results are shown</div>
	            <table class='colorize tablesorter' pagesize="10">
	            	<thead>
	            		<tr>
	            			<th></th>
							<th>Entry Year</th>
							<th>Entry Order</th>
							<th>Firstname</th>
							<th>Lastname</th>
							<th>Sex</th>
							<th>Yearofbirth</th>
							<th>Fathersname</th>
						</tr>
	            	</thead>
		            <?
		                foreach($data as $zeroitem) {
		                    foreach($zeroitem as $mmodel => $item) {
		                        if ('Patient' != $mmodel)
		                            continue;
		                       	?>
									<tr>
										<td><a href="/amd/patients/view/<? echo $item['id']; ?>#read" class="textbutton">
											<img src="/amd/cryptomedic/img/go.gif" />
											View
										</a></td>
										<td><?php echo $item['entryyear']; ?></td>
										<td><?php echo $item['entryorder']; ?></td>
										<td><?php echo $item['Firstname']; ?></td>
										<td><?php echo $item['Lastname']; ?></td>
										<td><?php echo cryptomedicValue2Label('Patient', 'Sex', $item['Sex']); ?>
										<td><?php echo $item['Yearofbirth']; ?></td>
										<td><?php echo $item['Fathersname']; ?></td>
									</tr>
								<?
		                    }
						}
					?>
					</tbody>
				</table>
				<?
	    } else {
	        echo "No Result Found";
	    }
	?> 
	</div>
</form>