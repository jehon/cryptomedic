import Pojo from "./abstracts/pojo";

export default class Patient extends Pojo {
  entry_year: string = "";
  entry_order: string = "";
  name: string = "";
  sex?: "Male" | "Female";
  year_of_birth?: string;
  phone: string = "";
  address_comments: string = "";
  address_district?: string;
  address_upazilla?: string;
  address_union?: string;
  pathology: string = "";
  comments: string = "";

  override getTechnicalName(): string {
    return "patient";
  }
}
