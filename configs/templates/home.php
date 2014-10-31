<? 
?>
<div class='container-fluid'>
	<div class='row'>
		<div class='col-sm-offset-3 col-sm-6'>
			<h1 class='text-center'><img src='img/home.gif'>Home</h1>
			<fieldset id='add'>
				<legend>Check if a patient exists, and if not, create it</legend>
				<div ng-if="!searched" style="text-align: left">
					Please enter here your reference (entry year and order).<br>
					<ul>
						<li>If the patient <b>exists</b>, you will be redirected to him/her.</li>
						<li>It the patient does <b>not</b> exists, you will be asked if you want to create him.</li>
		<!-- 				<li>If you want to create a new patient with an <b>autogenerated</b>
							entry order, click this ckeck box:<br>
						</li>
		 -->			</ul>
				</div>
		<!-- 
				<input ng-model="generate" ng-change="resetSearched()" type='checkbox' value='1'> Generate a reference for me<br>
		 -->
				<br>
				<label>Entry Year</label>
		       	<input ng-model="entryyear" ng-change="resetSearched()" type="number" class="form-control" placeholder="Entry year" required autofocus>

		       	<span ng-show="generate != true">
					<label>Entry Order</label>
			       	<input ng-model="entryorder" ng-change="resetSearched()" type="number" class="form-control" placeholder="Entry order">
		       	</span>
				<br>
				<div ng-if="(entryyear > 0) && ((entryorder > 0) || (generate == true))" class="text-center">
					<button ng-click="checkReference()" class="btn btn-primary" >Check it</button>
				</div>
			</fieldset>
			<fieldset ng-if="searched">
				<legend>Results</legend>
				The patient does <b>not</b> exist. 
		 		Do you want to <b>create</b> it?<br>
				<br>
				<button ng-click="createReference()" class="btn btn-primary" >
					<img src="img/go.gif" alt="[go]"> Create the patient
				</button>
			</fieldset>
		</div>
	</div>
</div>