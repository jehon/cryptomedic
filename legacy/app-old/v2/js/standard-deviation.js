import amd_stats from "./amd_stats.js";
import {
  DataInvalidException,
  ConfigurationMissingException,
  DataOutOfBoundException
} from "./exceptions.js";

/**
 * @param {Array<Array<number>>} line - the line ([[x, y]+])
 * @param {number} x the absice
 * @returns {number} the y value on the line
 */
export function _evaluatePoly(line, x) {
  var i = -1;
  if (x < line[0][0] || x > line[line.length - 1][0]) {
    return NaN;
  }
  for (i = 0; i < line.length; i++) {
    if (x <= line[i][0]) break;
  }

  // i = the next indice (line[i-1] < x <= line[i])
  if (x == line[i][0]) return line[i][1];

  var xup = line[i][0];
  var yup = line[i][1];
  var xdw = line[i - 1][0];
  var ydw = line[i - 1][1];
  return ydw + (yup - ydw) * ((x - xdw) / (xup - xdw));
}

/**
 * @param {object} statLines - the line group
 * @param {number} x on the line
 * @param {number} y on the line
 * @returns {number} the standard deviation on the line at (x, y)
 */
export function _stdDeviation(statLines, x, y) {
  var avg = _evaluatePoly(statLines.medium, x);
  if (isNaN(avg)) throw new DataOutOfBoundException();
  if (y == avg) return 0;

  var ref;
  if (y < avg) {
    ref = _evaluatePoly(statLines.min, x);
  } else {
    ref = _evaluatePoly(statLines.max, x);
  }

  /* istanbul ignore next: this case is when the polynome is not fully completed */
  if (isNaN(ref)) {
    throw new DataOutOfBoundException();
  }

  var dev = Math.abs((avg - ref) / sigma);
  return (y - avg) / dev;
}

/**
 * @param {string} sex - m / f / null / '' - as in amd_stats
 * @param {string} graphName - the name of the graph, as in amd_stats[sex]
 * @param {number} x on the line
 * @param {number} y on the line
 * @returns {number} the sd
 * @throws {Error}
 */
export function stdDeviationFor(sex, graphName, x, y) {
  if (!(sex in amd_stats)) {
    throw new DataInvalidException("sex");
  }
  if (!(graphName in amd_stats[sex])) {
    throw new ConfigurationMissingException("invalid graph name");
  }
  if (isNaN(x)) {
    throw new DataInvalidException("invalid x");
  }
  if (isNaN(y)) {
    throw new DataInvalidException("invalid y");
  }

  return _stdDeviation(amd_stats[sex][graphName], x, y);
}

// 1.64485 = sigma at 90 for normal distribution
export const sigma = 1.64485;
