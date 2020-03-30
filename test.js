const express = require('express');
const cheerio = require('cheerio');
const request = require('request');

const app = express();
const port = 3000


var scrapper = function (url) {
    request({
        url: url,
        method: "GET",
    }, (err, res, body) => {
        if (err) return console.error(err);
        if (res.statusCode != 200) return res.statusCode;
        let data = []
        let urls = [];
        let $ = cheerio.load(body)
        let lijst = $('.wp-post-image').toArray();

        lijst.forEach((element) => {
            let url = element.attribs.src;
            urls.push(`${url},`);
        })

        data.concat(urls)
        app.get('/', (req, res) => res.send(data))
        // console.log(urls)
    });
}


let total = 2
for (let i = total; 0 < i; i--) {

    page = `https://rumag.nl/quote/page/${i}`
    scrapper(page)
}




app.listen(port, () => console.log(`App listening on port ${port}`));







// async function Rumag() {
//     const response = await fetch("https://rumag.nl/quote/page/4", {
//             "credentials": "include",
//             "headers": {
//                 "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:74.0) Gecko/20100101 Firefox/74.0",
//                 "Accept": "*/*",
//                 "Accept-Language": "en-US,en;q=0.5",
//                 "X-Requested-With": "XMLHttpRequest"
//             },
//             "referrer": "https://rumag.nl/quote/",
//             "method": "GET",
//             "mode": "cors"
//         });

//     const data = await response.text();
//     const $ = cheerio.load(data);

//     const images = $('.wp-post-image')

//     // console.log(data);
//     console.log(images);
// }

// Rumag();