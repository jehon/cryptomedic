
// Also adapt package.json for adding testing the new api
// See md5sum.php to protect old versions... and delete them when necessary !!!
export const API_VERSION = 'v1.3';

export const spacing = {
    element: '5px'
};

export const levels = {
    primary: 'primary',
    danger: 'danger',
    warning: 'warning',
    success: 'success',
    info: 'info',
    default: 'default'
};

export const icons = {
    error: '/static/img/error.svg'
};

export const colors = {
    actions: {
        default: {
            fg: 'white',
            bg: 'rgb(0, 123, 255)'
        },
        secondary: {
            fg: 'white',
            bg: 'rgb(108, 117, 125);'
        },
        dangerous: {
            fg: 'white',
            bg: 'rgb(220, 53, 69)'
        }
    }
};
