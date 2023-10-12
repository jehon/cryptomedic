import React from "react";

import FolderElement from "./folder-element";
import Folder from "../business/folder";
import { useLoaderData, useParams } from "react-router-dom";
import { getFolder } from "./loaders";

export async function folderLoader({
  params
}: {
  params: any;
}): Promise<Folder> {
  // await new Promise((r) => setTimeout(r, 2000));
  return getFolder(params.folderId);
}

export default function FolderRouter(): React.ReactNode {
  const folder = useLoaderData() as Folder;
  const { uid } = useParams();

  return <FolderElement folder={folder} uid={uid} />;
}
