/* ============================================================
                         IMPORTS
============================================================ */
import { createModal, getExchangeRate } from './general_functions.js';


export async function showProduct(data) {

  let { id, name, sell_price } = data;
  let rate = await getExchangeRate();

  const feedbackModal = createModal("feedbackModal");
  document.body.appendChild(feedbackModal);

  const feedbackModalBody = feedbackModal.firstElementChild;


  // _____INFO CONTAINER_____
  const infoContainer = document.createElement('div');
  infoContainer.className = "infoContainer";
  feedbackModalBody.appendChild(infoContainer);

  const title = document.createElement('h2');
  title.textContent = "RESULTADO DE CONSULTA";
  infoContainer.appendChild(title);


  const priceContainer = document.createElement('div');
  priceContainer.className = "priceContainer";
  infoContainer.appendChild(priceContainer);

  const titlePrice = document.createElement('h2');
  titlePrice.textContent = name.toUpperCase();
  priceContainer.appendChild(titlePrice);

  const priceInDollars = document.createElement('p');
  priceInDollars.className = `priceInDollars`;
  priceInDollars.textContent = `${sell_price}$`;
  priceContainer.appendChild(priceInDollars);

  const priceInBs = document.createElement('p');
  priceInBs.className = `priceInBs`;
  priceInBs.textContent = `[Bs. ${sell_price * rate}]`;
  priceContainer.appendChild(priceInBs);


  // _____IMG CONTAINER_____
  const imgContainer = document.createElement('div');
  imgContainer.className = "imgContainer";
  feedbackModalBody.appendChild(imgContainer);

  const imgIco = document.createElement('img');
  imgIco.src = 'img/search-storage-icon.png';
  imgIco.alt = 'Check Icon';
  imgContainer.appendChild(imgIco);
}

