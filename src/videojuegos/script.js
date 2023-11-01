//#region 2. MODELO DE DATOS (MODELS)

// Definimos la clase Game
class Game {
  constructor(id, workerName, gameTitle, gameNote, gamePrice, gameDate) {
    this.id = id;
    this.workerName = workerName;
    this.gameTitle = gameTitle;
    this.gameNote = gameNote;
    this.gamePrice = gamePrice;
    this.gameDate = gameDate;
  }
}

function mapAPIToTasks(data) {
  return data.map((item) => {
    return new Game(
      item.id,
      item.workerName,
      item.gameTitle,
      item.gameNote,
      item.gamePrice,
      new Date(item.gameDate)
    );
  });
}

class GameDescriptor {

    constructor(id, title, price) {
      this.id = id;
      this.title = title;
      this.price = price;
    }
  
  }
  
  
  function mapAPIToGameDescriptors(data) {
    return data.map(item => {
      return new GameDescriptor(
        item.id,
        item.title,
        item.price
      );
    });
  }

//#region 3. VENTAS (VIEW)

function displayGamesView(games) {

    clearTable();
  
    showLoadingMessage();
  
    if (games.length === 0) {
  
      showNotFoundMessage();
  
    } else {
  
      hideMessage();
  
      displayGamesTable(games);
    }
  
  }
  
  
function displayClearSalesView() {
clearTable();

showInitialMessage();
}

