// https://github.com/GoogleChrome/sw-precache#options
module.exports = {
  staticFileGlobs: [
    'www/static/**/*.css',
    'www/static/**/*.html',
    'www/static/**/*.html',
    'www/static/**/*.js'
  ],
  stripPrefix: 'www/',
  verbose: true
}
