import { useLoaderData, useParams } from "react-router-dom";
import PatientRelated from "../business/abstracts/patient-related";
import Folder from "../business/folder";
import RouteLoading from "../widget/route-loading";
import FolderElement from "./folder-element";
import { getFolder } from "./loaders";

export function patientRouterToFile(
  f: Folder,
  p?: PatientRelated,
  mode?: "edit"
) {
  return `/folder/${f.getId()}/summary/${p?.uid() ?? ""}${mode ? `/${mode}` : ""}`;
}

export function patientRouterToFileAdd(f: Folder, type: typeof PatientRelated) {
  return `/folder/${f.getId()}/summary/${type.getTechnicalName()}.add`;
}

export function patientRouterConfig() {
  return [
    {
      // TODO: Temporary
      path: "/folder/:folderId/summary/:selectedUid?/:mode?",
      loader: patientLoader,
      element: <RouteLoading element={<PatientRouter />} />
    },
    {
      // Under !patient! route
      path: "/patient/:folderId/:selectedUid?/:mode?",
      loader: patientLoader,
      element: <RouteLoading element={<PatientRouter />} />
    }
  ];
}

function patientLoader({ params }: { params: any }): Promise<Folder> {
  return getFolder(params.folderId);
}

function PatientRouter(): React.ReactNode {
  const folder = useLoaderData() as Folder;
  const { selectedUid, mode } = useParams();

  return (
    <FolderElement folder={folder} selectedUid={selectedUid} mode={mode} />
  );
}
