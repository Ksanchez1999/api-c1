/* ============================================================
                         IMPORTS
============================================================ */
import { request, cleanNumericValue } from '../../utils.js';
import { createModalEditExchangeRate } from '../modal-edit-exchange-rate/script.js';
import { createModalEditProduct } from '../modal-edit-product/script.js';
import { createModalNewProduct } from '../modal-new-product/script.js';
import { createModalConfirm } from '../modal-confirm/script.js';


/* ============================================================
                          CONSTANTS
============================================================ */
const REDIRECT_URL = "/api-c1";
const EXCHANGE_RATE_URL = "/get-exchange-rate";
const DATA_TABLE_URL = "/get-data-for-table-of-products";
const FILTERED_DATA_TABLE_URL = "/get-filtered-data-for-table-of-products";
const DELETE_PRODUCT_URL = "/delete-product"; //##### CREAR

const TOKEN = localStorage.getItem("token");





/* ============================================================
                       VARIABLES
============================================================ */

let timerForApplyFilter;
let columnTitles = [ "CÓDIGO", "NOMBRE", "ESTADO", "ÚLTIMO COSTO", "FECHA ÚLTIMO COSTO", "PRECIO DE VENTA", "PROVEEDOR", ""];






/* ============================================================
                         GUARDS
============================================================ */
if (!TOKEN) {
  window.location.href = REDIRECT_URL;
} else {
  try {
    await request('/verify-token');
  } catch (e) {
    window.location.href = REDIRECT_URL;
  }
}





/* ============================================================
                    DATABASE: INITIAL STATE                       
============================================================ */
let rate = "Cargando...";
let tableDataRaw = [];





/* ============================================================
                          FUNCTIONS      
============================================================ */

//_____________  LOGOUT  _____________

function logout() {
  localStorage.removeItem("token");    
  btnLogout.textContent = "SALIENDO...";
    
  setTimeout(() => {
    window.location.href = REDIRECT_URL;
  }, 300);
};



//_____________  APPLY FILTER  _____________

function applyFilter() {
  clearTimeout(timerForApplyFilter);

  tbody.style.opacity = "0.5";

  const inputs = document.querySelectorAll('.table-filter');
  
  const values = Array.from(inputs).map(input => input.value);

  timerForApplyFilter = setTimeout(async () => {
    try {
      tableDataRaw = await request(FILTERED_DATA_TABLE_URL, 'POST', { values });
      const tableData = dataModify(tableDataRaw);
      renderBodyTable(tableData);
      tbody.style.opacity = "1";

    } catch (error) {
      console.error("Error", error.message);
      tbody.style.opacity = "1";
    }
  }, 300);
}



//_____________  DATA MODIFY  _____________

function dataModify(tableDataRaw){
  const dataModify = tableDataRaw.map((obj) => {
    const newObj = {
      ...obj,
      status: {
        type: "status",
        value: obj.status
      },

      date_last_cost: {
        type: "date",
        value: obj.date_last_cost
      },  
    };
    return newObj;
  });

  return dataModify.map(c => Object.values(c));
}



//_____________  RENDER BODY TABLE  _____________

function renderBodyTable(data) {
  tbody.innerHTML = "";

  data.forEach((array) => {
    const tr = document.createElement("tr");

    array.forEach((text, index) => {
      if (index === 0) return;

      const td = document.createElement("td");
      td.className = `td${index}`;

      if(text.type === 'status'){
        const span = document.createElement("span");
        span.textContent = text.value;
        span.classList = text.value === 'Activo' ? 'badge status-active' : 'badge status-inactive';
        td.appendChild(span);
        tr.appendChild(td);

        span.addEventListener('click', function() { createModalEditProduct(text, index, array); });

        return;
      }

      if(text.type === 'date'){
        td.addEventListener('click', function() { createModalEditProduct(text, index, array); });

        td.textContent = text.value;
        tr.appendChild(td);

        return;
      }

      const displayValue = (index === 4 || index === 6) ? `$${text}` : text;
      td.textContent = displayValue;

      tr.appendChild(td);

      td.addEventListener('click', function() { createModalEditProduct(text, index, array); });

    });



    // TRASH
    const tdTrash = document.createElement('td');
    tdTrash.className = 'td-trash';

    const btnTrash = document.createElement('button');
    btnTrash.className = 'btn-trash';
    btnTrash.innerHTML = '🗑️';
    btnTrash.title = 'Eliminar este producto';


    btnTrash.addEventListener('click', async function() {
      const productId = array[0];
      const productName = array[2];

      try {
        const confirmed = await createModalConfirm(`¿Estás seguro de que deseas eliminar el producto: <b>${productName}</b>?`, productId);

        if (confirmed) {
          location.reload();
        }

      } catch (error) {
        console.error(error);
      }
    });

    tdTrash.appendChild(btnTrash);
    tr.appendChild(tdTrash);

    tbody.appendChild(tr);
  });
}





