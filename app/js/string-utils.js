
export function toTitleCase(text) {
    return text
        .split(' ')
        .map(/** @param {string} s */ s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
}
