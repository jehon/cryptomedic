<div style='width: 100%; text-align: center'>
	<h1 style='text-align: center'>
		<label for="Home-MainTitle" name="Home-MainTitle">Home Page</label>
	</h1>
</div>
<table>
	<tr>
		<td>
			<?php include __DIR__ . "/../Patients/reference.ctp"; ?>
		</td>
		<td>
			<fieldset>
				<legend>
					<label for="Home-QuickMenu" name="Home-QuickMenu">Quick menu</label>
				</legend>
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
	</tr>
</table>
<div style='text-align: center'>
	<h3 align='center'>Credits</h3>
	<div  align='center'>Developper : Jean Honlet</div>
</div>
