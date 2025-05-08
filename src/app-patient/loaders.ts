import type PatientRelated from "../business/abstracts/patient-related";
import Pojo from "../business/abstracts/pojo";
import Folder from "../business/folder";
import { CRUD, request } from "../utils/network";

export function getFolder(id: string): Promise<Folder> {
  return request({ url: ["folder", "Patient", id] })
    .then((json) => json.folder)
    .then((json) => new Folder(json));
}

export function folderFileUnlock<T extends Pojo>(file: T): Promise<T> {
  // See www/api/app/Http/Controllers/FicheController.php
  return request({
    url: [
      "fiche",
      file.getStatic().getTechnicalName(),
      "unlock",
      file.id || ""
    ],
    method: CRUD.update
  })
    .then((json) => json.file)
    .then((json) => file.getStatic().factory(json) as T);
}

export function folderFileDelete<T extends Pojo>(
  file: T
): Promise<Folder | undefined> {
  // See www/api/app/Http/Controllers/FicheController.php
  return (
    request({
      url: ["fiche", file.getStatic().getTechnicalName(), file.id || ""],
      method: CRUD.delete
    })
      .then((json) => json.folder)
      // TODO: Should have a better return from server when nothing remain!
      .then((json) => (json && json.length > 0 ? new Folder(json) : undefined))
  );
}

export function folderFileCreate<T extends PatientRelated>(
  file: T,
  formData: FormData
): Promise<T> {
  return request({
    url: ["fiche", file.getStatic().getTechnicalName()],
    method: CRUD.create,
    formData
  })
    .then((json) => ({
      newKey: "" + json.newKey,
      folder: new Folder(json.folder)
    }))
    .then(({ folder, newKey }) =>
      folder.getByTypeAndId<T>(
        file.constructor as typeof PatientRelated,
        newKey
      )
    );
}

export function folderFileUpdate<T extends PatientRelated>(
  file: T,
  formData: FormData
): Promise<PatientRelated> {
  return request({
    url: ["fiche", file.getStatic().getTechnicalName(), file.id || ""],
    method: CRUD.update,
    formData
  })
    .then((json) => json.folder)
    .then((json) => new Folder(json))
    .then((folder) =>
      folder.getByTypeAndId<T>(
        file.constructor as typeof PatientRelated,
        file.id!
      )
    );
}

// See legacy/app-old/v1/elements/cryptomedic-data-service.js
