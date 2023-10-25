
//#region 1. VARIABLES GLOBALES


//#endregion


//#region 2. MODELO DE DATOS (MODELS)

// Definimos la clase Sale
class Venta {
  constructor(id, customerName, customerPhone, saleDate, salesman, realEstate, salePrice, notes) {
    this.id = id; // Identificador de la venta
    this.workerName = workerName; // Nombre del cliente
    this.gameDate = gameDate; // Teléfono del cliente
    this.gameName = gameName; // Fecha de la venta
    this.gameNote = gameNote;
    this.gamePrice = gamePrice; // Información adicional sobre la venta
  }
}

function mapAPIToVentas(data) {
  return data.map(item => {
    return new Venta(
      item.id,
      item.workerName,
      new Date(item.saleDate),
      item.gameName,
      item.gamePrice,
      item.gameNote
    );
  });
}

// Definimos la clase de RealEstate con los datos necesarios
class GameDescriptor {

  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

}


function mapAPIToGameDescriptors(data) {
  return data.map(item => {
    return new GameDescriptor(
      item.id,
      item.name,
      item.price
    );
  });
}

//#endregion


//#region 3. VENTAS (VIEW)

function displaySalesView(ventas) {

  clearTable();

  showLoadingMessage();

  if (ventas.length === 0) {

    showNotFoundMessage();

  } else {

    hideMessage();

    displaySalesTable(ventas);
  }

}


function displayClearSalesView() {
  clearTable();

  showInitialMessage();
}


