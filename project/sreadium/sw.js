/*
Copyright 2018 Google Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const cacheName = 'cache-v1';
const precacheResources = [
    './',
    './index.html',
    './manifest.json',
    './css/annotations.css', 'css/readium-all.css',
    './scripts/readium-js-viewer_all.js', './scripts/mathjax/MathJax.js', './scripts/zip/deflate.js', './scripts/zip/inflate.js ', './scripts/zip/z-worker.js', './scripts/zip/deflate.js.map', './scripts/zip/inflate.js.map', './scripts/zip/z-worker.js.map',
    './sreadiumhack/sreadium.css', './sreadiumhack/sreadium.js', './sreadiumhack/icon/icon192.png',
    './images/glyphicons_115_text_smaller.png', './images/glyphicons_116_text_bigger.png', './images/margin1_off.png', './images/margin4_off.png', './images/ico_singlepage_up.png', './images/ico_doublepage_up.png', './images/about_readium_logo.png', './images/partner_logos.png', './images/readium_favicon.png',
    './images/covers/cover1.jpg', './images/covers/cover2.jpg', './images/covers/cover3.jpg', './images/covers/cover4.jpg', './images/covers/cover5.jpg', './images/covers/cover6.jpg', './images/covers/cover7.jpg', './images/covers/cover8.jpg',
    './font-faces/fonts.js',
    './fonts/glyphicons-halflings-regular.woff2',
    './epub_content/epub_library.opds',

]

self.addEventListener('install', event => {
    console.log('Service worker install event!');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(precacheResources);
            })
    );
});

self.addEventListener('activate', event => {
    console.log('Service worker activate event!');
});

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request, { ignoreSearch: true, ignoreMethod: true, ignoreVary: true })
        .then(cachedResponse => {
            if (cachedResponse) {
                console.log("sw:Cache matched the request:", event.request.url)
                return cachedResponse;
            }
            console.log("sw:No Cache,start fetch:", event.request.url);

            return fetch(event.request).catch(err => console.log(event.request.url));
        })
    );
});