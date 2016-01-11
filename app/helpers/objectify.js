
import create from "helpers/create";

// import Folder        from "models/Folder";
// import Patient       from "models/Patient";

// import Appointment   from "models/Appointment";
// import Bill          from "models/Bill";
// import ClubFoot      from "models/ClubFoot";
// import OtherConsult  from "models/OtherConsult";
// import Picture       from "models/Picture";
// import RicketConsult from "models/RicketConsult";
// import Surgery       from "models/Surgery";

// var models = {
//   Folder,
//   Patient,
//   Appointment,
//   Bill,
//   ClubFoot,
//   OtherConsult,
//   Picture,
//   RicketConsult,
//   Surgery
// };

function objectify(what) {
  if (what === null) return what;
  switch(typeof(what)) {
    case "undefined": return null;
    case "string":
      if (what === date2CanonicString(null)) {
        return null;
      }
      if (what == "0000-00-00") {
        return null;
      }
      if (what.match("[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2} GMT[+-][0-9]{4}") == what) {
        if (what == "0000-00-00 00:00:00 GMT+0000") return null;
        return new Date(what.substr(0, 4), what.substr(5, 2) - 1, what.substr(8, 2),
          what.substr(11, 2), what.substr(14, 2), what.substr(17, 2));
      }
      if (what.match("[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}") == what) {
        if (what == "0000-00-00 00:00:00") return null;
        return new Date(what.substr(0, 4), what.substr(5, 2) - 1, what.substr(8, 2),
          what.substr(11, 2), what.substr(14, 2), what.substr(17, 2));
      }
      if (what.match("[0-9]+") == what) {
        return parseInt(what);
      }
      if (what.match("[0-9]+.[0-9]+") == what) {
        return parseFloat(what);
      }
      return what;
    case "object":
      for(var i in what) {
      // angular.forEach(what, function(val, i) {
        what[i] = objectify(what[i]);
      }
      if (typeof(what["_type"]) != "undefined") {
        what = create(what["_type"], what);
        // what = new models[what["_type"]](what);
      }
      return what;
    default:
      return what;
  }
}

export default objectify;
