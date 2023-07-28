import Folder from "../../../legacy/app-old/v2/models/Folder.js";
import amd_stats from "../../../legacy/app-old/v2/js/amd_stats.js";

export let male = new Folder([
  {
    type: "Patient",
    id: 1,
    record: {
      id: 1,
      entry_year: 2000,
      entry_order: 1,
      sex: "Male",
      year_of_birth: "2000"
    }
  },
  {
    type: "OtherConsult",
    id: 1,
    record: {
      label: "top-left",
      id: 1,
      patient_id: 1,
      Date: "2007-01-10",
      Weightkg: amd_stats.dimensions.ageAtConsultTime_Weightkg_m.vtop,
      Heightcm: amd_stats.dimensions.ageAtConsultTime_Weightkg_m.vleft
    }
  },
  {
    type: "OtherConsult",
    id: 2,
    record: {
      id: 2,
      patient_id: 1,
      Date: "2007-01-10",
      Weightkg: amd_stats.dimensions.ageAtConsultTime_Weightkg_m.vbottom,
      Heightcm: amd_stats.dimensions.ageAtConsultTime_Weightkg_m.vright
    }
  },
  {
    type: "OtherConsult",
    id: 3,
    record: {
      id: 3,
      patient_id: 1,
      Date: "2014-01-04",
      ExaminerName: "AMD doctor",
      Weightkg: 37,
      Heightcm: 110
    }
  }
]);

export let female = new Folder([
  {
    type: "Patient",
    id: 1,
    record: {
      id: 1,
      entry_year: 2000,
      entry_order: 1,
      sex: "Female",
      year_of_birth: "2000"
    }
  },
  {
    type: "OtherConsult",
    id: 1,
    record: {
      id: 1,
      patient_id: 1,
      Date: "2007-01-10",
      Weightkg: 0,
      Heightcm: 0
    }
  },
  {
    type: "OtherConsult",
    id: 2,
    record: {
      id: 2,
      patient_id: 1,
      Date: "2007-01-10",
      Weightkg: 29,
      Heightcm: 134
    }
  },
  {
    type: "OtherConsult",
    id: 3,
    record: {
      id: 3,
      patient_id: 1,
      Date: "2014-01-04",
      ExaminerName: "AMD doctor",
      Weightkg: 37,
      Heightcm: 110
    }
  }
]);
