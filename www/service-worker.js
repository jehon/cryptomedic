/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["build/fonts/glyphicons-halflings-regular.eot","f4769f9bdb7466be65088239c12046d1"],["build/fonts/glyphicons-halflings-regular.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["build/fonts/glyphicons-halflings-regular.woff","fa2772327f55d8198301fdb8bcfc8158"],["build/fonts/glyphicons-halflings-regular.woff2","448c34a56d699c29117adc64c43affeb"],["build/img/cal.gif","cfebf044564e5b8fa3213430b15c91fa"],["build/img/error.png","01ce28fb02aca55bbe48e8723bbcaf9c"],["build/img/glyphicons-halflings-regular.svg","89889688147bd7575d6327160d64e760"],["build/img/ui-icons_444444_256x240.png","a4c733ec4baef9ad3896d4e34a8a5448"],["build/img/ui-icons_555555_256x240.png","971364734f3b603e5d363a2634898b42"],["build/img/ui-icons_777620_256x240.png","208a290102a4ada58a04de354a1354d7"],["build/img/ui-icons_777777_256x240.png","73a1fd052c9d84c0ee0bea3ee85892ed"],["build/img/ui-icons_cc0000_256x240.png","0de3b51742ed3ac61435875bccd8973b"],["build/img/ui-icons_ffffff_256x240.png","bf27228a7d3957983584fa7698121ea1"],["build/img/waiting.gif","eca3092194f508e80711fa3857d6b167"],["build/index.html","9d824709d71d8bf7f62a36b44cbd62b3"],["build/sw-offline.js","6d18cb2260ae363092aa722a046eeee1"],["build/vagrant/www/sw-offline.js","e10b3b2ac71bf416590407d76e210007"],["cryptomedic/index.html","7de4786211339eef5673e56f32b4bd61"],["favicon.ico","66b3119d379aee26ba668fef49188dd3"],["license.txt","662bee12dd89c1dc1f112172eff02342"],["static/img/bangladesh.svg","2f35de0035fb72570c7d7ec2c39e96e8"],["static/img/baniere-entete.jpg","43ee36d26e9bc57dbd6e37a317f457d7"],["static/img/boolean-false.gif","d4012dd27d6b18009c149fa155b7b962"],["static/img/boolean-true.gif","147a1241e112be47aab6029a2d673ae6"],["static/img/bug.jpeg","bed7aef6cf0904630f9c6a9c5ec487cf"],["static/img/consultOfDay.gif","be8c3ac05fd129253d91747d61f21474"],["static/img/cryptomedic.jpg","b9ff5cfa266ed7367af765b62f95ef24"],["static/img/emblem.jpg","eeae6fbd48500d7df1aa2ef24944b379"],["static/img/file_not_defined.png","7052430e457f966588bbc48916dad210"],["static/img/go.gif","3ad8b9036b5cf7b4576db9726b5fdf9a"],["static/img/home.gif","19c5a16af6f7c3ef66d62bb7761ec076"],["static/img/locked.gif","01a2aa80a34317a7ed32a45398bcf169"],["static/img/logout.gif","548b970550d7af2d279be9d9d0f2859b"],["static/img/patient.gif","38a7bb721a207197f6b6d89eae4f79a0"],["static/img/patientsSearch.gif","9aecdc7c7cc147752701170d87ca9e6d"],["static/img/reports.gif","be8c3ac05fd129253d91747d61f21474"],["static/img/stats_bmi-f.jpg","a65b15fd87e48183c6e971ad8ce88bb2"],["static/img/stats_bmi-m.jpg","4e6583961106ea8e21282d65c7ad1546"],["static/img/stats_bmi-null.jpg","fa6ade3e3bddbba8941193d0b82ece7d"],["static/img/stats_height-f.jpg","7765f37027366f2d6684186a7d15e934"],["static/img/stats_height-m.jpg","c1d43a8a95aa27ae6d2b84b46e383b6b"],["static/img/stats_height-null.jpg","2241a8117cef31a77c52eff857e29e22"],["static/img/stats_weight-f.jpg","b8b892397976570789ee83a2cf7e5035"],["static/img/stats_weight-m.jpg","0fa46ea8f149a1044fa029b5c9b152b3"],["static/img/stats_weight-null.jpg","5bf68f6f6f17503c57cb6e53e11eb56e"],["static/img/stats_wh-f.jpg","8683ebf9231a39380096a9a1c6a17d28"],["static/img/stats_wh-m.jpg","9321f3ffe8c0e24388c5e8b83689ff7f"],["static/img/stats_wh-null.jpg","fb349b01909fbce3add72a8a89c4cd7e"],["static/img/sync.png","a093bc5a1a7619d6a9687705e4114868"],["static/img/sync/download.png","d28a8402c45f40a3a67288da5cbbd757"],["static/img/sync/off.png","8611bf26d1bff0d14f9623fa525d2b21"],["static/img/sync/ok.png","de486d503ea550558b9c7274095c7771"],["static/img/sync/unknown.png","adfe3e9d6269f8ee0324bffba3b107e8"],["static/img/sync/upload.png","4608ec5b8eaf21f3843c16e98d126f22"],["static/img/unlock.gif","1ebc316313570fa7bcee22e8418df7f0"],["static/img/users.png","9bf0b7361d13fced552c1f345f3876eb"],["static/img/waiting.gif","eca3092194f508e80711fa3857d6b167"],["static/js/bugreporting.js","020bb1c423d1fd0d7a7f33cea40e62c4"],["static/js/html2canvas.js","dc6649ec24e418e05e3de8ecbe478b87"],["static/js/start.js","6d4a4eef5c0ec7ff4e341f9a74f64e71"],["static/lil.html","b557cb762c37a3aebb465f33cf1083f4"],["static/upgrade.html","48a48f0ea5cee2f4fbd81af6d2578992"]];
var cacheName = 'sw-precache-v2-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {credentials: 'same-origin'}));
            }
          })
        );
      });
    }).then(function() {
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      return self.clients.claim();
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url));
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







