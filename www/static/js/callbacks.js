/* global jQuery */
/* exported userCb */
let userCb = jQuery.Callbacks('memory');
// Debug
userCb.add((data) => {
  console.log("User callback: ", data);
  if (data) {
  	XWriteList.setReferences(data.lists);
  }
});
