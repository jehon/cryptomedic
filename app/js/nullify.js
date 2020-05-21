
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
            let what2 = {};
            for (var k in what) {
                what2[k] = nullify(what[k]);
            }
            // });
            return what2;
    }
    return what;
}
