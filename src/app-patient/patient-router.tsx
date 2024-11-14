import { Params, useLoaderData, useParams } from "react-router-dom";
import PatientRelated from "../business/abstracts/patient-related";
import Pojo from "../business/abstracts/pojo";
import Folder from "../business/folder";
import RouteLoading from "../widget/route-loading";
import FolderElement from "./folder-element";
import { getFolder } from "./loaders";

export const Modes = {
  output: "",
  input: "edit"
};

type Mode = (typeof Modes)[keyof typeof Modes];

export function patientRouterToPatient(patientId: string, mode: Mode) {
  // TODO: in the future, remove patient.100 ?
  return `/patient/${patientId}/patient.${patientId}/${mode ? `/${mode}` : ""}`;
}

export function patientRouterToFile(
  patientId: string,
  fileType: typeof Pojo,
  fileId: string,
  mode: Mode
) {
  return `/patient/${patientId}/${fileType.getTechnicalName()}.${fileId}${mode ? `/${mode}` : ""}`;
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
