import { basicSetup, EditorView } from 'codemirror';
import { keymap } from "@codemirror/view"
import { indentWithTab } from "@codemirror/commands"
import { markdown } from "@codemirror/lang-markdown"
import { languages } from "@codemirror/language-data"
import {
    javascript,
    javascriptLanguage,
    scopeCompletionSource,
} from '@codemirror/lang-javascript';
import { Base64 } from 'js-base64';

import simplefs from "./simplefs.js";
import editor from "./editor.js";
import CONSTANT from './constant.js'
import sfm from './sfm'
import utils from "./utils.js"
import constant from './constant.js';

console.log(CONSTANT.ENV.github_app)

let model = {
    github: {
        user: { name: 'test' },
        token: '',
        allRepoList: [],
        currentRepoPath: CONSTANT.ENV.github_app.repo_path,
        client_id: CONSTANT.ENV.github_app.client_id,
        client_secret: CONSTANT.ENV.github_app.client_secret,
    },
    urlBar: {
        url: '',
        params: {},
    },
    editor: {
        value: '',
        changed: false,
        currentFile: '',
        currentLine: {
            from: 0,
            to: 0,
            number: 0,
            text: '',
            length: 0
        },
        selection: {
            start: 0,
            end: 0,
            doc: ''
        },
    },
    fm: {
        filedirDataList: {

        }
    },
    saveTimeoutID: 0,
}

let spinerView = {
    init() {
        this.spinerContainer = document.querySelector(".spiner");
        this.hide();
    },
    hide() {
        this.spinerContainer.classList.add(['hidden']);
    },
    show() {
        this.spinerContainer.classList.remove(['hidden']);
    }
}

let editorView = {
    init() {
        this.editorContainer = document.querySelector("#editor");
        this.render(this.editorContainer, constant.STRING.hello);

        let touchtime = 0;
        this.editorContainer.addEventListener('click', (e) => {
            console.log('test');
            if (((new Date().getTime()) - touchtime) < 500) {
                console.log(control.getCurrentLine());
                let currentLine = control.getCurrentLine();
                let res = control.runcodestr(currentLine.text);
                alert(res)
            }
            touchtime = new Date().getTime();
        });
    },
    render(container, doc) {
        this.editor?.destroy();
        this.editor = editor.createMDEditor(container, doc, control.editorListenerFunctions);
        return this.editor;
    }
}

let fmView = {
    init() {
        this.fmContainer = document.querySelector("#fm");
        this.render(this.fmContainer, {
            clickListener: control.openDoc
        });
    },
    async render(container, listenerFunctions, fList) {
        this.fmContainer.innerHTML = '';
        sfm.createDirFileList(fList || model.fm.filedirDataList, container, listenerFunctions);
    }
}

let MenuView = {
    loginBar: document.querySelector('#loginBar'),
    fileOpenButton: document.querySelector('#fileOpenButton'),
    fileSaveButton: document.querySelector('#fileSaveButton'),
    loginBar: document.querySelector('#loginBar'),
    debugToggler: document.querySelector("#debugToggler"),
    init() {
        this.debugToggler.addEventListener('click', evt => {
            // console.log('toogle debuger');
            document.querySelector('#debug').classList.toggle('hidden');
        });
        this.fileOpenButton.addEventListener('click', evt => {
            document.querySelector('#fm').classList.toggle('hidden');

        });

        this.fileSaveButton.addEventListener('click', evt => {

            control.saveDoc(model.editor.currentFile, model.editor.value);
        });
        this.fileSaveButton.addEventListener('click', evt => {

        });
    },

    render() { }
}

let urlView = {
    init() {
        window.addEventListener('popstate', evt => {
            let pathname = new URLSearchParams(location.search).get('pathname')
            control.updatePathname(pathname, false);
        });
    }
}


