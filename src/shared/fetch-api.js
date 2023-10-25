

const apiURL = 'https://653153494d4c2e3f333cd848.mockapi.io/api/v1';
 

function fetchAPI(url, method = 'GET', data = null) {

  const headers = {
    'Content-Type': 'application/json',
  };

  const options = {
    method,
    headers,
  };

  if (data !== null && (method === 'POST' || method === 'PUT' || method === 'DELETE')) {
    options.body = JSON.stringify(data);
  }

  return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.status);
      }
      return response.json();
    })
    .catch(error => {
      if (error instanceof TypeError) {
        console.error('Error de red:', error.message);
      } else {
        console.error('Error general:', error.message);
      }
    });

}
