
async function createModalNewProduct(){

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
            <label>Código</label>
            <input type="text" placeholder="Ej. 0000454697845" required>
          </div>
          <div class="form-group">
            <label>Nombre</label>
            <input type="text" placeholder="Ej. Malta" required>
          </div>
          <div class="form-group">
            <label>Último costo</label>
            <input type="text" placeholder="0.00" required>
          </div>
         <div class="form-group">
            <label>Fecha último costo</label>
            <input type="date" required>
          </div>
         <div class="form-group">
            <label>Precio de Venta</label>
            <input type="text" placeholder="0.00" required>
          </div>
         <div class="form-group">
            <label>Proveedor</label>
            <input type="text" placeholder="Ej. Empresas Polar" required>
          </div>
          <div class="form-group">
            <label>Estado</label>
            <select>
              <option value="" disabled selected>Selecciona un estado...</option>
              <option>Activo</option>
              <option>Inactivo</option>
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

  // >>>>>>>>>>>>>>>>>>CLOSE MODAL>>>>>>>>>>>>>>>>>>
  const closeBtn = document.querySelector(".close-modal");

  closeBtn.addEventListener("click", () => {
    modalNewProduct.remove();
  });

  modalNewProduct.addEventListener("click", (e) => {
    if (e.target === modalNewProduct) {
      modalNewProduct.remove();
    }
  });

}