// Funcion que agrega los datos de los modelos de casas a la tabla.
function displayGamesTable(games){

    const tablaBody = document.getElementById("data-table-body");


    games.forEach(game => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td> ${game.id} </td>
            <td>${game.workerName}</td>
            <td>${game.gameTitle}</td>
            <td>${game.gameNote}</td>
            <td>${formatCurrency(game.gamePrice)}</td>
            <td>${formatDate(game.gameDate)}</td>
            <td>
                <button class="btn-delete" data-sale-id="${game.id}">Eliminar</button>
            </td>
            `;

        tablaBody.appendChild(row);
    });

    initDeleteSaleButtonHandler();
}


// Funcion que limpia la tabla
function clearTable() {
  const tableBody = document.getElementById("data-table-body");

  tableBody.innerHTML = "";
}

// Funcion que muestra mensaje de carga
function showLoadingMessage() {
  const message = document.getElementById("message");

  message.innerHTML = "Cargando...";

  message.style.display = "block";
}


// Funcion que muestra mensaje de carga
function showInitialMessage() {
    const message = document.getElementById('message');
  
    message.innerHTML = 'No se ha realizado una consulta de ventas.';
  
    message.style.display = 'block';
}
  

// Funcion que muestra mensaje de que no se encuentraron datos
function showNotFoundMessage() {
  const message = document.getElementById("message");

  message.innerHTML = "No se encontraron juegos con el filtro proporcionado.";

  message.style.display = "block";
}


// Funcion que oculta mensaje
function hideMessage() {
  const message = document.getElementById("message");

  message.style.display = "none";
}

//#endregion


//#region 4. FILTROS (VIEW)

function initFilterButtonsHandler() {
  document.getElementById("filter-form").addEventListener("submit", (event) => {
    event.preventDefault();
    searchSales();
  });

  document.getElementById('reset-filters').addEventListener('click', () => clearSales());

}


function clearSales() {
    document.querySelector('select.filter-field').selectedIndex = 0;
    document.querySelectorAll('input.filter-field').forEach(input => input.value = '');
  
    displayClearSalesView();
}


function resetSales() {
document.querySelector('select.filter-field').selectedIndex = 0;
document.querySelectorAll('input.filter-field').forEach(input => input.value = '');
searchSales();
}


function searchSales() {
const videoGames = document.getElementById('video-juegos-filter').value;
const customerName = document.getElementById('customer-filter').value;
const salesman = document.getElementById('salesman-filter').value;
const saleDate = document.getElementById('date-filter').value;

getSalesData(videoGames, customerName, salesman, saleDate);
}

//#endregion


//#region 5. BOTONES PARA AGREGAR Y ELIMINAR VENTAS (VIEW)

function initAddSaleButtonsHandler() {
  document.getElementById("addSale").addEventListener("click", () => {
    openAddSaleModal();
  });

  document.getElementById("modal-background").addEventListener("click", () => {
    closeAddSaleModal();
  });

  document.getElementById("sale-form").addEventListener("submit", (event) => {
    event.preventDefault();
    processSubmitSale();
  });
}

function openAddSaleModal() {
  document.getElementById("sale-form").reset();
  document.getElementById("modal-background").style.display = "block";
  document.getElementById("modal").style.display = "block";
}

function closeAddSaleModal() {
  document.getElementById("sale-form").reset();
  document.getElementById("modal-background").style.display = "none";
  document.getElementById("modal").style.display = "none";
}

function processSubmitSale() {
  const workerName = document.getElementById("vendedor-name-field").value;
  const gameTitle = document.getElementById("game-title-field").value;
  const gamePrice = document.getElementById("sale-price-field").value;
  const gameDate = document.getElementById("sale-date-field").value;
  const gameNote = document.getElementById("notes-field").value;

  const saleToSave = new Game(
    null,
    workerName,
    gameTitle,
    parseFloat(gamePrice),
    gameDate,
    gameNote
  );

  createSale(saleToSave);
}

function initDeleteSaleButtonHandler() {
  document.querySelectorAll(".btn-delete").forEach((button) => {
    button.addEventListener("click", () => {
      const saleId = button.getAttribute("data-sale-id"); // Obtenemos el ID de la venta
      deleteSale(saleId); // Llamamos a la función para eleminar la venta
    });
  });
}

//#endregion

//#region 6. CARGAR DATOS DE MODELOS PARA FORM (VIEW)

// Funcion que agrega los datos de los modelos de casas a la tabla.
function displayGameOptions(gameTitle) {
  const gameFilter = document.getElementById("video-juegos-filter");
  const gameModal = document.getElementById("games-modal");

  gameTitle.forEach((gameTitle) => {

    const optionFilter = document.createElement("option");

    optionFilter.value = gameTitle.title;
    optionFilter.text = `${gameTitle.title} - ${formatCurrency(gameTitle.price)}`;

    gameFilter.appendChild(optionFilter);

    const optionModal = document.createElement("option");

    optionModal.value = gameTitle.title;
    optionModal.text = `${gameTitle.title} - ${formatCurrency(gameTitle.price)}`;

    gameModal.appendChild(optionModal);
  });
}

//#endregion

//#region 7. CONSUMO DE DATOS DESDE API

function getVideoGamesData() {
  fetchAPI(`${apiURL}/videojuegos`, "GET")
  .then((data) => {
    const gameList = mapAPIToGameDescriptors(data);
    displayGameOptions(gameList);
  });
}

function getSalesData(videoGames, customerName, salesman, saleDate) {
 
  const url = buildGetSalesDataUrl( videoGames,  customerName,  salesman,  saleDate );

  fetchAPI(url, "GET")
  .then((data) => {
    const salesList = mapAPIToTasks(data);
    displayGamesView(salesList);
  });
}

function createSale(venta) {
  fetchAPI(`${apiURL}/venta`, "POST", venta).then((venta) => {
    closeAddSaleModal();
    resetSales();
    window.alert(`Venta ${venta.id} creada correctamente.`);
  });
}

function deleteSale(ventaId) {
  const confirm = window.confirm(
    `¿Estás seguro de que deseas eliminar la venta ${ventaId}?`
  );

  if (confirm) {
    fetchAPI(`${apiURL}/venta/${ventaId}`, "DELETE").then(() => {
      resetSales();
      window.alert("Venta eliminada.");
    });
  }
}

// Funcion que genera la url para consultar ventas con filtros.
function  buildGetSalesDataUrl( videoGames, customerName, salesman, saleDate) {
  // Tecnica de string dinamico: se aconseja cuando tenemos una cantidad limitada de parámetros y
  //    cierto control de los tipos de parametros (id, fechas).
  // const url = `${apiURL}/sales?realEstate=${realEstate}&customerName=${customerName}&salesman=${salesman}&saleDate=${saleDate}`;

  // URL y URLSearchParams: simplifican la construcción de URLs dinámicas y complejas,
  //    facilitan la gestión de múltiples parámetros y textos dinámicos al encargarse de
  //    la codificación y decodificación de caracteres especiales, lo que evita problemas
  //    comunes relacionados con espacios y caracteres no válidos.
  const url = new URL(`${apiURL}/venta`);

  if (videoGames) {
    url.searchParams.append("videoGames", videoGames);
  }

  if (customerName) {
    url.searchParams.append("customerName", customerName);
  }

  if (salesman) {
    url.searchParams.append("salesman", salesman);
  }

  if (saleDate) {
    url.searchParams.append("saleDate", saleDate);
  }

  return url;
}

//#endregion

//#region 8. INICIALIZAMOS FUNCIONALIDAD (CONTROLLER)

initAddSaleButtonsHandler();

initFilterButtonsHandler();

getVideoGamesData();

//#endregion
