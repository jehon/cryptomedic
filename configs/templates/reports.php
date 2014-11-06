<div ng-if="getReport()">
    <form>
    	<div ng-if="isParam('examinerName')">
        	<label>Who ?</label><input name='ExaminerName' ng-model='values.examinerName'><br>
        </div>
    	<div ng-if="isParam('center')">
	        <label>Where ?</label>
	                <select name='center' ng-model='values.center'>
	                <?php 
	                    foreach(buildLinkedList($amd_listing['Centers']) as $k => $v) 
	                        echo "<option value='$k' >$v</option>"; 
	                    ?>
	                </select>
	    </div>
      	<div ng-if="isParam('date')">
	        <label>When ?</label><input name='date' type='date' ng-model='values.date'><br>
	    </div>
        <div class='btn btn-primary' ng-click="refresh()">Refresh</div>
    </form>
    <br>
    <a class='btn btn-primary' 
    		download="somedata.xls" 
    		href="#"  
    		onclick="return ExcellentExport.excel(this, 'datatable', 'test');">
    	Export</a>
	<div ng-include="'/rest/reports/' + url	"></div>
</div>

<div class='container-fluid' ng-if="!getReport()">
	<div class='row'>
		<div class='col-sm-offset-3 col-sm-6'>
			<fieldset id='add'>
				<legend>Global reporting</legend>
				<h3>Daily report</h3>
				The daily report track the activity of a center.
				<br>
				<a class='btn btn-primary' href='#/reports/daily'>Daily report</a>
				<br>

				<h3>Monthly report</h3>
				The monthly report track the activity of the center according to various axes.
				<br>
				<a class='btn btn-primary' href='/rest/reports/monthly.html'>Monthly report</a>
				<br>

				<h3>Daily report</h3>
				Report the daily activity as one center.<br>

				<a class='btn btn-primary' href='/rest/reports/daily.html'>Daily report</a>
				<br>
				
				<h3>Activity report</h3>
				Report what has been done this last 12 months in the applications.<br>

				<a class='btn btn-primary' href='/rest/reports/activity.html'>Activity report</a>
				<br>
			</fieldset>
		</div>
	</div>
</div>
