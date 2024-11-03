import { useState } from "react";
import { Optional } from "../utils/generic-types";
import IOAbstract, { IOProps, IOPropsInput } from "./io-abstract";
import "./io-image.css";

// For styling, see io.css

export default function IOImage(
  props: IOProps<Optional<string>> & { create: boolean }
) {
  const [top, setTop] = useState(false);

  const value = props.value;

  if (!value) {
    return "No image";
  }

  const renderOutputFn = (value: IOPropsInput<Optional<string>>) => (
    <div className="io-img" onClick={() => setTop(!top)}>
      <img data-role="image" src={value + "/thumbnail"} alt="Content" />
      <img
        data-decorator
        src="/static/img/io/fullscreen.svg"
        alt="Fullscreen"
      />
    </div>
  );

  return top ? (
    <div className="io-img fullscreen" onClick={() => setTop(!top)}>
      <img data-role="image" src={value} alt="Content" />
      <img data-decorator src="/static/img/io/exit.svg" alt="Exit" />
    </div>
  ) : (
    IOAbstract(
      { ...props, type: "image" },
      {
        renderOutput: renderOutputFn,
        renderInput: (value, uuid) =>
          props.create ? (
            <div>
              <input
                id={uuid}
                className="form-control"
                name={props.name}
                type="file"
                accept="image/*"
                required={props.required}
                {...props.htmlProps}
              />
              <br />
              <div className="with-image">
                <img
                  src="/static/img/smartphone.svg"
                  style={{ width: "50px" }}
                />
                <div>
                  If you are currently on smartphone, clicking on the button
                  above should allow you to take a photo with your camera, and
                  to upload it immediately.
                </div>
              </div>
            </div>
          ) : (
            renderOutputFn(value)
          )
      }
    )
  );
}

// TODO: snapshot of image?
// TODO: reduce image?

// Change the uploaded image? https://dev.to/code_rabbi/programmatically-setting-file-inputs-in-javascript-2p7i
// Resize image before upload? https://stackoverflow.com/questions/61740953/reactjs-resize-image-before-upload

// static dataURItoBlob(dataURI, name = "test") {
//   // https://stackoverflow.com/a/5100158/1954789
//   // convert base64/URLEncoded data component to raw binary data held in a string
//   var byteString;
//   // if (dataURI.split(',')[0].indexOf('base64') >= 0) {
//   byteString = atob(dataURI.split(",")[1]);
//   // } else {
//   //     byteString = unescape(dataURI.split(',')[1]);
//   // }

//   // separate out the mime component
//   var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

//   // write the bytes of the string to a typed array
//   var ia = new Uint8Array(byteString.length);
//   for (var i = 0; i < byteString.length; i++) {
//     ia[i] = byteString.charCodeAt(i);
//   }

//   const blob = new Blob([ia], { type: mimeString });
//   blob["lastModifiedDate"] = "";
//   blob["name"] = name;

//   return blob;
// }

//   this._maxSize = 300 * 1024;
//       <input id="file" type="file" name="fileContent" accept="image/*"><br>
//   this[inputElement].addEventListener("change", () =>
//     this._generatePreview(this[inputElement].files[0])
//   );

// _generatePreview(file) {
//   this.block();
//   this._value = false;

//   // Erase preview

//   // http://hacks.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
//   if (!file.type.match(/image.*/)) {
//     console.error("Not a picture?");
//     alert(
//       "Are you sure it is a picture? If it is a picture, please send it by email to jeanhonlet@gmail.com to debug the application. Thank you"
//     );
//   }

//   var imgBuilder = document.createElement("img");
//   var reader = new FileReader();

//   reader.onerror = function (e) {
//     console.error(e);
//     this.free();
//   };

//   reader.onload = (e) => {
//     imgBuilder.src = e.target.result;

//     imgBuilder.onload = () => {
//       const ctx = this[previewElement].getContext("2d");

//       let schrink = 1;
//       let h = imgBuilder.naturalHeight;
//       let w = imgBuilder.naturalWidth;

//       // Resize the image
//       if (h * w > this._maxSize) {
//         schrink = Math.sqrt((h * w) / this._maxSize);
//         w = w / schrink;
//         h = h / schrink;
//       }

//       // Adapt the this[previewElement]
//       this[previewElement].width = w;
//       this[previewElement].height = h;
//       this[previewElement].style.width = w;
//       this[previewElement].style.height = h;

//       // Add the image to the this[previewElement]
//       ctx.drawImage(imgBuilder, 0, 0, w, h);
//       this[previewElement].style.display = "block";

//       this._value = this[previewElement].toDataURL("image/jpeg");
//       this.fire("blur");
//       this.free();
//     };
//   };
//   reader.readAsDataURL(file);
// }
