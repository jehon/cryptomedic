export default function goThere(path = "/") {
  // console.error("Going to " + path);
  if (!path || path == "") {
    path = "/";
  }
  location.hash = path;
}
