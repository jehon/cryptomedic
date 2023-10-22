import React from "react";

import { useLoaderData, useParams } from "react-router-dom";
import Folder from "../business/folder";
import FolderElement from "./folder-element";
import { getFolder } from "./loaders";

export async function patientLoader({
  params
}: {
  params: any;
}): Promise<Folder> {
  return getFolder(params.folderId);
}

export default function PatientRouter(): React.ReactNode {
  const folder = useLoaderData() as Folder;
  const { uid } = useParams();

  return <FolderElement folder={folder} uid={uid} />;
}
