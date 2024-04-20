import amd_stats, { Line, SexString, StatLines } from "./amd_stats";

export function _evaluatePoly(line: Line, x: number): number {
  let i = -1;
  if (x < line[0][0] || x > line[line.length - 1][0]) {
    return NaN;
  }
  for (i = 0; i < line.length; i++) {
    if (x <= line[i][0]) break;
  }

  // i = the next indice (line[i-1] < x <= line[i])
  if (x === line[i][0]) return line[i][1];

  const xup = line[i][0];
  const yup = line[i][1];
  const xdw = line[i - 1][0];
  const ydw = line[i - 1][1];
  return ydw + (yup - ydw) * ((x - xdw) / (xup - xdw));
}

export function _stdDeviation(
  statLines: StatLines,
  x: number,
  y: number
): number {
  const avg = _evaluatePoly(statLines.medium, x);
  if (isNaN(avg)) {
    throw new DataOutOfBoundException("value", x, [
      statLines.medium[0][0],
      statLines.medium[statLines.medium.length - 1][0]
    ]);
  }
  if (y === avg) return 0;

  let ref;
  if (y < avg) {
    ref = _evaluatePoly(statLines.min, x);
  } else {
    ref = _evaluatePoly(statLines.max, x);
  }

  /* istanbul ignore next: this case is when the polynome is not fully completed */
  if (isNaN(ref)) {
    throw new DataOutOfBoundException("x");
  }

  const dev = Math.abs((avg - ref) / sigma);
  return (y - avg) / dev;
}

function sexStr(sex: string): SexString {
  if (sex === "Male") {
    return "m";
  }
  if (sex === "Female") {
    return "f";
  }
  return "";
}

/**
 * @param {string} graphName - the name of the graph, as in amd_stats[sex]
 */
export function stdDeviationFor(
  sex: string,
  graphName: GraphName,
  x: number,
  y: number
): number {
  const sex1 = sexStr(sex);
  if (!sex) {
    throw new DataInvalidException("sex", sex1);
  }

  if (!(sex1 in amd_stats)) {
    throw new DataInvalidException("sex", sex1);
  }
  if (!x) {
    throw new DataInvalidException("value", x);
  }

  if (!(graphName in amd_stats[sex1])) {
    throw new ConfigurationException("Unknown serie: " + graphName);
  }
  if (isNaN(x)) {
    throw new ConfigurationException(`Invalid x axis ${x}`);
  }
  if (isNaN(y)) {
    throw new ConfigurationException(`Invalid y axis ${y}`);
  }

  return _stdDeviation(amd_stats[sex1][graphName], x, y);
}

// 1.64485 = sigma at 90 for normal distribution
export const sigma = 1.64485;
