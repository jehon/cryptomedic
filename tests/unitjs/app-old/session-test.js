import {
  getAuthorized,
  getSession,
  getUsername,
  onSession,
  setSession
} from "../../../legacy/app-old/v2/js/session.js";

import { fn, loadReference } from "./athelpers.js";

describe(fn(import.meta.url), function () {
  let refSession;
  beforeEach(function () {
    refSession = loadReference("AuthTest.testsLogin.json");
  });

  describe("without session", function () {
    beforeEach(function () {
      setSession();
    });

    it("is empty on start", function (done) {
      const unreg = onSession((data) => {
        expect(data).toBeNull();
        expect(getSession()).toBeFalsy();
        done();
      });
      // cb is called by 'get' value, thus before sending back the unreg
      // so we need to call unreg here
      unreg();
    });

    it("with username", function () {
      expect(getSession()).toBeFalsy();
      expect(getUsername()).toBeFalsy();
    });

    it("with auth", function () {
      expect(getSession()).toBeFalsy();
      expect(getAuthorized("anything")).toBeFalse();
      expect(getAuthorized("application.open")).toBeFalse();
    });

    it("should set session", function () {
      let sessions = [];
      let users = [];
      const unreg = onSession((data) => {
        sessions.push(data ? true : false);
        users.push(getUsername());
      });

      setSession(refSession);
      unreg();

      expect(sessions).withContext("sessions").toEqual([false, true]);
      expect(users).withContext("users").toEqual([undefined, "murshed"]);
    });
  });

  describe("with session", function () {
    beforeEach(function () {
      setSession(refSession);
    });

    it("with memorized value", function (done) {
      expect(getSession()).not.toBeNull();
      expect(getSession()).toBeTruthy();
      expect(getSession().group).toBe("cdc");
      const unreg = onSession((data) => {
        expect(data.group).toBe("cdc");
        done();
      });
      unreg();
    });

    it("with username", function (done) {
      expect(getSession()).toBeTruthy();
      expect(getUsername()).toBe("murshed");
      const unreg = onSession((_data) => {
        expect(getUsername()).toBe("murshed");
        done();
      });
      unreg();
    });

    it("with auth", function () {
      expect(getSession()).toBeTruthy();
      expect(getAuthorized("anything")).toBeFalsy();
      expect(getAuthorized("application.open")).toBeTruthy();
    });
  });

  describe("with auth change", function () {
    it("should fire on change", function () {
      let res = [];
      setSession();
      const unreg = onSession(() =>
        res.push(getAuthorized("application.open"))
      );
      let i = 0;
      // Initial
      expect(res.length).toBe(i + 1);
      expect(res[i]).toBe(false);

      setSession(refSession); // true
      i++;
      expect(res.length).toBe(i + 1);
      expect(res[i]).toBe(true);

      // TODO: session equality is not well implemented
      // setSession(refSession); // should be skipped
      // expect(res.length).toBe(i + 1);
      // expect(res[i]).toBe(true);

      refSession.authorized();
      setSession(); // false
      i++;
      expect(res.length).toBe(i + 1);
      expect(res[i]).toBe(false);

      setSession(refSession); // true
      i++;
      expect(res.length).toBe(i + 1);
      expect(res[i]).toBe(true);

      unreg();
    });
  });
});
