module.exports = {
  stripPrefix: 'build/',
  staticFileGlobs: [
    'dist/*.html',
    'dist/manifest.json',
    'dist/css/**.*',
    'dist/js/**.*',
    'dist/**.png',
    'dist/bootstrap/**/**.*.*'
  ],
  "stripPrefix": "dist/",
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  swFilePath: 'dist/service-worker.js'
};