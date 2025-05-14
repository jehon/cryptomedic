import type PatientRelated from "../business/abstracts/patient-related";
import Folder, { type2Class } from "../business/folder";
import type { BusinessType } from "../config";
import { CRUD, request } from "../utils/network";

export function getFolder(id: string): Promise<Folder> {
  // TODO: use new route!
  return request({ url: `folder/Patient/${id}` })
    .then((json) => json.folder)
    .then((json) => new Folder(json));
}

export class CrudLoader<T extends PatientRelated> {
  private apiUrl: string;
  private type: BusinessType;

  constructor(apiURl: string, type: BusinessType) {
    this.apiUrl = apiURl;
    this.type = type;
  }

  create(formData: FormData): Promise<T> {
    return (
      request({
        url: this.apiUrl,
        method: CRUD.create,
        formData
      })
        // TODO: Because we receive bad data from server
        .then((json) => ({
          newKey: "" + json.newKey,
          folder: new Folder(json.folder)
        }))
        .then(({ folder, newKey }) =>
          folder.getByTypeAndId<T>(this.type, newKey)
        )
    );
  }

  unlock(id: string): Promise<T> {
    return (
      request({
        url: `${this.apiUrl}/unlock/${id}`,
        method: CRUD.update
      })
        // TODO: Because we receive bad data from server
        .then((json) => json.file)
        .then((json) => type2Class(this.type).factory<T>(json, this.type))
    );
  }

  update<T extends PatientRelated>(
    id: string,
    formData: FormData
  ): Promise<PatientRelated> {
    return (
      request({
        url: `${this.apiUrl}/${id}`,
        method: CRUD.update,
        formData
      })
        // TODO: Because we receive bad data from server
        .then((json) => json.folder)
        .then((json) => new Folder(json))
        .then((folder) => folder.getByTypeAndId<T>(this.type, id!))
    );
  }

  delete(id: string): Promise<Folder | undefined> {
    return (
      request({
        url: `${this.apiUrl}/${id}`,
        method: CRUD.delete
      })
        // TODO: Because we receive bad data from server
        .then((json) => json.file)
        .then((json) =>
          json && json.length > 0 ? new Folder(json) : undefined
        )
    );
  }
}
