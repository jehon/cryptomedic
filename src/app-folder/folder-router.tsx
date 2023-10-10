import React from "react";

import FolderElement from "./folder-element";
import Folder from "../business/folder";
import { useLoaderData, useNavigation } from "react-router-dom";
import { getFolder } from "./loaders";
import RouteLoading from "../widget/route-loading";

export async function folderLoader({
  params
}: {
  params: any;
}): Promise<Folder> {
  // await new Promise((r) => setTimeout(r, 10000));
  return getFolder(params.folderId);
}

export default function FolderRouter(): React.ReactNode {
  const navigation = useNavigation();
  const folder = useLoaderData() as Folder;

  if (navigation.state !== "idle") {
    return <RouteLoading />;
  }

  return <FolderElement folder={folder} />;
}
