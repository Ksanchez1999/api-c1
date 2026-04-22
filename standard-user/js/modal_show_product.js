/* ============================================================
                         IMPORTS
============================================================ */
import { createModal } from './general_functions.js';


export function showProduct(data) {

  let { id, name, sell_price } = data;

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
  titlePrice.textContent = name;
  priceContainer.appendChild(titlePrice);

  const price = document.createElement('p');
  price.textContent = `${sell_price}$`;
  priceContainer.appendChild(price);


  // _____IMG CONTAINER_____
  const imgContainer = document.createElement('div');
  imgContainer.className = "imgContainer";
  feedbackModalBody.appendChild(imgContainer);

  const imgIco = document.createElement('img');
  imgIco.src = '../img/check-icon.png';
  imgIco.alt = 'Descripción de la imagen';
  imgContainer.appendChild(imgIco);
}

