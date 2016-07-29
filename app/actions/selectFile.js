
import myFrontFetch     from 'helpers/myFrontFetch';
import objectify        from 'helpers/objectify';
import create           from 'helpers/create';
import Database         from 'helpers/database';
import dispatch         from 'reducers/dispatch';
import catalog          from 'reducers/catalog';
// import store            from 'reducers/store';

let db = new Database();

function getLive(id) {
  console.log('Getting the folder live: #' + id);
  dispatch(catalog.FOLDER_SELECT, id);
  return myFrontFetch({ url: 'folder/' + id })
    // Store the received record into the database
    .then((json) => (new Database()).storeRecord({ record: json}, false) )
    .then(objectify)
    .then((data) => { return create('Folder', data); })
    .then((data) => { return dispatch(catalog.FOLDER_UPDATE_FROM_SERVER, data); })
    .catch((data) => {
      console.log('in error in selectFile', data);
      dispatch(catalog.CONNECTION_NOT_FOUND, data);
      return null;
    })
    ;
}

export default function selectFile(id, type = 'folder') {
  // if (id == store.getState().folder.selected_id) {
  //   return db.getFolder(id);
  // }

  // If not final then go to the server anyway...
  return db.getFolder(id)
  .then(data => dispatch(catalog.FOLDER_UPDATE_FROM_DB, data))
  .then(() => getLive(id), () => getLive(id))
  ;
}
