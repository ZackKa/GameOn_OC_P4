
function main() {
    initEvents()
}
main()

function initEvents() {
    let prenom = document.getElementById("first")
    let nom = document.getElementById("last")
    let email = document.getElementById("email")
    let birthdate = document.getElementById("birthdate")
    let quantity = document.getElementById("quantity")
    let localisations = document.querySelectorAll("input[name=location]")
    let checkCondition = document.getElementById("checkbox1")
    let form = document.querySelector("form")
    //let closeButton = document.querySelector(".confirmation-btn")
    
    prenom.addEventListener("change", () => { checkPrenom (); })
    nom.addEventListener("change", () => { checkNom (); })
    email.addEventListener("change", () => { checkEmail (); })
    birthdate.addEventListener("change", () => { checkBirthdate (); })
    quantity.addEventListener("change", () => { checkQuantity (); })
    localisations.forEach(localisation => {
        localisation.addEventListener("change", () => { checkLocalisation(); });
    });
    checkCondition.addEventListener("change", () => { checkConditionValid (); })
    createConfirmation()
    form.addEventListener("submit", function(event) {
        if (!checkForm()) {
            event.preventDefault(); // Empêcher l'envoi du formulaire si les champs ne sont pas valides
        }else{
            event.preventDefault();
            if (sendForm()){ showMessageConfirmation();}
        }
    });
    //form.addEventListener("submit", (event) => { event.preventDefault (); showMessage()})
    //closeButton.addEventListener('click', () => {sendForm (); })
}
// function qui vérifie les champs du formulaire   
function checkForm (){
    // si tout les champs sont remplis
    let boutonEnvoyer = document.querySelector(".btn-submit")
    if (checkPrenom() && checkNom() && checkEmail()&& checkBirthdate()&& checkQuantity() && checkLocalisation() && checkConditionValid()){
        console.log("tous est ok")
        // Quand tous les champs sont remplis, le bouton "c'est parti" est activé et l'envoie peux se faire
        //boutonEnvoyer.removeAttribute('disabled');
        return true;
    }else{
        // Si un champ n'est pas rempli, le bouton est désactivé et l'envoie ne peux pas se faire
        //boutonEnvoyer.setAttribute('disabled', 'true');
        console.log("rien est ok")
        return false;
    }
    
}
// function qui verifie que les champs sont bons avant d'envoyer les données
function sendForm(){
    let form = document.querySelector("form")
    if (checkForm()){
        console.log("envoie des données")
        
        /*const modalbg = document.querySelector(".bground");
        // Je change le style de la modal pour qu'elle ne s'affiche plus
        modalbg.style.display = "none";*/
        /*let content = document.querySelector(".modal-body")
        content.style.display = "block"*/
        form.reset()
        return true;

    }
        console.log("erreur")
        return false
}
function createConfirmation(){
    const contentGeneral = document.querySelector('.content');
    let form = document.querySelector("form")
    // Create Element
    const confirmationDiv = document.createElement('div')
    const confirmationP = document.createElement('p')
    const closeButton = document.createElement('button')

    // Add class
    closeButton.classList.add('btn-submit', 'confirmation-btn')
    confirmationDiv.classList.add('confirmation')

    // Add content
    closeButton.textContent = 'Fermer'
    confirmationP.textContent = 'Merci ! Votre réservation a été reçue.'

    // Add elements to the DOM
    contentGeneral.appendChild(confirmationDiv)
    confirmationDiv.appendChild(confirmationP)
    confirmationDiv.appendChild(closeButton)

    closeButton.addEventListener('click', () =>{
        let confirmationDiv = document.querySelector(".confirmation")
        confirmationDiv.style.display = "none"
        const modalbg = document.querySelector(".bground");
        // Je change le style de la modal pour qu'elle ne s'affiche plus
        modalbg.style.display = "none";
        let modalBody = document.querySelector(".modal-body")
        modalBody.style.display = "block"
    } )

}
function showMessageConfirmation(){
    let confirmation = document.querySelector(".confirmation")
    if(confirmation){
        let content = document.querySelector(".modal-body")
        content.style.display = "none"
        let confirmation = document.querySelector(".confirmation")
        confirmation.style.display = "flex"
    }else{
        let content = document.querySelector(".modal-body")
        content.style.display = "block"
        let confirmation = document.querySelector(".confirmation")
        confirmation.style.display = "none"
    }
}
// fonction qui verifie mes input text (prenom et nom)
function checkInputText(id) {
    let input = document.getElementById(id)
    hideErrorMessage(input);

    if (input.value === "" || input.value === null || input.value.length < 2) {
        console.log("danger")
        showError(input, "Le champ est requis");
        return false;
    } else {
        console.log(input.value)
        return true;
    }
}
// function qui verifie le prenom
function checkPrenom() {
    return checkInputText("first")
}

