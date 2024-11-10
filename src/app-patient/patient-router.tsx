import { Params, useLoaderData, useParams } from "react-router-dom";
import PatientRelated from "../business/abstracts/patient-related";
import Folder from "../business/folder";
import RouteLoading from "../widget/route-loading";
import FolderElement from "./folder-element";
import { getFolder } from "./loaders";

type Mode = "edit" | "";

export function patientRouterToPatient(patientId: string, mode?: Mode) {
  // TODO: in the future, remove patient.100 ?
  return `/patient/${patientId}/patient.${patientId}/${mode ? `/${mode}` : ""}`;
}

export function patientRouterToFile(
  patientId: string,
  p: PatientRelated,
  mode?: Mode
) {
  return `/patient/${patientId}/${p?.uid() ?? ""}${mode ? `/${mode}` : ""}`;
}

export function patientRouterToFileAdd(
  patientId: string,
  type: typeof PatientRelated
) {
  return `/patient/${patientId}/${type.getTechnicalName()}.add`;
}

export function patientRouterConfig() {
  return [
    {
      // TODO: Temporary
      path: "/folder/:folderId/summary/:selectedUid?/:mode?",
      loader: ({ params }: { params: Params<string> }) =>
        getFolder(params["folderId"] ?? ""),
      element: <RouteLoading element={<PatientRouter />} />
    },
    {
      // TODO: Temporary
      path: "/patient/-1/edit",
      Component: () => {
        window.location.href = "#/folder/-1/edit";
        return null;
      }
    },
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
    <FolderElement folder={folder} selectedUid={selectedUid} mode={mode} />
  );
}
