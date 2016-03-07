
import myFetch from 'helpers/myFetch';

export default function selectFile(id, type = 'folder') {
  // If not final then go to the server anyway...
  // return db.getFolder(id).catch(function(error) {
  //   console.log('Getting the folder live: #' + id);
  return myFetch(type + '/' + id)
    .then(appState().helpers.objectify)

    // TODO: Generalize this:
    .then(function(data) { return appState().helpers.create('Folder', data); })

    .catch()
    ;
  // });
}
