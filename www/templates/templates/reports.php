<span>
  <?php

  use App\Model\References;
  ?>
  <cryptomedic-data-service id='reportService'>
    <div ng-if="getReport()" class='container-fluid'>
      <div class='row'>
        <div class='col-sm-6'>
          <h1>{{getReport().name}}</h1>
          <div ng-bind-html='getReport().description'></div>
        </div>
        <div class='col-sm-6'>
          <x-group-panel title='Parameters'>
            <form id='reportParamsForm' class="form-horizontal" role="form">
              <div ng-if="isParam('examiner')" class="form-group">
                <label class="col-sm-2 control-label">Examiner</label>
                <div class="col-sm-10">
                  <select name='examiner' ng-model='values.examiner' class="form-control">
                    <?php
                    echo "<option value='' >* Anybody *</option>";
                    foreach (References::getList('Examiner') as $v)
                      echo "<option value=\"" . htmlentities($v) . "\" >$v</option>";
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
                    foreach (References::getList('Centers') as $v)
                      echo "<option value=\"" . htmlentities($v) . "\" >$v</option>";
                    ?>
                  </select>
                </div>
              </div>
              <div ng-if="isParam('period')" class="form-group">
                <label class="col-sm-2 control-label">Period</label>
                <div class="col-sm-10">
                  <input type='radio' ng-model="values.period" name='period' value='day'>Day
                  <input type='radio' ng-model="values.period" name='period' value='month'>Month
                  <input type='radio' ng-model="values.period" name='period' value='year'>Year
                </div>
              </div>
              <div ng-if="isParam('day')" class="form-group">
                <label class="col-sm-2 control-label">Day (yyyy-mm-dd)?</label>
                <div class="col-sm-10">
                  <x-input-date name='day' value='{{values.day}}' class="form-control">
                </div>
              </div>
              <div ng-if="isParam('month')" class="form-group">
                <label class="col-sm-2 control-label">Month (yyyy-mm)</label>
                <div class="col-sm-10">
                  <input name='month' ng-model='values.month' class="form-control">
                </div>
              </div>
              <div ng-if="isParam('year')" class="form-group">
                <label class="col-sm-2 control-label">Year (yyyy)</label>
                <div class="col-sm-10">
                  <input name='year' ng-model='values.year' class="form-control">
                </div>
              </div>
              <div ng-if="isParam('activity')" class="form-group">
                <label class="col-sm-2 control-label">Activity</label>
                <div class="col-sm-10">
                  <select ng-model="values.activity">
                    <option value=''>any</option>
                    <option value='consult'>consult</option>
                    <option value='workshop'>workshop</option>
                    <option value='surgical'>surgical</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                  <x-button action='commit' id='report_refresh_button' ng-click="refresh()">Refresh</x-button>
                </div>
              </div>
            </form>
          </x-group-panel>
        </div>
      </div>
      <hr>
      <div ng-if="isParam('year')" class='alert alert-warning'>
        Attention! Generating a yearly report may take a very very long time (ex: 5 minutes).
      </div>
      <div>
        <div ng-if="result && error" class='alert alert-danger'>
          Please fill in parameters (at least the day, month or year).<br>
          {{error}}
        </div>
        <div ng-if="!result && !error">
          <div class='alert alert-info'>Please press "refresh" to generate the report</div>
        </div>
        <div ng-if="result && !error">
          <div class='text-right'>
            <a style='display: none' id='report_download_button' download="{{reportName()}}.xls">download</a>
            <x-button action='alternate' xid='report_download_button' ng-click='generate($event)'>
              Export current table in XLS
            </x-button>
            <!-- onclick="return jQuery('.online').remove() & ExcellentExport.excel(this, jQuery('#report_table table')[0], 'cryptomedic');"> -->
          </div>
          <div ng-include="getReport().templateUrl" id='report_table'></div>
        </div>
      </div>
    </div>
  </cryptomedic-data-service>

  <div class='container-fluid' ng-if="!getReport()">
    <div class='row'>
      <div class='col-sm-offset-3 col-sm-6'>
        <x-group-panel id='add' title='Global reporting'>
          <div ng-repeat='(k,r) in reports'>
            <h3>{{r.name}}</h3>
            <div ng-bind-html="r.description"></div>
            <br>
            <div>
              <x-button action='commit' id='launch_report_{{k}}' to-route='#/reports/{{k}}'>{{r.name}}</x-button>
            </div>
          </div>
        </x-group-panel>
      </div>
    </div>
  </div>
</span>