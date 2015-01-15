<div ng-if="getReport()" class='container-fluid'>
	<div class='row'>
		<div class='col-sm-offset-3 col-sm-6'>
			<fieldset>
				<legend>Parameters</legend>
				<form class="form-horizontal" role="form">
			    	<div ng-if="isParam('examiner')" class="form-group">
			        	<label class="col-sm-2 control-label">Examiner</label>
			        	<div class="col-sm-10">
			                <select name='center' ng-model='values.examiner' class="form-control">
			                <?php 
			                	echo "<option value='' >* Anybody *</option>"; 
			                	foreach(References::$lists['examiner'] as $k => $v) 
			                        echo "<option value=\"". htmlentities($v). "\" >$v</option>"; 
							?>
			                </select>
			        	</div>
			        </div>
			    	<div ng-if="isParam('center')" class="form-group">
				        <label class="col-sm-2 control-label">Where ?</label>
			        	<div class="col-sm-10">
			                <select name='center' ng-model='values.center' class="form-control">
			                <?php 
			                	echo "<option value='' >* Any place *</option>"; 
			                	foreach(References::$lists['Centers'] as $k => $v) 
			                        echo "<option value=\"". htmlentities($v). "\"' >$v</option>"; 
							?>
			                </select>
			            </div>
				    </div>
			      	<div ng-if="isParam('date')" class="form-group">
				        <label class="col-sm-2 control-label">When ?</label>
			        	<div class="col-sm-10">
							<input name='date' type='date' ng-model='values.date' class="form-control">
						</div>
				    </div>
			      	<div ng-if="isParam('month')" class="form-group">
				        <label class="col-sm-2 control-label">Month (yyyy-mm)</label>
			        	<div class="col-sm-10">
							<input name='month' ng-model='values.month' class="form-control">
						</div>
				    </div>
			    	<div class="form-group">
			    	    <div class="col-sm-offset-2 col-sm-10">
					        <div class='btn btn-primary' ng-click="refresh()">Refresh</div>
					    </div>
				    </div>
			    </form>
	        </fieldset>
	    </div>
	</div>
    <hr>
    <div class='text-right'>
		    <a class='btn' style='background-color: green; color: white' 
		    		download="somedata.xls" 
		    		href="#"  
		    		onclick="return ExcellentExport.excel(this, jQuery('#report_table table')[0], 'cryptomedic');">
		    	Export current table in XLS</a>
    </div>
	<div ng-include="'/rest/reports/' + url	" id='report_table'></div>
</div>

<div class='container-fluid' ng-if="!getReport()">
	<div class='row'>
		<div class='col-sm-offset-3 col-sm-6'>
			<fieldset id='add'>
				<legend>Global reporting</legend>
				<h3>Daily Report</h3>
				If you want to know your daily activity, choose this report.<br>
				Options: the day, and optionnaly the examiner and the center.<br>
				<br>
				<a class='btn btn-primary' href='#/reports/dailyActivity'>Daily report</a>
				<br>

				<h3>Monthly Activity Report</h3>
				If you want to know your activity on a month, choose this report<br>
				Options: the month, and optionnaly the examiner and the center.<br>
				<br>
				<a class='btn btn-primary' href='#/reports/monthlyActivity'>Monthly Activity Report</a>
				<br>
				
				<h3>Monthly Statistical Report</h3>
				If you want to know the monthly activity of the SARPV CDC, choose this report<br>
				Options: the month.<br>
				<br>
				<a class='btn btn-primary' href='#/reports/monthlyStatistical'>Monthly Statistical Report</a>
				<br>
			
<!-- 				<h3>Activity report</h3> -->
<!-- 				Report what has been done this last 12 months in the applications.<br> -->

<!-- 				<a class='btn btn-primary' href='#/reports/activity'>Activity report</a> -->
				<br>
			</fieldset>
		</div>
	</div>
</div>
