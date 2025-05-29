import { useParams } from "react-router-dom";
import "../../legacy/app-old/v1/elements/cryptomedic-data-service.js"; // On index.html - unused?
import XPageLogin from "../../legacy/app-old/v2/pages/x-page-login.js";
import "../../legacy/app-old/v2/widgets/x-user-status.js"; // On index.html
import { htmlEntities } from "../utils/strings";

function RenderLegacy(props: { tag: string; attributes?: string[] }) {
  const params = useParams();
  const pStr = Object.entries(params)
    .filter(([key, _value]) => (props.attributes ?? []).includes(key))
    .map(([key, value]) => [key == "*" ? "redirect" : key, value])
    .map(([key, value]) => `${key}='${htmlEntities(value)}'`)
    .join(" ");

  return (
    <>
      <h2>{props.tag}</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: `<${props.tag} ${pStr}></${props.tag}>`
        }}
      />
    </>
  );
}

export function routeToLogin(redirect = location.hash.replace(/^#/, "")) {
  if (redirect.startsWith("/login/")) {
    return;
  }
  location.hash = `#/login/${redirect}`;
}

export function RouterLegacy() {
  return [
    {
      path: "/login*",
      element: <RenderLegacy tag={XPageLogin.Tag} attributes={["*"]} />
    }
    // { path: "/search", element: <ReloadToOldApp /> },
    // { path: "/reports/:report", element: <ReloadToOldApp /> },
    // { path: "/users/:uid/password", element: <ReloadToOldApp /> },
    // { path: "/users/:uid", element: <ReloadToOldApp /> },
    // { path: "/users", element: <ReloadToOldApp /> },
    // { path: "/prices", element: <ReloadToOldApp /> },
    // { path: "/folder/*", element: <ReloadToOldApp /> }
  ];
}

routeToLogin();
