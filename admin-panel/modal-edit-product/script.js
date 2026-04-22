
/* ============================================================
                           IMPORTS
============================================================ */
import { dateVeToMySql, showErrorInButton } from '../../utils.js';





export async function createModalEditProduct(text, index, array){

  /* ============================================================
                            VARIABLES
  ============================================================ */

  // >>>>>>>>  FIELD MAPPING  >>>>>>>>

  const fieldMapping = {
    1: "barcode",
    2: "name",
    3: "status",
    4: "last_cost",
    5: "date_last_cost",
    6: "sell_price",
    7: "supplier"
  };

  const fieldName = fieldMapping[index];





  /* ============================================================
                            CONSTANTS
  ============================================================ */
  const UPDATE_PRODUCT_DATA_URL = "/update-product-data";





  /* ============================================================
                              DOM
  ============================================================ */

  // >>>>>>>>  MODAL  >>>>>>>>

  const modal = document.createElement("div");
  modal.className = "modal-edit-product";

  // _____  MODAL-CONTENT  _____

  modal.innerHTML = `
    <div class="modal-edit-product-content">
      <form id="productForm">

        <div class="header">
          <h2>EDITAR</h2>
          <button class="close-modal">&times;</button>
        </div>

        <div class="body"></div>

        <div class="footer">
          <button class="btn-submit">GUARDAR</button>
        </div>

      </form>
    </div>
  `;

  document.body.appendChild(modal);

  let body = modal.querySelector('.body');

  if(text.type === 'status'){
    const formGroup = document.createElement('div');
    formGroup.className = "form-group";

    const select = document.createElement('select');
    select.className = "valueContainer";

    const options = ["Activo", "Inactivo"];

    options.forEach(opt => {
      const option = document.createElement('option');
      option.value = opt;
      option.textContent = opt;

      if(opt == text.value) option.selected = true;

      select.appendChild(option);
    });

    formGroup.appendChild(select);
    body.appendChild(formGroup);


  } else if( text.type === 'date' ){

    text.value = dateVeToMySql(text.value);

    body.innerHTML = `
      <div class="form-group">
        <input type="date" class="valueContainer" value="${text.value}" required>
      </div>
    `;

  } else if( index === 4 || index === 6 ){

    body.innerHTML = `
      <div class="form-group">
        <input type="number" step="0.01" class="valueContainer" value="${text}" required>
      </div>
    `;

  } else {
    body.innerHTML = `
      <div class="form-group">
        <input type="text" class="valueContainer" value="${text}" placeholder="Ej. 0000454697845" required>
      </div>
    `;
  }




  /* ============================================================
                              EVENTS
  ============================================================ */

  // >>>>>>>>  SUBMIT  >>>>>>>>

  const form = modal.querySelector("#productForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btnSubmit = form.querySelector(".btn-submit");
    const newValue = form.querySelector(".valueContainer").value;

    btnSubmit.disabled = true;
    btnSubmit.textContent = "GUARDANDO...";

    try {
      const response = await request(UPDATE_PRODUCT_DATA_URL, 'POST', { 
        id: array[0],
        fieldName,
        newValue
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



  // >>>>>>>>  CLOSE MODAL  >>>>>>>>

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









