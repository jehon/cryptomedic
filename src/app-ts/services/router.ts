type Route = {
  app?: string;
  page?: string;
  options?: Map<string, string>;
};

function urlSearchParamToObject(
  urlSearchParam: URLSearchParams
): Map<string, string> {
  const result = new Map();
  for (const [key, value] of urlSearchParam.entries()) {
    result.set(key, value);
  }
  return result;
}

export function getCurrentRoute(route: Location = document.location): Route {
  const hash = new URL(route.hash);
  return {
    app: route.pathname,
    page: hash.pathname,
    options: urlSearchParamToObject(hash.searchParams)
  };
}

// export function setRoute(route: Route): string {
//   let target = "";
//   let hash = "#" + route.page + "?";
//   for (const [key, value] of route.options) {
//     hash += key + "=" + encodeURIComponent(value) + "&";
//   }

//   const actual = getCurrentRoute();

//   return (document.location.hash = hash);
// }
