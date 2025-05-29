import { useParams } from "react-router-dom";
import "../../legacy/app-old/v2/pages/x-page-login.js";
import "../../legacy/app-old/v2/widgets/x-user-status.js";

function RenderLegacy(props: { tag: string; attributes?: string[] }) {
  const params = useParams();
  const pStr = Object.entries(params)
    .filter(([key, _value]) => (props.attributes ?? []).includes(key))
    .map(([key, value]) => `${key}='${value}'`)
    .join(" ");

  return (
    <>
      <h2>{props.tag}</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: `<${props.tag} { }></${props.tag}>`
        }}
      />
    </>
  );
}

export function RouterLegacy() {
  return [
    {
      path: "/login/:redirect?",
      element: <RenderLegacy tag="x-page-login" attributes={["redirect"]} />
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
