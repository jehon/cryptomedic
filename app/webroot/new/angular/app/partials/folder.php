<?php 
	require_once(dirname(dirname(dirname(__DIR__))) . "/libs/php/templates.php");
	t::setDefaultOption("baseExpression", "getCurrentFile().");
?>
<span class="modeRead">
	<div class="col-sm-2" class="btn-group btn-group-justified btn-group-vertical">
		<a ng-class="{ 'btn-warning': page === 'summary'}" ng-href="#/folder/{{id()}}/summary" class="btn btn-default" style="width: 100%">Summary</a>
		<a ng-class="{ 'btn-warning': page === 'graphics'}" href="#/folder/{{id()}}/graphics" class="btn btn-default" style="width: 100%">Graphics</a>
		<a ng-class="{ 'btn-warning': page === ''}" href="#/folder/{{id()}}/" class="btn btn-default" style="width: 100%">Patient</a>
		<span ng-repeat="f in folder.getSubFiles()">
			<a href="#/folder/{{id()}}/{{$index}}" 
					class="btn btn-default left-menu-button"
					ng-class="{ 'btn-warning': page === $index }"
					>
				{{f._type}} <span ng-if="f.Date">[{{f.Date | date:'<?php echo $dateFormat; ?>'}}]</span> 
			</a>
		</span>
		<a ng-class="{ 'btn-warning': page === 'reporting'}" ng-href="#/folder/{{id()}}/reporting" class="btn btn-default" style="width: 100%">Reporting</a>
	</div>
	<div class="col-sm-10">
		<div class="submenu .container-fluid">
			<div class="row">
				<div class="col-sm-4 text-left" style="font-size: x-small">
					Modified on {{currentFile().modified | date:'yyyy-MM-dd HH:mm:ss' }}
					by {{currentFile().lastuser}}
					<br>
					{{folder.getMainFile()._type}} #{{folder.getMainFile().id}} @{{page}} -> {{currentFile()._type}} #{{currentFile().id}}
				</div>
				<div class="col-sm-4 text-center" ng-if="pageIsFile || (page == '')" >
					<span ng-if="currentFile().isLocked()">
						<img src='img/locked.gif' />
						File is locked.
						<span ng-if='!hasPermission("folder.unlock")'>You can not edit it anymore.</span>
						<span ng-if='hasPermission("folder.unlock")' class="notModeWrite btn btn-default" ng-click='actionUnlock()'>
							<img src='img/unlock.gif'>
							Unlock the file
						</span>
					</span>
					<span ng-if="!currentFile().isLocked()">
			 			<span ng-if='hasPermission("folder.edit")' class="notModeWrite btn btn-default" ng-click="go('/folder/' + folder.id + '/' + page + '/edit')">Edit</span>
						<span ng-if='hasPermission("folder.edit")' class="notModeRead btn btn-default" ng-click="actionSave()">Save</span>
			 			<span class="notModeRead btn btn-default" ng-click="actionCancel()">Cancel</span>
						<!-- <span ng-if='hasPermission("folder.delete")' class="notModeWrite btn btn-default">Delete</span> -->
			 		</span>
				</div>
			</div>
		</div>
		<span ng-controller="ctrl_file">
			<span ng-include="'partials/' + name() + '.php'">
				debug: Content {{page}}
			</span>
		</span>
	</div>
</span>