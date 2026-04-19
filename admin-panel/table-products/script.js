// >>>>>>>>>>>>>>>>>>>>>>>>>>>>> IMPORTS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
import { requestGet } from '../utils.js';





// >>>>>>>>>>>>>>>>>>>>>>>>>>>>> VARIABLES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const redirectUrl = "/api-c1";
const token = localStorage.getItem("token");





// >>>>>>>>>>>>>>>>>>>>>>>>>>>>> DATA >>>>>>>>>>>>>>>>>>>>>>>>>>>>>

let rate = "Cargando...";

// _____________ LOAD RATE _____________
try {
  const data = await requestGet("/get-exchange-rate");
  rate = data.value;
} catch (error) {
  console.warn("Fallo al obtener tasa real, usando valor por defecto.");
  rate = "0.000";
}


console.log("rate: ", rate);












//###TRAER DESDE BD
const dataFromMySql = [
  { id: "4564687867001", nombre: "Cocacola", status: "Inactivo", ultimoCosto: "$1.10", date: "2026-03-16", total: "$1.00", proveedor: "Empresas Polar" },
  { id: "4485689989002", nombre: "Pepsi", status: "Inactivo", ultimoCosto: "$1.10", date: "2026-03-16", total: "$1.20", proveedor: "Empresas Polar" },
  { id: "0006467400000", nombre: "Malta", status: "Activo", ultimoCosto: "$1.10", date: "2026-03-16", total: "$2.30", proveedor: "Cervecería Polar" },
  { id: "0006467400000", nombre: "Malta", status: "Activo", ultimoCosto: "$1.10", date: "2026-03-16", total: "$2.30", proveedor: "Cervecería Polar" },
  { id: "0006467400000", nombre: "Malta", status: "Inactivo", ultimoCosto: "$1.10", date: "2026-03-16", total: "$2.30", proveedor: "Cervecería Polar" },
  { id: "0006467400000", nombre: "Malta", status: "Activo", ultimoCosto: "$1.10", date: "2026-03-16", total: "$2.30", proveedor: "Cervecería Polar" },
  { id: "0006467400000", nombre: "Malta", status: "Inactivo", ultimoCosto: "$1.10", date: "2026-03-16", total: "$2.30", proveedor: "Cervecería Polar" },
];

const dataModify = dataFromMySql.map((obj) => {
  const newObj = {
    ...obj,
    status: {
      type: "status",
      value: obj.status
    },

    date: {
      type: "date",
      value: obj.date
    },  
  };
  return newObj;
});

const tableData = dataModify.map(c => Object.values(c));
const columnTitles = [ "CÓDIGO", "NOMBRE", "ESTADO", "ÚLTIMO COSTO", "FECHA ÚLTIMO COSTO", "PRECIO DE VENTA", "PROVEEDOR"];



// _____________________________ VALIDATE TOKEN _____________________________
if (!token) {
  window.location.href = redirectUrl;
} else {
  try {
    await requestGet('/verify-token');
  } catch (e) {
    window.location.href = redirectUrl;
  }
}



// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> DOM >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//  _____________________________ THEME TOGGLE  _____________________________

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



//  _____________________________ LOGOUT  _____________________________
const logout = () => {
  localStorage.removeItem("token");    
  btnLogout.textContent = "SALIENDO...";
    
  setTimeout(() => {
    window.location.href = redirectUrl;
  }, 500);
};

const btnLogout = document.createElement("button");
btnLogout.className = "btn-logout";
btnLogout.textContent = "CERRAR SESIÓN";
btnLogout.addEventListener("click", logout);
document.body.appendChild(btnLogout);





// _____________________________ MAIN CONTAINER _____________________________
const mainContainer = document.createElement("div");
mainContainer.className = "main-container";

// ---------- EXCHANGE RATE CONTAINER ----------
const exchangeRateContainer = document.createElement("div");
exchangeRateContainer.className = "exchange-rate-container";
mainContainer.appendChild(exchangeRateContainer);

// **EXCHANGE RATE**
const exchangeRate = document.createElement("div");
exchangeRate.textContent = `Tasa => Bs. ${rate}`;
exchangeRate.className = "exchange-rate";
exchangeRateContainer.appendChild(exchangeRate);
exchangeRate.addEventListener('click', function() { createModalEditExchangeRate(rate); });



// ---------- NAV CONTAINER ----------
const navContainer = document.createElement("div");
navContainer.className = "nav-container";
mainContainer.appendChild(navContainer);

// **PRINCIPAL TITLE**
const principalTitle = document.createElement("h1");
principalTitle.className = "principal-title";
principalTitle.textContent = "PRODUCTOS";
navContainer.appendChild(principalTitle);

// **NEW PRODUCT BUTTON**
const newProductButton = document.createElement("button");
newProductButton.textContent = "NUEVO PRODUCTO";
newProductButton.className = "new-product-button";
navContainer.appendChild(newProductButton);

newProductButton.addEventListener('click', () => {
  createModalNewProduct();
});


// ---------- TABLE CONTAINER ----------
const tableContainer = document.createElement("div");
tableContainer.className = "table-container"
mainContainer.appendChild(tableContainer);


// ** TABLE **
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

  input.addEventListener('input', (e) => {
    applyFilter(); 
  });
  
  th.appendChild(input);
  tr2Head.appendChild(th);
}

// TBODY
const tbody = document.createElement("tbody");
table.appendChild(tbody);

tableData.forEach((array) => {
  const tr = document.createElement("tr");

  array.forEach((text, index) => {

    const td = document.createElement("td");
    td.className = `td${index}`;


    if(text.type === 'status'){
      const span = document.createElement("span");
      span.textContent = text.value;
      span.classList = text.value === 'Activo' ? 'badge status-active' : 'badge status-inactive';
      td.appendChild(span);
      tr.appendChild(td);

      span.addEventListener('click', function() { createModalEditProduct(text); });

      return;
    }

    if(text.type === 'date'){

      td.addEventListener('click', function() { createModalEditProduct(text); });

      let dateFormatVe = dateMySqlToVe(text.value);

      td.textContent = dateFormatVe;
      tr.appendChild(td);

      return;
    }

    td.textContent = text;
    tr.appendChild(td);

    td.addEventListener('click', function() { createModalEditProduct(text); });

  });

  tbody.appendChild(tr);            
});

document.body.appendChild(mainContainer);








// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> FUNCTIONS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function applyFilter() {
  const inputs = document.querySelectorAll('.table-filter');
  
  const values = Array.from(inputs).map(input => input.value);
  
  //###### LOGICA CON BACK
}


function dateMySqlToVe(dateMySql) {
  const [year, month, day] = dateMySql.split('-');  
  return `${day}/${month}/${year}`;
}


function dateVeToMySql(dateVe) {
  const [day, month, year] = dateVe.split('/');  
  
  const d = day.padStart(2, '0');
  const m = month.padStart(2, '0');
  
  return `${year}-${m}-${d}`;
}


