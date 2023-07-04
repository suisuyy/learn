// ==UserScript==
// @name         saio
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!notion.so
// @author       suisuy
// @match        https://www.notion.so/*
// @match        *suisuy*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=notion.so
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // Your code here...

  //for notion
  console.log("****move action tool to top****");
  let styles = `
    .notion-text-action-menu { position: fixed; top: 90vh !important; }
`;

  let styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);


  //for boadtool bar
  let styles = `
    .notion-text-action-menu { position: fixed; top: 90vh !important; }
`;

  let styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

  chatgptbox-toolbar-container

})();
