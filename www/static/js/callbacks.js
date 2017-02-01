let userCb = jQuery.Callbacks();
// Debug
userCb.add((data) => {
  console.log("User callback: ", data);
});

let syncRemainingCb = jQuery.Callbacks();

// Debug
syncRemainingCb.add((data) => {
  console.info("syncRemaining callback: ", data);
});
