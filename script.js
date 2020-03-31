const API_url = 'https://rumagniet.herokuapp.com/'
const API_URL_v2 = 'https://rumagniet.herokuapp.com/v2/api';
const randomRumagElement = document.querySelector('.random-rumag');
const goButton = document.querySelector('.go-button');
const loadMore = document.querySelector('#loadMoreButton');

let rdata = 1


async function getRandomRumag() {
  randomRumagElement.innerHTML = ''
  const response = await fetch(API_url);
  console.log(response);
  const json = await response.json();
  jsonUrl = json.imageInfo
  console.log(json.imageInfo);

  jsonUrl.forEach(rumagImage => {
    randomRumagElement.innerHTML +=
      `<div class="column is-3">
          <div class="card is-mobile">
            <div class="card-image">
              <figure class="image is-4by3">
                <a><img src="${rumagImage.url}" alt="Placeholder image"></a>
              </figure>
            </div>
          </div>
        </div>`
  })
  rdata = rdata + 1
  goButton.classList.add('is-hidden');
  loadMore.classList.remove('is-hidden'); 
}

loadMore.addEventListener('click', async function () {
  console.log('button clicked')
    const response = await fetch(`${API_URL_v2}?skip=${rdata}`);
    console.log(response);
    const json = await response.json();
    jsonUrl = json.imageInfo
    console.log(json.imageInfo);
    randomRumagElement.innerHTML = '';
    jsonUrl.forEach(rumagImage => {
      randomRumagElement.innerHTML +=
        `<div class="column is-3">
          <div class="card is-mobile">
            <div class="card-image">
              <figure class="image is-4by3">
                <a><img src="${rumagImage.url}" alt="Placeholder image"></a>
              </figure>
            </div>
          </div>
        </div>`
    })

    rdata = rdata + 1;
    console.log(rdata);
})


goButton.addEventListener('click', getRandomRumag);