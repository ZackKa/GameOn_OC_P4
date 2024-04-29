function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements



function initEvents() {
  const closeModal = document.querySelector(".close")
  const modalBtn = document.querySelectorAll(".modal-btn");

  modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

  // J'écoute l'evenement click sur le bouton et lance la fonction modalClose
  closeModal.addEventListener("click", modalClose);
}

// launch modal form
function launchModal() {
  const modalbg = document.querySelector(".bground");
  modalbg.style.display = "block";
}
function modalClose() {
  // Je change le style de la modal pour qu'elle ne s'affiche plus
  const modalbg = document.querySelector(".bground");
  modalbg.style.display = "none";
    // Je change le style du form pour qu'il soit visible
  let modalBody = document.querySelector(".modal-body")
  modalBody.style.display = "block"
  // Je change le style de la modal du message de confirmation pour qu'elle ne s'affiche plus
  let confirmationDiv = document.querySelector(".confirmation")
  confirmationDiv.style.display = "none"
// Je vide le form au clique sur le bouton fermer
  let form = document.querySelector("form")
  form.reset() // Je vide le form
}

function main() {
  initEvents()
}
main()