let control = {
    async init() {
        this.debug();

        await this.initModel();

        spinerView.init();
        editorView.init();
        fmView.init();
        MenuView.init();
        urlView.init();

        if (model.urlBar.params.pathname) {
            spinerView.show();
            control.updatePathname();
            spinerView.hide();
        }
        this.intervalRunner(30000)
    },
    async initModel() {
        model.urlBar.url = location.href;
        model.urlBar.params = Object.fromEntries(new URLSearchParams(location.search));


        if (new URL(location.href).searchParams.get("code")) {
            console.log('try to get token');
            await this.getTokenByCode(new URL(location.href).searchParams.get("code"));
            history.pushState({}, '', `?pathname=/`);

        }
        await control.updateGithubInfo();
    },
    editorListenerFunctions: {
        changeListener(newDocstr) {
            // console.log(newDocstr);
            model.editor.value = newDocstr;
            model.editor.changed = true;
            clearTimeout(model.saveTimeoutID);
            model.saveTimeoutID = setTimeout(() => {
                control.saveDoc(model.editor.currentFile, model.editor.value);
            }, 3000);
        },

        cursorListener() {
            console.log("cursor changed");
            model.editor.currentLine = editorView.editor.state.doc.lineAt(editorView.editor.state.selection.main.head)
        }
    },
    getFiledirDataList() {
        return model.fm.filedirDataList;
    },
    getCurrentLine() {
        return model.editor.currentLine;
    }
    ,
    checkLogin() {
        return Boolean(model.github.token);
    },
    async getTokenByCode(code) {
        let res = (await fetch(CONSTANT.ENV.corsproxy + 'https://github.com/login/oauth/access_token?client_id=62bae466424e9145c0a5&client_secret=d373d9ebf716e36988e31f6687920706af76fbdd&state=snote&code=' + code, {
            method: "POST",
            headers: {
                Accept: 'application/vnd.github+json',
            }
        }))
        let resObj = await res.json();
        if (resObj?.access_token) {
            console.log('gotTokenBycode: ' + resObj?.access_token)

            utils.updateObjInStroge('setting', { github_token: resObj.access_token })


        }
        else {
            console.log('faild to get token');
        }
        return resObj?.access_token;
    },
    async ls(path) {
        console.log(`ls(${path})`);
        let res;
        if (path === '/' || path === undefined || path === null) {
            res = await simplefs.getRepos(model.github.token, model.github.user.login);
        }
        else if (path.split('/').length < 3) {
            let urlpath = `/repos/${model.github.user.login
                }${path}/contents`
            res = await simplefs.ls(model.github.token, urlpath);

        }
        else {
            let [blandtmp, repo, ...p] = path.split('/');

            let urlpath = `/repos/${model.github.user.login
                }/${repo}/contents/${p.join('/')}`
            res = await simplefs.ls(model.github.token, urlpath);

        }

        return res;

    },
    async updatePathname(pathname = model.urlBar.params.pathname, push = true, ifUpdateFm = true) {
        spinerView.show();
        model.urlBar.params.pathname = pathname;
        let res = await control.ls(pathname);  //if pathname is file ls() return a file object
        if (res.type === 'file') {
            let file = res;
            let fileContent = await simplefs.cat(file);
            console.log(fileContent);
            control.openDocstr(fileContent)
            model.editor.currentFile = file;

            let tmp = pathname.split('/');
            tmp.pop();
            let dirpath = tmp.join('/');
            if (ifUpdateFm) {
                let flist = await control.ls(dirpath)
                model.fm.filedirDataList = flist;
                model.fm.wd = dirpath;
                fmView.render(fmView.fmContainer, {
                    clickListener: control.openDoc
                }, flist);
            }

        }
        else {
            model.fm.filedirDataList = res;
            model.fm.wd = pathname;
            fmView.render(fmView.fmContainer, {
                clickListener: control.openDoc
            }, model.fm.filedirDataList);
        }

        if (push) {
            history.pushState({}, '', `?pathname=${pathname}`);
        }
        spinerView.hide();

    },

    openDocstr(str) {
        model.editor.value = str;
        editorView.editor = editorView.render(editorView.editorContainer, str)
    },
    async openDoc(file) {
        if (file.type === 'file') {
            let repoName = file.html_url.split('/')[4];
            let pathname = `/${repoName}/${file.path}`;
            control.updatePathname(pathname, true, false);
        }
        else if (file.type === 'dir') {
            let repoName = file.html_url.split('/')[4];
            let pathname = `/${repoName}/${file.path}`;
            control.updatePathname(pathname);
        }
        else if (file.type === 'repo') {
            console.log(`open repo ${file.name}`);
            control.updatePathname(`/${file.name}`);

        }

    },

    async saveDoc(file, newContent) {
        spinerView.show();
        if (model.editor.changed === false) {
            console.log('doc not changed')
            spinerView.hide();
            return;
        }
        console.log(`saveDoc(${file}),${newContent}`);
        let encodedDoc = Base64.encode(newContent);
        // console.log(`encodedDoc: ${encodedDoc}`);
        let updatedFile = await simplefs.update(model.github.token, file.url, encodedDoc);
        model.editor.changed = false;
        spinerView.hide();
        file.git_url = updatedFile.git_url;
        for (const f of model.fm.filedirDataList) {
            if (f.name === updatedFile.name) {
                f.git_url = updatedFile.git_url;
                f.sha = updatedFile.sha;
                fmView.fmContainer.innerHTML = '';
                setTimeout(() => {
                    fmView.init();
                }, 1000);
                return;
            }
        }

    },
    async updateGithubInfo() {
        model.github.token = utils.getObjFromStorage('setting')['github_token'] || '';
        if (!model.github.token) {
            console.log('updateGithubInfo: no github token return');
            return;
        }
        let user = await simplefs.getUser(model.github.token);
        if (!user) {
            console.log('updateGithubInfo: seems bad github token try relogin return');
            return;
        }
        model.github = { ...model.github, ...{ user: user } };
        model.fm.filedirDataList = await control.ls('/');
        model.fm.fs = {
            '/': await control.ls('/')
        }
        MenuView.loginBar.innerHTML = model.github.user.login;
    },

    intervalRunner(interval) {

        setInterval(() => {
            console.log('inervalRunner:');
            // this.saveDoc(model.editor.currentFile, model.editor.value);
        }, interval);
    }
    ,

    runcodestr(str) {
        let res = new Function('return ' + str)();
        return res;
    },

    debug() {
        window.model = model
        window.control = control;
        window.editorView = editorView;
        window.simplefs = simplefs;
        window.spinerView = spinerView;

        let debugDiv = document.getElementById('debug');
        window.debugButton = document.getElementById('debugButton');
        let objDisplayer = document.getElementById('objDisplayer');

        // debugDiv.style.display = 'inherit';
        setInterval(() => {
            objDisplayer.innerHTML = JSON.stringify(model, null, 4);

        }, 4000);

        debugButton.addEventListener('click', evt => {
            console.log("debugbutton click");
            // control.saveDoc(model.editor.currentFile, model.editor.value)
            // simplefs.ls(model.github.token, 'https://api.github.com/users/suisuyy/repos');
        });

        setTimeout(() => {
            // control.ls('/');
            // control.ls('/Github-API-Testing');
        }, 5000);
    }
}


control.init();

//test
// simplefs.main();
// editor.main();
// sfm.main();



