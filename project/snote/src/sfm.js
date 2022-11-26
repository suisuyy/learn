import CONSTANT from './constant.js'
import simplefs from './simplefs.js';


function main() {
    // createDirFileList(CONSTANT.TESTDATA.fiterms, document.querySelector("#fm"));
}


async function createDirFileList(fArray, element, listenerFunctions) {
    let dfOL = document.createElement('ol');
    dfOL.style.overflow = "scroll";
    dfOL.style.height = "50vh";
    dfOL.classList.add('fileList')

    if (!fArray.length) {
        return;
    }

    for (const f of fArray) {
        let li = document.createElement('li');
        li.innerHTML = f.name;
        li.classList.add(['fli'])
        if (f.type === 'dir') {
            li.classList.add('dirli')
        }
        else if (f.type === 'file') {
            li.classList.add('fileli')
            li.addEventListener('click', async function () {
                console.log(`open ${f.name}: ${f.content}`, f);
            })
        }
        else if (f.type === 'repo') {
            li.classList.add('dirli')

        }
        li.addEventListener('click', async function () {
            listenerFunctions['clickListener'](f);

        })

        dfOL.appendChild(li);
    }

    element.appendChild(dfOL);

}


export default {
    main, createDirFileList
}

