//fonction qui initie les événements
function initEventsValid() {
    let prenom = document.getElementById("first")
    let nom = document.getElementById("last")
    let email = document.getElementById("email")
    let birthdate = document.getElementById("birthdate")
    let quantity = document.getElementById("quantity")
    let localisations = document.querySelectorAll("input[name=location]")
    let checkCondition = document.getElementById("checkbox1")
    let form = document.querySelector("form")
    // J'Init mes évènements qui vérifient les champs grâce aux fonctions appelées
    prenom.addEventListener("change", () => { checkPrenom() })
    nom.addEventListener("change", () => { checkNom() })
    email.addEventListener("change", () => { checkEmail() })
    birthdate.addEventListener("change", () => { checkBirthdate() })
    quantity.addEventListener("change", () => { checkQuantity() })
    localisations.forEach(localisation => {
        localisation.addEventListener("change", () => { checkLocalisation() })
    })
    checkCondition.addEventListener("change", () => { checkConditionValid() })
    createConfirmation() // Je fais appel à la fonction
    form.addEventListener("submit", function (event) {
        if (!checkForm()) { // Je vérifie le boolean de la fonction
            event.preventDefault() // Empêcher le rechargement de la page si les champs ne sont pas valides
        } else {
            event.preventDefault()
            if (sendForm()) { showMessageConfirmation() } // Je vérifie le boolean de la fonction et j'appelle showMessageConfirmation
        }
    })
}
initEventsValid()

// function qui vérifie les champs du formulaire   
function checkForm() {
    // si tout les champs sont remplis
    if (checkPrenom() && checkNom() && checkEmail() && checkBirthdate() && checkQuantity() && checkLocalisation() && checkConditionValid()) {

        return true
    }

    return false
}

// function qui vérifie que les champs sont bons avant d'envoyer les données
function sendForm() {
    let form = document.querySelector("form")
    if (checkForm()) {
        form.reset() // Je vide le form
        return true

    }
    return false
}

// Je créé les éléments de la modal confirmation dans le DOM
function createConfirmation() {
    const contentGeneral = document.querySelector('.content')
    // Creation élément
    const confirmationDiv = document.createElement('div')
    const confirmationP = document.createElement('p')
    const closeButton = document.createElement('button')

    // Ajout de class
    closeButton.classList.add('btn-submit', 'confirmation-btn')
    confirmationDiv.classList.add('confirmation')

    // Ajout du contenu
    closeButton.textContent = 'Fermer'
    confirmationP.textContent = 'Merci ! Votre réservation a été reçue.'

    // Ajout des éléments au DOM
    contentGeneral.appendChild(confirmationDiv)
    confirmationDiv.appendChild(confirmationP)
    confirmationDiv.appendChild(closeButton)

    closeButton.addEventListener('click', () => {
        // Je change le style de la modal du message de confirmation pour qu'elle ne s'affiche plus
        let confirmationDiv = document.querySelector(".confirmation")
        confirmationDiv.style.display = "none"
        // Je change le style de la modal pour qu'elle ne s'affiche plus
        const modalbg = document.querySelector(".bground")
        modalbg.style.display = "none"
        // Je change le style du form pour qu'il soit visible
        let modalBody = document.querySelector(".modal-body")
        modalBody.style.display = "block"
    })

}

// fonction qui affiche le message de confirmation
function showMessageConfirmation() {
    let confirmation = document.querySelector(".confirmation")
    // Je vérifie sur l'élément confirmation existe
    if (confirmation) {
        let content = document.querySelector(".modal-body")
        content.style.display = "none"
        let confirmation = document.querySelector(".confirmation")
        confirmation.style.display = "flex"
    } else {
        let content = document.querySelector(".modal-body")
        content.style.display = "block"
        let confirmation = document.querySelector(".confirmation")
        confirmation.style.display = "none"
    }
}

