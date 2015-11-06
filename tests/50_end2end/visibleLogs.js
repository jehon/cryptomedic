
function mylog(level, oldConsole) {
  t = oldConsole;
  txt = level + " @" + (new Date()).toLocaleTimeString() + "; ";
  for(i = 2; i < arguments.length; i++) {
    oldConsole.bind(console, "adding i" + i, arguments[i]);
    t = t.bind(console, arguments[i]);
    txt += JSON.stringify(arguments[i]) + " # ";
  }
  t();
  txt = txt + "<br>";
  jQuery("#visibleLogs").append(txt);
}
console.log = mylog.bind(console, "LOG", console.log);
console.warn = mylog.bind(console, "WARN", console.warn);
console.error = mylog.bind(console, "ERROR", console.error);
