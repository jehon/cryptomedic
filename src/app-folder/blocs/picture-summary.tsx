import React from "react";
import Button from "react-bootstrap/Button";

import "../../styles/x-style-collapsible";
import "../../styles/x-style-panel";
import IOString from "../../widget/io-string";
import IOText from "../../widget/io-text";
import Picture from "../../../legacy/app-old/v2/models/Picture";
import Folder from "../../../legacy/app-old/v2/models/Folder";

export default function PictureSummary({
  file,
  folder
}: {
  file: Picture;
  folder: Folder;
}): React.ReactNode {
  if (!folder) {
    return <div>No folder selected</div>;
  }
  if (!file) {
    return <div>No file selected</div>;
  }
  return (
    <x-style-collabsible opened="1">
      <span slot="header" className="no-mobile">
        <img
          slot="header"
          src="/static/img/picture.gif"
          alt="Picture"
          className="inline"
        />
        Patient
      </span>
      <span slot="header">file.entry_year</span>
      <span slot="header" className="no-mobile">
        file.name
      </span>
      <Button
        href={"#/folder/" + file.getId() + "/"}
        variant="outline-info"
        style={{ width: "100%" }}
      >
        View the Patient
      </Button>
      <div className="columns">
        <x-style-panel label="Informations"></x-style-panel>
        <x-style-panel label="Image"></x-style-panel>
      </div>
    </x-style-collabsible>
  );
}
