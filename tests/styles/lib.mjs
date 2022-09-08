
import path from 'path';

import chalk from 'chalk';
import { fileURLToPath } from 'url';

export const p_ok = chalk.green(' ✓ ');
export const p_warn = chalk.yellow(' ? ');
export const p_ko = chalk.red('✗  ');

export const projectRoot = path.dirname(path.dirname(path.dirname(fileURLToPath(import.meta.url))));
export const stylesRoot = path.join(projectRoot, 'tmp', 'styles');
export const referenceFolder = 'references';
export const runFolder = 'run';
export const diffFolder = 'diff';
export const referenceUpdateFolder = path.join(projectRoot, 'tests', 'styles', 'references');

export const stylesJSON = path.join(stylesRoot, 'styles-problems-list.json');
export function inStyles(...folder) {
    return path.join(stylesRoot, ...folder);
}
