import React from "react";

import { useLoaderData, useParams } from "react-router-dom";
import Folder from "../business/folder";
import FolderElement from "./folder-element";
import { getFolder } from "./loaders";

export async function folderLoader({
  params
}: {
  params: { folderId: string };
}): Promise<Folder> {
  params as { folderId: string };

  return getFolder(params.folderId);
}

export default function FolderRouter(): React.ReactNode {
  const folder = useLoaderData() as Folder;
  const { uid } = useParams();

  return <FolderElement folder={folder} uid={uid} />;
}
