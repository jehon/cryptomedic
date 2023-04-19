/**
 * @param {Element} target - where to start the event
 * @param {string} name - the event name
 * @param {*} data - to pass alongµ
 * @returns {Event} - the fired event
 */
export default function fireOn(target, name, data = null) {
  var event = new CustomEvent(name, { detail: data });
  target.dispatchEvent(event);
  return event;
}
