const WIDTH_PERCENTAGE = 40;
let activeWindow = null;
let windowsContainer = document.querySelector('#windowsContainer');

let model = {
    windows: {},
    windowsAmount: 0,
}

let controller = {
    addWindow: function (position, size, src, name) {
        position = position || { x: 50 + model.windowsAmount * 30, y: 150 + model.windowsAmount * 50 };
        size = size || { width: window.innerWidth * WIDTH_PERCENTAGE / 100, height: window.innerWidth * WIDTH_PERCENTAGE / 100 };
        let newWindow = {
            position: position,
            size: size,
            src: src || 'https://www.bing.com',
            name: name || "w" + (model.windowsAmount + 1),
            id: "window" + model.windowsAmount
        }
        model.windows[newWindow.id] = newWindow;
        model.windowsAmount += 1;

        windowsContainer.appendChild(createWindowDiv(newWindow.name, newWindow.id, newWindow.src, position, size))

    },
    updateWindows: function (windowsObj) {
        model.windowsAmount = 0;
        model.windows = {};
        windowsContainer.innerHTML = ''
        for (const windowid in windowsObj) {
            const w = windowsObj[windowid];
            console.log(w)
            this.addWindow(w.position, w.size, w.src, w.name)


        }

    },
    updateWindowPosition: function (windowDiv, mousePosition, isDown) {

        if (isDown) {
            let windowDivX = (mousePosition.x + offset[0]);
            let windowDivY = (mousePosition.y + offset[1]);

            windowDiv.style.left = windowDivX + 'px';
            windowDiv.style.top = windowDivY + 'px';
            model.windows[windowDiv.id].position = { x: windowDivX, y: windowDivY };
        }
    },
    updateWindowSize(windowDiv, size) {
        model.windows[windowDiv.id].size = size;
        windowDiv.style.width = size.width + 'px';
        windowDiv.style.height = size.height + 'px';
    },
    updateWindowSrcAndName(windowDiv, src, name) {
        windowDiv.querySelector('.WindowSrc').value = src;
        windowDiv.querySelector('.WindowName').value = name;
        windowDiv.querySelector('.WindowContent').src = src;
        model.windows[windowDiv.id].src = src;
        model.windows[windowDiv.id].name = name;

    }
}

controller.addWindow()

function createWindowDiv(name, id, src, position, size = [window.innerWidth * 0.9, window.innerWidth * 1]) {
    let windowDiv = document.createElement('div');
    windowDiv.id = id;
    windowDiv.classList = ['WindowDiv']
    windowDiv.innerHTML = `
    <div class="TopBar">
        <input type="text" class="WindowName" value=${name}>
        <input class="WindowSrc" value=${src}>
        <button class="newBtn ActionBtn"><i class="icofont-plus"></i></button>
        <button class="reloadBtn ActionBtn"><i class="icofont-refresh"></i></button>
        <input type="text" class="WindowWidthInput"  value=${WIDTH_PERCENTAGE}>
        x
        <input type="text" class="WindowHeightInput"  value=${WIDTH_PERCENTAGE}>

    </div>
    <iframe class="WindowContent" src=${src}></iframe>
    `
    windowDiv.style.top = position.y + 'px';
    windowDiv.style.left = position.x + 'px';
    windowDiv.style.width = size.width + 'px';
    windowDiv.style.height = size.height + 'px';
    windowDiv.style.zIndex = '1';

    let newBtn = windowDiv.querySelector('.newBtn');
    let reloadBtn = windowDiv.querySelector('.reloadBtn');
    let widthInput = windowDiv.querySelector('.WindowWidthInput');
    let heightInput = windowDiv.querySelector('.WindowHeightInput');
    let srcInput = windowDiv.querySelector('.WindowSrc');
    let nameInput = windowDiv.querySelector('.WindowName');



    reloadBtn.addEventListener('click', e => {
        controller.updateWindowSrcAndName(windowDiv, srcInput.value, nameInput.value);


    })

    windowDiv.addEventListener('pointerdown', e => {
        if (activeWindow) {
            activeWindow.style.zIndex = '1';
        }
        activeWindow = windowDiv;
        windowDiv.style.zIndex = '10';
    })

    srcInput.addEventListener('change', e => {
        controller.updateWindowSrcAndName(windowDiv, srcInput.value, nameInput.value);
    })
    nameInput.addEventListener('change', e => {
        controller.updateWindowSrcAndName(windowDiv, srcInput.value, nameInput.value);
    })
    widthInput.addEventListener('change', e => {
        controller.updateWindowSize(windowDiv, { width: parseFloat(widthInput.value) / 100 * window.innerWidth, height: windowDiv.clientHeight })
    })
    heightInput.addEventListener('change', e => {
        controller.updateWindowSize(windowDiv, { width: windowDiv.clientWidth, height: parseFloat(heightInput.value) / 100 * window.innerWidth })
    })


    newBtn.addEventListener('click', e => {
        controller.addWindow()
    })
    let isDown = false;
    offset = [0, 0];
    windowDiv.addEventListener('pointerdown', function (e) {
        isDown = true;
        offset = [
            windowDiv.offsetLeft - e.clientX,
            windowDiv.offsetTop - e.clientY
        ];

    }, true);

    window.addEventListener('pointerup', function () {
        isDown = false;
    }, true);

    window.addEventListener('pointermove', function (event) {
        controller.updateWindowPosition(windowDiv, { x: event.clientX, y: event.clientY }, isDown);

    }, true);





    return windowDiv;

}



// let mainWindowDiv = document.querySelector('#mainWindowDiv');
// let mainMoveBtn = document.querySelector('#mainMoveBtn');

// let isDown = false;
// offset = [0, 0];
// moveBtn.addEventListener('pointerdown', function (e) {
//     isDown = true;
//     offset = [
//         mainWindowDiv.offsetLeft - e.clientX,
//         mainWindowDiv.offsetTop - e.clientY
//     ];

// }, true);

// document.addEventListener('pointerup', function () {
//     isDown = false;
// }, true);

// document.addEventListener('pointermove', function (event) {
//     event.preventDefault();
//     if (isDown) {
//         mousePosition = {

//             x: event.clientX,
//             y: event.clientY

//         };

//         windowDiv.style.left = (mousePosition.x + offset[0]) + 'px';
//         windowDiv.style.top = (mousePosition.y + offset[1]) + 'px';
//     }
// }, true);









const swURL = "./service-worker.js"

// Register the service worker
if ('serviceWorker' in navigator) {
    // Wait for the 'load' event to not block other work
    window.addEventListener('load', async () => {
        // Try to register the service worker.
        try {
            //not install sw in dev mode
            // const reg = await navigator.serviceWorker.register(swURL);
            console.log('Service worker registered! 😎', reg);
        } catch (err) {
            console.log('😥 Service worker registration failed: ', err);
        }
    });
}
else {
    console.log('serviceWorker not fount in navigator,maybe not supported or not using https')
}

/**
 * Warn the page must be served over HTTPS
 * The `beforeinstallprompt` event won't fire if the page is served over HTTP.
 * Installability requires a service worker with a fetch event handler, and
 * if the page isn't served over HTTPS, the service worker won't load.
 */
if (window.location.protocol === 'http:') {
    const requireHTTPSDiv = document.getElementById('requireHTTPS');
    const linkAchor = requireHTTPSDiv.querySelector('a');
    linkAchor.href = window.location.href.replace('http://', 'https://');
    requireHTTPSDiv.classList.remove('hidden');
}