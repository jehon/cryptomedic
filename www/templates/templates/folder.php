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
      </div>

      <div ng-if="(!page)">
        <span ng-if="(mode == 'edit')">
          <x-restricted restricted-by='folder.edit'>
            <x-button action='Save' id='patient_save' ng-click="actionSavePatient()">Save</x-button>
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
