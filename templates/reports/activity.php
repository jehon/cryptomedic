<div>
    <table class='reporting'>
        <thead>
            <tr>
                <th colspan="23" class='b_all'>SARPV - AMD - KDM</th>
            </tr>
            <tr>
                <th colspan="5" class='b_all'>Name of project: Ricktes in cox's Bazar</th>
                <th class='b_left'>When</th>
                <th >{{result.params.when}}</th>
                <th></th>
                <th colspan="5" class='b_left b_right'>Levels of the social level</th>
                <th colspan="10"></th>
            </tr>
            <tr>
                <th colspan="5">SARPV, CHAKARIA DISABILITY CENTER, CHAKARIA, COX'S BAZAR</th>
                <th class='b_left'>Who</th>
                <th>{{result.params.examiner}}</th>
                <th></th>
                <th class='b_left'>0</th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th class='b_right'>4</th>
                <th colspan="10"></th>
            </tr>
            <tr>
                <th colspan="5" class='b_bottom'>Daily report of {{result.params.when}}</th>
                <th class='b_left b_bottom'>Where</th>
                <th class='b_bottom'>{{result.params.center}}</th>
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
			<tr ng-repeat='l in result.list'>
                            <td class='b_left'>
                            	<a href='#/goto/Bill/{{l.bid}}'>View bill</a>
							</td>
                            <td>{{l.Date}}</td>
                            <td>{{l.ExaminerName}}</td>
                            <td>{{l.Center}}</td>
                            <td>{{l.patient_reference}}</td>

                            <td class='b_left'>{{l.patient_name}}</td>
                            <td>{{age(l.yearofbirth)}}</td>
                            <td>{{l.Sex}}</td>

                            <td class='b_left'>{{l.sl_familySalary}}</td>
                            <td>{{l.sl_numberOfHouseholdMembers}}</td>
                            <td>
                            	<span ng-if="l.sl_numberOfHouseholdMembers > 0">
                            		{{l.sl_familySalary / l.sl_numberOfHouseholdMembers | number:0 }}
                            	</span>
                            <td>{{l.Sociallevel}}</td>

                            <td class='b_left'>{{l.diagno}}</td>
                            <td>{{l.act}}</td>
                            <td>{{l.treatment}}</td>

                            <td class='b_left'>{{l.price_consult}}</td>
                            <td>{{l.price_medecine}}</td>
                            <td>{{l.price_surgical}}</td>
                            <td>{{l.price_workshop}}</td>
                            <td>{{l.price_other}}</td>
                            <td>{{l.total_real}}</td>
                            <td>{{l.total_asked}}</td>
                            <td>{{l.total_paid}}</td>
			</tr>
        	<tr>
        		<td colspan=15 class='b_all'></td>
        		<td colspan=8 class='b_all'>Total</td>
        	</tr>
            <tr>
        		<td></td>
        		<td></td>
        		<td></td>
        		<td></td>
				<td></td>
				<td class='b_left'></td>
				<td></td>
				<td></td>
				<td class='b_left'></td>
				<td></td>
				<td></td>
				<td></td>
				<td class='b_left'></td>
				<td></td>
				<td></td>
				<td class='b_left'>{{result.totals.price_consult}}</td>
				<td class='b_left'>{{result.totals.price_medecine}}</td>
				<td class='b_left'>{{result.totals.price_surgical}}</td>
				<td class='b_left'>{{result.totals.price_workshop}}</td>
				<td class='b_left'>{{result.totals.price_other}}</td>
				<td class='b_left'>{{result.totals.total_real}}</td>
				<td class='b_left'>{{result.totals.total_asked}}</td>
				<td class='b_left'>{{result.totals.total_paid}}</td>
			</tr>
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
