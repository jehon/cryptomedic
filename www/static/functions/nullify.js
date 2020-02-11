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
			for (var k in what) {
				what[k] = nullify(what[k]);
			}
			// });
			return what;
	}
	return what;
}
