"use strict"

const countBasket = document.querySelector('.cartIconWrap span');
const basket = document.querySelector('.cartIcon');

const productData = document.querySelector('.featuredName').textContent;

document.addEventListener('click', event => {
  if (!event.target.classList.contains('featuredImgDarkButton')) {
    return;
  }
  countBasket.style.display = 'inline-block';
  countBasket.innerText = ++countBasket.innerText;
});

basket.addEventListener('click', () => {
  document.querySelector('.basketContent').classList.toggle('hidden');
});

document.addEventListener('click', event => {
  if (!event.target.closest('.featuredImgDarkButton')) {
    return;
  }
  collectingInfo(event.target);
});

function collectingInfo(element) {
  const eventElementTop = element.closest('.featuredItem');

  const productInfo = {
    id: +eventElementTop.dataset.id,
    img: eventElementTop.querySelector('.featuredImgWrap img').getAttribute('src'),
    name: eventElementTop.querySelector('.featuredName').innerText,
    price: +eventElementTop.querySelector('.featuredPrice span').innerText,
    quantity: ++eventElementTop.dataset.count,
  }

  let sum = Number.parseFloat(productInfo.price) * productInfo.quantity;

  renderPage(productInfo, sum);
  sumTotal();
}

function renderPage(productInfo, sum) {
  const text = `
  <div class="productTable" data-productId="${productInfo.id}">
      <div>${productInfo.id}</div>
      <div><img src="${productInfo.img}" alt="${productInfo.name}" 
      style="width: 60px;"></div>
      <div>${productInfo.name}</div>
      <div>$${productInfo.price}</div>
      <div><span>${productInfo.quantity}</span> шт.</div>
      <div class="sum">$<span>${+sum.toFixed(2)}</span></div>
  </div>
  `;

  let productEl = document
    .querySelector(`.productTable[data-productId="${productInfo.id}"]`);
  if (productEl) {
    productEl.outerHTML = text;
  } else {
    document.querySelector('.inBasket').insertAdjacentHTML('afterbegin', text);
  }
}

function sumTotal() {
  let result = 0;
  const sumTotal = document
    .querySelectorAll('.sum span')
    .forEach(element => {
      result += +element.innerText;
    });

  return document.querySelector('.basketSum span').innerHTML = result.toFixed(2);
}