function checkNom(){
    return checkInputText("last")
}

function checkEmail(){
    let email = document.getElementById("email")
    hideErrorMessage(email);

    let emailRegExp = new RegExp(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-_.]+\.[a-zA-Z0-9-_.]+$/);
    if (!emailRegExp.test(email.value)) {
        console.log("danger, caractere manquant")
        showError(email, "Le champ est requis");
        return false;
    } else {
        console.log("ok OK")
        return true;
    }
}

function checkBirthdate(){
    let birthdate = document.getElementById("birthdate")
    hideErrorMessage(birthdate);
    let date = new Date(birthdate.value)
    let today = new Date()
    let minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate() + 1);

    if(birthdate.value === "" || birthdate.value === null || date > minAgeDate){
        console.log("danger, date fausse ou dans le futur", birthdate.value)
        showError(birthdate, "Le champ est requis");
        return false;
    }else{
        console.log(date, "ok")
        return true;
    }
}

function checkQuantity(){
    let quantity = document.getElementById("quantity")
    hideErrorMessage(quantity);

    if (quantity.value === "" || quantity.value === null || quantity.value < 0 || quantity.value >= 100) {
        console.log("danger, caractere manquant")
        showError(quantity, "Le champ est requis");
        return false;
    } else {
        console.log("ok OK", quantity.value)
        return true;
    }
}
// function qui verifie si une des villes est selectionnées
function checkLocalisation() {
    //return getLocalisation()==""?false:true;

    //let localisation = getLocalisation();

    if (getLocalisation() === "") {
        showError(document.querySelector("input[name=location]"), "Le champ est requis");
        return false;
    } else {
        hideErrorMessage(document.querySelector("input[name=location]"));
        return true;
    }

    //return localisation !== "";

    /*let localisationValid = getLocalisation() !== "";
    let localisation = document.querySelector("input[name=location]");
    if (!localisationValid) {
        showError(localisation, "Le champ est requis");
    } else {
        hideErrorMessage(localisation);
    }
    return localisationValid;*/
    /*if(getLocalisation()==""){
        console.log("NON")
        return false;
    }else{
        console.log("OK")
        return true;
    }*/
}
// function qui récupère la valeur de la localisation selectionné
function getLocalisation() {
    let choice="";

    let listeLocalisation = document.querySelectorAll("input[name=location]")


    for (let i = 0; i < listeLocalisation.length; i++) {
        if (listeLocalisation[i].checked) {
            choice=listeLocalisation[i].value;
            console.log(choice)
        }
    };
    return choice;
}

function checkConditionValid() {
    let check = false;
    let checkCondition = document.getElementById("checkbox1")
    hideErrorMessage(checkCondition);

    //console.log(checkCondition.checked, "valeur checkcondition")
    if (checkCondition.checked) {
        check = true;
        console.log(check, "check")
        //return true;
    }else{
        showError(checkCondition, "Le champ est requis");
        console.log(check, "non check")
        check = false;
        //return false;
    }
    return check;
}

function showError(input){
    const errorMessages = {
        first: "Entrer 2 caractères ou plus",
        last: "Entrer 2 caractères ou plus",
        email: "Entrer une adresse mail valide",
        birthdate: "Entrer une date valide (18 ans minimum)",
        quantity: "Entrer un nombre entre 0 et 100",
        location: "Selectionner une ville",
        checkbox1: "Cochez la case pour accepter les conditions"
    };
    const formControl = input.parentElement;
    
    formControl.setAttribute('data-error', errorMessages[input.name || input.id]);
    formControl.setAttribute('data-error-visible', 'true');
}

function hideErrorMessage(input){
    const formControl = input.parentElement;
    
    formControl.removeAttribute('data-error');
    formControl.removeAttribute('data-error-visible');
}