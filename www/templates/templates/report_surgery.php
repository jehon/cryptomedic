<div myready>
  <table class='reporting'>
    <thead>
      <tr>
          <th colspan="30" class='b_all'>SARPV - AMD - KDM 2</th>
      </tr>
      <tr>
          <th colspan="5" class='b_all'>Name of project: Ricktes in cox's Bazar</th>
          <th class='b_left'>When</th>
          <th >{{result.params.when}}</th>
          <th></th>
          <th></th>
          <th colspan="10" class='b_left b_right'>Levels of the social level</th>
          <th colspan="8"></th>
      </tr>
      <tr>
          <th colspan="5">SARPV, CHAKARIA DISABILITY CENTER, CHAKARIA, COX'S BAZAR</th>
          <th class='b_left'>Who</th>
          <th>{{result.params.examiner}}</th>
          <th></th>
          <th></th>
          <th class='b_left' colspan=2>0</th>
          <th colspan=2>1</th>
          <th colspan=2>2</th>
          <th colspan=2>3</th>
          <th class='b_right' colspan=2>4</th>
          <th colspan="8"></th>
      </tr>
      <tr>
          <th colspan="5" class='b_bottom'>Daily report of {{result.params.when}}</th>
          <th class='b_left b_bottom'>Where</th>
          <th class='b_bottom'>{{result.params.center}}</th>
          <th class='b_bottom'></th>
          <th class='b_bottom'></th>
          <th class='b_left b_bottom' colspan=2>0-300</th>
          <th class='b_bottom' colspan=2>301-500</th>
          <th class='b_bottom' colspan=2>501-1500</th>
          <th class='b_bottom' colspan=2>1501-3000</th>
          <th class='b_right b_bottom' colspan=2>3001-...</th>
          <th colspan="8" class='b_bottom'></th>
      </tr>
      <tr>
          <th colspan="5" class='b_left'></th>
          <th colspan="4" class='b_left'>Identity</th>
          <th colspan="4" class='b_left'>SEL</th>
          <th colspan="3" class='b_left'>Medical</th>
          <th colspan="3" class='b_left'>Surgical</th>
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
          <th>Old/New</th>

          <th class='b_left'>Tk income</th>
          <th>Nb pers</th>
          <th>Tk per pers</th>
          <th>SL</th>

          <th class='b_left'>Diagno</th>
          <th>Act</th>
          <th>Trt</th>
          <th class='b_left'>Last seen</th>
          <th>Result</th>
          <th>Done?</th>

          <th class='b_left'>Consult</th>
          <th>Medicine</th>
          <th>Surgical</th>
          <th>Workshop</th>
          <th>Others</th>
          <th>Full</th>
          <th>Asked</th>
          <th>Paid</th>
      </tr>
    </thead>
    <tbody  class='b_all'>
	   	<tr ng-repeat='l in result.list'>
        <td class='b_left'>
        	#{{$index}}
        	<a href='#/folder/{{l.pid}}'>patient</a>
				</td>
        <td>{{l.Date}}</td>
        <td>{{l.ExaminerName}}</td>
        <td>{{l.Center}}</td>
        <td>{{l.patient_reference}}</td>

        <td class='b_left'>{{l.patient_name}}</td>
        <td>{{calculations.age.fromBirthDate(l.yearofbirth)}}</td>
        <td>{{l.Sex}}</td>
        <td>
					<span ng-if="l.oldPatient == 1">Old</span>
        	<span ng-if="l.oldPatient == 0">
						<span ng-if='l.patient_reference.substr(0, 4) < result.params.when.substr(0, 4) '>
							Old(EN)
						</span>
						<span ng-if='l.patient_reference.substr(0, 4) == result.params.when.substr(0, 4) '>
							New
						</span>
          </span>
        </td>
        <td class='b_left'>{{l.sl_familySalary}}</td>
        <td>{{l.sl_numberOfHouseholdMembers}}</td>
        <td>
        	<span ng-if="l.sl_numberOfHouseholdMembers > 0">
        		{{l.sl_familySalary / l.sl_numberOfHouseholdMembers | number:0 }}
        	</span>
        <td>{{l.Sociallevel}}</td>

        <td class='b_left'><jh-codage value="{{l.Pathology}}"></jh-codage></td>
        <td>{{l.act}}</td>
        <td>{{l.treatment}}</td>

        <td class='b_left'>{{l.last_seen}}</td>
        <td>{{l.last_treat_result}}</td>
        <td>{{l.last_treat_finished}}</td>

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
    		<td colspan=19 class='b_all'></td>
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
				<td></td>
				<td class='b_left'></td>
				<td></td>
				<td></td>
				<td></td>
				<td class='b_left'></td>
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
    <div class='row'>
		<div class='col-md-3'>
	   		<h3>Old/New</h3>
		    <dl class='dl-horizontal'>
		    	<dt>Old</dt>
		    	<dd>Old patient - patient with at least one bill older than the beginning of the report (in this case:&nbsp;{{result.params.whenFrom}})</dd>
		    </dl>
		    <dl class='dl-horizontal'>
		    	<dt>Old(EN)</dt>
		    	<dd>Old patient - patient whose entry year is before the report year (in this case:&nbsp;{{ result.params.whenFrom.substr(0,4)}})</dd>
		    </dl><dl class='dl-horizontal'>
		    	<dt>New</dt>
		    	<dd>New patient - all other cases</dd>
		    </dl>
		</div>
 	    <div class='col-md-3'>
		    <h3>Medecine</h3>
		    <dl class='dl-horizontal'>
		    	<dt>R</dt>
		    	<dd>Ricket</dd>
		    </dl>
		    <dl class='dl-horizontal'>
		    	<dt>CF</dt>
		    	<dd>Club Foot</dd>
		    </dl>
		    <dl class='dl-horizontal'>
		    	<dt>P</dt>
		    	<dd>Polio</dd>
		    </dl>
		    <dl class='dl-horizontal'>
		    	<dt>B</dt>
		    	<dd>Burn</dd>
		    </dl>
		    <dl class='dl-horizontal'>
		    	<dt>CP</dt>
		    	<dd>CP</dd>
		    </dl>
		    <dl class='dl-horizontal'>
		    	<dt>C</dt>
		    	<dd>Congenital</dd>
		    </dl>
		    <dl class='dl-horizontal'>
		    	<dt>A</dt>
		    	<dd>Patient is adult</dd>
		    </dl>
		    <dl class='dl-horizontal'>
		    	<dt>Oth</dt>
		    	<dd>Other</dd>
		    </dl>
		</div>
		<div class='col-md-3'>
		    <h3>Act</h3>
		    <dl class='dl-horizontal'>
		    	<dt>CP</dt>
		    	<dd>Consult physio</dd>
		    </dl>
		    <dl class='dl-horizontal'>
		    	<dt>CD</dt>
		    	<dd>Consult doctor</dd>
		    </dl>
		    <dl class='dl-horizontal'>
		    	<dt>FV</dt>
		    	<dd>Field visit</dd>
		    </dl>
		    <dl class='dl-horizontal'>
		    	<dt>HV</dt>
		    	<dd>Home visit</dd>
		    </dl>
		</div>
		<div class='col-md-3'>
		    <h3>Treatment</h3>
		    <dl class='dl-horizontal'>
		    	<dt>Med</dt>
		    	<dd>Medecine</dd>
		    </dl>
		    <dl class='dl-horizontal'>
		    	<dt>WS</dt>
		    	<dd>Workshop item</dd>
		    </dl>
		    <dl class='dl-horizontal'>
		    	<dt>Surg</dt>
		    	<dd>Surgery item</dd>
		    </dl>
		    <dl class='dl-horizontal'>
		    	<dt>Plast</dt>
		    	<dd>Making plaster (in other)</dd>
		    </dl>
		    <dl class='dl-horizontal'>
		    	<dt>Dress</dt>
		    	<dd>Making dressing (in other)</dd>
		    </dl>
		    <dl class='dl-horizontal'>
		    	<dt>XR</dt>
		    	<dd>XRay (in other)</dd>
		    </dl>
		    <dl class='dl-horizontal'>
		    	<dt>Physio</dt>
		    	<dd>Physiotherapy (in other)</dd>
		    </dl>
		    <dl class='dl-horizontal'>
		    	<dt>Other</dt>
		    	<dd>Other consultation care</dd>
		    </dl>
		</div>
	</div>
</div>
