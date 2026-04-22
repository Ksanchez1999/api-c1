
/* ============================================================
                           IMPORTS
============================================================ */
import { request, cleanNumericValue, showErrorInButton } from '../../utils.js';



/* ============================================================
                          CONSTANTS
============================================================ */
const CREATE_PRODUCT_URL = "/create-product";





export async function createModalNewProduct(){

  // >>>>>>>>>>>>>>>>>>MODAL>>>>>>>>>>>>>>>>>>
  const modalNewProduct = document.createElement("div");
  modalNewProduct.className = "modal-new-product";


  // >>>>>>>>>>>>>>>>>>MODAL-CONTENT>>>>>>>>>>>>>>>>>>
  modalNewProduct.innerHTML = `
    <div class="modal-new-product-content">
      <form id="productForm">

        <div class="header">
          <h2>NUEVO PRODUCTO</h2>
          <button class="close-modal">&times;</button>
        </div>


        <div class="body">
          <div class="form-group">
            <label>Código de barra</label>
            <input type="text" class="barcode" placeholder="Ej. 0000454697845" maxlength="80" required>
          </div>
          <div class="form-group">
            <label>Nombre</label>
            <input type="text" class="name" placeholder="Ej. Malta" maxlength="40" required>
          </div>
          <div class="form-group">
            <label>Último costo</label>
            <input type="number" step="0.01" class="last-cost" placeholder="0.00" max="9999999.99" required>
          </div>
         <div class="form-group">
            <label>Fecha de último costo</label>
            <input type="date" class="date-last-cost" required>
          </div>
         <div class="form-group">
            <label>Precio de Venta</label>
            <input type="number" step="0.01" class="sell-price" placeholder="0.00" max="9999999.99" required>
          </div>
         <div class="form-group">
            <label>Proveedor</label>
            <input type="text" class="supplier" placeholder="Ej. Empresas Polar" maxlength="40" required>
          </div>
          <div class="form-group">
            <label>Estado</label>
            <select class="status" required>
              <option value="" disabled selected>Selecciona un estado...</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
        </div>


        <div class="footer">
          <button class="btn-submit">GUARDAR</button>
        </div>

      </form>
    </div>
  `;

  document.body.appendChild(modalNewProduct);





  /* ============================================================
                              EVENTS
  ============================================================ */

  // >>>>>>>>  SUBMIT  >>>>>>>>

  const form = modalNewProduct.querySelector("#productForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btnSubmit = form.querySelector(".btn-submit");


    const valuesForm = {
      barcode: form.querySelector(".barcode").value,
      name: form.querySelector(".name").value,
      status: form.querySelector(".status").value,
      last_cost: cleanNumericValue(form.querySelector(".last-cost").value),
      date_last_cost: form.querySelector(".date-last-cost").value,
      sell_price: cleanNumericValue(form.querySelector(".sell-price").value),
      supplier: form.querySelector(".supplier").value
    }


    btnSubmit.disabled = true;
    btnSubmit.textContent = "GUARDANDO...";

    try {
      const response = await request(CREATE_PRODUCT_URL, 'POST', valuesForm);

      if (response.success) {
        window.location.reload();

      } else {
        showErrorInButton(btnSubmit);
      }

    } catch (error) {
      showErrorInButton(btnSubmit);
    }
  });





  // >>>>>>>>  CLOSE MODAL  >>>>>>>>

  const closeBtn = modalNewProduct.querySelector(".close-modal");

  closeBtn.addEventListener("click", () => {
    modalNewProduct.remove();
  });

  modalNewProduct.addEventListener("click", (e) => {
    if (e.target === modalNewProduct) {
      modalNewProduct.remove();
    }
  });

}

