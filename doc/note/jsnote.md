```javascript

let mdURL = new URL(location.href).searchParams.get("md")
const params = Object.fromEntries(new URLSearchParams(location.search));

javascript: (function(){document.body.contentEditable='true' })();

document.body.contentEditable='true'

```

```
extensions: [
  EditorView.lineWrapping
]

main();


async function main() {
      let totalUP = 0;
      let totalDL = 0;
      let jdUP = 0;
      let wxUP = 0;
      let resObject = {};
      //resobj/Data/data[]
      let resobj = await getResObject();
      let clientinfoArray = resobj.Data.data;

      for (const clientinfo of clientinfoArray) {
            console.log(`${clientinfo.comment} ${byte2GB(clientinfo.total_up)} ${byte2GB(clientinfo.total_down)} ${byte2MB(clientinfo.upload)} ${byte2MB(clientinfo.total_down)}   ${clientinfo.connect_num} `)
            totalUP += (clientinfo.total_up);
            totalDL += clientinfo.total_down;
            if (isJDclient(clientinfo.comment)) {
                  jdUP += (clientinfo.total_up);
            }
            if (isWXclient(clientinfo.comment)) {
                  wxUP += (clientinfo.total_up);
            }

      }
      totalUP = byte2GB(totalUP);
      jdUP = byte2GB(jdUP);
      wxUP = byte2GB(wxUP);
      console.log(`totalUP ${totalUP}, jdUP ${jdUP}, wxUP ${wxUP}`)

      return 0;
}

async function getResObject() {
      let res = await fetch("http://192.168.23.2/Action/call", {
            "headers": {
                  "accept": "application/json, text/plain, */*",
                  "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
                  "content-type": "application/json;charset=UTF-8",
                  "cookie": "sess_key=d65ffa842206089c04a5ffa09590c452; username=admin; login=1",
                  "Referer": "http://192.168.23.2/",
                  "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": "{\"func_name\":\"monitor_lanip\",\"action\":\"show\",\"param\":{\"TYPE\":\"data,total\",\"ORDER_BY\":\"ip_addr_int\",\"orderType\":\"IP\",\"limit\":\"0,20\",\"ORDER\":\"\"}}",
            "method": "POST"
      });
      let resobj = await res.json();
      return resobj;
}

function byte2GB(nbyte) {
      return Number(Number(nbyte / 1024 / 1024 / 1024).toFixed(3));
}
function byte2MB(nbyte) {
      return Number(nbyte / 1024 / 1024).toFixed(3);
}

function isJDclient(name) {
      return name.includes('jd');
}
function isWXclient(name) {
      return name.includes('wx');
}









        