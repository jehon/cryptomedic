import { useParams } from "react-router-dom";
import "../../legacy/app-old/v1/elements/cryptomedic-data-service.js"; // On index.html - unused?
import XPageLogin from "../../legacy/app-old/v2/pages/x-page-login.js";
import XPagePrices from "../../legacy/app-old/v2/pages/x-page-prices.js";
import XPageReports from "../../legacy/app-old/v2/pages/x-page-reports.js";
import XPageSearch from "../../legacy/app-old/v2/pages/x-page-search.js";
import XPageUserEdit from "../../legacy/app-old/v2/pages/x-page-user-edit.js";
import XPageUserPassword from "../../legacy/app-old/v2/pages/x-page-user-password.js";
import XPageUsersList from "../../legacy/app-old/v2/pages/x-page-users-list.js";
import "../../legacy/app-old/v2/widgets/x-user-status.js"; // On index.html
import { htmlEntities } from "../utils/strings";

import "./legacy.css";

function RenderLegacy(props: { tag: string }) {
  const params = useParams();
  const pStr = Object.entries(params)
    .map(([key, value]) => [key == "*" ? "redirect" : key, value])
    .map(([key, value]) => `${key}='${htmlEntities(value)}'`)
    .join(" ");

  return (
    <>
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
      path: "/login/*",
      element: <RenderLegacy tag={XPageLogin.Tag} />
    },
    {
      path: "/search",
      element: <RenderLegacy tag={XPageSearch.Tag} />
    },
    {
      path: "/reports/:report",
      element: <RenderLegacy tag={XPageReports.Tag} />
    },
    {
      path: "/users/:uid/password",
      element: <RenderLegacy tag={XPageUserPassword.Tag} />
    },
    {
      path: "/users/:uid",
      element: <RenderLegacy tag={XPageUserEdit.Tag} />
    },
    {
      path: "/users",
      element: <RenderLegacy tag={XPageUsersList.Tag} />
    },
    {
      path: "/prices",
      element: <RenderLegacy tag={XPagePrices.Tag} />
    }
  ];
}

routeToLogin();
