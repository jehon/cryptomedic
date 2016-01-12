
import Data          from "models/Data";
import File          from "models/File";

import Folder        from "models/Folder";
import Patient       from "models/Patient";

import Appointment   from "models/Appointment";
import Bill          from "models/Bill";
import ClubFoot      from "models/ClubFoot";
import OtherConsult  from "models/OtherConsult";
import Picture       from "models/Picture";
import RicketConsult from "models/RicketConsult";
import Surgery       from "models/Surgery";

var models = {
  Data,
  File,

  Folder,
  Patient,

  Appointment,
  Bill,
  ClubFoot,
  OtherConsult,
  Picture,
  RicketConsult,
  Surgery
};

export default function create(type, data, folder) {
  if (!models.hasOwnProperty(type)) {
    console.error((new Error()).stack);
    throw new Error("Create impossible for type '" + type + "'");
  }
  var d = new models[type](data, folder);
  // console.info("create function with " + type, d.constructor.name, d);
  return d;
}
