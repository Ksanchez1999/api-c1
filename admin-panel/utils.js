// >>>>>>>>>>>>>>>>>>>>>>>>>>>>> VARIABLES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const BASE_URL = 'https://pagofacilvzla.com/api-c1';


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>> FUNCTIONS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// _____________ REQUEST GET _____________
export async function requestGet(endpoint) {
  const token = localStorage.getItem("token");

  const options = {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

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
