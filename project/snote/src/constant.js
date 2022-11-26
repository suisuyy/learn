const ENV = {
    'github_app': {
        client_id: '62bae466424e9145c0a5',
        client_secret: 'd373d9ebf716e36988e31f6687920706af76fbdd',
        test_token: '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',
        repo_path: '/repos/suisuyy/Github-API-Testing/contents'
    },
    // corsproxy: 'https://thingproxy.freeboard.io/fetch',
    corsproxy: 'https://corsp.suisuy.eu.org?',
    ghproxy: 'https://ghproxy.com/'

};

const STRING = {
    hello:"# Hello this Snote by Suisuy\nhere are some basic usage\ntry login first\n\n write you js code like this,\ntry to double click to run current line code\n```javascript\n3*4 //double click me\n```",
}

const B64STR = {
    test: "dGVzdA==",
    aaaa: "YWFhYQ==",
}

const TESTDATA = {
    fiterms: [
        {
            "name": "dir",
            "path": "dir",
            "sha": "fa5822727995623554527c999dc4644ff2a5c629",
            "size": 0,
            "url": "https://api.github.com/repos/suisuyy/Github-API-Testing/contents/dir?ref=main",
            "html_url": "https://github.com/suisuyy/Github-API-Testing/tree/main/dir",
            "git_url": "https://api.github.com/repos/suisuyy/Github-API-Testing/git/trees/fa5822727995623554527c999dc4644ff2a5c629",
            "download_url": null,
            "type": "dir",
            "_links": {
                "self": "https://api.github.com/repos/suisuyy/Github-API-Testing/contents/dir?ref=main",
                "git": "https://api.github.com/repos/suisuyy/Github-API-Testing/git/trees/fa5822727995623554527c999dc4644ff2a5c629",
                "html": "https://github.com/suisuyy/Github-API-Testing/tree/main/dir"
            }
        },
        {
            "name": "anewfile",
            "path": "anewfile",
            "sha": "5ddc2beda58b9ace39bc3525fe6e1e1585312d03",
            "size": 26,
            "url": "https://api.github.com/repos/suisuyy/Github-API-Testing/contents/anewfile?ref=main",
            "html_url": "https://github.com/suisuyy/Github-API-Testing/blob/main/anewfile",
            "git_url": "https://api.github.com/repos/suisuyy/Github-API-Testing/git/blobs/5ddc2beda58b9ace39bc3525fe6e1e1585312d03",
            "download_url": "https://raw.githubusercontent.com/suisuyy/Github-API-Testing/main/anewfile",
            "type": "file",
            "_links": {
                "self": "https://api.github.com/repos/suisuyy/Github-API-Testing/contents/anewfile?ref=main",
                "git": "https://api.github.com/repos/suisuyy/Github-API-Testing/git/blobs/5ddc2beda58b9ace39bc3525fe6e1e1585312d03",
                "html": "https://github.com/suisuyy/Github-API-Testing/blob/main/anewfile"
            }
        },
     
       
    ]
}



export default { ENV, B64STR, TESTDATA,STRING }