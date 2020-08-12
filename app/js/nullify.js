
/**
 * @param what
 */
function nullifyOjbect(what) {
    let what2 = {};
    for (var k in what) {
        what2[k] = nullify(what[k]);
    }
    // });
    return what2;
}

/**
 * @param what
 */
export default function nullify(what) {
    switch (typeof (what)) {
        case 'string':
            if (what === '?') {
                return null;
            }
            if (what === 'null') {
                return null;
            }
            if (what === 'undefined') {
                return null;
            }
            return what;
        case 'object':
            if (what == null) {
                return what;
            }
            return nullifyOjbect(what);
    }
    return what;
}
