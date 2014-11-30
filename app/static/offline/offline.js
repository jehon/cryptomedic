
//window.applicationCache.addEventListener("downloading", function(progress) {
window.applicationCache.ondownloading = function(progress) {
	console.info("++ downloading");
};

//window.applicationCache.addEventListener("progress", function(progress) {
window.applicationCache.onprogress = function(progress) {
//	console.info("progress");
	console.info(progress.loaded + "/" + progress.total);
};

window.applicationCache.onupdateready = function(progress) {
	console.info("++ updateready");
};

window.applicationCache.oncached = function(progress) {
	console.info("++ cached");
};

console.info("offline loaded is checking");