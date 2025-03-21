const printDateInFooter = function () {
  // recupero un riferimento allo span vuoto nel footer
  const footerSpan = document.getElementById("year");
  footerSpan.innerText = new Date().getFullYear();
};

printDateInFooter();

const hideSpinner = function () {
  const div = document.getElementById("spinner-container");
  div.classList.add("d-none");
};

const getConfezione = function () {
  const confezioneURL = "https://striveschool-api.herokuapp.com/api/product/";

  // Chiamata fetch per ottenere i dati
  fetch(confezioneURL, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkNzBlODM4MzRiZjAwMTUwMDA5MWIiLCJpYXQiOjE3NDI1NjU2MDgsImV4cCI6MTc0Mzc3NTIwOH0.PxsVDQgdjiqtsAphN38xEDhqQc-BZDEePGIV4MPklZo",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("la risposta non era valida");
      }
    })
    .then((data) => {
      hideSpinner(); // nascondo lo spinner
      console.log("DATI RICEVUTI DAL SERVER", data);

      // prendo un riferimento alla row definita in HTML
      const row = document.getElementById("events-row");

      // ciclo sull'array "data" e creo una colonna per ogni oggetto
      data.forEach((confezione) => {
        row.innerHTML += `
            <div class="col col-12 col-lg-3 col-md-4 col-sm-6">
              <div class="card">
                <img src="${confezione.imageUrl}" class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">${confezione.name}</h5>
                  <p class="card-text">${confezione.description}</p>
                  <p class="card-text">${confezione.price}€ </p>
                  <a href="./details.html?id=${confezione._id}" class="btn btn-primary">Vai ai dettagli</a>
                </div>
              </div>
            </div>
          `;
      });
    })
    .catch((error) => {
      hideSpinner(); // nascondo lo spinner
      console.log("si è verificato un errore", error);
    });
};

getConfezione();
