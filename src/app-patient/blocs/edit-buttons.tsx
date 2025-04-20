import PatientRelated from "../../business/abstracts/patient-related";
import ActionConfirm from "../../widget/action-confirm";
import notification from "../../widget/notification";
import { folderFileDelete } from "../loaders";

import type { ButtonContext } from "./button-context";

export default function EditButtons({
  file,
  onDelete,
  // onUpdate,
  context
  // formRef
}: {
  file: PatientRelated;
  onDelete: () => void;
  onUpdate: (file: PatientRelated) => void;
  context: ButtonContext;
  formRef: React.RefObject<HTMLFormElement | null>;
}) {
  if (!context.editMode) {
    return <></>;
  }

  const addMode = !file.getId();

  const doDelete = () =>
    folderFileDelete(file).then(notification("File deleted")).then(onDelete);

  return (
    <>
      {context.canDelete && (
        <ActionConfirm
          style="Delete"
          discrete={true}
          onOk={doDelete}
          requires="folder.delete"
        >
          <div>Are you sure you want to DELETE the File {context.title}?</div>
        </ActionConfirm>
      )}
    </>
  );
}
