const fetch = require('node-fetch');
const cheerio = require('cheerio');

const sendData = (nim,pass,cookie) => new Promise((resolve,reject) => {
    fetch('https://sim-online.polije.ac.id/', {
      method: 'POST',
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: cookie,
        "Upgrade-Insecure-Requests": 1
      }, 
      body: `data=${nim}%0D%0A&txtEmail=${nim}&txtPassword=${pass}`
    })
    .then(async res => await res.text())
    .then(res => {
      // const $ = cheerio.load(await res.text());
      const $ = cheerio.load(res);
      const nama = $('li.userout>a[href="#"]').text();
      resolve(nama);
    })
  });

  const dashboardData = (cookie) => new Promise((resolve,reject) => {
    fetch('https://sim-online.polije.ac.id/', {
      method: 'GET',
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: cookie,
        "Upgrade-Insecure-Requests": 1
      }, 
    })
    .then(async res => await res.text())
    .then(res => {
      // const $ = cheerio.load(await res.text());
      const $ = cheerio.load(res);
      const nama = $('li.userout>a[href="#"]').text();
      resolve(nama);
    })
  });
  
  
  const login = (nim,pass,random,cookie) => new Promise((resolve, reject) => {
    fetch('https://sim-online.polije.ac.id/client.php', {
      method: 'POST',
      headers: {
    //    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0",
        "Accept": "*/*",
        "Content-type": "application/x-www-form-urlencoded",
        Origin: "https://sim-online.polije.ac.id",
        Connection: "keep-alive",
        Cookie: cookie     
      },
      body : `user=${nim}&passwd=${pass}&random=${random}`
    })
    .then(res => res.text())
    .then(res => resolve(res))
  });
  
  const getCookie = () => new Promise((resolve,reject) => {
    fetch('https://sim-online.polije.ac.id/', {
      method: 'GET'
    })
    .then(res => resolve(res.headers.raw()['set-cookie']))
  });
  
module.exports = { 
    sendData, 
    login,
    getCookie,
    dashboardData
}