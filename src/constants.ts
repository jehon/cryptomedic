export type CRUDType = "POST" | "GET" | "PUT" | "DELETE";
export const CRUD = {
  create: "POST" as CRUDType,
  submit: "POST" as CRUDType,
  read: "GET" as CRUDType,
  update: "PUT" as CRUDType,
  delete: "DELETE" as CRUDType
};
