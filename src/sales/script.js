//#region MODELO DE DATOS (MODELS)

// Definimos la clase RealEstate
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
  
  
  
  // Creamos objetos de modelos de casas
  const game1 = new Game(1, "No More Heroes", "Juego de acción en 3D", "Wii", 85, 600, "nmh.jpg");
  const game2 = new Game(2, "Hello Kitty: Roller Rescue", "Juego de carreras en 3D", "GameCube", 64, 400, "hkrr.jpg");
  const game3 = new Game(3, "Castlevania: Dawn of Sorrow", "Plataformas, puzzle y acción en 2D lateral", "Nintendo DS", 89, 250, "cdos.jpg");
  
  
  // Almacenamos los objetos en un array
  const gameList = [game1, game2, game3];
  
  
  // Accedemos datos por indices
  console.log('Impresion en consola de elementos accesados por indices: ');
  console.log(gameList[0]);
  console.log(gameList[1]);
  console.log(gameList[2]);
  
  
  // Accedemos datos con funcion forEach() de array
  console.log('Impresion en consola de elementos accesados con forEach(): ');
  gameList.forEach(item => {console.log(item)});
  
  //#endregion
  
  
  //#region VISTA DE LOS MODELOS EN HTML (VIEW)
  
  // Funcion que controla el despliegue de un array de RealEstate en la tabla, asi como el mensaje a mostrar.
  function displayTable(games) {
  
    clearTable();
  
    showLoadingMessage();
  
    setTimeout(() => {
  
      if (games.length === 0) {
  
        showNotFoundMessage();
  
      } else {
  
          hideMessage();
  
          const tablaBody = document.getElementById('data-table-body');
  
          const imagePath = `/public/games/`;
  
          games.forEach(game => {
  
            const row = document.createElement('tr');
  
            row.innerHTML = `
              <td> ${game.id} </td>
              <td> <img src="${imagePath + game.image}" alt="${game.title}" width="100"> </td>
              <td>${game.title}</td>
              <td>${game.description}</td>
              <td>${game.platform}</td>
              <td>${game.rating}</td>
              <td>${(game.price)}</td>
            `;
  
            tablaBody.appendChild(row);
  
          });
  
      }
  
    }, 200);
  
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
  
  
  //#region INICIALIZAMOS FUNCIONALIDAD (CONTROLLER)
  
  displayTable(gameList);
  
  initButtonsHandler();
  
  //#endregion
  