
export function evaluatePoly(line, x) {
	var i = -1;
	if ((x < line[0][0]) || (x > line[line.length - 1][0])) {
		return NaN;
	}
	for (i = 0; i < line.length; i++) {
		if (x <= line[i][0])
			break;
	}

	// i = the next indice (line[i-1] < x <= line[i])
	if (x == line[i][0]) return line[i][1];

	var xup = line[i][0];
	var yup = line[i][1];
	var xdw = line[i - 1][0];
	var ydw = line[i - 1][1];
	return ydw + (yup - ydw) * ((x - xdw) / (xup - xdw));
}

export function stdDeviation(line, x, y) {
	var avg = evaluatePoly(line.medium, x);
	if (isNaN(avg)) return '#Out of bound#';
	if (y == avg) return 0;

	var ref;
	if (y < avg) {
		ref = evaluatePoly(line.min, x);
	} else {
		ref = evaluatePoly(line.max, x);
	}

	/* istanbul ignore next: this case is when the polynome is not fully completed */
	if (isNaN(ref)) return '#Out of bound#';

	var dev = Math.abs((avg - ref) / sigma);
	return (y - avg) / dev;
}

// 1.64485 = sigma at 90 for normal distribution
export const sigma = 1.64485;
