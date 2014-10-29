exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'e2e/*.js'
  ],

  multiCapabilities: [
    {
      'browserName': 'chrome'
    },
    // {
    //   'browserName': 'firefox'
    // }
  ],

  //baseUrl: 'http://localhost:8000/app/',
  baseUrl: 'http://localhost/amd/new/angular/app/index.php',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
