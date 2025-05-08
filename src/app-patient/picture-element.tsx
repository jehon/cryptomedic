import Picture from "../business/picture";
import { getList } from "../utils/session";
import IODate from "../widget/io-date";
import IOImage from "../widget/io-image";
import IOList from "../widget/io-list";
import IOString from "../widget/io-string";
import IOText from "../widget/io-text";

import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import patientRelatedElementGenerator, {
  type PatientRelatedElementGeneratorProps
} from "./patient-related-element-generator";

export default function PictureElement({
  file,
  props
}: {
  file: Picture;
  props: PatientRelatedElementGeneratorProps;
}): React.ReactNode {
  return patientRelatedElementGenerator<Picture>(file, props, {
    header: <>{file.type}</>,
    body: (
      <TwoColumns>
        <Panel fixed label="Information">
          <IOList
            name="type"
            value={file.type as string}
            list={getList("PictureType")}
          />
          <IODate name="date" value={file.date} />
          <IOString label="File" value={file.file as string} e2eExcluded />
          <IOText name="comments" value={file.comments as string} />
        </Panel>
        <Panel fixed label="Image">
          <IOImage
            name="fileBlob"
            label="Picture"
            value={file.getPictureUrl() as string}
            required
            create={!file.id}
          />
        </Panel>
      </TwoColumns>
    )
  });
}
