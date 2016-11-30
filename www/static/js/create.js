
// TODO: move this into serviceData
function create(type, data, folder) {
  var models = {
    Data,
    File,

    Folder,
    Patient,

    Appointment,
    Bill,
    ClubFoot,
    OtherConsult,
    Payment,
    Picture,
    RicketConsult,
    Surgery
  };

  if (!models.hasOwnProperty(type)) {
    console.error((new Error()).stack);
    throw new Error('Create impossible for type \'' + type + '\'');
  }
  var d = new models[type](data, folder);
  return d;
}
