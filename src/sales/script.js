//#region  MODELO DE DATOS (MODELS)
 
const imagePath = `../assets/img/juegos/`;
let gameList = [];
// Definimos la clase Game
class Game {

    constructor(id, title, description, platform, rating, price, image) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.platform = platform;
      this.rating = rating;
      this.price = price;
      this.image = image;
    }
  }
//#endregion
 
  
  //#region VISTA DE LOS MODELOS EN HTML (VIEW)
  
  // Funcion que controla el despliegue de un array de RealEstate en la tabla, asi como el mensaje a mostrar.
  function displayTable(games) {
  debugger
    clearTable();
  
    showLoadingMessage();
   
      if (games.length === 0) {
  
        showNotFoundMessage();
  
      } else {
  
          hideMessage();
          displayGamesTable(games);
          
  
      }
  
  }
// Funcion que agrega los datos de los los juegos a la tabla.

  function displayGamesTable(games){
    const tablaBody = document.getElementById('data-table-body');

    games.forEach(game => {

      const row = document.createElement('tr');

      row.innerHTML = `
        <td> ${game.id} </td>
        <td> <img src="${imagePath + game.image}" alt="${game.title}" width="100"> </td>
        <td>${game.title}</td>
        <td>${game.description}</td>
        <td>${game.platform}</td>
        <td>${game.rating}</td>
        <td>${formatCurrency(game.price)}</td>
        
      `;

      tablaBody.appendChild(row);

    });
  }
  // Funcion que limpia la tabla
  function clearTable() {
    const tableBody = document.getElementById('data-table-body');
  
    tableBody.innerHTML = '';
  }
  
  
  // Funcion que muestra mensaje de carga
  function showLoadingMessage() {
    const message = document.getElementById('message');
  
    message.innerHTML = 'Cargando...';
  
    message.style.display = 'block';
  }
  
  
  // Funcion que muestra mensaje de que no se encuentraron datos
  function showNotFoundMessage() {
    const message = document.getElementById('message');
  
    message.innerHTML = 'No se encontraron juegos con el filtro proporcionado.';
  
    message.style.display = 'block';
  }
  
  
  // Funcion que oculta mensaje
  function hideMessage() {
    const message = document.getElementById('message');
  
    message.style.display = 'none';
  }
  
  //#endregion
  
  
  //#region FILTROS (VIEW)
  
  
  // Funcion que inicializa los eventos de los botones del filto
  function initButtonsHandler() {
  
    document.getElementById('filter-form').addEventListener('submit', event => {
      event.preventDefault();
      applyFilters();
    });
  
    document.getElementById('reset-filters').addEventListener('click', () => {
      document.querySelectorAll('input.filter-field').forEach(input => input.value = '');
      applyFilters();
    });
  
  }
  
  
  // Funcion que gestiona la aplicacion del filtro a los datos y su despliegue.
  function applyFilters() {
    const filterText = document.getElementById('text').value.toLowerCase();
    const filterPlatform = parseFloat(document.getElementById('platform').value).toLowerCase();
    const filterMinPrice = parseFloat(document.getElementById('price-min').value);
    const filterMaxPrice = parseFloat(document.getElementById('price-max').value);
  
    const filteredGames = filterGames(gameList, filterText, filterPlatform, filterMinPrice, filterMaxPrice);
  
    displayTable(filteredGames);
  }
  
  
  // Funcion con la logica para filtrar las casas.
  function filterGames(games, text, platform, minPrice, maxPrice) {
  
    return games.filter( game =>
        (!platform || game.platform.toLowerCase().includes(platform)) &&
        (!minPrice || game.price >= minPrice) &&
        (!maxPrice || game.price <= maxPrice) &&
        (!text     || game.title.toLowerCase().includes(text) || game.description.toLowerCase().includes(text))
      );
  }
  
  //#endregion
  
  function searchData() {

    const OPTIONS = {
      method: 'GET'
    };

    fetch(`${apiURL}/videojuegos`, OPTIONS)
      .then(response => response.json())
      .then(data => {
        // Mapeamos los datos de modelos a objetos de la clase RealEstate.
        gameList = data.map(item => {

          return new Game(
            item.id,
            item.title,
            item.description,
            item.platform,
            item.rating,
            item.price,
            item.image
          );
        })
        
        displayTable(gameList);
      })
    }
  //#region INICIALIZAMOS FUNCIONALIDAD (CONTROLLER)

  showLoadingMessage();
  
  initButtonsHandler();
  searchData();
  //#endregion
  