import { getList } from "../utils/session";
import IODate from "../widget/io-date";
import IOImage from "../widget/io-image";
import IOList from "../widget/io-list";
import IOString from "../widget/io-string";
import IOText from "../widget/io-text";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import FilePanel from "./blocs/file-panel";
import type { Picture } from "./objects";
import {
  patientRelatedPropsGenerator,
  type PatientRelatedElementGeneratorProps
} from "./patient-related-element-generator";

export default function PictureElement(
  props: PatientRelatedElementGeneratorProps<Picture>
): React.ReactNode {
  return (
    <FilePanel<Picture>
      key={`picture.${props.file.id}`}
      type="picture"
      file={props.file}
      {...patientRelatedPropsGenerator({
        ...props,
        type: "picture"
      })}
      canBeDeleted={true}
      canBeLocked={true}
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
    </FilePanel>
  );
}
