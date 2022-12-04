const API_URL = 'https://api.pegasis.site/public/yrdsb_ta';

export default function getStudentGrades(username, password) {
  return fetch(`${API_URL}?username=${username}&password=${password}`)
    .then(response => response.json())
    .then(data => data.grades);
}
