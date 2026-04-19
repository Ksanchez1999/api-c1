// >>>>>>>>>>>>>>>>>>>>>>>>>>>>> IMPORTS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
import { request, showErrorInButton } from '../utils.js';


export async function createModalEditExchangeRate(rate){

  // >>>>>>>>>>>>>>>>>>MODAL>>>>>>>>>>>>>>>>>>
  const modal = document.createElement("div");
  modal.className = "modal-edit-product";


  // >>>>>>>>>>>>>>>>>>MODAL-CONTENT>>>>>>>>>>>>>>>>>>
  modal.innerHTML = `
    <div class="modal-edit-product-content">
      <form id="productForm">

        <div class="header">
          <h2>EDITAR</h2>
          <button class="close-modal">&times;</button>
        </div>

        <div class="body">
          <div class="form-group">
            <input type="number" step="0.01" class="newRateInput" value="${rate}" placeholder="Ej. ${rate}" required>
          </div>
        </div>

        <div class="footer">
          <button class="btn-submit">GUARDAR</button>
        </div>

      </form>
    </div>
  `;


  document.body.appendChild(modal);





  // >>>>>>>>>>>>>>>>>> SUBMIT >>>>>>>>>>>>>>>>>>
  const form = modal.querySelector("#productForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btnSubmit = form.querySelector(".btn-submit");
    const input = form.querySelector(".newRateInput");

    const newValue = parseFloat(input.value);

    if (isNaN(newValue)) {
      showErrorInButton(btnSubmit, "VALOR INVÁLIDO");
      return;
    }

    btnSubmit.disabled = true;
    btnSubmit.textContent = "GUARDANDO...";

    try {
      const response = await request('/update-exchange-rate', 'POST', { 
        newRate: newValue 
      });

      if (response.success) {
        window.location.reload();

      } else {
        showErrorInButton(btnSubmit);
      }

    } catch (error) {
      showErrorInButton(btnSubmit);
    }
  });











  // >>>>>>>>>>>>>>>>>>CLOSE MODAL>>>>>>>>>>>>>>>>>>
  const closeBtn = modal.querySelector(".close-modal");

  closeBtn.addEventListener("click", () => {
    modal.remove();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });

}