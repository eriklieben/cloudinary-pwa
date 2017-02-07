import * as gulp from 'gulp';
import * as swPrecache from 'sw-precache';
import * as project from '../aurelia.json';

export default function generateServiceWorker() {
  return swPrecache.write('./service-worker.js', {

    // Used to avoid cache conflicts when serving on localhost.
    cacheId: project.name,

    importScripts: [
      'node_modules/sw-toolbox/sw-toolbox.js'
    ],
    staticFileGlobs: [
      `images/**/*`,
      `scripts/**/*.js`,
      `index.html`
    ],
    runtimeCaching: [{
      urlPattern: /^http:\/\/res.cloudinary.com\//,
      handler: 'fastest'
    }],    
    stripPrefix: '/'
  });
}
