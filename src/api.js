// API_URL is the base URL for the REST API
const API_URL = 'https://api.pegasis.site/public/yrdsb_ta/getmark_v2';

// getStudentGrades sends a GET request to the API with the username
// and password in the query parameters. If the request is successful,
// it returns the grades data from the response.
export default function getStudentGrades(username, password) {
  return fetch(`${API_URL}?username=${username}&password=${password}`)
    .then(response => response.json())
    .then(data => data.grades);
    
}
