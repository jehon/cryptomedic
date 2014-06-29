<?php 
    require_once(__DIR__ . "/../php/templates.php"); 
    t::setDefaultOption("baseExpression", "currentFile().");
    t::setDefaultOption("readOnly");
?>
<div id='headerContainer' class='headerContainer'></div>
<div align='center' ng-controller="ctrl_allGraphics">
    <table style='width: auto'>
        <tr>
            <td>
                <span ng-controller="ctrl_graphic" ng-init="axis('ageAtConsultTime', 'Weightkg')">
                    <span ng-include="'partials/graphic_one.php'"></span>
                </span>
            </td>
            <td><br/></td>
            <td>
                <span ng-controller="ctrl_graphic" ng-init="axis('ageAtConsultTime', 'Heightcm')">
                    <span ng-include="'partials/graphic_one.php'"></span>
                </span>
            </td>
            <td><br /></td>
        </tr>
        <tr>
            <td>
                <span ng-controller="ctrl_graphic" ng-init="axis('Heightcm', 'Weightkg')">
                    <span ng-include="'partials/graphic_one.php'"></span>
                </span>
            </td>
            <td><br /></td>
            <td>
                <span ng-controller="ctrl_graphic" ng-init="axis('ageAtConsultTime', 'bmi')">
                    <span ng-include="'partials/graphic_one.php'"></span>
                </span>
            </td>
            <td><br /></td>
        </tr>
    </table>
</div>