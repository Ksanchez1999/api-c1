

// ______________________________FUNTION: CREATE MODAL______________________________

function createModal(modalClass){
  const modal = document.createElement('div');
  modal.className = modalClass;

  const modalBody = document.createElement("div");
  modalBody.className = `${modalClass}Body`;
  modal.appendChild(modalBody);

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.setAttribute('aria-label', 'Cerrar modal');
  closeButton.classList.add('closeButton');
  closeButton.innerHTML = '&times;'; 
  
  // _____FUNCTION: CLOSE MODAL_____
  const closeModal = () => {
    modal.remove();
    window.removeEventListener('keydown', handleEsc);    

    const input = document.querySelector('.inputCode');
    if (input) input.focus();
  };

  // _____FUNCTION: HANDLE ESC_____
  const handleEsc = (event) => {
    if (event.key === 'Escape') closeModal();
  };

  // _____LISTENER: CLICK CLOSE BUTTON_____
  closeButton.addEventListener( "click", closeModal );

  // _____LISTENER: PRESS SCAPE_____
  window.addEventListener('keydown', handleEsc);

  setTimeout(() => closeButton.focus(), 50);
  modalBody.appendChild(closeButton);

  return modal;
}



