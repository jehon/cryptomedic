import Folder from "../../../legacy/react/business/folder.js";
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
      date: "2007-01-10",
      weight_kg: amd_stats.dimensions.ageAtConsultTime_weight_kg_m.vtop,
      height_cm: amd_stats.dimensions.ageAtConsultTime_weight_kg_m.vleft
    }
  },
  {
    type: "OtherConsult",
    id: 2,
    record: {
      id: 2,
      patient_id: 1,
      date: "2007-01-10",
      weight_kg: amd_stats.dimensions.ageAtConsultTime_weight_kg_m.vbottom,
      height_cm: amd_stats.dimensions.ageAtConsultTime_weight_kg_m.vright
    }
  },
  {
    type: "OtherConsult",
    id: 3,
    record: {
      id: 3,
      patient_id: 1,
      date: "2014-01-04",
      examiner: "AMD doctor",
      weight_kg: 37,
      height_cm: 110
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
      date: "2007-01-10",
      weight_kg: 0,
      height_cm: 0
    }
  },
  {
    type: "OtherConsult",
    id: 2,
    record: {
      id: 2,
      patient_id: 1,
      date: "2007-01-10",
      weight_kg: 29,
      height_cm: 134
    }
  },
  {
    type: "OtherConsult",
    id: 3,
    record: {
      id: 3,
      patient_id: 1,
      date: "2014-01-04",
      examiner: "AMD doctor",
      weight_kg: 37,
      height_cm: 110
    }
  }
]);
