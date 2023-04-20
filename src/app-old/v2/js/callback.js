import duix from "../../../../node_modules/duix/index.js";

/**
 * @param {symbol|string} symbol - the associated symbol for debug purpose
 * @returns {object} the callback
 */
export default function createCallback(symbol = Symbol()) {
  if (typeof symbol == "string") {
    symbol = Symbol(symbol);
  }

  return {
    set:
      /**
       * Set the value and trigger callbacks
       *
       * @param {any} data - the stored data
       * @returns {void} nothing
       */
      (data) => duix.set(symbol, data),
    get:
      /**
       * Get the stored value
       *
       * @returns {any} the stored value
       */
      () => duix.get(symbol),
    onChange:
      /**
       * Subscribe to value change
       * The callback is called immediately with the value
       *
       * @param {function(any):void} cb - the callback
       * @returns {function(void): void} - the unsubscribe function
       */
      (cb) => duix.subscribe(symbol, cb, { fireImmediately: true })
  };
}
