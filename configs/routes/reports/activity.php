<?php

$now = new DateTime();
{
    $m = new DateTime($now->format("Y-M-1"));
    $m->modify('+1 month');
    global $dates;
    $dates = array();
    $dates[] = new DateTime($m->format('Y-m-d'));
    for($i=0; $i<12;$i++) {
        $m->modify("-1 month");
        $dates[] = new DateTime($m->format('Y-m-d'));
    }
}

$where = "";
if (array_key_exists('where', $_REQUEST)) {
    $where = $_REQUEST['where'];
}   

function get($sql, $field = null, $where = null) {
	if (is_null($where)) {
		$where = "";
		if (array_key_exists('where', $_REQUEST))
			$where = $_REQUEST['where'];
	}
	global $server;
	$arr = $server->getDatabase()->query($sql);
    $row = array_pop($arr);
	$res = $row;
	if ($field != null) {
		$res = $row[$field];
		if ($where != "") {
			$res = get($sql . " and ($where)", $field, "") . "/" . $res;
		}
	}
	return $res;
}

function between($i) {
	global $dates;
	$db = $dates[$i+1]->format('Y-m-d');
	$de = $dates[$i]->format('Y-m-d');
	return "BETWEEN '$db' AND '$de'";
}
?>
<table class="reporting">
    <thead>
        <tr>
            <th>Number of files</th>
            <th>This month</th>
            <?php for($i = 1; $i<count($dates) - 1;$i++) echo "<th>" . $dates[$i+1]->format('M-Y') ."</th>\n"; ?>
        </tr>
    </thead>
    <tbody>
        <?php foreach(References::$model2controller as $label => $t) { ?>
            <tr class="subheader">
                <td colspan="13"><?php echo $label; ?></td>
            </tr>
            <tr class="dark"><td>created</td>
                <?php 
                	for ($i = 0; $i<count($dates) - 1; $i++) 
                		echo "<td>" . get("SELECT COUNT($t.created) as c FROM $t WHERE (created " . between($i) . ")", "c") . "</td>\n"; 
                	?>
            </tr>
            <tr style="background-color: white"><td>modified</td>
                <?php 
                	for ($i = 0; $i<count($dates) - 1; $i++) 
                		echo "<td>" . get("SELECT COUNT($t.modified) as c FROM $t WHERE (created NOT " . between($i) . ")"
                				. " AND (modified " . between($i) . ")"
                				, "c") . "</td>\n"; 
                ?>
            </tr>
        <?php } ?>
        
        <tr class="subheader"><td colspan="13">Amount in bills</td></tr>
        <tr class="dark"><td>theorical</td>
	        <?php
	        	for ($i = 0; $i<count($dates) - 1; $i++) {
	        		echo "<td>" . get("SELECT SUM(total_real) as s FROM bills WHERE (Date " . between($i) . ")", "s") . "</td>";
	        	}
	        
	        ?>
        </tr>
        <tr style="background-color: white"><td>paid</td>
	        <?php
	        	for ($i = 0; $i<count($dates) - 1; $i++) {
	        		echo "<td>" . get("SELECT SUM(total_paid) as s FROM bills WHERE (Date " . between($i) . ")", "s") . "</td>";
				}
	        ?>
        </tr>
        <tr class="subheader"><td colspan="13">Number of Bills per Patient Social levels</td></tr>
        <?php
        for ($sl = 1; $sl <= 5; $sl++) {
        	?>
        	<tr class='<?php if($sl % 2 == 1) echo("dark"); else echo ""; ?>'><td><?php echo $sl; ?></td>
		        <?php
	        		for ($i = 0; $i<count($dates) - 1; $i++) {
		        		echo "<td>" . get("SELECT COUNT(bills.id) as s FROM bills JOIN patients ON (bills.patient_id = patients.id) " 
	        				 	. "WHERE (patients.Sociallevel = $sl) and (bills.Date " . between($i) . ")", 
	        					"s") . "</td>";
					}
	        	?>
        	</tr>
       	<?php  } ?>
       	<tr><td>Without Social Level defined</td>
	        <?php
        		for ($i = 0; $i<count($dates) - 1; $i++) {
	        		echo "<td>" . get("SELECT COUNT(bills.id) as s FROM bills JOIN patients ON (bills.patient_id = patients.id) " 
        				 	. "WHERE (patients.Sociallevel IS NULL) and (bills.Date " . between($i) . ")", 
        					"s") . "</td>";
				}
        	?>
       	</tr>
        <tr class="subheader"><td colspan="13">Number of Bills per Type of Care</td></tr>
	        <?php 
		        function bills4type($field) {
		        	global $dates;
		        	echo "<tr><td>Number of Bills with a $field</td>";
		        	for ($i = 0; $i<count($dates) - 1; $i++) {
		        		echo "<td>" . get("SELECT COUNT(id) as s FROM bills WHERE (bills.$field > 0) AND (Date " . between($i) . ")", "s") . "</td>";
		        	}
		        	echo "</tr>";
		        }
		        
		        bills4type("consult_CDC_consultation_physio");
		        bills4type("consult_CDC_consultation_Bengali_Doctor");
		        bills4type("consult_field_visit");
		        bills4type("consult_home_visit");
		        bills4type("consult_medecine");
		        bills4type("consult_making_plaster");
			?>
        <tr class="subheader"><td colspan="13">Number of items in bills</td></tr>
			<?php
				function bills4item($field) {
					global $dates;
					echo "<tr><td>Number of $field</td>";
					for ($i = 0; $i<count($dates) - 1; $i++) {
						echo "<td>" . get("SELECT SUM($field) as s FROM bills WHERE (Date " . between($i) . ")", "s") . "</td>";
					}
					echo "</tr>";
				}
				bills4item("workshop_BHKAFO_night"); 
			?>    
       	</tbody>
</table>
<?php
  	$response->ok();  
