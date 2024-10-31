import Picture from "../business/picture";
import { getList } from "../utils/config";

import IO from "../widget/io";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import patientRelatedElementGenerator, {
  PatientRelatedElementGeneratorProps
} from "./patient-related-element-generator";

export default function pictureElementGenerator(
  file: Picture,
  props: PatientRelatedElementGeneratorProps
) {
  return patientRelatedElementGenerator<Picture>(file, props, {
    // TODO: Picture header
    header: <>{file.type}</>,
    body: (
      <TwoColumns>
        <Panel fixed label="Information">
          <IO.List
            name="type"
            value={file.type as string}
            list={getList("PictureType")}
          />
          <IO.Date name="date" value={file.date} />
          <IO.String label="File" value={file.file as string} />
          <IO.Text name="comments" value={file.comments as string} />
        </Panel>
        <Panel fixed label="Image">
          <IO.Image
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
