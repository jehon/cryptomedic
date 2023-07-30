import Folder from "../../../legacy/app-old/v2/models/Folder.js";

const folder = new Folder([
  {
    type: "Patient",
    id: 1,
    record: {
      id: 1,
      entry_year: 2000,
      entry_order: 1,
      sex: "Male",
      year_of_birth: "1998"
    }
  },
  {
    type: "OtherConsult",
    id: 2,
    record: {
      id: 2,
      patient_id: 1,
      Date: "2007-01-10",
      Weightkg: 0,
      Heightcm: 0,
      Y: 0
    }
  },
  {
    type: "OtherConsult",
    id: 1,
    record: {
      id: 1,
      patient_id: 1,
      Date: "2007-01-10",
      Weightkg: 29,
      Heightcm: 134,
      Y: 100
    }
  },
  {
    type: "RicketConsult",
    id: 13,
    record: {
      id: 13,
      patient_id: 1,
      Date: "2014-01-04",
      examiner: "AMD doctor",
      Weightkg: 37,
      Heightcm: 110,
      Y: 90
    }
  }
]);

export default folder;
