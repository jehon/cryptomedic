import React from "react";

import FolderElement from "./folder-element";
import Folder from "../business/folder";
import { useLoaderData } from "react-router-dom";
import { getFolder } from "./loaders";

export async function folderLoader({
  params
}: {
  params: any;
}): Promise<Folder> {
  return getFolder(params.folderId);
}

export default function FolderRouter(): React.ReactNode {
  const folder = useLoaderData() as Folder;

  return <FolderElement folder={folder} />;
}
