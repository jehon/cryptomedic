export default [
  {
    context: ["/api", "/built/frontend", "/static"],
    target: "http://localhost:8085",
    secure: false,
    logLevel: "debug"
  }
];
