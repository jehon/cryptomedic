
import myFetch from 'helpers/myFetch';
import objectify from 'helpers/objectify';
import create from 'helpers/create';

export default function selectFile(id, type = 'folder') {
  // If not final then go to the server anyway...
  // return db.getFolder(id).catch(function(error) {
  //   console.log('Getting the folder live: #' + id);
  return myFetch(type + '/' + id)
    .then(objectify)

    // TODO: Generalize this:
    .then(function(data) { return create('Folder', data); })

    .catch()
    ;
  // });
}
