import { Octokit } from '@octokit/core/';
import utils from './utils.js';
// import { Octokit } from "/public/lib/@octokit/core/dist-web";


import CONSTANT from "./constant.js"
import { Base64 } from 'js-base64';



async function main(t) {
    console.log('start simplefs.main()');
    window.Octokit = Octokit

    let repopath = '/repos/suisuyy/Github-API-Testing/contents'
    let newfilepath = '/atest4'

    // update(CONSTANT.ENV.github_app.test_token, repopath + newfilepath, B64STR.aaaa);
    // ls(CONSTANT.ENV.github_app.test_token, `${repopath}/7z2201-x64.exe`)
    // cat('https://raw.githubusercontent.com/suisuyy/Github-API-Testing/main/atest4')
}


// Between 1 - 100 MB: Only the raw or object custom media types are supported.Both will work as normal, except that when using the object media type, the content field will be an empty string and the encoding field will be "none".To get the contents of these larger files, use the raw media type.
async function ls(token, repopath) {
    repopath = repopath + `?${Math.random()}`
    console.log(`ls('${token}', '${repopath}')`)

    const octokit = new Octokit({
        auth: token,
    })
    // res will be array of fileobj
    let { data: res } = await octokit.request(`GET ${repopath}`)
    if (res.length === undefined) {
        //if res.length undefined,this means its a file
        console.log(repopath, res, Base64.decode(res.content));

        return res;
    }

    let allDirs = res.filter(f => f.type === 'dir');
    let allFiles = res.filter(f => f.type === 'file');
    res = [...allDirs, ...allFiles]
    console.log(repopath, res)
    return res;
}

/*
@token
@filepath:'/repos/suisuyy/Github-API-Testing/contents/onewfile'
@b64file base64code 
*/
function touch(token, filepath, b64file) {
    console.log(`touch('${token}', '${filepath}','${b64file}')`)
    const octokit = new Octokit({
        auth: token,
    });

    octokit.request('PUT ' + filepath, {
        owner: 'suisuy',
        repo: 'Github-API-Testing',
        path: filepath,
        message: 'from snote ' + filepath,
        committer: {
            name: 'snote',
            email: 'snote@gmail.com',
        },
        content: b64file,

    });

}

async function cat(file) {
    console.log(`run cat('${file}')`)

    let res = await (await fetch(file.git_url, { cache: "no-cache" })).json();
    console.log(`finish cat(${file})`, res);
    let doc = Base64.decode(res.content);
    if (doc) {
        console.log(`finish simplefs.cat(${file.git_url})`, file.sha);
        return doc;
    }

    let fileurl = file.download_url + '?' + 'random=' + Math.random() * 1000;
    // fileurl = 'https://corsp.suisuy.workers.dev/?' + fileurl;
    console.log(`run cat('${fileurl}')`)

    res = await fetch(fileurl, { cache: "no-cache" });
    doc = await res.text();
    console.log(`finish cat(${fileurl})`, doc);
    return doc;
}

function mkdir(token, dirurl) {
    touch(token, dirurl + "/.tmp")
}


async function update(token, fileurl, b64file) {
    console.log(`update('${token}', '${fileurl}','${b64file}')`)

    let sha = await getSha(token, fileurl)
    const octokit = new Octokit({
        auth: token,
    });

    let res = await octokit.request('PUT ' + fileurl, {

        message: 'from snote ' + fileurl,
        sha: sha,
        committer: {
            name: 'snote',
            email: 'snote@gmail.com',
        },
        content: b64file,

    });
    let updatedFile = res?.data?.content;
    console.log(`updated('${token}', '${fileurl}','${b64file}')`, updatedFile);
    return updatedFile;
}

function remove(token, filepath) {

}



async function getSha(token, fileurl) {
    console.log(`getSha('${token}', '${fileurl}')`)

    const octokit = new Octokit({
        auth: token,
    });
    let res = await octokit.request(`GET ${fileurl}`)
    // .then(res => {
    //     console.log(res)
    // })
    console.log('got sha:' + res.data.sha)
    return res?.data?.sha;

}

async function getUser(token) {
    const octokit = new Octokit({
        auth: token
    })
    let res = await octokit.request('GET /user', {})
    if (res?.data) {
        console.log('gotUser :', res.data)
    }
    return res?.data;
}

/*
    @token
    @userName
    @return [repo1, repo2]
*/
async function getRepos(token, userName) {
    const octokit = new Octokit({
        auth: token
    })

    let res = await octokit.request('GET /users/{username}/repos', {
        username: userName
    })
    let repoArray = res.data;
    for (const repo of repoArray) {
        repo.type = 'repo';
    }
    console.log(`gotRepos : ${userName}`, res.data);
    return res?.data;
}

export default {
    main, ls, touch, mkdir, update, remove, cat, getUser, getRepos
}

