
export function createModalConfirm(message) {
  return new Promise((resolve) => {
    // 1. Crear el overlay (fondo oscuro)
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(4px);
      display: flex; align-items: center; justify-content: center;
      z-index: 9999; opacity: 0; transition: opacity 0.2s ease;
    `;

    // 2. Crear la caja del modal
    const modal = document.createElement("div");
    modal.style.cssText = `
      background: var(--bg-modal);
      border: 1px solid var(--border-color);
      padding: 3rem;
      border-radius: 20px;
      width: 90%;
      max-width: 400px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
      transform: scale(0.8);
      transition: transform 0.2s ease;
      text-align: center;
    `;

    modal.innerHTML = `
      <p style="color: var(--text-main); font-size: 1.6rem; margin-bottom: 2.5rem; line-height: 1.5;">
        ${message}
      </p>
      <div style="display: flex; gap: 1.5rem; justify-content: center;">
        <button id="btn-modal-cancel" class="new-product-button" style="background: transparent;">Cancelar</button>
        <button id="btn-modal-confirm" class="new-product-button" style="background: #ef4444; color: white; border: none;">Eliminar</button>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Animación de entrada
    setTimeout(() => {
      overlay.style.opacity = "1";
      modal.style.transform = "scale(1)";
    }, 10);

    // Función para cerrar y destruir
    const closeModal = (value) => {
      overlay.style.opacity = "0";
      modal.style.transform = "scale(0.8)";
      setTimeout(() => {
        overlay.remove();
        resolve(value);
      }, 200);
    };

    // Eventos
    overlay.querySelector("#btn-modal-confirm").addEventListener("click", () => closeModal(true));
    overlay.querySelector("#btn-modal-cancel").addEventListener("click", () => closeModal(false));
    
    // Cerrar al hacer clic fuera del modal
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal(false);
    });
  });
}
