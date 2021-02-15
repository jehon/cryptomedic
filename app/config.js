
// Also adapt package.json for adding testing the new api
// See md5sum.php to protect old versions... and delete them when necessary !!!
export const API_VERSION = 'v1.3';

export const spacing = {
    /**
     * between the elements
     *
     * @type {string}
     */
    element: '5px',

    /**
     * between the container and the text
     *
     * @type {string}
     */
    text: '5px'
};

const nbrOr = (1 + Math.sqrt(5)) / 2;
export const orSmall = 1 / (1 + nbrOr) * 100;
export const orBig = 100 - orSmall;

export const messages = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error',
};

export const actions = {
    move: 'move',
    query: 'query',
    commit: 'commit',
    // selected: 'selected',
    cancel: 'cancel',
    alternate: 'alternate',
    delete: 'delete'
};

export const icons = {
    error: '/static/img/error.svg',
    logout: '/static/img/logout.gif'
};

export const colors = {
    // TODO: use this in button.js
    actions: {
        query: {
            class: 'info'
        },
        move: {
            class: 'info'
        },
        commit: {
            class: 'success',
            // fg: 'white',
            // bg: 'rgb(0, 123, 255)'
        },
        // selected: {
        //     class: 'info',
        //     // fg: 'white',
        //     // bg: 'rgb(0, 123, 255)'
        // },
        cancel: {
            class: 'warning',
            // fg: 'white',
            // bg: 'rgb(108, 117, 125);'
        },
        alternate: {
            class: 'info',
            // fg: 'white',
            // bg: 'rgb(108, 117, 125);'
        },
        delete: {
            class: 'danger',
            // fg: 'white',
            // bg: 'rgb(220, 53, 69)'
        }
    },
    messages: {}
};

colors.messages[messages.success] = {
    color: '#3c763d',
    backgroundColor: '#dff0d8',
    borderColor: '#d6e9c6'
};

colors.messages[messages.info] = {
    color: '#004085',
    backgroundColor: '#cce5ff',
    borderColor: '#b8daff'
};

colors.messages[messages.warning] = {
    color: '#8a6d3b',
    backgroundColor: '#fcf8e3',
    borderColor: '#faebcc'
};

colors.messages[messages.error] = {
    color: '#a94442',
    backgroundColor: '#f2dede',
    borderColor: '#ebccd1'
};