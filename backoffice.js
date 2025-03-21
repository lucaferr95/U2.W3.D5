const printDateInFooter = function () {
  // Recupero un riferimento allo span vuoto nel footer
  const footerSpan = document.getElementById("year");
  footerSpan.innerText = new Date().getFullYear();
};

printDateInFooter();

// Definizione della classe HariboProduct
class HariboProduct {
  constructor(_name, _brand, _description, _price, _imageUrl) {
    this.name = _name;
    this.brand = _brand;
    this.description = _description;
    this.price = _price;
    this.imageUrl = _imageUrl;
  }
}

// Recupero del parametro 'id' dalla URL per determinare se siamo in modalità "CREA" o "MODIFICA"
const URLparameters = new URLSearchParams(location.search);
const eventId = URLparameters.get("id");

// Riferimenti agli input del form
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const priceInput = document.getElementById("price");
const imageUrlInput = document.getElementById("imgAdd");
const brandInput = document.getElementById("brand");

const eventsURL = "https://striveschool-api.herokuapp.com/api/product/";

// Se siamo in modalità MODIFICA, ripopoliamo il form con i dati esistenti
if (eventId) {
  // Modalità MODIFICA
  fetch(eventsURL + eventId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkNzBlODM4MzRiZjAwMTUwMDA5MWIiLCJpYXQiOjE3NDI1NjU2MDgsImV4cCI6MTc0Mzc3NTIwOH0.PxsVDQgdjiqtsAphN38xEDhqQc-BZDEePGIV4MPklZo",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella fetch");
      }
      return response.json();
    })
    .then((data) => {
      // Ripopoliamo i campi del form con i dati ricevuti
      nameInput.value = data.name;
      descriptionInput.value = data.description;
      priceInput.value = data.price;
      imageUrlInput.value = data.imageUrl;
    })
    .catch((err) => console.log("Errore nel ripopolamento del form", err));
}

// Gestione del submit del form
const form = document.getElementById("event-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Creazione di un nuovo oggetto prodotto
  const product = new HariboProduct(
    nameInput.value,
    descriptionInput.value,
    brandInput.value, // Valore della marca corretto
    priceInput.value,
    imageUrlInput.value.trim()
  );

  console.log("Corpo della richiesta:", JSON.stringify(product));

  // Variabili per la gestione del metodo e URL da usare
  let methodToUse;
  let URLtoUse;

  if (eventId) {
    // Modalità MODIFICA
    methodToUse = "PUT";
    URLtoUse = eventsURL + eventId;
  } else {
    // Modalità CREA
    methodToUse = "POST";
    URLtoUse = eventsURL;
  }

  fetch(URLtoUse, {
    method: methodToUse,
    body: JSON.stringify(product),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkNzBlODM4MzRiZjAwMTUwMDA5MWIiLCJpYXQiOjE3NDI1NjU2MDgsImV4cCI6MTc0Mzc3NTIwOH0.PxsVDQgdjiqtsAphN38xEDhqQc-BZDEePGIV4MPklZo", // Token di autorizzazione
      "Content-Type": "application/json", // Tipo di contenuto
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("SALVATAGGIO COMPLETATO!");
        form.reset();
      } else {
        throw new Error("Ricevuta risposta non ok dal backend");
      }
    })
    .catch((err) => {
      console.log("Errore nel salvataggio!", err);
    });
});
