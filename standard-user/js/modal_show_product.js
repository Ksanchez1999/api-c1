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

  imgContainer.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.25 18.375L12 22.5L3.75 18.375V9.375L12 5.25L20.25 9.375V18.375Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3.75 9.375L12 13.5L20.25 9.375" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 22.5V13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 5.25V2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;

}

