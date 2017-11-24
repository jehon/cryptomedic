/* global jQuery */
/* exported userCb */
let userCb = jQuery.Callbacks('memory');
userCb.add((data) => {
	// Debug
  	// console.log("User callback: ", data);
  	if (data) {
  		XWriteList.setReferences(data.lists);
  	}
});
