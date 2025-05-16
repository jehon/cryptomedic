import { useParams } from "react-router-dom";
import { Modes } from "../widget/io-abstract";
import FolderElement from "./folder-element";

export function patientRouterConfig() {
  return [
    {
      path: "/patient/:id/:selectedType?/:selectedId?/:mode?",
      element: <PatientRouter />
    }
  ];
}

function PatientRouter(): React.ReactNode {
  const { id, selectedType, selectedId, mode } = useParams();

  return (
    <FolderElement
      id={id!}
      selectedType={selectedType}
      selectedId={selectedId}
      mode={mode == "edit" ? Modes.input : Modes.output}
    />
  );
}
