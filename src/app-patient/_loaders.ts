import Folder, { serverType2BusinessType } from "../business/folder";
import type { BusinessType } from "../config";
import { CRUD, request } from "../utils/network";
import type { Pojo } from "./_objects";

export function getFolder(id: string): Promise<Folder> {
  // TODO: use new route!
  return request({ url: `folder/Patient/${id}` })
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

  create(formData: FormData): Promise<T> {
    return (
      request({
        url: this.apiUrl,
        method: CRUD.create,
        formData
      })
        // TODO: Because we receive bad data from server
        .then(
          (json) =>
            json.folder
              .filter(
                (f: any) =>
                  serverType2BusinessType(f.type) == this.type &&
                  f.id == json.newKey
              )
              .map((f: any) => ({ ...f.record, _type: this.type }))[0] as T
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
        .then((json) => ({ ...(json.file as T), _type: this.type }))
    );
  }

  update(id: string, formData: FormData): Promise<T> {
    return (
      request({
        url: `${this.apiUrl}/${id}`,
        method: CRUD.update,
        formData
      })
        // TODO: Because we receive bad data from server
        .then(
          (json) =>
            json.folder
              .filter(
                (f: any) =>
                  serverType2BusinessType(f.type) == this.type && f.id == id
              )
              .map((f: any) => ({ ...f.record, _type: this.type }))[0] as T
        )
    );
  }

  delete(id: string): Promise<void> {
    return request<void>({
      url: `${this.apiUrl}/${id}`,
      method: CRUD.delete
    });
  }
}
