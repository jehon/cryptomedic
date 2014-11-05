<?php

require_once(__DIR__ . "/../helpers/getFolder.php");
require_once(__DIR__ . "/../../amd_listings.php");
require_once(__DIR__ . "/../helpers/references.php");

// TODOJH: manage parameters
$when = $request->getParameter("when", "todojh");
$who = $request->getParameter("who", "todojh");
$where = $request->getParameter("where", "todojh");

?>
<html>
<div>
    <form>
        <label>Who ?</label><input name='who' value='<? echo $who; ?>'><br>
        <label>Where ?</label><input name='where' value='<? echo $where; ?>'><br>
        <label>When ?</label><input name='when' value='<? echo $when; ?>'><br>
        <input type='submit' value='Calculate'>
    </form>
</div>
<div>
    <table>
        <thead>
            <tr>
                <th>SARPV - AMD - KDM</th>
            </tr>
            <tr>
                <th colspan=5>Name of project: Ricktes in cox's Bazar</th>
                <th>When</th>
                <th><? echo $when; ?></th>
                <th></th>
                <th></th>
                <th colspan=4>Levels of the social level</th>
            </tr>
            <tr>
                <th colspan=5>SARPV, CHAKARIA DISABILITY CENTER, CHAKARIA, COX'S BAZAR</th>
                <th>Who</th>
                <th><? echo $who; ?></th>
                <th></th>
                <th></th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
            </tr>
            <tr>
                <th colspan=5>Daily report of <? echo $when; ?></th>
                <th>Where</th>
                <th><? echo unreference($where); ?></th>
                <th></th>
                <th></th>
                <th>todojh</th>
                <th>todojh</th>
                <th>todojh</th>
                <th>todojh</th>
            </tr>
            <tr>
                <th colspan="4"></th>
                <th colspan="5">Identity</th>
                <th colspan="4">SEL</th>
                <th colspan="3">Medical</th>
                <th colspan="6">Price</th>
            </tr>
            <tr>
                <th>N</th>
                <th>Date</th>
                <th>Physio</th>
                <th>Place</th>
                <th>Record n#</th>

                <th>Patient name</th>
                <th>Age</th>
                <th>M/F</th>
                <th>New/Old</th>
                <th>Tk income</th>
                <th>Nb pers</th>
                <th>Tk per pers</th>
                <th>SL</th>

                <th>Diagno</th>
                <th>Act</th>
                <th>Trt</th>

                <th>Consult</th>
                <th>Medicine</th>
                <th>Others</th>
                <th>Full</th>
                <th>Asked</th>
                <th>Payed</th>
            </tr>
        </thead>
        <tbody>
            <?php
                $result = $database->query("SELECT * FROM bills 
                    JOIN patients ON bills.patient_id = patients.id 
                    WHERE 
                        (:physio = '' || bills.ExaminerName = :physio)
                    LIMIT 100", array('physio' =>  $who));
                foreach($result as $i => $v) {
                    ?>
                        <tr>
                            <td><?php echo $i; ?></td>
                            <td><?php echo $v['Date']; ?></td>
                            <td><?php echo $v['ExaminerName']; ?></td>
                            <td><?php echo unreference($v['Center']); ?></td>
                            <td><?php echo $v['entryyear'] . "-" . $v['entryorder']; ?></td>

                            <td><?php echo $v['Firstname'] . " " . $v['Lastname']; ?></td>
                            <td><?php echo (Date('Y') - $v['Yearofbirth']); ?></td>
                            <td><?php echo unreference($v['Sex']); ?></td>
                            <td><?php echo "#"; // todojh new/old ?></td>
                            <td><?php echo $v['Familysalaryinamonth']; ?></td>
                            <td><?php echo $v['Numberofhouseholdmembers']; ?></td>
                            <td><?php echo ($v['Numberofhouseholdmembers'] > 0 ? round($v['Familysalaryinamonth'] / $v['Numberofhouseholdmembers']) : "?"); ?></td>
                            <td><?php echo $v['Sociallevel']; ?></td>

                            <td><?php echo "#"; // todojh diagno?></td>
                            <td><?php echo "#"; // todojh act?></td>
                            <td><?php echo "#"; // todojh treatment?></td>

                            <td><?php echo "#"; // todojh total consult?></td>
                            <td><?php echo "#"; // todojh total medecine?></td>
                            <td><?php echo "#"; // todojh total other ?></td>
                            <td><?php echo $v['total_real']; ?></td>
                            <td><?php echo $v['total_asked']; ?></td>
                            <td><?php echo $v['total_paid']; ?></td>
                            <td><?php //var_dump($v); ?></td>
                        </tr>
                    <?php
                }


            ?>
        </tbody>
    </table>
<?

$response->ok();
