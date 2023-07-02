'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/NOTICES": "41afabeee45c281a1949499ebd66dbe0",
"assets/assets/img/pizza.png": "68a81e262bbe2212e743a7052cd782df",
"assets/assets/img/taxi_icon.png": "6e364ca218f6677f6a46b14b54f5e85e",
"assets/assets/img/add_image.png": "6a12c9813b2c41582357005e60f16df4",
"assets/assets/img/my_location.png": "68f2bd5401a5f41444d68017a99540d3",
"assets/assets/img/no-image.png": "5975d96b60a6337d4319ca9900f2bc2f",
"assets/assets/img/burger2.png": "927750892c0d6539da9c79d1d058ebc8",
"assets/assets/img/profile.jpg": "569132ee1f3a3b0f0805855c80caac71",
"assets/assets/img/menu.png": "321ece63bc12f488fa318049f3d52353",
"assets/assets/img/pizza2.png": "3e35608bd5bbbe03e268acf2d26ab8bb",
"assets/assets/img/burger1.png": "5a664f35a07fff73f4d3d6937ee994d3",
"assets/assets/img/home.png": "ac8e7474fc058e7163aa94f344605e84",
"assets/assets/img/google_maps.png": "b0a3821414a51edd7ddec4e7d4133cba",
"assets/assets/img/address.png": "68f2bd5401a5f41444d68017a99540d3",
"assets/assets/img/no_items.png": "4a7779da96faa2ab18f0550d5d581ed7",
"assets/assets/img/delivery.png": "e80316d006e91ff02f3b49e61a0051c0",
"assets/assets/img/hamburguesa.png": "06a6c062b40c8cc7b12628f0129bebce",
"assets/assets/img/no-image.jpg": "335ceba57475f3c45f0d82f04b987bfa",
"assets/assets/img/bag.png": "d48de8562d8f94a7b7c7868864a94b6b",
"assets/assets/img/waze.png": "0585ff0faa0384d967478c5446fba558",
"assets/assets/img/user_profile.png": "8ca8bb8907de3ebe1b2d0f8a6464c780",
"assets/assets/img/add-image-placeholder.png": "6dc83dff51f8b11b65c97fc532a1f495",
"assets/assets/img/logo_app.png": "23e19188e1724a928ae755d30c155a97",
"assets/assets/img/user_profile_2.png": "43908028e58b259f95f47d4bef770b51",
"assets/assets/img/delivery2.png": "43ccf7192fd3111a4291877fa3722d73",
"assets/assets/json/delivery.json": "b6002b62a2e702d630a3ac7ca9ef2d5a",
"assets/assets/fonts/Roboto/Roboto-Medium.ttf": "d08840599e05db7345652d3d417574a9",
"assets/assets/fonts/NimbusSans/NimbusSanL-Reg.otf": "bc07f55513c47048cea8327a9cf2459b",
"assets/shaders/ink_sparkle.frag": "ab4751ef630837e294889ca64470bb70",
"assets/AssetManifest.json": "578222fed6e0f3c3dde50e029f92db2e",
"assets/FontManifest.json": "9a94e34f70edb4ed7c22148967f08fee",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"index.html": "1f9d9b178b77dfaee79fb7feae98aebd",
"/": "1f9d9b178b77dfaee79fb7feae98aebd",
"main.dart.js": "fc81681a25b39f45a6d1ac243a4aaa9f",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62",
"version.json": "f10974d50ed707e97dc3cb0ae155036c",
"manifest.json": "4b51c793f1d6202c17c2f7c75c276e40",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"favicon.png": "5dcef449791fa27946b3d35ad8803796"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
