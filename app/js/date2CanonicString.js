
export default function date2CanonicString(d, dateOnly) {
    if (d == null) return null;

    var ts = - (new Date()).getTimezoneOffset() / 60 * 100;

    var dateStr = d.getFullYear() +
		'-' +
		('00' + (d.getMonth() + 1)).substr(-2) +
		'-' +
		('00' + (d.getDate())).substr(-2);

    if (dateOnly) return dateStr;

    if (((((d.getHours() + (ts / 100)) % 24) == 0) || (d.getHours() == 0))
		&& (d.getMinutes() == 0) && (d.getSeconds() == 0)) {
        return dateStr;
    }

    return dateStr + ' ' +
		('00' + d.getHours()).substr(-2) +
		':' +
		('00' + d.getMinutes()).substr(-2) +
		':' +
		('00' + d.getSeconds()).substr(-2) +
		' GMT' + (ts < 0 ? '-' : '+') +
		('0000' + Math.abs(ts)).substr(-4);
}
