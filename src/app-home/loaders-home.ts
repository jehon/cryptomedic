import type { Patient } from "../app-patient/objects-patient";
import { CRUD, request } from "../utils/network";

export function patientCreate(formData: FormData): Promise<Patient> {
  return request({
    url: "fiche/patient",
    method: CRUD.create,
    formData
  }).then((json) => json.folder[0].record);
}

export function patientSearch(formData: FormData): Promise<Patient[]> {
  return request({
    url: "folder",
    method: CRUD.search,
    formData
  });
}
