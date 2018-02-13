// https://gist.github.com/ChadKillingsworth/d4cb3d30b9d7fbc3fd0af93c2a133a53

/**
 * This function runs in the browser context
 * @param {string|Array<string>} selectors
 * @return {?Element}
 */
function executeInShadowDom(selector, fn, ...args) {
    const selectors = selector.split(">>>").map(s => s.trim());
    var currentElement = document;
    for (var i = 0; i < selectors.length; i++) {
        if (i > 0) {
            currentElement = currentElement.shadowRoot;
        }

        if (currentElement) {
            currentElement = currentElement.querySelector(selectors[i]);
        }

        if (!currentElement) {
            break;
        }
    }

    if (!currentElement) {
        throw("Element not found: ", selector);
    }

    if ((fn.substring(0, 8) == "function") || (fn[0] == "(")) {
        // https://stackoverflow.com/a/1271572/1954789
        (eval("[" + fn + "]")[0]).apply(currentElement, args);
    } else {
        currentElement[fn].apply(currentElement, args);
    }
    return currentElement;
}

exports.command = function(selector, fn, ...args) {
    if (typeof(fn) == "function") {
        fn = fn.toString();
    }
    this.execute(executeInShadowDom, [ selector, fn, args ]);
    return this;
};
