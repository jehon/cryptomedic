import { getList } from "../utils/session";
import IODate from "../widget/io-date";
import IOImage from "../widget/io-image";
import IOList from "../widget/io-list";
import IOPanelWithNavigation from "../widget/io-panel-with-navigation";
import IOString from "../widget/io-string";
import IOText from "../widget/io-text";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import type { Patient, Picture } from "./objects-patient";
import { type RelatedElementGeneratorProps } from "./patient-related-element-generator";

export default function PictureElement(
  props: { patient: Patient } & RelatedElementGeneratorProps<Picture>
): React.ReactNode {
  return (
    <IOPanelWithNavigation<Picture>
      key={`picture.${props.file.id}`}
      type="picture"
      file={props.file}
      apiRootUrl={`fiche/picture`} // No leading slash!
      edit={props.edit}
      closed={props.closed}
      restrictedTo="folder"
      canBeDeleted={true}
      canBeLocked={true}
      onCreated={props.onCreated}
      onUpdated={props.onUpdated}
      onDeleted={props.onDeleted}
      basePath={`${props.parentPath}/picture/${props.file.id ?? "add"}`}
      header={<>{props.file.type}</>}
    >
      <TwoColumns>
        <Panel fixed label="Information">
          <input
            type="hidden"
            name="patient_id"
            defaultValue={props.patient.id}
          />
          <IOList
            name="type"
            value={props.file.type as string}
            list={getList("PictureType")}
          />
          <IODate name="date" value={props.file.date} />
          <IOString
            label="File"
            value={props.file.file as string}
            e2eExcluded
          />
          <IOText name="comments" value={props.file.comments as string} />
        </Panel>
        <Panel fixed label="Image">
          <IOImage
            name="fileBlob"
            label="Picture"
            value={`/api/picture/${props.file.id ?? ""}`}
            required
            create={!props.file.id}
          />
        </Panel>
      </TwoColumns>
    </IOPanelWithNavigation>
  );
}
