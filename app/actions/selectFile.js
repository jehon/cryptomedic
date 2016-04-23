
import myFrontFetch     from 'helpers/myFrontFetch';
import objectify        from 'helpers/objectify';
import create           from 'helpers/create';
import dispatch         from 'reducers/dispatch';
import catalog          from 'reducers/catalog';
import store            from 'reducers/store';

export default function selectFile(id, type = 'folder') {
  // if (id == store.getState().folder.selected_id) {
  //   return db.getFolder(id);
  // }

  // If not final then go to the server anyway...
  // return db.getFolder(id).catch(function(error) {
  //   console.log('Getting the folder live: #' + id);
  return myFrontFetch(type + '/' + id)
    .then(objectify)

    // TODO: Generalize this:
    .then(function(data) {
      return create('Folder', data);
    })
    .then(function(data) {
      dispatch(catalog.FOLDER_SELECT, data);
      return data;
    })
    .catch(function(data) {
      console.log('in error in selectFile');
      dispatch(catalog.CONNECTION_NOT_FOUND, data);
      return null;
    })
    ;
}
