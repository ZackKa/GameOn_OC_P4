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

  //modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
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
  const modalbg = document.querySelector(".bground");
  // Je change le style de la modal pour qu'elle ne s'affiche plus
  modalbg.style.display = "none";
  let modalBody = document.querySelector(".modal-body")
  modalBody.style.display = "block"
  let confirmationDiv = document.querySelector(".confirmation")
  confirmationDiv.style.display = "none"
// Je vide le form au clique sur le bouton fermer
  let form = document.querySelector("form")
  form.reset()
}

function main() {
  initEvents()
}
main()