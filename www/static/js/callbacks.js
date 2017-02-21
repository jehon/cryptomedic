/* global jQuery */
/* exported userCb, syncRemainingCb */
let userCb = jQuery.Callbacks('memory');
// Debug
userCb.add((data) => {
  console.log("User callback: ", data);
});

let syncRemainingCb = jQuery.Callbacks('memory');

// By default, we don't know if there is data to sync
syncRemainingCb.fire("?");

// // Debug
// syncRemainingCb.add((data) => {
//   console.info("syncRemaining callback: ", data);
// });
