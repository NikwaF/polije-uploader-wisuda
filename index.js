const fetch = require('node-fetch');
const cheerio = require('cheerio');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const cookie = "PHPSESSID=gkvs5v6u5m21sfmfkucjabmve5";

const getForm  = () => new Promise((resolve,reject) => { 
    fetch("https://sim-online.polije.ac.id/entry_wisuda.php?valTahun=2021&valSemester=2&sid=0.23365284578861556", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "sec-gpc": "1",
            "cookie": cookie,
            "Referer": "https://sim-online.polije.ac.id/mEntry_Wisuda.php",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
        })
      .then(res => res.text())
      .then(res => {
          const $ = cheerio.load(res)
          const form = [];
          const coba = $('div[align="left"]').children()
          const font =  coba.find('font>strong');

        
          [...font].forEach(el => {
              const label = $(el).text();
              let labelnya = $(el).parent().next().children().find("input").not("[type='button']"); 
              let hiddenlabel;
              let filelabel;
              try{
                hiddenlabel = labelnya[1].attribs.name;
                filelabel = labelnya[0].attribs.name;
              }catch(err){
                labelnya = $('div[align="left"]').next("table").children().find("input").not("[type='button']");
                hiddenlabel = labelnya[1].attribs.name;
                filelabel = labelnya[0].attribs.name;
              }

              form.push({label,filelabel,hiddenlabel})
          });

          resolve(form)

      })
      .catch(err => console.log(err))
});

const submitForm  = (form) => new Promise((resolve,reject) => { 
    fetch("https://sim-online.polije.ac.id/mEntry_Wisuda.php", {
        "headers": {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "max-age=0",
        //   "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryAIRQsBts5behtyL4",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "sec-gpc": "1",
          "upgrade-insecure-requests": "1",
          "cookie": cookie,
          "Referer": "https://sim-online.polije.ac.id/mEntry_Wisuda.php",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": form,
        "method": "POST"
      }).then(res => res.text())
      .then(res => resolve(res))
      .catch(err => console.log(err))
});


(async ()=> {
    const formlabel = await getForm();
    const directoryPath = path.join(__dirname, 'file');
    
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 

        files.forEach( async function (file,i) {
            const angka = file.split('.')[0] * 1;

            console.log("uploading "+file);
            const filePath = path.join(__dirname, 'file',file);
            const fileStream = fs.createReadStream(filePath);

            const hola = new FormData();
            hola.append(formlabel[angka -1].hiddenlabel,1);
            hola.append(formlabel[angka -1].filelabel, fileStream);

            await submitForm(hola)
        });
    });
})();