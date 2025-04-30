import Patient from "../business/patient";
import { CRUD, request } from "../utils/network";

export function patientCreate(formData: FormData): Promise<Patient> {
  return request({
    url: ["fiche/patient"],
    method: CRUD.create,
    formData
  }).then((json) => json.folder[0].record);
}
