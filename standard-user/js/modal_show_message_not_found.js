/* ============================================================
                         IMPORTS
============================================================ */
import { createModal } from './general_functions.js';

export function showMessageNotFound() {
  console.log("Llegó acá");
  const modal = createModal("notFoundModal");
  document.body.appendChild(modal);

  const modalBody = modal.firstElementChild;


  // _____INFO CONTAINER_____
  const messageContainer = document.createElement('div');
  messageContainer.className = "messageContainer";
  modalBody.appendChild(messageContainer);

  const message = document.createElement('p');
  message.textContent = "PRODUCTO NO ENCONTRADO";
  messageContainer.appendChild(message);
}