// Funcion que agrega los datos de los modelos de casas a la tabla.
function displaySalesTable(ventas) {

  const tablaBody = document.getElementById('data-table-body');

  sales.forEach(venta => {

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${ventas.id}</td>
      <td>${ventas.workerName}</td>
      <td>${ventas.gameName}</td>
      <td>${formatDate(ventas.gameDate)}</td>
      <td class="text-right">${formatCurrency(ventas.gamePrice)}</td>
      <td>${ventas.gameNote}</td>
      <td>
        <button class="btn-delete" data-sale-id="${ventas.id}">Eliminar</button>
      </td>
    `;

    tablaBody.appendChild(row);

  });

  initDeleteSaleButtonHandler();
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


// Funcion que muestra mensaje de carga
function showInitialMessage() {
  const message = document.getElementById('message');

  message.innerHTML = 'No se ha realizado una consulta de ventas.';

  message.style.display = 'block';
}


// Funcion que muestra mensaje de que no se encuentraron datos
function showNotFoundMessage() {
  const message = document.getElementById('message');

  message.innerHTML = 'No se encontraron casas con el filtro proporcionado.';

  message.style.display = 'block';
}


// Funcion que oculta mensaje
function hideMessage() {
  const message = document.getElementById('message');

  message.style.display = 'none';
}

//#endregion


//#region 4. FILTROS (VIEW)

function initFilterButtonsHandler() {

  document.getElementById('filter-form').addEventListener('submit', event => {
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
  const realEstate = document.getElementById('real-estate-filter').value;
  const customerName = document.getElementById('customer-filter').value;
  const salesman = document.getElementById('salesman-filter').value;
  const saleDate = document.getElementById('date-filter').value;

  getSalesData(realEstate, customerName, salesman, saleDate);
}

//#endregion


//#region 5. BOTONES PARA AGREGAR Y ELIMINAR VENTAS (VIEW)

function initAddSaleButtonsHandler() {

  document.getElementById('addSale').addEventListener('click', () => {
    openAddSaleModal()
  });

  document.getElementById('modal-background').addEventListener('click', () => {
    closeAddSaleModal();
  });

  document.getElementById('sale-form').addEventListener('submit', event => {
    event.preventDefault();
    processSubmitSale();
  });

}


function openAddSaleModal() {
  document.getElementById('sale-form').reset();
  document.getElementById('modal-background').style.display = 'block';
  document.getElementById('modal').style.display = 'block';
}


function closeAddSaleModal() {
  document.getElementById('sale-form').reset();
  document.getElementById('modal-background').style.display = 'none';
  document.getElementById('modal').style.display = 'none';
}


function processSubmitSale() {
  const customerName = document.getElementById('vendedor-name-field').value;
  const realEstate = document.getElementById('real-estate-field').value;
  const salePrice = document.getElementById('sale-price-field').value;
  const saleDate = document.getElementById('sale-date-field').value;
  const salesman = document.getElementById('salesman-field').value;
  const notes = document.getElementById('notes-field').value;

  const saleToSave = new Sale(
    null,
    customerName,
    customerPhone,
    saleDate,
    salesman,
    realEstate,
    parseFloat(salePrice),
    notes
  );

  createSale(saleToSave);
}


function initDeleteSaleButtonHandler() {

  document.querySelectorAll('.btn-delete').forEach(button => {

    button.addEventListener('click', () => {

      const saleId = button.getAttribute('data-sale-id'); // Obtenemos el ID de la venta
      deleteSale(saleId); // Llamamos a la función para eleminar la venta

    });

  });

}


// Mostrar y ocultar el modal para agregar una nueva venta.

//#endregion


//#region 6. CARGAR DATOS DE MODELOS PARA FORM (VIEW)

// Funcion que agrega los datos de los modelos de casas a la tabla.
function displayRealEstateOptions(realEstates) {

  const realEstateFilter = document.getElementById('real-estate-filter');
  const realEstateModal = document.getElementById('real-estate-field');

  realEstates.forEach(realEstate => {

    const optionFilter = document.createElement('option');

    optionFilter.value = realEstate.name;
    optionFilter.text = `${realEstate.name} - ${formatCurrency(realEstate.price)}`;

    realEstateFilter.appendChild(optionFilter);

    const optionModal = document.createElement('option');

    optionModal.value = realEstate.name;
    optionModal.text = `${realEstate.name} - ${formatCurrency(realEstate.price)}`;

    realEstateModal.appendChild(optionModal);
  });

}

//#endregion


//#region 7. CONSUMO DE DATOS DESDE API

function getRealEstateData() {

  fetchAPI(`${apiURL}/real-estate`, 'GET')
    .then(data => {
      const realEstatesList = mapAPIToRealEstateDescriptors(data);
      displayRealEstateOptions(realEstatesList);
    });

}


function getSalesData(realEstate, customerName, salesman, saleDate) {

  const url = buildGetSalesDataUrl(realEstate, customerName, salesman, saleDate);

  fetchAPI(url, 'GET')
    .then(data => {
      const salesList = mapAPIToSales(data);
      displaySalesView(salesList);
    });
}


function createSale(sale) {

  fetchAPI(`${apiURL}/sales`, 'POST', sale)
    .then(sale => {
      closeAddSaleModal();
      resetSales();
      window.alert(`Venta ${sale.id} creada correctamente.`);
    });

}


function deleteSale(saleId) {

  const confirm = window.confirm(`¿Estás seguro de que deseas eliminar la venta ${saleId}?`);

  if (confirm) {

    fetchAPI(`${apiURL}/sales/${saleId}`, 'DELETE')
      .then(() => {
        resetSales();
        window.alert("Venta eliminada.");
      });

  }
}

// Funcion que genera la url para consultar ventas con filtros.
function buildGetSalesDataUrl(realEstate, customerName, salesman, saleDate) {
  // Tecnica de string dinamico: se aconseja cuando tenemos una cantidad limitada de parámetros y
  //    cierto control de los tipos de parametros (id, fechas).
  // const url = `${apiURL}/sales?realEstate=${realEstate}&customerName=${customerName}&salesman=${salesman}&saleDate=${saleDate}`;

  // URL y URLSearchParams: simplifican la construcción de URLs dinámicas y complejas,
  //    facilitan la gestión de múltiples parámetros y textos dinámicos al encargarse de
  //    la codificación y decodificación de caracteres especiales, lo que evita problemas
  //    comunes relacionados con espacios y caracteres no válidos.
  const url = new URL(`${apiURL}/sales`);

  if (realEstate) {
    url.searchParams.append('realEstate', realEstate);
  }

  if (customerName) {
    url.searchParams.append('customerName', customerName);
  }

  if (salesman) {
    url.searchParams.append('salesman', salesman);
  }

  if (saleDate) {
    url.searchParams.append('saleDate', saleDate);
  }

  return url;
}

//#endregion


//#region 8. INICIALIZAMOS FUNCIONALIDAD (CONTROLLER)

initAddSaleButtonsHandler();

initFilterButtonsHandler();

getRealEstateData();

//#endregion
