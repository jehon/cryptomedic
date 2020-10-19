
import { defineCustomElement } from '../../../js/custom-element.js';

/**
 *
 */
export default class XPatientByReference extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <x-group-panel id='add' title='Check if a patient exists, and if not, create it'>
            <div white=true>
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
                <input ng-model="entryyear" ng-change="resetSearched()" type="number" class="form-control"
                    placeholder="Entry year" required autofocus>

                <span>
                    <label>Entry Order</label>
                    <input ng-model="entryorder" ng-change="resetSearched()" type="number" class="form-control"
                        placeholder="Entry order">
                </span>
                <br>
                <div ng-if="(entryyear > 0) && (entryorder > 0)" class="text-center">
                    <x-button action='commit' ng-click="checkReference()">Check it</x-button>
                </div>
                </x-group-panel>
                <x-group-panel ng-if="searched" title='Results'>
                The patient does <b>not</b> exist.
                Do you want to <b>create</b> it?<br>
                <br>
                <x-button action='commit' id="button_create_reference" ng-click="createReference()">
                    <img src="/static/img/go.gif" alt="[go]"> Create the patient
                </x-button>
            </div>
        </x-group-panel>
        `;
    }

    // if (typeof ($scope.entryyear) == 'undefined') {
    //     $scope.searched = false;
    //     $scope.entryyear = (new Date()).getFullYear();
    //     $scope.entryorder = '';
    // }

    // $scope.resetSearched = function () {
    //     $scope.searched = false;
    // };

    // $scope.checkReference = function () {
    //     getDataService()
    //         .then(dataService => dataService.checkReference($scope.entryyear, $scope.entryorder))
    //         .then(function (data) {
    //             if (!data.id) {
    //                 $scope.searched = true;
    //             } else {
    //                 setTimeout(function () {
    //                     goThere('/folder/' + data.id);
    //                 }, 1);
    //             }
    //         }, function (data) {
    //             console.error(data);
    //         });
    //     $scope.searched = true;
    // };

    // $scope.createReference = function () {
    //     getDataService()
    //         .then(dataService => dataService.createReference($scope.entryyear, $scope.entryorder))
    //         .then(function (data) {
    //             // end the busy mode
    //             setTimeout(function () {
    //                 goThere('/folder/' + data.id + '/edit');
    //             }, 1);
    //         }, function (data) {
    //             console.error(data);
    //         });
    //     $scope.searched = true;
    // };
}

defineCustomElement(XPatientByReference);

