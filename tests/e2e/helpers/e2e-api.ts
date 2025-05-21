import type { Page } from "@playwright/test";
import type { IndexSignature } from "../../../src/types";
import { CRUD, type CRUDType } from "../../../src/utils/network";
import { passThrough } from "../../../src/utils/promises";
import { WebBaseUrl } from "./e2e";

type JsonData = any;

function absoluteUrl(segment: string = ""): string {
  return `${WebBaseUrl}/api${segment}`;
}

export default function crApi(
  page: Page,
  url: string,
  options: {
    method?: CRUDType;
    data?: any;
  } = {}
): Promise<JsonData> {
  //
  // https://playwright.dev/docs/api/class-apirequestcontext#api-request-context-post
  //
  // Return the response object (json)
  //

  const requestor = page.request as IndexSignature<any>;
  return requestor[(options.method ?? CRUD.read).toLowerCase()](
    absoluteUrl(url),
    {
      data: options.data ?? {}
    }
  )
    .then(
      passThrough<any>((resp) => {
        if (resp.status() != 200) {
          throw new Error(
            "Server responded with invalid status: " + resp.status()
          );
        }
      })
    )
    .then((resp: any) => resp.json());
}
