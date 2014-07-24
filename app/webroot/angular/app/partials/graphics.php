<?php 
    require_once(__DIR__ . "/../php/templates.php"); 
    t::setDefaultOption("baseExpression", "currentFile().");
    t::setDefaultOption("readOnly");
?>
<div id='headerContainer' class='headerContainer'></div>
<div align='center' ng-controller="ctrl_allGraphics">
    <div class="col-lg-6">
        <span ng-controller="ctrl_graphic" ng-init="axis('ageAtConsultTime', 'Weightkg')">
            <span ng-include="'partials/graphic_one.php'"></span>
        </span>
        <span ng-controller="ctrl_graphic" ng-init="axis('ageAtConsultTime', 'Heightcm')">
            <span ng-include="'partials/graphic_one.php'"></span>
        </span>
    </div>
    <div class="col-lg-6">
        <span ng-controller="ctrl_graphic" ng-init="axis('Heightcm', 'Weightkg')">
            <span ng-include="'partials/graphic_one.php'"></span>
        </span>
        <span ng-controller="ctrl_graphic" ng-init="axis('ageAtConsultTime', 'bmi')">
            <span ng-include="'partials/graphic_one.php'"></span>
        </span>
    </div>
</div>