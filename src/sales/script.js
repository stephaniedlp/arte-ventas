//#region MODELO DE DATOS (MODELS)

// Definimos la clase RealEstate
class RealEstate {

    constructor(id, name, description, bedrooms, bathrooms, price, landArea, constructionArea, image) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.bedrooms = bedrooms;
      this.bathrooms = bathrooms;
      this.price = price;
      this.landArea = landArea;
      this.constructionArea = constructionArea;
      this.image = image;
    }
  
  }
  
  
  
  // Creamos objetos de modelos de casas
  const house1 = new RealEstate(1, "Casa Alfa", "Hermosa casa con vistas panorámicas.", 3, 2.5, 250000, 1000, 150, "real-estate-1.jpg");
  const house2 = new RealEstate(2, "Casa Beta", "Diseño moderno y espacioso con acabados de lujo.", 3, 3.5, 350000, 300, 180, "real-estate-2.jpg");
  const house3 = new RealEstate(3, "Casa Teta", "Casa ideal para familias grandes con jardín y areas de convivencia.", 4, 4.5, 450000, 400, 200, "real-estate-3.jpg");
  
  
  // Almacenamos los objetos en un array
  const realEstateList = [house1, house2, house3];
  
  
  // Accedemos datos por indices
  console.log('Impresion en consola de elementos accesados por indices: ');
  console.log(realEstateList[0]);
  console.log(realEstateList[1]);
  console.log(realEstateList[1]);
  
  
  // Accedemos datos con funcion forEach() de array
  console.log('Impresion en consola de elementos accesados con forEach(): ');
  realEstateList.forEach(item => {console.log(item)});
  
  //#endregion
  
  
  //#region VISTA DE LOS MODELOS EN HTML (VIEW)
  
  // Funcion que controla el despliegue de un array de RealEstate en la tabla, asi como el mensaje a mostrar.
  function displayTable(houses) {
  
    clearTable();
  
    showLoadingMessage();
  
    setTimeout(() => {
  
      if (houses.length === 0) {
  
        showNotFoundMessage();
  
      } else {
  
          hideMessage();
  
          const tablaBody = document.getElementById('data-table-body');
  
          const imagePath = `../assets/img/real-estate/`;
  
          houses.forEach(house => {
  
            const row = document.createElement('tr');
  
            row.innerHTML = `
              <td> ${house.id} </td>
              <td> <img src="${imagePath + house.image}" alt="${house.name}" width="100"> </td>
              <td>${house.name}</td>
              <td>${house.description}</td>
              <td>${house.bedrooms}</td>
              <td>${house.bathrooms}</td>
              <td>${formatCurrency(house.price)}</td>
              <td>${formatM2(house.landArea)}</td>
              <td>${formatM2(house.constructionArea)}</td>
            `;
  
            tablaBody.appendChild(row);
  
          });
  
      }
  
    }, 2000);
  
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
  
    message.innerHTML = 'No se encontraron casas con el filtro proporcionado.';
  
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
    const filterText = document.getElementById('text').value.toLowerCase();;
    const filterBedrooms = parseFloat(document.getElementById('bedrooms').value);
    const filterMinPrice = parseFloat(document.getElementById('price-min').value);
    const filterMaxPrice = parseFloat(document.getElementById('price-max').value);
  
    const filteredHouses = filterHouses(realEstateList, filterText, filterBedrooms, filterMinPrice, filterMaxPrice);
  
    displayTable(filteredHouses);
  }
  
  
  // Funcion con la logica para filtrar las casas.
  function filterHouses(houses, text, bedrooms, minPrice, maxPrice) {
  
    return houses.filter( house =>
        (!bedrooms || house.bedrooms === bedrooms) &&
        (!minPrice || house.price >= minPrice) &&
        (!maxPrice || house.price <= maxPrice) &&
        (!text     || house.name.toLowerCase().includes(text) || house.description.toLowerCase().includes(text))
      );
  }
  
  //#endregion
  
  
  //#region INICIALIZAMOS FUNCIONALIDAD (CONTROLLER)
  
  displayTable(realEstateList);
  
  initButtonsHandler();
  
  //#endregion
  