/* ============================================================
                             DOM
============================================================ */

//_____________  THEME TOGGLE  _____________

const themeToggle = document.createElement("button");
themeToggle.className = "btn-theme-toggle";
themeToggle.textContent = "☀️";
document.body.appendChild(themeToggle);

if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode');
  themeToggle.innerText = "🌙";
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeToggle.innerText = isLight ? "🌙" : "☀️";
});



//_____________  BUTTON LOGOUT  _____________

const btnLogout = document.createElement("button");
btnLogout.className = "btn-logout";
btnLogout.textContent = "CERRAR SESIÓN";
btnLogout.addEventListener("click", logout);
document.body.appendChild(btnLogout);





//_____________ MAIN CONTAINER  _____________

const mainContainer = document.createElement("div");
mainContainer.className = "main-container";

//----  EXCHANGE RATE CONTAINER  ----
const exchangeRateContainer = document.createElement("div");
exchangeRateContainer.className = "exchange-rate-container";
mainContainer.appendChild(exchangeRateContainer);

// EXCHANGE RATE
const exchangeRate = document.createElement("div");
exchangeRate.textContent = `Tasa => Bs. ${rate}`;
exchangeRate.className = "exchange-rate";
exchangeRateContainer.appendChild(exchangeRate);
exchangeRate.addEventListener('click', function() { createModalEditExchangeRate(rate); });



//----  NAV CONTAINER  ----
const navContainer = document.createElement("div");
navContainer.className = "nav-container";
mainContainer.appendChild(navContainer);

// PRINCIPAL TITLE
const principalTitle = document.createElement("h1");
principalTitle.className = "principal-title";
principalTitle.textContent = "PRODUCTOS";
navContainer.appendChild(principalTitle);

// NEW PRODUCT BUTTON
const newProductButton = document.createElement("button");
newProductButton.textContent = "NUEVO PRODUCTO";
newProductButton.className = "new-product-button";
navContainer.appendChild(newProductButton);

newProductButton.addEventListener('click', () => {
  createModalNewProduct();
});


//----  TABLE CONTAINER  ----
const tableContainer = document.createElement("div");
tableContainer.className = "table-container"
mainContainer.appendChild(tableContainer);


// TABLE
const table = document.createElement("table");
table.className = "table"
tableContainer.appendChild(table);

// THEAD
const thead = document.createElement("thead");
table.appendChild(thead);

const tr1Head = document.createElement("tr");
tr1Head.className = "tr-1-head";
thead.appendChild(tr1Head);

columnTitles.forEach((title) => {
  const th = document.createElement("th");
  th.textContent = title;
  tr1Head.appendChild(th);
});

const tr2Head = document.createElement("tr");
tr2Head.className = "tr-2-head";
thead.appendChild(tr2Head);

for (let i = 0; i < columnTitles.length; i++) {
  const th = document.createElement("th");

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = `Filtrar...`;
  input.classList.add("table-filter");

  input.addEventListener('input', applyFilter);
  
  th.appendChild(input);
  tr2Head.appendChild(th);
}

// TBODY
const tbody = document.createElement("tbody");
table.appendChild(tbody);




document.body.appendChild(mainContainer);





/* ============================================================
                    DATABASE: SYNCHRONIZATION         
============================================================ */

// _____________  RATE  _____________

try {
  const data = await request(EXCHANGE_RATE_URL);
  rate = data.value;

  if (document.querySelector(".exchange-rate")) {
    document.querySelector(".exchange-rate").textContent = `Tasa => Bs. ${rate}`;
  }
} catch (error) {
  rate = "0.000";
}



// _____________  TABLE DATA  _____________

try {
  tableDataRaw = await request(DATA_TABLE_URL);
  const tableData = dataModify(tableDataRaw);
  renderBodyTable(tableData);

} catch (error) {
  console.warn("Fallo al obtener los datos de la tabla.");
}





