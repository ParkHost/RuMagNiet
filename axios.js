const express = require('express');
const cheerio = require('cheerio');
var cors = require('cors')
const axios = require('axios')
const app = express();
const Datastore = require('nedb');

app.use(cors());
app.use(express.json());
const db = new Datastore({
  filename: './index.db',
  autoload: true
});
const port = 3000

let id = 0
let complete = {
  imageInfo: []
};

app.get('/', (req, res) => {
  // console.log(req)
  scrapper().then(result => {
    res.json(result)
  }).catch(err => {
    res.json(err);
  })
})

app.get('/v2/api', (req, res) => {
  console.log(req.query);
  let page = req.query.skip;
  console.log(page);
  
  scrapper(page).then(result => {
    res.json(result)
  }).catch(err => {
    res.json(err);
  })
})

app.post('/load', (req, res, next) => {
  const rawResponse = req.body

  console.log(rawResponse);

  res.json(200);
});


async function scrapper(page) {
  let p = page || 1;
  console.log(`inside scrapper function, page: ${p}`)
  // let hop = skip || 12
  let id = 0
  url = `https://rumag.nl/quote/page/${p}`
  try {
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)
    let lijst = $('.wp-post-image').toArray();
    lijst.forEach(async (element) => {
      const url = element.attribs.src;
      const href = element.parent.attribs.href;
      complete.imageInfo.push({
        "id": id,
        "url": url,
        "href": href,
        "page": p
      });
      id = id + 1;
    })
  } catch (error) {
    console.error(error)
  }
  // db.insert(complete.imageInfo, function(err, row) {
  //   console.log(row);
  // });
  // console.log(complete.imageInfo);

  return complete
}



app.use((error, req, res, next) => {
  res.status(500);
  res.json({
    message: error.message
  });
});


app.listen(port, () => console.log(`App listening on port ${port}`));