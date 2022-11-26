const { inherit } = require("hammerjs");

// #debug enable
const MODE = "";


const cacheName = 'cache-v1';
const DEFAULT_CONFIG = {
    "scroll": "scroll-continuous",
}

window.sreadium = {};

//set scroll mode to scroll-continuous use config strored in localStorage with key "reader"
let localConfig = getObjFromStorage("reader");
localConfig.scroll = DEFAULT_CONFIG.scroll;
setObjToStorage("reader", localConfig);


//show object on page
window.onload = function () {
    if (MODE === "D") {
        showObjectOnPage(appModel);
    }
    let intervalId = setInterval(() => {
        let navbar;
        if (navbar = document.querySelector("#app-navbar")) {
            clearInterval(intervalId);

            view.renderAlways();

        }

    }, 1000)

}

// bookMarks look lik this: 
//{
//     bookName: {
//         markName: `{"idref":"item43","contentCFI":"/4/18 / 2 / 2 / 2 / 2 / 36"}`
//     }

// }

const appModel = {
    bookMarks: getObjFromStorage("bookMarks") || {},
    reader: getObjFromStorage("reader") || {},

    getCurrentBookMarks: function () {
        return this.bookMarks[getBookName()] || {};
    }
    ,
    addBookMark: function (bookName, bookMark) {
        let bookMarks = this.bookMarks;
        if (!bookMarks[bookName]) {
            bookMarks[bookName] = {};
        }
        bookMarks[bookName][bookMark.name] = bookMark;
        setObjToStorage("bookMarks", bookMarks);
        view.render(document.body)
    }
    ,

    deleteBookMark: function (bookName, markName) {
        let bookMarks = this.bookMarks;
        if (bookMarks[bookName]) {
            delete bookMarks[bookName][markName];
        }
        setObjToStorage("bookMarks", bookMarks);
    },

}


