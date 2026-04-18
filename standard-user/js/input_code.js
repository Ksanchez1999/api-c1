

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> MAIN >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const main = document.createElement("main");


//  ___________________ THEME TOGGLE  ___________________
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


//  ___________________ TITLE  ___________________
const titleInputCode = document.createElement('div');
titleInputCode.className = 'titleInputCode';
titleInputCode.textContent = 'CONSULTA DE PRECIOS';
main.appendChild(titleInputCode);

//  ___________________ SCANNER CONTAINER  ___________________
const scannerContainer = document.createElement('div');
scannerContainer.className = 'scannerContainer';
main.appendChild(scannerContainer);

// ----------BARCODE FORM----------
const barcodeForm = document.createElement('form');
scannerContainer.appendChild(barcodeForm);

// **INPUT CODE**
const inputCode = document.createElement('input');
inputCode.className = 'inputCode';
inputCode.type = 'text';
inputCode.name = 'code';
inputCode.placeholder = 'Escanea el código...';
inputCode.autocomplete = 'off';
inputCode.autofocus = true;
barcodeForm.appendChild(inputCode);

// **SUBMIT BUTTON**
const submitButton = document.createElement('button');
submitButton.className = 'submitButton';
submitButton.type = 'submit';
submitButton.innerText = 'Buscar';
barcodeForm.appendChild(submitButton);

// **SUBMIT PROCESS**
barcodeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const code = inputCode.value.trim();

  if (code !== "") {
    inputCode.disabled = true;

    setTimeout(() => {
      if (code === "1") {
        playBeep('success');
        showProduct();
      } else {
        playBeep('errorx');
        showMessageNotFound();
      }

      inputCode.disabled = false;
      inputCode.value = "";
      inputCode.focus();
    }, 150); 
  }
});

// Seguro de Foco
main.addEventListener('click', () => inputCode.focus());





//  ___________________ LINK TO LOGIN ___________________
const linkToLogin = document.createElement("a");
linkToLogin.className = "linkToLogin";
linkToLogin.textContent = 'Login';
linkToLogin.href = '../index.html';

main.appendChild(linkToLogin);


document.body.appendChild(main);
