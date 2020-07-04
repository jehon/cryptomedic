
import '../widgets/x-graphic-height.js';
import '../widgets/x-graphic-weight.js';
import '../widgets/x-graphic-bmi.js';
import '../widgets/x-graphic-wh.js';

/**
 */
export default class XFolderGraphics extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <div id='headerContainer' class='headerContainer'></div>
        <div class='container-fluid' align='center'>
            <div class='row'>
                <div class="col-lg-6">
                    <x-graphic-weight></x-graphic-weight>
                    <x-graphic-height></x-graphic-height>
                </div>
                <div class="col-lg-6">
                    <x-graphic-wh></x-graphic-wh>
                    <x-graphic-bmi></x-graphic-bmi>
                </div>
            </div>
        </div>
    `;
    }
}

window.customElements.define('x-folder-graphics', XFolderGraphics);
