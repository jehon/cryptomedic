import { type Params, useLoaderData, useParams } from "react-router-dom";
import Folder from "../business/folder";
import { Modes } from "../widget/io-abstract";
import RouteLoading from "../widget/route-loading";
import FolderElement from "./folder-element";
import { getFolder } from "./loaders";

export function patientRouterConfig() {
  return [
    {
      path: "/patient/:folderId/:selectedUid?/:mode?",
      loader: ({ params }: { params: Params<string> }) =>
        getFolder(params["folderId"] ?? ""),
      element: <RouteLoading element={<PatientRouter />} />
    }
  ];
}

function PatientRouter(): React.ReactNode {
  const folder = useLoaderData() as Folder;
  const { selectedUid, mode } = useParams();

  return (
    <FolderElement
      folder={folder}
      selectedUid={selectedUid}
      mode={mode == "edit" ? Modes.input : Modes.output}
    />
  );
}
