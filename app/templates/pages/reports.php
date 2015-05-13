<?php 
	require_once("../../../php/core.php");
?>
<div ng-if="getReport()" class='container-fluid'>
	<div class='row'>
		<div class='col-sm-6'>
			<h1>{{getReport().name}}</h1>
			<div ng-bind-html='getReport().description'></div>
		</div>
		<div class='col-sm-6'>
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
	<div ng-include="getReport().templateUrl" id='report_table'></div>
</div>

<div class='container-fluid' ng-if="!getReport()">
	<div class='row'>
		<div class='col-sm-offset-3 col-sm-6'>
			<fieldset id='add'>
				<legend>Global reporting</legend>
				<div ng-repeat='(k,r) in reports'>
					<h3>{{r.name}}</h3>
					<div ng-bind-html="r.description"></div>
					<br>
					<div>
						<a class='btn btn-primary' href='#/reports/{{k}}'>{{r.name}}</a>
					</div>
				</div>
			</fieldset>
		</div>
	</div>
</div>
