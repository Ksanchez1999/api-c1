//  _____________________________ VARIABLES _____________________________s
const redirectUrl = "admin-panel/index.html";





//  _____________________________ FUNCTIONS _____________________________
const login = async (user, pass) => {
  try {
    const response = await fetch("https://pagofacilvzla.com/api-c1/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, pass })
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};




//  _____________________________ VALIDATE TOKEN  _____________________________
const token = localStorage.getItem("token");

if (token) {        
  fetch('/api-c1/verify-token', { headers: { 'Authorization': `Bearer ${token}` } })
    .then(res => {
      if(res.ok) {
        window.location.href = redirectUrl;
      } else {
        localStorage.removeItem("token");
      }
    })
    .catch(() => {
      console.error("Error de conexión con la API");
    });
}




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


//  _____________________________ LOGIN CONTAINER _____________________________
const loginContainer = document.createElement("div");
loginContainer.className = "login-card";
    
loginContainer.innerHTML = `
  <h2 class="login-title">BIENVENIDO</h2>

  <form class="login-form">

    <div class="input-group">
      <label>Usuario</label>
      <input type="text" placeholder="Tu usuario..." required>
    </div>

    <div class="input-group">
      <label>Contraseña</label>
      <input type="password" placeholder="••••••••" required>
    </div>

    <button type="submit" class="login-button">ENTRAR</button>

  </form>
`;

document.body.appendChild(loginContainer);


// ================ SUBMIT ================
const form = loginContainer.querySelector('.login-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = form.querySelector('.login-button');
  btn.disabled = true;

  const user = form.querySelectorAll('input')[0].value;
  const pass = form.querySelectorAll('input')[1].value;

  const success = await login(user, pass);
  if (success) {
    window.location.href = redirectUrl;

  } else {

    const inputs = form.querySelectorAll('input');
    
    // BUTTON FEEDBACK
    btn.textContent = "DATOS INCORRECTOS";
    btn.style.backgroundColor = "#ff4d4d"; 

    // INPUTS FEEDBACK
    inputs.forEach(input => {
      input.classList.add('input-error', 'shake');

      // CLEAN
      input.addEventListener('input', () => {
        input.classList.remove('input-error', 'shake');
        btn.disabled = false;
        btn.textContent = "ENTRAR";
        btn.style.backgroundColor = ""; 
      }, { once: true });
    });
  }
});







//  _____________________________ LINK TO STANDARD USER _____________________________
const linkToStandardtUser = document.createElement("a");
linkToStandardtUser.className = "linkToStandardtUser";
linkToStandardtUser.textContent = 'Usuario estándar';
linkToStandardtUser.href = 'standard-user/index.html';

loginContainer.appendChild(linkToStandardtUser);
