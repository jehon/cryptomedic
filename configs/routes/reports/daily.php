<?php

require_once(__DIR__ . "/../helpers/getFolder.php");
require_once(__DIR__ . "/../../amd_listings.php");
require_once(__DIR__ . "/../helpers/references.php");
require_once(__DIR__ . "/../helpers/price.php");
require_once(__DIR__ . "/../helpers/bill.php");

$who = $request->getParameter("examinerName", "");
$where = $request->getParameter("center", 992);
$when = $request->getParameter("date", new DateTime());
if (!($when instanceof DateTime)) {
    $when = ""; // new DateTime();
} else {
    $when = $when->format("Y-m-d");
}


/*
            (:who = '' || bills.ExaminerName = :who)

*/
$result = $database->query("SELECT 
            " . Bill::getSQLFieldSumConsult() . " AS sum_consult, 
            " . Bill::getSQLFieldSumWorkshop() . " AS sum_workshop, 
            " . Bill::getSQLFieldSumSurgical() . " AS sum_surgical, 
            " . Bill::getSQLFieldSumOther() . " AS sum_other,
            bills.*,
            patients.*
        FROM bills 
        JOIN patients ON bills.patient_id = patients.id 
        JOIN prices ON bills.price_id = prices.id
        WHERE (1 = 1)
            AND (:where = '' || bills.Center = :where)
            AND (:when = '' || bills.Date = :when)
        LIMIT 500", 
        array(
            // 'who' =>  $who, 
            'where' => $where, 
            'when' => $when)
    );
?>
<style>
    table, thead, tbody, tr, th, td {
        border-width: 1px;
        border-color: blue;
    }

    table {
        border: black 2px solid;
        border-collapse: collapse;
    }

    thead {
        border: black 2px solid;
    }

    .b_right {
        border-right: gray 1px solid;
    }

    .b_left {
        border-left: gray 1px solid;
    }

    .b_bottom {
        border-bottom: gray 1px solid;
    }

    .b_all {
        border: gray 1px solid;
    }
</style>
<div>
    <table>
        <thead>
            <tr>
                <th colspan="23" class='b_all'>SARPV - AMD - KDM</th>
            </tr>
            <tr>
                <th colspan=5 class='b_all'>Name of project: Ricktes in cox's Bazar</th>
                <th class='b_left'>When</th>
                <th ><? echo $when; ?></th>
                <th></th>
                <th colspan=5 class='b_left b_right'>Levels of the social level</th>
                <th colspan=10></th>
            </tr>
            <tr>
                <th colspan=5>SARPV, CHAKARIA DISABILITY CENTER, CHAKARIA, COX'S BAZAR</th>
                <th class='b_left'>Who</th>
                <th><? echo $who; ?></th>
                <th></th>
                <th class='b_left'>0</th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th class='b_right'>4</th>
                <th colspan="10"></th>
            </tr>
            <tr>
                <th colspan="5" class='b_bottom'>Daily report of <? echo $when; ?></th>
                <th class='b_left b_bottom'>Where</th>
                <th class='b_bottom'><? echo unreference($where); ?></th>
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
                <th colspan="4" class='b_left'>Identity</th>
                <th colspan="4" class='b_left'>SEL</th>
                <th colspan="3" class='b_left'>Medical</th>
                <th colspan="7" class='b_left'>Price</th>
            </tr>
            <tr>
                <th class='b_left'>N</th>
                <th>Date</th>
                <th>Physio</th>
                <th>Place</th>
                <th>Record n#</th>

                <th class='b_left'>Patient name</th>
                <th>Age</th>
                <th>M/F</th>
                <th>New/Old</th>

                <th class='b_left'>Tk income</th>
                <th>Nb pers</th>
                <th>Tk per pers</th>
                <th>SL</th>

                <th class='b_left'>Diagno</th>
                <th>Act</th>
                <th>Trt</th>

                <th class='b_left'>Consult</th>
                <th>Medicine</th>
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
                    ?>
                        <tr>
                            <td class='b_left'><?php echo $i; ?></td>
                            <td><?php echo $v['Date']; ?></td>
                            <td><?php echo $v['ExaminerName']; ?></td>
                            <td><?php echo unreference($v['Center']); ?></td>
                            <td><?php echo $v['entryyear'] . "-" . $v['entryorder']; ?></td>

                            <td class='b_left'><?php echo $v['Firstname'] . " " . $v['Lastname']; ?></td>
                            <td><?php echo (Date('Y') - $v['Yearofbirth']); ?></td>
                            <td><?php echo unreference($v['Sex']); ?></td>
                            <td><?php echo "#"; // todojh new/old ?></td>
                            <td><?php echo $v['Familysalaryinamonth']; ?></td>
                            <td><?php echo $v['Numberofhouseholdmembers']; ?></td>
                            <td><?php echo ($v['Numberofhouseholdmembers'] > 0 ? round($v['Familysalaryinamonth'] / $v['Numberofhouseholdmembers']) : "?"); ?></td>
                            <td><?php echo $v['Sociallevel']; ?></td>

                            <td class='b_left'><?php echo "#"; // todojh diagno?></td>
                            <td><?php echo "#"; // todojh act?></td>
                            <td><?php echo "#"; // todojh treatment?></td>

                            <td class='b_left'><?php echo $v['sum_consult']; ?></td>
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
<?php
    $response->ok();
