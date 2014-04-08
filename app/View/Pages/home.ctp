<?php
$entryyear = "";
$entryorder = "";
if (array_key_exists('reference-entryyear', $this->data)) $entryyear= $this->data['reference-entryyear'];
if (array_key_exists('reference-entryorder', $this->data)) $entryorder = $this->data['reference-entryorder'];
?>
<div style='width: 100%;text-align: center'>
	<h1 style='text-align: center'><label for="Home-MainTitle" name="Home-MainTitle">Home Page</label></h1>
</div>
<table>
	<tr>
		<td>
            <form id="generalForm" enctype="multipart/form-data" method="post" action="/amd/patients/reference" accept-charset="utf-8">
                <Div class='searchFields'>
                    <? if (!array_key_exists('patientForm', $this->request->query) && !array_key_exists('reference', $this->data)) { ?>
                        <fieldset id='search'>
                            <legend>Search a patient</legend>
                            <Table class='colorize'>
                                <tr>
                                    <td>
                                        <label for="PatientEntryyear" name="Patient.entryyear">Patient.entryyear</label>
                                    </td>
                                    <td>
                                        <input id='ref' name="data[reference-ref]">
                                        <img src='/amd/cryptomedic/img/go.gif' onclick='refgo();'>
                                    </td>
                                </tr>
                            </table>
                        </fieldset>
                    <? } ?>

                    <Fieldset id='add'>
                        <Legend>Add a new patient</Legend>
                        <Table class='colorize'>
                            <tr>
                                <td><label for="PatientEntryyear" name="Patient.entryyear">Patient.entryyear</label></td>
                                <td>
                                    <input id='entryyear' name="data[reference-entryyear]" type="number" value="<? echo array_key_exists('reference-entryyear', $this->data) ? $this->data['reference-entryyear'] : ''; ?>" required="required" myrequired="required">
                            </tr>
                            <tr>
                                <td><label for="PatientEntryorder" name="Patient.entryorder">Patient.entryorder</label></td>
                                <td>
                                    <input id='entryorder' name="data[reference-entryorder]" type="number"
                                           value="<? echo $entryorder; ?>"
                                           <? echo (($entryorder == "") && ($entryyear > "")) ? "disabled" : ""; ?>
                                           >
                                    <br>
                                    <input id='generated' name="data[reference-generated]" type='checkbox' value='1'
                                        <? echo (($entryorder == "") && ($entryyear  > "")) ? "checked" : ""; ?>
                                        >Generate a reference for me
                                </td>
                            </tr>
                            <input type="hidden" name="data[create]" id="ForceCreate" value=false />
                        </Table>
                        <input class="button" id="submitbutton" type="submit" value="Check it">
                    </Fieldset>
                </Div>
            </form>
            <?php
            if (array_key_exists('reference', $this->data)) {
                ?>
                <Div id='results' class='searchFields'>
                    <Fieldset>
                        <Legend>Results</Legend>
                        <?php
                        if ($entryorder > 0) {
                            ?>
                            The patient does <b>not</b> exist. Do you want to <b>create</b> it?<br><br>
                            <a class='textbutton' href="javascript:cryptomedic.reference_submit_for_create();"><img src="/amd/cryptomedic/img/go.gif" alt=""> Create patient</a>
                        <?
                        } else {
                            ?>
                            You must specify a valid reference !
                            <a class='textbutton' href="javascript:cryptomedic.reference_submit_for_create();"><img src="/amd/cryptomedic/img/go.gif" alt=""> Create patient with generated reference</a>
                        <?
                        }
                        ?>
                    </fieldset>
                </div>
            <?php
            }
            ?>
		</td>
<?
if (!array_key_exists('patientForm', $this->request->query) && !array_key_exists('reference', $this->data)) {
    ?>
        <td>
                <fieldset>
                    <legend><label for="Home-QuickMenu" name="Home-QuickMenu">Quick menu</label></legend>
                    <table>
                        <tr style='text-align: center'>
                            <td>
                                    <a class='textbutton' a href="/amd/reports/day/"><img src="/amd/cryptomedic/img/go.gif" alt="" />Day of consult</a>
                            </td>
                        </tr>
                        <tr style='text-align: center'>
                            <td>
                                <a class='textbutton' a href="/amd/patients"><img src="/amd/cryptomedic/img/patientsSearch.gif" alt="" />Search a patient</a>
                            </td>
                        </tr>
                        <tr style='text-align: center'>
                            <td>
                                <a class='textbutton' href="/amd/reports/activity"><img src="/amd/cryptomedic/img/activity.gif" alt="" />Activity</a>
                            </td>
                        </tr>
                        <tr style='text-align: center'>
                            <td>
                                <a class='textbutton' href="/amd/reports/monthlyreport"><img src="/amd/cryptomedic/img/monthlyreport.gif" alt="" />Monthly report</a>
                            </td>
                        </tr>
                        </table>
                </fieldset>
            </td>
        <?
    }
    ?>
	</tr>
</table>
<div style='text-align: center'>
		<h3 align='center'>Credits</h3>
		<div  align='center'>Developper : Jean Honlet</div>
</div>
<script type="text/javascript">
//    jQuery('#generalForm').submit(function() {return false});
</script>

<script>
    function refgo() {
        jQuery("#entryyear").val("");
        jQuery("#entryorder").val("");
        jQuery("#generated").val("");
        jQuery("#generalForm").submit();
    }

    jQuery("#ref").change(refgo);


    jQuery("#entryyear").change(function() {
        jQuery("#results").hide();
        jQuery("#search").hide();

        jQuery('#ForceCreate').val(false);
    });

    jQuery("#entryorder").change(function() {
        jQuery("#results").hide();
        jQuery("#search").hide();

        jQuery('#ForceCreate').val(false);
    });

    jQuery("#generated").change(function() {
        jQuery("#results").hide();
        jQuery("#search").hide();

        if (jQuery('#generated').is(':checked')) {
            jQuery('#entryorder').prop('disabled', true);
        } else {
            jQuery('#entryorder').prop('disabled', false);
        }
        jQuery("#ref").prop("disabled", true);
    });
</script>
