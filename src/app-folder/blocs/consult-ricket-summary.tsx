import React from "react";

import ConsultRicket from "../business/ricket-consult";
import Folder from "../business/folder";

import Button from "react-bootstrap/Button";
import ConsultAbstractIntroduction from "./consult-abstract-introduction";
import ConsultAbstractConclusion from "./consult-abstract-conclusion";

import { icons } from "../../config";
import "../../styles/x-style-collapsible";
import "../../styles/x-style-panel";
import { date2HumanString, normalizeDate } from "../../utils/date";

export default function ConsultRicketSummary({
  file,
  folder
}: {
  file: ConsultRicket;
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
      <img
        slot="header"
        src={icons.models.consult_ricket}
        alt="Ricket Consult"
        className="inline"
      />
      <span slot="header" className="no-mobile">
        Ricket Consult
      </span>
      <span slot="header">{date2HumanString(normalizeDate(file.date))}</span>
      <Button
        href={
          "#/folder/" + folder.getId() + "/file/RicketConsult/" + file.getId()
        }
        variant="outline-info"
        style={{ width: "100%" }}
      >
        View
      </Button>
      <ConsultAbstractIntroduction file={file}></ConsultAbstractIntroduction>
      <ConsultAbstractConclusion file={file}></ConsultAbstractConclusion>
    </x-style-collabsible>
  );
}
