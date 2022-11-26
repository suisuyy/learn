import './style.css'

let dictionaryWebsites = {
    youdao: { url: 'https://mobile.youdao.com/dict?le=eng&q=', iframe: null },
    baidu: { url: 'https://fanyi.baidu.com/#en/zh/', iframe: false },
    oxford: { url: 'https://www.oxfordlearnersdictionaries.com/us/definition/english/', iframe: false }
}

let clipboardDisplayer = document.querySelector('#clipboardDisplayer');
let dictContainer = document.querySelector('#dictContainer');
let currentClipboardText = '';



function setClipboardText() {
    if (document.hasFocus === false) {
        return;
    }
    navigator.clipboard.readText().then(value => {
        if (currentClipboardText === value) {
            return;
        }
        currentClipboardText = value;
        clipboardDisplayer.value = value + '\n\n' + clipboardDisplayer.value;
        dictionaryWebsites.youdao.iframe.src = dictionaryWebsites.youdao.url + getFirstWordOfString(value + '');
    });
}

function createDictionaryDisplay(dictionaryWebsite) {
    let div = document.createElement('div');
    let iframe = document.createElement('iframe');
    iframe.src = dictionaryWebsite.url;
    iframe.classList.add(['dictionary-displayer'])
    dictionaryWebsite.iframe = iframe;
    div.appendChild(iframe);
    dictContainer.appendChild(div);
}

async function start() {
    let getClipboardTextInterval = setInterval(() => {
        setClipboardText();
    }, 1000);

    createDictionaryDisplay(dictionaryWebsites.youdao)
}

function getFirstWordOfString(str) {
    if (typeof str !== 'string') {
        return '';
    }
    return str.split(/[-_\.\s]/)[0];
}



start();

document.addEventListener('select', (ev) => {
    console.log(window.getSelection().toString())
    dictionaryWebsites.youdao.iframe.src = dictionaryWebsites.youdao.url + window.getSelection();
})