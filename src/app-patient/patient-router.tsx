import React from "react";

import { useLoaderData, useParams } from "react-router-dom";
import Pojo from "../business/abstracts/pojo";
import Folder from "../business/folder";
import RouteLoading from "../widget/route-loading";
import { getFolder } from "./loaders";
import PatientElement from "./patient-element";

export function patientRouterToFile(f: Folder, p?: Pojo) {
  return `#/folder/${f.getId()}/summary/` + (p?.uid() ?? "");
}

export function patientRouterConfig() {
  return [
    {
      // TODO: Temporary
      path: "/folder/:folderId/summary/:selectedUid?",
      loader: patientLoader,
      element: <RouteLoading element={<PatientRouter />} />
    },
    {
      // Under !patient! route
      path: "/patient/:folderId/:selectedUid?",
      loader: patientLoader,
      element: <RouteLoading element={<PatientRouter />} />
    }
  ];
}

export function patientLoader({ params }: { params: any }): Promise<Folder> {
  return getFolder(params.folderId);
}

export default function PatientRouter(): React.ReactNode {
  const folder = useLoaderData() as Folder;
  const { selectedUid } = useParams();

  return <PatientElement folder={folder} selectedUid={selectedUid} />;
}
