<?php 
    t::setDefaultOption("baseExpression", "currentFile().");
    t::setDefaultOption("readOnly");
?>
<div id='headerContainer' class='headerContainer'></div>
<div class='container-fluid' align='center' ng-controller="ctrl_allGraphics">
    <div class='row'>
        <div class="col-lg-6">
            <span ng-controller="ctrl_graphic" ng-init="axis('ageAtConsultTime', 'Weightkg')">
                <span ng-include="'/rest/templates/graphic_one.html'"></span>
            </span>
            <span ng-controller="ctrl_graphic" ng-init="axis('ageAtConsultTime', 'Heightcm')">
                <span ng-include="'/rest/templates/graphic_one.html'"></span>
            </span>
        </div>
        <div class="col-lg-6">
            <span ng-controller="ctrl_graphic" ng-init="axis('Heightcm', 'Weightkg')">
                <span ng-include="'/rest/templates/graphic_one.html'"></span>
            </span>
            <span ng-controller="ctrl_graphic" ng-init="axis('ageAtConsultTime', 'bmi')">
                <span ng-include="'/rest/templates/graphic_one.html'"></span>
            </span>
        </div>
    </div>
</div>