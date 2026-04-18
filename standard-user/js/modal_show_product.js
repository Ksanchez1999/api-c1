
function showProduct() {
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
  titlePrice.textContent = "COCACOLA ZERO 333ML"; //TRAER DESDE VARIABLE ######
  priceContainer.appendChild(titlePrice);

  const price = document.createElement('p');
  price.textContent = "0.50$"; //TRAER DESDE VARIABLE ######
  priceContainer.appendChild(price);


  // _____IMG CONTAINER_____
  const imgContainer = document.createElement('div');
  imgContainer.className = "imgContainer";
  feedbackModalBody.appendChild(imgContainer);

  const img = document.createElement('img');
  img.src = 'https://www.coca-cola.com/content/dam/onexp/co/es/brands/coca-cola/coca-cola-original/ccso_600ml_750x750.png';
  img.alt = 'Imagen de producto';

  imgContainer.appendChild(img);

}

