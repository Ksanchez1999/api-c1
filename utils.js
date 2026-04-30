// >>>>>>>>>>>>>>>>>>>>>>>>>>>>> VARIABLES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const BASE_URL = 'https://pagofacilvzla.com/api-c1';





/* ============================================================
                         FUNCTIONS
============================================================ */

// _____________  REQUEST  _____________

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





// _____________  SHOW ERROR IN BUTTON  _____________

export function showErrorInButton (btn, msg = "ERROR", btnContent = "GUARDAR") {
  btn.disabled = false;
  btn.textContent = msg;
  btn.style.backgroundColor = "#ff4d4d";
  btn.style.color = "white";

  setTimeout(() => {
    btn.textContent = btnContent;
    btn.style.backgroundColor = "";
    btn.style.color = "";
  }, 3000);
};





//_____________  DATE **MYSQL** TO **VE**  _____________

export function dateMySqlToVe(dateMySql) {
  const [year, month, day] = dateMySql.split('-');  
  return `${day}/${month}/${year}`;
}





//_____________  DATE **VE** TO **MYSQL**  _____________

export function dateVeToMySql(dateVe) {
  const [day, month, year] = dateVe.split('/');  
  
  const d = day.padStart(2, '0');
  const m = month.padStart(2, '0');
  
  return `${year}-${m}-${d}`;
}


//_____________  CLEAN NUMERIC VALUE  _____________
export function cleanNumericValue(value) {
  if (typeof value !== 'string') return value;
  
  const cleanValue = value.replace(/[^0-9.]/g, '');
  
  return cleanValue;
}




