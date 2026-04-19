// >>>>>>>>>>>>>>>>>>>>>>>>>>>>> VARIABLES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const BASE_URL = 'https://pagofacilvzla.com/api-c1';





// >>>>>>>>>>>>>>>>>>>>>>>>>>>>> FUNCTIONS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// _____________ REQUEST _____________
export async function request(endpoint, method = "GET", body) {
  const token = localStorage.getItem("token");

  const options = {
    method: method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };


  if (method === "POST") options.body = JSON.stringify(body);


  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
        
      // TOKEN VALIDATION
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        window.location.href = '/login.html';
        return;
      }

      // RESPONSE OK VALIDATION
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

      return await response.json();

  } catch (error) {
    console.error("Error en la petición:", error);
    throw error;
  }
}







// _____________ SHOW ERROR IN BUTTON _____________
export function showErrorInButton (btn, msg = "ERROR") {
  btn.disabled = false;
  btn.textContent = msg;
  btn.style.backgroundColor = "#ff4d4d";
  btn.style.color = "white";

  setTimeout(() => {
    btn.textContent = "GUARDAR";
    btn.style.backgroundColor = "";
    btn.style.color = "";
  }, 3000);
};
