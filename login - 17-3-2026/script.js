
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
