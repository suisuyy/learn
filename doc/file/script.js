// ==UserScript==
// @name         saio
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!notion.so
// @author       suisuy
// @match        https://www.notion.so/*
// @match      *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=notion.so
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    // Your code here...

    //for notion 0vh
    console.log("****move action tool to top****");
    let styles = `
        .notion-text-action-menu { position: fixed !important; top: 0vh !important; }
        #notion-app > div > div.notion-overlay-container.notion-default-overlay-container > div:nth-child(2) > div > div > div:nth-child(2) > div { position: fixed !important; top: 10vh !important;  }
    `;

    let styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);


    //for gptboxtool bar top:5vh
    styles = `
        .chatgptbox-toolbar-container { position: fixed !important; top: 5vh !important; }
    `;

    styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
  })();
