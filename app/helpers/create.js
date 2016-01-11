
import Data          from "models/Data";

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

export default function create(type, data) {
  return new models[type](data);
}