// fonction qui vérifie mes input text (prénom et nom)
function checkInputText(id) {
    let input = document.getElementById(id)
    // Je masque le style de l'erreur en appelant la fonction
    hideErrorMessage(input)

    if (input.value === "" || input.value === null || input.value.length < 2) {
        showError(input)
        return false
    }

    return true
}

//fonction qui vérifie le prénom
function checkPrenom() {
    // Je cible l'élément first pour la fonction
    return checkInputText("first")
}

//fonction qui vérifie le nom
function checkNom() {
    return checkInputText("last")
}

//fonction qui vérifie l'email entré
function checkEmail() {
    let email = document.getElementById("email")
    hideErrorMessage(email)
    // Je définis l'expression régulière que doit avoir mon champ email
    let emailRegExp = new RegExp(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-_.]+\.[a-zA-Z0-9-_.]+$/)
    // Je test la valeur de l'email
    if (!emailRegExp.test(email.value)) {
        showError(email)
        return false
    }

    return true
}

// fonction qui vérifie la date de naissance
function checkBirthdate() {
    let birthdate = document.getElementById("birthdate")
    hideErrorMessage(birthdate)
    // Je recupere la date entrée
    let date = new Date(birthdate.value)
    let today = new Date()
    // Je crée minAgedate pour avoir une date qui correspond à 18 ans et donc un âge minimum
    let minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate() + 1)
    // Je vérifie que la date entrée est plus grande que l'âge minimum
    if (birthdate.value === "" || birthdate.value === null || date > minAgeDate) {
        showError(birthdate)
        return false
    }

    return true
}

// fonction qui vérifie la quantité entrée
function checkQuantity() {
    let quantity = document.getElementById("quantity")
    hideErrorMessage(quantity)

    if (quantity.value === "" || quantity.value === null || quantity.value < 0 || quantity.value >= 100) {
        showError(quantity)
        return false
    }

    return true
}

// function qui vérifie si une des villes est selectionnées
function checkLocalisation() {
    // Je vérifie si getLocalisation est vide
    if (getLocalisation() === "") {
        showError(document.querySelector("input[name=location]"))
        return false
    } else {
        hideErrorMessage(document.querySelector("input[name=location]"))
        return true
    }
}

// function qui récupère la valeur de la localisation selectionné
function getLocalisation() {
    let choice = ""

    let listeLocalisation = document.querySelectorAll("input[name=location]")
    // Avec la boucle, je vérifie si une des villes est checked et je récupère sa valeur
    for (let i = 0; i < listeLocalisation.length; i++) {
        if (listeLocalisation[i].checked) {
            choice = listeLocalisation[i].value
        }
    }
    return choice
}

function checkConditionValid() {
    let check = false
    let checkCondition = document.getElementById("checkbox1")
    hideErrorMessage(checkCondition)
    // Je vérifie si les conditions générales sont cochées
    if (checkCondition.checked) {
        check = true
    } else {
        showError(checkCondition)
        check = false
    }
    return check
}

// Fonction qui cible un champs en erreur
function showError(input) {
    const errorMessages = {
        first: "Entrer 2 caractères ou plus",
        last: "Entrer 2 caractères ou plus",
        email: "Entrer une adresse mail valide",
        birthdate: "Entrer une date valide (18 ans minimum)",
        quantity: "Entrer un nombre entre 0 et 99",
        location: "Selectionner une ville",
        checkbox1: "Cochez la case pour accepter les conditions"
    }
    const formControl = input.parentElement
    // J'ajoute un attribut en fonction du champ du formulaire qui est en erreur
    formControl.setAttribute('data-error', errorMessages[input.name || input.id])
    formControl.setAttribute('data-error-visible', 'true')
}

//fonction qui cache le message d'erreur
function hideErrorMessage(input) {
    const formControl = input.parentElement
    // Je retire l'attribut correspondant à l'erreur
    formControl.removeAttribute('data-error')
    formControl.removeAttribute('data-error-visible')
}