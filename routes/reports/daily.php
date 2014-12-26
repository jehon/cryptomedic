<?php

require_once(__DIR__ . "/../helpers/getFolder.php");
require_once(__DIR__ . "/../helpers/price.php");

$examiner = $request->getParameter("examiner", "");
$where = $request->getParameter("center", '');
$when = $request->getParameter("date", "");
if ($when instanceof DateTime) {
    $when = $when->format("Y-m-d");
} else {
    $when = substr($when, 0, 10);
}
$month = $request->getParameter("month", "");
if ($month instanceof DateTime) {
	$month = $month->format("Y-m");
} else {
	$month = substr($month, 0, 7);
}

$result = $server->getDatabase()->query("SELECT 
			bills.id as bid,
            " . Bill::getSQLFieldsSum(Bill::CAT_CONSULT) . " AS sum_consult, 
            " . Bill::getSQLFieldsSum(Bill::CAT_MEDECINE) . " AS sum_medecine, 
			" . Bill::getSQLFieldsSum(Bill::CAT_WORKSHOP) . " AS sum_workshop, 
            " . Bill::getSQLFieldsSum(Bill::CAT_SURGICAL) . " AS sum_surgical, 
            " . Bill::getSQLFieldsSum(Bill::CAT_OTHER) . " AS sum_other,
            bills.total_real as total_real,
            bills.total_asked as total_asked,
            bills.total_paid as total_paid,
            bills.*,
            patients.*
        FROM bills 
        JOIN patients ON bills.patient_id = patients.id 
        JOIN prices ON bills.price_id = prices.id
        WHERE (1 = 1)
            AND (:where = '' || bills.Center = :where)
            AND (:when = '' || bills.Date = :when)
            AND (:examiner = '' || bills.ExaminerName = :examiner)
			AND (:month = '' || DATE_FORMAT(bills.Date, \"%Y-%m\") = :month)
		LIMIT 500", 
        array(
            'where' => $where, 
            'when' => $when,
        	'examiner' => $examiner,
        	'month' => $month
        )
    );
?>
<div>
    <table class='reporting'>
        <thead>
            <tr>
                <th colspan="23" class='b_all'>SARPV - AMD - KDM</th>
            </tr>
            <tr>
                <th colspan="5" class='b_all'>Name of project: Ricktes in cox's Bazar</th>
                <th class='b_left'>When</th>
                <th ><?php echo $when; ?></th>
                <th></th>
                <th colspan="5" class='b_left b_right'>Levels of the social level</th>
                <th colspan="10"></th>
            </tr>
            <tr>
                <th colspan="5">SARPV, CHAKARIA DISABILITY CENTER, CHAKARIA, COX'S BAZAR</th>
                <th class='b_left'>Who</th>
                <th><?php echo $examiner; ?></th>
                <th></th>
                <th class='b_left'>0</th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th class='b_right'>4</th>
                <th colspan="10"></th>
            </tr>
            <tr>
                <th colspan="5" class='b_bottom'>Daily report of <?php echo $when; ?></th>
                <th class='b_left b_bottom'>Where</th>
                <th class='b_bottom'><?php echo References::unreference($where); ?></th>
                <th class='b_bottom'></th>
                <th class='b_left b_bottom'>0-300</th>
                <th class='b_bottom'>301-500</th>
                <th class='b_bottom'>501-1500</th>
                <th class='b_bottom'>1501-3000</th>
                <th class='b_right b_bottom'>3001-...</th>
                <th colspan="10" class='b_bottom'></th>
            </tr>
            <tr>
                <th colspan="5" class='b_left'></th>
                <th colspan="3" class='b_left'>Identity</th>
                <th colspan="4" class='b_left'>SEL</th>
                <th colspan="3" class='b_left'>Medical</th>
                <th colspan="8" class='b_left'>Price</th>
            </tr>
            <tr>
                <th class='b_left'>N</th>
                <th>Date</th>
                <th>Examiner</th>
                <th>Place</th>
                <th>Record n#</th>

                <th class='b_left'>Patient name</th>
                <th>Age</th>
                <th>M/F</th>

                <th class='b_left'>Tk income</th>
                <th>Nb pers</th>
                <th>Tk per pers</th>
                <th>SL</th>

                <th class='b_left'>Diagno</th>
                <th>Act</th>
                <th>Trt</th>

                <th class='b_left'>Consult</th>
                <th>Medicine</th>
                <th>Surgical</th>
                <th>Workshop</th>
                <th>Others</th>
                <th>Full</th>
                <th>Asked</th>
                <th>Payed</th>
            </tr>
        </thead>
        <tbody  class='b_all'>
            <?php
                foreach($result as $i => $v) {
                    // Calculate Medecine > Diagno
                    $v['pathology'] = array();
                    if ($v['pathology_Ricket']) {
                    	$v['pathology'][] = 'R';
                    }
                    if ($v['pathology_Clubfoot']) {
                    	$v['pathology'][] = 'CF';
                    }
                    if ($v['pathology_CP']) {
                    	$v['pathology'][] = 'CP';
                    }
                    if ($v['pathology_Polio']) {
                    	$v['pathology'][] = 'P';
                    }
                    if ($v['pathology_Burn']) {
                    	$v['pathology'][] = 'B';
                    }
                    if ($v['pathology_Congenital']) {
                    	$v['pathology'][] = 'C';
                    }
                    if ($v['pathology_Adult']) {
                    	$v['pathology'][] = 'A';
                    }
                    if ($v['pathology_other']) {
                    	$v['pathology'][] = 'Oth';
                    }

                    // Calculate Medecine > Act
                    $v['medecine_act'] = array();
                    if ($v['consult_CDC_consultation_physio']) {
                    	$v['medecine_act'][] = 'CsP';
                    }
                    if ($v['consult_CDC_consultation_Doctor']) {
                    	$v['medecine_act'][] = 'CD';
                    }
                    if ($v['consult_field_visit']) {
                    	$v['medecine_act'][] = 'FV';
                    }
                    if ($v['consult_home_visit']) {
                    	$v['medecine_act'][] = 'HV';
                    }

                    $v['trt'] = array();
                    // consult
                    if ($v['sum_medecine']) {
                    	$v['trt'][] = "Med";
                    }
                    if ($v['sum_workshop']) {
                    	$v['trt'][] = "WS";
                    }
                    if ($v['sum_surgical']) {
                    	$v['trt'][] = "Surg";
                    }
                    
                    // other
                    if ($v['other_making_plaster'] || $v['other_make_long_plaster'] || $v['other_make_short_plaster']) { 
                    	$v['trt'][] = "Plast";
                    }
                    if ($v['other_making_dressing']) {
                    	$v['trt'][] = "Dress";
                    }
                    if ($v['other_X_Ray']) {
                    	$v['trt'][] = "XR";
                    }
                    if ($v['other_physiotherapy']) {
                    	$v['trt'][] = "Physio";
                    }
                    if ($v['other_Other_consultation_care']) $v['trt'][] = "Other";
                    
                    ?>
                        <tr>
                            <td class='b_left'>
                            	<a href='#/goto/Bill/<?php echo $v['bid']; ?>'>
                            		Go <?php echo $i; ?>
                            	</a>
							</td>
                            <td><?php echo $v['Date']; ?></td>
                            <td><?php echo $v['ExaminerName']; ?></td>
                            <td><?php echo References::unreference($v['Center']); ?></td>
                            <td><?php echo $v['entryyear'] . "-" . $v['entryorder']; ?></td>

                            <td class='b_left'><?php echo $v['Firstname'] . " " . $v['Lastname']; ?></td>
                            <td><?php echo (Date('Y') - $v['Yearofbirth']); ?></td>
                            <td><?php echo References::unreference($v['Sex']); ?></td>

                            <td class='b_left'><?php echo $v['Familysalaryinamonth']; ?></td>
                            <td><?php echo $v['Numberofhouseholdmembers']; ?></td>
                            <td><?php echo ($v['Numberofhouseholdmembers'] > 0 ? round($v['Familysalaryinamonth'] / $v['Numberofhouseholdmembers']) : "?"); ?></td>
                            <td><?php echo $v['Sociallevel']; ?></td>

                            <td class='b_left'><?php echo implode($v['pathology'], ','); ?></td>
                            <td><?php echo implode($v['medecine_act'], ','); ?></td>
                            <td><?php echo implode($v['trt'], ','); ?></td>

                            <td class='b_left'><?php echo $v['sum_consult']; ?></td>
                            <td><?php echo $v['sum_medecine'] ?></td>
                            <td><?php echo $v['sum_surgical'];?></td>
                            <td><?php echo $v['sum_workshop'] ?></td>
                            <td><?php echo $v['sum_other'] ?></td>
                            <td><?php echo $v['total_real']; ?></td>
                            <td><?php echo $v['total_asked']; ?></td>
                            <td><?php echo $v['total_paid']; ?></td>
                        </tr>
                    <?php
                }


            ?>
        </tbody>
    </table>
    <h1>Legend</h1>
    <h3>Medecine</h3>
    <span class="label label-default">R</span>Ricket<br>
    <span class="label label-default">CF</span>Club Foot<br>
    <span class="label label-default">P</span>Polio<br>
    <span class="label label-default">B</span>Burn<br>
    <span class="label label-default">CP</span>CP<br>
    <span class="label label-default">C</span>Congenital<br>
    <span class="label label-default">A</span>Patient is adult<br>
    <span class="label label-default">Oth</span>Other<br>

    <h3>Act</h3>
    <span class="label label-default">CP</span>Consult physio<br>
    <span class="label label-default">CD</span>Consult doctor<br>
    <span class="label label-default">FV</span>Field visit<br>
    <span class="label label-default">HV</span>Home visit<br>
    
    <h3>Treatment</h3>
    <span class="label label-default">Med</span>Medecine<br>
    <span class="label label-default">WS</span>Workshop item<br>
    <span class="label label-default">Surg</span>Surgery item<br>
    
    <span class="label label-default">Plast</span>Making plaster (in other)<br>
    <span class="label label-default">Dress</span>Making dressing (in other)<br>
    <span class="label label-default">XR</span>XRay (in other)<br>
    <span class="label label-default">Physio</span>Physiotherapy (in other)<br>
    <span class="label label-default">Other</span>Other consultation care<br>
</div>
<?php
    $response->ok();
