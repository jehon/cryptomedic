import React from "react";

import ConsultRicket from "../business/ricket-consult";
import Folder from "../business/folder";

import Button from "react-bootstrap/Button";
import ConsultAbstractIntroduction from "./blocs/consult-abstract-introduction";
import ConsultAbstractConclusion from "./blocs/consult-abstract-conclusion";

import TwoColumns from "../widget/two-columns";
import Panel from "../widget/panel";
import IO from "../widget/io";
import { icons } from "../config";
import { date2HumanString, normalizeDate } from "../utils/date";

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
    <Panel
      headers={[
        <img
          src={icons.models.consult_ricket}
          alt="Ricket Consult"
          className="inline"
        />,
        <span className="no-mobile">Ricket Consult</span>,
        <span>{date2HumanString(normalizeDate(file.date))}</span>
      ]}
    >
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
      <TwoColumns> </TwoColumns>
      <ConsultAbstractConclusion file={file}></ConsultAbstractConclusion>
    </Panel>
  );
}
