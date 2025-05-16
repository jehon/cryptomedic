import { type Params, useLoaderData, useParams } from "react-router-dom";
import Folder from "../business/folder";
import { Modes } from "../widget/io-abstract";
import RouteLoading from "../widget/route-loading";
import FolderElement from "./folder-element";
import { getFolder } from "./loaders";

export function patientRouterConfig() {
  return [
    {
      path: "/patient/:id/:selectedType?/:selectedId?/:mode?",
      loader: ({ params }: { params: Params<string> }) =>
        getFolder(params["id"] ?? ""),
      element: <RouteLoading element={<PatientRouter />} />
    }
  ];
}

function PatientRouter(): React.ReactNode {
  const folder = useLoaderData() as Folder;
  const { selectedType, selectedId, mode } = useParams();

  return (
    <FolderElement
      folder={folder}
      selectedType={selectedType}
      selectedId={selectedId}
      mode={mode == "edit" ? Modes.input : Modes.output}
    />
  );
}
