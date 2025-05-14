import type PatientRelated from "../business/abstracts/patient-related";
import Pojo from "../business/abstracts/pojo";
import Folder, { type2Class } from "../business/folder";
import type { BusinessType } from "../config";
import { CRUD, request } from "../utils/network";

export function getFolder(id: string): Promise<Folder> {
  return request({ url: ["folder", "Patient", id] })
    .then((json) => json.folder)
    .then((json) => new Folder(json));
}

export class CrudLoader<T extends Pojo> {
  private apiUrl: string;
  private type: BusinessType;

  constructor(apiURl: string, type: BusinessType) {
    this.apiUrl = apiURl;
    this.type = type;
  }

  unlock(id: string): Promise<T> {
    return request({
      url: [this.apiUrl, "unlock", id],
      method: CRUD.update
    })
      .then((json) => json.file)
      .then((json) => type2Class(this.type).factory<T>(json, this.type));
  }

  delete(id: string): Promise<Folder | undefined> {
    return request({
      url: [this.apiUrl, id],
      method: CRUD.delete
    })
      .then((json) => json.file)
      .then((json) => (json && json.length > 0 ? new Folder(json) : undefined));
  }
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
