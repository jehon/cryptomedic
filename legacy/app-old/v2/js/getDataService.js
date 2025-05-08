import { getUsername, onSession } from "../../../../src/utils/session.ts";

/**
 * @param cssSelector
 */
export default function getDataService(cssSelector = "#dataService") {
  const test = function () {
    let el = cssSelector;
    if (typeof cssSelector == "string") {
      el = document.querySelector(cssSelector);
    }
    if (!el) {
      return false;
    }
    if (!("$" in el) && !("request" in el)) {
      return false;
    }
    return el;
  };

  const waitForLogin = function (resolveFn) {
    const testLogin = function () {
      const user = getUsername();
      if (user) {
        return true;
      }
      return false;
    };

    if (testLogin()) {
      return resolveFn();
    }

    const unsubscribe = onSession(() => {
      // const user = getUsername();
      if (testLogin()) {
        unsubscribe();
        resolveFn();
      }
    });
  };

  return new Promise(function (resolve, reject) {
    let i = 40;
    const cron = setInterval(function () {
      const el = test();
      i--;
      if (i < 0) {
        console.error("Could not find cssSelector ", cssSelector);
        reject("Could not find cssSelector ", cssSelector);
        clearInterval(cron);
      }
      if (el) {
        clearInterval(cron);
        // Now, wait for the login...
        waitForLogin(() => resolve(el));
      }
    }, 250);
  });
}
