<?php
  t::setDefaultOption("baseExpression", "getCurrentFile().");

  if (!function_exists("submenu")) {
    function submenu() {
      ?>
        <div ng-if="(page == 'file')" >
          <span ng-if="(mode == 'add')" >
            <!--  Add file route -->
            <span id='button_save' ng-if='hasPermission("folder.edit")' class="btn btn-default" ng-click="actionCreate()">Create/Save</span>
            <span class="btn btn-default" ng-click="actionCancel()">Cancel</span>
          </span>
          <span ng-if="(mode == 'read')">
            <!--  View file route -->
            <span ng-if="currentFile().isLocked()">
              <img src='/static/img/locked.gif' />
              File is locked.
              <span ng-if='!hasPermission("folder.unlock")'>You can not edit it anymore.</span>
              <span ng-if='hasPermission("folder.unlock")' class="btn btn-default" ng-click='actionUnlock()'>
                <img src='/static/img/unlock.gif'>
                Unlock the file
              </span>
            </span>
            <span ng-if="!currentFile().isLocked()" >
              <span id='button_edit' ng-if='hasPermission("folder.edit")' class="btn btn-default" ng-click="go('/folder/' + patient_id + '/file/' + subtype + '/' + subid + '/edit')">Edit</span>
            </span>
          </span>
          <span ng-if="(mode == 'edit')">
            <!--  Modify file route -->
            <span id='button_delete' ng-if='hasPermission("folder.delete")' class="btn btn-default" ng-click="actionDelete()">Delete</span>
            <span ng-if='hasPermission("folder.edit")' class="btn btn-default" ng-click="actionSave()">Save</span>
            <span class="btn btn-default" ng-click="actionCancel()">Cancel</span>
          </span>
        </div>

        <div ng-if="(!page)" >
          <span ng-if="(mode == 'read')">
            <span id='patient_edit' ng-if='hasPermission("folder.edit")' class="btn btn-default" ng-click="go('/folder/' + patient_id + '/edit')">Edit</span>
          </span>
          <span ng-if="(mode == 'edit')">
            <span id='patient_save'   ng-if='hasPermission("folder.edit")' class="btn btn-default" ng-click="actionSavePatient()">Save</span>
            <span id='patient_delete' ng-if='hasPermission("folder.delete") && (folder.getSubFiles().length == 0)' class="btn btn-default" ng-click="actionDeletePatient()">Delete</span>
            <span id='patient_cancel' class="btn btn-default" ng-click="actionCancel()">Cancel</span>
          </span>
          <!--  Modify patient route -->
        </div>

        <div ng-if="patient_id < 0" class='text-center'>
          <!--  Add patient route -->
          <span ng-if='hasPermission("folder.edit")' class="btn btn-default" ng-click="actionCreatePatient()">Create patient</span>
          <span class="btn btn-default" ng-click="go('/home')">Cancel</span>
        </div>
      <?php
    }
  }
?>
<div class='container-fluid modeRead'>
  <div class='row'>
    <div id='folder_menu' ng-if="patient_id >= 0" class="col-sm-2" class="btn-group btn-group-justified btn-group-vertical">
      <a id='button_add' ng-if='hasPermission("folder.edit")' ng-class="{ 'btn-warning': page == 'addfile'}" ng-href="#/folder/{{patient_id}}/addfile" class="btn btn-default" style="width: 100%">Add</a>
      <a ng-class="{ 'btn-warning': page == 'summary'}" ng-href="#/folder/{{patient_id}}/summary" class="btn btn-default" style="width: 100%">Summary</a>
      <a ng-class="{ 'btn-warning': page == 'graphics'}" ng-href="#/folder/{{patient_id}}/graphics" class="btn btn-default" style="width: 100%">Graphics</a>
      <a id='button_patient' ng-class="{ 'btn-warning': !page}" ng-href="#/folder/{{patient_id}}" class="btn btn-default" style="width: 100%">Patient</a>
      <span id='folder_files'>
        <span ng-repeat="f in folder.getSubFiles()" class='folder_file'>
          <a id='folder_menu_{{f._type}}_{{f.id}}' href="#/folder/{{patient_id}}/file/{{f._type}}/{{f.id}}"
              class="btn btn-default left-menu-button"
              ng-class="{ 'btn-warning': page + subtype + subid == 'file' + f._type + f.id }"
              >
            {{f._type}}<span ng-if="f.Date"><br>[{{f.Date }}]</span>
          </a>
        </span>
      </span>
    </div>
    <div class="col-sm-10">
      <div class="submenu .container-fluid">
        <div class="row" ng-if="patient_id >= 0">
          <div class="col-sm-4 text-left" style="font-size: x-small">
            Modified on {{currentFile().updated_at | date:'yyyy-MM-dd HH:mm:ss' }}
            by {{currentFile().lastuser}}
            <br>
            {{folder.getMainFile()._type}}
            #<span id='folder_id'>{{folder.getMainFile().id}}</span> @{{page}}
            -> {{currentFile()._type}} #<span id='file_id'>{{currentFile().id}}</span>
          </div>
          <div class='col-sm-4 text-center' id='topsubmenu'>
            <?php submenu(); ?>
          </div>
        </div>
      </div>
      <form id="fileForm">
        <button id="fileFormSubmit" type='submit' style="display: none">For html5 validation through javascript</button>
        <span ng-include="getTemplateForMe()">
          debug: Content {{getTemplateName()}}
        </span>
        <div class="submenu" id='bottomsubmenu' style='margin-top: 10px'>
          <div class='text-center'>
            <?php submenu(); ?>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
