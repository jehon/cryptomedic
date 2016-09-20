<div class='container-fluid'>
	<h1 class='text-center'><img src='/static/img/home.gif'>Home</h1>
	<div class='row'>
		<div class='col-sm-6'>
			<fieldset id='add'>
				<legend>Check if a patient exists, and if not, create it</legend>
				<div ng-if="!searched" style="text-align: left">
					Please enter here your reference (entry year and order).<br>
					<ul>
						<li>If the patient <b>exists</b>, you will be redirected to him/her.</li>
						<li>It the patient does <b>not</b> exists, you will be asked if you want to create him.</li>
						</li>
					</ul>
				</div>

				<br>
				<label>Entry Year</label>
		       	<input ng-model="entryyear" ng-change="resetSearched()" type="number" class="form-control" placeholder="Entry year" required autofocus>

		       	<span>
					<label>Entry Order</label>
			       	<input ng-model="entryorder" ng-change="resetSearched()" type="number" class="form-control" placeholder="Entry order">
		       	</span>
				<br>
				<div ng-if="(entryyear > 0) && (entryorder > 0)" class="text-center">
					<button ng-click="checkReference()" class="btn btn-primary" >Check it</button>
				</div>
			</fieldset>
			<fieldset ng-if="searched">
				<legend>Results</legend>
				The patient does <b>not</b> exist.
		 		Do you want to <b>create</b> it?<br>
				<br>
				<button id="button_create_reference" ng-click="createReference()" class="btn btn-primary" >
					<img src="/static/img/go.gif" alt="[go]"> Create the patient
				</button>
			</fieldset>
		</div>
		<div class='col-sm-6'>
			<fieldset>
				<legend>Create a reference for me</legend>
				If you want to create a new patient with an <b>autogenerated</b>
					entry order, choose this option.<br>
				On the next page, the system will ask you what year you want to use.<br>
				This new system is on time faster than the old one.<br>
				<span id='button_generate_reference' class='btn btn-warning' ng-click="generateReference()">Generate a reference for me</span>
			</fieldset>
		</div>
	</div>
</div>
