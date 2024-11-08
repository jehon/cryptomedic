/**
 * @param {string} pathname to be set
 * @returns {string} the same hash
 */
export function setLocation(pathname) {
  return (document.location = pathname);
}

/**
 * @returns {string} the current route
 */
function getCurrentRoute() {
  return document.location.hash.substring(1);
}

/**
 * @param {string} hash to be set
 * @returns {string} the same hash
 */
export function setRoute(hash) {
  return (document.location.hash = hash);
}

/**
 * Route to the login form
 *
 * @param {string} redirect is the current route to redirect to when login complete
 */
export function routeToLogin(redirect = getCurrentRoute()) {
  if (redirect.startsWith("/login/")) {
    return;
  }
  setRoute(`/login/${redirect}`);
}

/**
 * @param {string} route - the route to be parsed
 * @see routeToLogin
 * @returns {object} the route parsed
 */
export function parseRouteLogin(route = getCurrentRoute()) {
  return {
    redirect: route.replace(/^(\/+login)+\/+/, "/")
  };
}

/**
 * @param {number} folderId - the folder to display
 * @param {boolean} edit - whether the page is in edit mode or not
 * @returns {string} the route
 */
export function getRouteToFolderPatient(folderId, edit = false) {
  return "/folder/" + folderId + (edit ? "/edit" : "");
}

/**
 * @param {number} folderId of the patient
 * @param {string} fileName of the file (Bill ?)
 * @param {number} fileId of the file
 * @returns {string} the route
 */
export function getRouteToFolderFileByParams(folderId, fileName, fileId) {
  return "/patient/" + folderId + "/" + fileName + "." + fileId;
}

/**
 * @param {number} folderId - the folder of wich to show the patient
 */
export function routeToFolderPatient(folderId) {
  setRoute(`/folder/${folderId}`);
}

/**
 * Get a route to the creation of a folder
 *
 * @returns {string} the route
 */
export function getRouteToCreateReference() {
  return "/folder/-1/edit";
}

/**
 * @param {string} reportName - the name of the report
 * @returns {string} the route
 */
export function getRouteToReport(reportName) {
  return `/reports/${reportName}`;
}

export const routes = {
  users_list: "/users",
  user_add: "/users/new",
  user_edit: "/users/[uid]",
  user_password: "/users/[uid]/password"
};

/**
 * @param {string} route as /blabla/[arg]
 * @param {object} data to customize the route
 * @returns {string} the route
 */
export function getRoute(route, data = {}) {
  let newRoute = route;
  Object.keys(data)
    .reverse()
    .forEach((k) => {
      newRoute = newRoute.split(`[${k}]`).join(data[k]);
    });

  const up = new URLSearchParams();
  Object.keys(data)
    .filter((k) => !route.includes(`[${k}]`))
    .map((k) => up.append(k, data[k]))
    .join("&");
  if (up.toString()) {
    newRoute = `${newRoute}?${up.toString()}`;
  }

  if (newRoute.includes("[")) {
    throw new Error(
      `Route not instanciated completely: ${newRoute} (basis: ${route}, data: ${JSON.stringify(
        data
      )})`
    );
  }
  return newRoute;
}
