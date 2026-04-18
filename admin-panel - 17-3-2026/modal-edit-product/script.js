
async function createModalEditProduct(text){

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

    body.innerHTML = `
      <div class="form-group">
        <input type="date" value="${text.value}" required>
      </div>
    `;
  }

 else {
    body.innerHTML = `
      <div class="form-group">
        <input type="text" value="${text}" placeholder="Ej. 0000454697845" required>
      </div>
    `;
  }




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

