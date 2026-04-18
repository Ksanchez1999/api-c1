
async function createModalEditExchangeRate(rate){

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
            <input type="text" value="${rate}" placeholder="Ej. ${rate}" required>
          </div>
        </div>

        <div class="footer">
          <button class="btn-submit">GUARDAR</button>
        </div>

      </form>
    </div>
  `;


  document.body.appendChild(modal);

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

