<x-page-folder>
  <?php
  t::setDefaultOption("baseExpression", "getCurrentFile().");

  if (!function_exists("submenu")) {
    function submenu()
    {
      ?>
      <div ng-if="(page == 'file')">
        <span ng-if="(mode == 'add')">
          <!--  Add file route -->
          <x-restricted restricted-by='folder.edit'>
            <x-button action='Save' id='button_save' ng-click="actionCreate()">Create/Save</x-button>
          </x-restricted>
          <x-button action='Cancel' id='button_cancel' ng-click="actionCancel()">Cancel</x-button>
        </span>
        <span ng-if="(mode == 'read')">
          <!--  View file route -->
          <span ng-if="currentFile().isLocked()">
            <img src='/static/img/locked.gif' />
            File is locked.
            <x-restricted restricted-by='folder.unlock' inverted>
              You can not edit it anymore.
            </x-restricted>
            <x-restricted restricted-by='folder.unlock'>
              <x-button action='Save' id='button_unlock' ng-click='actionUnlock()'>
                <img src='/static/img/unlock.gif'>
                Unlock the file
              </x-button>
            </x-restricted>
          </span>
          <span ng-if="!currentFile().isLocked()">
            <x-restricted restricted-by='folder.edit'>
              <x-button action='Edit' id='button_edit' ng-click="go('/folder/' + patient_id + '/file/' + subtype + '/' + subid + '/edit')">Edit</x-button>
            </x-restricted>
          </span>
        </span>
        <span ng-if="(mode == 'edit')">
          <!--  Modify file route -->
          <x-restricted restricted-by='folder.delete'>
            <x-button action='Delete' id='button_delete' ng-click='actionDelete()'>Delete</x-button>
          </x-restricted>
          <x-restricted restricted-by='folder.edit'>
            <x-button action='Save' id='button_save' ng-click="actionSave()">Save</x-button>
          </x-restricted>
          <x-button action='Cancel' id='button_cancel' ng-click="actionCancel()">Cancel</x-button>
        </span>
      </div>

      <div ng-if="(!page)">
        <span ng-if="(mode == 'read')">
          <x-restricted restricted-by='folder.edit'>
            <x-button action='Edit' id='patient_edit' ng-click="go('/folder/' + patient_id + '/edit')">Edit</x-button>
          </x-restricted>
        </span>
        <span ng-if="(mode == 'edit')">
          <x-restricted restricted-by='folder.edit'>
            <x-button action='Save' id='patient_save' ng-click="actionSavePatient()">Save</x-button>
          </x-restricted>
          <x-restricted restricted-by='folder.delete'>
            <x-button action='Delete' id='patient_delete' ng-if='(folder.getFilesRelatedToPatient().length == 0)' ng-click="actionDeletePatient()">Delete</x-button>
          </x-restricted>
          <x-button action='Cancel' id='patient_cancel' ng-click="actionCancel()">Cancel</x-button>
        </span>
        <!--  Modify patient route -->
      </div>

      <div ng-if="patient_id < 0" class='text-center'>
        <!--  Add patient route -->
        <x-restricted restricted-by='folder.edit'>
          <x-button id='patient_create' ng-click="actionCreatePatient()">Create patient</x-button>
        </x-restricted>
        <x-button action='Cancel' id='patient_cancel' ng-click="go('/home')">Cancel</x-button>
      </div>
  <?php
    }
  }
  ?>
  <div id="folderpage" class='container-fluid mode-read'>
    <form id="fileForm">
      <button id="fileFormSubmit" type='submit' style="display: none">For html5 validation through javascript</button>
      <span ng-include="getTemplateForMe()" onload="reinject()">
        debug: Content {{getTemplateName()}}
      </span>
      <div class="submenu" id='bottomsubmenu' style='margin-top: 10px'>
        <div class='text-center'>
          <?php submenu(); ?>
        </div>
      </div>
    </form>
  </div>
</x-page-folder>