let view = {
    init: function (navbar) {
        return;
    },
    renderAlways: function () {
        let navbar = document.querySelector("#app-navbar");

        setInterval(() => {
            if (getBookName() !== null) {
                this.renderBookMarkBtn(navbar)
                let tocContaniner = document.querySelectorAll("#readium-toc-body");
                if (tocContaniner) {
                    this.renderTocFoldBtn(tocContaniner);
                }
                return;
            }
            document.querySelector("#bookMarkContainer")?.remove();
            if (document.querySelector("#openLocalBtn") === null) {
                this.renderOpenLocalBtn(navbar);
                this.renderShowDownloadBtn(navbar);
                this.renderUpdateBtn(navbar)
                console.log("rendered openlocal and download button")
            }
        }, 1000);

    },
    renderTocFoldBtn: function (tocContaniner) {
        let tocBody = document.querySelector("#readium-toc-body");
        let tocULs = tocBody.querySelectorAll("ol");

        // let tocLis = document.querySelectorAll("#readium-toc-body > ol > li");
        tocULs.forEach(elm => {
            if (elm) {
                if (elm.parentElement.querySelector(".foldBtn")) {
                    return;
                }
                if (elm.parentElement !== tocBody) {

                    elm.style.display = "none"
                }
                let foldBtn = document.createElement("button");
                foldBtn.innerHTML = "+";
                foldBtn.classList.add("foldBtn");
                foldBtn.style.border = 0;
                foldBtn.style.fontSize = "x-large";
                elm.parentElement.prepend(foldBtn);

                foldBtn.addEventListener('click', evt => {
                    console.log("fold or unfold")
                    if (elm.style.display !== 'none') {
                        elm.style.display = 'none';
                    }
                    else {
                        elm.style.display = 'block';
                    }
                })
            }
        })
    }
    ,
    renderUpdateBtn: function (navbar) {
        if (document.querySelector("#updateBtn") !== null) {
            return;
        }
        let updateBtn = document.createElement("button");
        updateBtn.className = "btn icon-add";
        updateBtn.id = "updateBtn";
        updateBtn.innerHTML =
            `<span   class="glyphicon glyphicon-refresh" aria-hidden="true"></span>`;
        navbar.appendChild(updateBtn)

        updateBtn.addEventListener("click", (ev) => {
            confirm("Update app now?") &&
                navigator.serviceWorker?.getRegistrations()
                    .then(function (registrations) {
                        for (let registration of registrations) {
                            registration.unregister()
                        }
                    })
                    .then(() => {
                        caches.keys().
                            then(function (names) {
                                for (let name of names)
                                    caches.delete(name);
                            })
                            .then(res => {
                                alert('app updated,books are needed redownload')
                                location.reload();
                            });
                    });

        })




    }
    ,
    render: function (navbar) {

        this.renderBookMarkBtn(navbar);
        this.renderBookmarkView(document.body);

    },
    renderBookMarkBtn: function (navbar) {

        if (document.querySelector("#bookMarkBtn") !== null) {
            return;
        }
        let bookMarkBtn = document.createElement("button");
        bookMarkBtn.className = "btn icon-bookmark";
        bookMarkBtn.id = "bookMarkBtn";
        bookMarkBtn.innerHTML = `<span class="glyphicon glyphicon-bookmark" aria-hidden="true"></span>`;
        navbar.appendChild(bookMarkBtn)
        bookMarkBtn.addEventListener("click", (evt) => {
            evt.stopPropagation();
            if (document.querySelector("#bookMarkContainer") !== null) {
                document.querySelector("#bookMarkContainer").remove();
            }
            else {
                this.renderBookmarkView(document.body);
            }
        });

    },
    renderOpenLocalBtn: function (navbar) {
        if (document.querySelector("#openLocalBtn") !== null) {
            return;
        }
        let openLocalBtn = document.createElement("button");
        openLocalBtn.className = "btn icon-add";
        openLocalBtn.id = "openLocalBtn";
        openLocalBtn.innerHTML =
            `<label  for=bookfile class="glyphicon glyphicon-file" aria-hidden="true"></label>
            <input type="file" name="bookfile" id="bookfile" style="display: none" />`;
        navbar.appendChild(openLocalBtn)

        document.querySelector("#bookfile").addEventListener("change", (ev) => {
            var files = ev.target.files || ev.originalEvent.dataTransfer.files;
            if (files.length) {
                var file = files[0];
                console.log("File open:");
                console.log(file.name);
                console.log(file.type);
                console.log(file.size);

                if (file.type == "application/epub+zip" || (/\.epub[3?]$/.test(file.name))) {
                    //this totally a hack bad hack, Epublibrary is from readium-js-viewer_all.js line206
                    sreadium.EpubLibrary(window).triggerHandler('readepub', { epub: file });
                }
            }
        })




    },

    renderShowDownloadBtn: function (navbar) {
        if (document.querySelector("#showDownloadBtn") !== null) {
            return;
        }
        let showDownloadBtn = document.createElement("button");
        showDownloadBtn.className = "btn icon-add";
        showDownloadBtn.id = "showDownloadBtn";
        showDownloadBtn.innerHTML =
            `<span   class="glyphicon glyphicon-download" aria-hidden="true"></span>`;
        navbar.appendChild(showDownloadBtn)

        showDownloadBtn.addEventListener("click", (ev) => {
            this.renderDownloadBtns();
        })




    },
    renderDownloadBtns: function () {

        if (document.querySelector('.downloadBtn')) {
            return;
        }
        console.log('start render downloadBtn')
        document.querySelectorAll('.read').forEach(elem => {
            let bookUrl = elem?.dataset?.book;
            if (!bookUrl) {
                return;
            }

            caches.open(cacheName).then(cache => {
                if (cache) {
                    cache.match(bookUrl).then(res => {
                        if (res) {
                            return;
                        }
                        let btn = document.createElement("button");
                        btn.classList.add(['downloadBtn',])
                        btn.style.width = "auto";
                        btn.style.border = "0";
                        btn.style.backgroundColor = "#ffffff00";
                        btn.style.color = "white"
                        btn.style.position = "absolute";
                        btn.style.top = "5%";
                        btn.style.right = "5%";

                        btn.innerHTML = `<span class="glyphicon glyphicon-download" style="font-size:large"/>`
                        elem.appendChild(btn);

                        btn.addEventListener('click', evt => {
                            alert("Download start");
                            evt.stopPropagation();
                            caches.open(cacheName).then(cache => {
                                cache.addAll([elem.dataset.book]).then(res => {
                                    alert('Downloaded Successful\n' + btn.parentElement.dataset.book)
                                    btn.remove();
                                })
                            })

                        })
                    })
                }

            })

        })
    }
    ,
    renderBookmarkView: function (container) {
        document.querySelector("#bookMarkContainer")?.remove();

        let bookMarkContainer = document.createElement("div");
        let bookMarkList = document.createElement("ol");
        bookMarkContainer.appendChild(bookMarkList);
        bookMarkContainer.id = "bookMarkContainer";
        container.appendChild(bookMarkContainer);
        let addBookMarkLi = document.createElement("li");
        addBookMarkLi.innerHTML = "Bookmark now";
        addBookMarkLi.className = "bookmarkli"
        bookMarkList.appendChild(addBookMarkLi);
        addBookMarkLi.addEventListener("click", () => {
            let bookMarkName = prompt("bookMark name");
            if (bookMarkName) {
                appModel.addBookMark(getBookName(), createMark(bookMarkName));

            }
        });
        let bookMarksObj = appModel.getCurrentBookMarks();
        for (let key in bookMarksObj) {
            let bookMarkLi = document.createElement("li");
            bookMarkLi.innerHTML = key;
            bookMarkList.appendChild(bookMarkLi);
            bookMarkLi.addEventListener("click", () => {
                openBookMark(bookMarksObj[key]);
            });
            bookMarkLi.className = "bookmarkli"

        };

    }

}





//helper function
function getBookName() {
    let bookName = new URL(location.href).searchParams.get("epub")
    return bookName
}
function createMark(name) {
    return {
        name: name,
        content: READIUM.reader.bookmarkCurrentPage()  //bookMark is str
    }
}
function openBookMark(bookMark) {
    READIUM.reader.openSpineItemElementCfi(JSON.parse(bookMark.content).idref, JSON.parse(bookMark.content).contentCFI, READIUM.reader)
}



function getObjFromStorage(name) {
    return (
        JSON.parse(window.localStorage.getItem(name)) ||
        {}
    );
}

function setObjToStorage(name, obj) {
    window.localStorage.setItem(name, JSON.stringify(obj));
}

function updateLabelInStrogeLabel(name, label) {
    let labels = getObjFromStorage(name);
    labels[label.id] = label;
    setObjToStorage(name, labels);
}




function showObjectOnPage(obj, w, h) {
    let objDispalyer = document.createElement("textarea");
    document.body.appendChild(objDispalyer);
    objDispalyer.value = JSON.stringify(obj, null, 4);
    objDispalyer.style.position = "fixed";
    objDispalyer.style.bottom = "0";
    objDispalyer.style.left = "0";

    objDispalyer.style.width = w || "50vw";
    objDispalyer.style.height = h || "50vh";

    objDispalyer.style.zIndex = "9999";

    setInterval(() => {

        objDispalyer.value = JSON.stringify(obj, null, 4);
    }, 500);
}


//unsed code

// let intervalTaskId = setInterval(() => {
//     if (window.READIUM?.reader != null) {
//         initConfig();
//         clearInterval(intervalTaskId);
//         console.log("inited config")
//     }
// }, 1000);

