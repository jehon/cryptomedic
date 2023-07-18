import { messages } from "../../../legacy/app-old/config.js";
import XMessages from "../../../legacy/app-old/v2/widgets/func/x-messages.js";
import { fn } from "./athelpers.js";

describe(fn(import.meta.url), function () {
  const el = new XMessages();

  beforeEach(() => {
    el.clear();
  });

  it("should show messages", () => {
    expect(el.querySelectorAll("x-message").length).toBe(0);
    expect(el.messagesCount).toBe(0);

    el.showMessages(["a", "b"]);
    expect(el.querySelectorAll("x-message").length).toBe(2);
    expect(el.messagesCount).toBe(2);

    el.addMessage("c");
    expect(el.querySelectorAll("x-message").length).toBe(3);
    expect(el.messagesCount).toBe(3);

    el.showMessages(["a", "b"]);
    expect(el.querySelectorAll("x-message").length).toBe(2);
    expect(el.messagesCount).toBe(2);
  });

  it("should clear", () => {
    el.showMessages(["a", "b"]);
    expect(el.messagesCount).toBe(2);

    el.clear();
    expect(el.messagesCount).toBe(0);
  });

  it("should add messages", () => {
    let res;
    el.addMessage("c");
    expect(el.messagesCount).toBe(1);

    res = el.addMessage({ text: "c", level: messages.error, id: "MSG_C" });
    expect(res).toBe("MSG_C");
    expect(el.messagesCount).toBe(2);
    expect(el.querySelectorAll("x-message[msg-id=MSG_C]").length).toBe(1);
    expect(el.messagesIds).toContain("MSG_C");

    res = el.addMessage({ text: "c", level: messages.error, id: "MSG_D" });
    expect(res).toBe("MSG_D");
    expect(el.messagesCount).toBe(3);
    expect(el.messagesIds).toContain("MSG_D");
  });
});
