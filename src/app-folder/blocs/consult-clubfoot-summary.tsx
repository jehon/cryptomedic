import React from "react";

import ConsultClubfoot from "../../business/club-foot";
import Folder from "../../business/folder";

import Button from "react-bootstrap/Button";
import { ImgSideLeft, ImgSideRight } from "../../widget/images";
import ConsultAbstractIntroduction from "./consult-abstract-introduction";
import ConsultAbstractConclusion from "./consult-abstract-conclusion";

import { icons } from "../../config";
import "../../styles/x-style-collapsible";
import "../../styles/x-style-panel";
import { date2HumanString, normalizeDate } from "../../utils/date";

export default function ConsultClubfootSummary({
  file,
  folder
}: {
  file: ConsultClubfoot;
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
        src={icons.models.consult_clubfoot}
        alt="Clubfoot"
        className="inline"
      />
      <span slot="header" className="no-mobile">
        Clubfoot Consult
      </span>
      <span slot="header">{date2HumanString(normalizeDate(file.date))}</span>
      <span slot="header" className="with-image">
        <ImgSideRight></ImgSideRight>
        {file.getPiraniRight() as number}
      </span>
      <div slot="header" className="with-image">
        <ImgSideLeft></ImgSideLeft>
        {file.getPiraniLeft() as number}
      </div>
      <Button
        href={"#/folder/" + folder.getId() + "/file/ClubFoot/" + file.getId()}
        variant="outline-info"
        style={{ width: "100%" }}
      >
        View
      </Button>
      <ConsultAbstractIntroduction file={file}></ConsultAbstractIntroduction>
      <div className="columns">
        <x-style-panel label="Pirani Right">
          <div className="with-image">
            <ImgSideRight></ImgSideRight>
            Right side
          </div>
        </x-style-panel>
        <x-style-panel label="Pirani Left">
          <div className="with-image">
            <ImgSideLeft></ImgSideLeft>
            Left side
          </div>
        </x-style-panel>
      </div>
      <ConsultAbstractConclusion file={file}></ConsultAbstractConclusion>
    </x-style-collabsible>
  );
}
