
/* istanbul ignore file */

import XWaiting from './x-waiting.js';

const previewElement = Symbol('previewElement');
const inputElement = Symbol('inputElement');

export default class XInputPicture extends XWaiting {
    static get properties() {
        return {
            'value': 'String',
            'maxSize': 'Integer'
        };
    }

    static dataURItoBlob(dataURI, name = 'test') {
        // https://stackoverflow.com/a/5100158/1954789
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        // if (dataURI.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataURI.split(',')[1]);
        // } else {
        //     byteString = unescape(dataURI.split(',')[1]);
        // }

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([ia], { type: mimeString });
        blob['lastModifiedDate'] = '';
        blob['name'] = name;

        return blob;
    }

    constructor() {
        super();
        this.free();
        this._maxSize = 300 * 1024;

        this.shadowRoot.innerHTML +=
			`<style>
					x-input-picture * {
						width: 100%;
					}
				</style>
				<input id="file" type="file" name="fileContent" accept="image/*"><br>
				<div class='text-center'>
					<canvas></canvas>
				</div>`;
        this[inputElement] = this.shadowRoot.querySelector('input');
        this[previewElement] = this.shadowRoot.querySelector('canvas');

        /* istanbul ignore next: impossible to set "file" property of input */
        this[inputElement].addEventListener('change', () => this._generatePreview(this[inputElement].files[0]));
    }

    _generatePreview(file) {
        this.block();
        this._value = false;

        // Erase preview

        // http://hacks.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
        // TODO: handle this in x-general-error
        if (!file.type.match(/image.*/)) {
            console.error('Not a picture?');
            alert('Are you sure it is a picture? If it is a picture, please send it by email to marielineet.jean@gmail.com to debug the application. Thank you');
        }

        var imgBuilder = document.createElement('img');
        var reader = new FileReader();

        /* istanbul ignore next: no documentation found on error causes... */
        reader.onerror = function (e) {
            console.error(e);
            this.free();
        };

        reader.onload = (e) => {
            imgBuilder.src = e.target.result;

            imgBuilder.onload = () => {
                const ctx = this[previewElement].getContext('2d');

                let schrink = 1;
                let h = imgBuilder.naturalHeight;
                let w = imgBuilder.naturalWidth;

                // Resize the image
                if (h * w > this._maxSize) {
                    schrink = Math.sqrt(h * w / this._maxSize);
                    w = w / schrink;
                    h = h / schrink;
                }

                // Adapt the this[previewElement]
                this[previewElement].width = w;
                this[previewElement].height = h;
                this[previewElement].style.width = w;
                this[previewElement].style.height = h;

                // Add the image to the this[previewElement]
                ctx.drawImage(imgBuilder, 0, 0, w, h);
                this[previewElement].style.display = 'block';

                this._value = this[previewElement].toDataURL('image/jpeg');
                this.fire('blur');
                this.free();
            };
        };
        reader.readAsDataURL(file);
    }
}

window.customElements.define('x-input-picture', XInputPicture);
