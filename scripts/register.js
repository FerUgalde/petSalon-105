let salon={
    name:"The fashion pet",
    phone:"999-999-9999",
    address:{
        street:"Palm",
        number:"262-k",
        zip:"123345"
    },
    pets:[] // pet arry
}

// constructor
function Pet(name, age, gender, breed, service, type, payment, description){
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.breed = breed;
    this.service = service;
    this.type = type;
    this.payment = payment;
    this.description = description;
}

// replace
function getE(id){
    return document.getElementById(id);
}

// get elements from HTML
let inputName = getE("txtName");
let inputAge = getE("numAge");
let inputGender = getE("selectGender");
let inputBreed = getE("txtBreed");
let inputService = getE("selectService");
let inputType = getE("txtType");
let inputPayment = getE("selectPayment");
let inputDescription = getE("txtDescription");

// function isValid(aPet){
//     let validation=true;

//     //clear the style
//     //document.querySelectorAll("input"); use a loop
//     getE("txtName").classList.remove("alert-error");
//     getE("numAge").classList.remove("alert-error");

//     if(aPet.name==""){
//         validation=false;
//         getE("txtName").classList.add("alert-error");
//     }
//     return validation;
// }

function isValid(aPet){
    let validation=true;

    document.querySelectorAll("input").forEach(input => {
        input.classList.remove("alert-error");
    });
    document.querySelectorAll("select").forEach(input => {
        input.classList.remove("alert-error");
    });

    if(aPet.some(value => value == "")){
        validation=false;
        document.querySelectorAll("input").forEach(input => {
            if(input.value == ""){
                input.classList.add("alert-error");
            }
        });
        document.querySelectorAll("select").forEach(select => {
            if(select.value == ""){
                select.classList.add("alert-error");
            }
        });
    }else{
        inputPayment.classList.remove("hidden");
        inputDescription.classList.remove("hidden");
        inputPayment.classList.add("form-select");
        inputDescription.classList.add("form-control");
        getE("btn-add").classList.remove("hidden");
        getE("btn-add").classList.add("btn-cont");

        setTimeout(function(){
            inputPayment.classList.add("hidden");
            inputDescription.classList.add("hidden");
            getE("btn-add").classList.add("hidden");
        },60000);
    }

    return validation;
}

function showNotifications(msg, type){
    getE("notifications").classList.remove("hidden");
    getE("notifications").innerHTML=`<p class="${type}">${msg}</p>`
    getE("notifications-copy").classList.remove("hidden");
    getE("notifications-copy").innerHTML=`<p class="${type}">${msg}</p>`

    setTimeout(function(){
        getE("notifications").classList.add("hidden");
        getE("notifications-copy").classList.add("hidden");
    },3000);
}

function register(){
    let fields = [inputName.value, inputAge.value, inputGender.value, inputBreed.value, inputService.value, inputType.value];

    if(isValid(fields)==true){

        let newPet = new Pet(inputName.value, inputAge.value, inputGender.value, inputBreed.value, inputService.value, inputType.value, inputPayment.value, inputDescription.value);
    
        salon.pets.push(newPet);
    
        petsCount();
        displayPetCards();
        displayPetTable();
    
        inputName.value = "";
        inputAge.value = "";
        inputGender.value = "";
        inputBreed.value = "";    
        inputService.value = "";
        inputType.value = "";

        showNotifications("Successful registion", "alert-successful");
    }else{
        showNotifications("Please fill out all the required fields", "alert-error");
    }

    // let newPet = new Pet(inputName.value, inputAge.value, inputGender.value, inputBreed.value, inputService.value);
    // if(isValid(newPet)==true){
        
    //     inputPayment.classList.remove("hidden");
    //     inputDescription.classList.remove("hidden");
    //     inputPayment.classList.add("form-select");
    //     inputDescription.classList.add("form-control");

        

    //     salon.pets.push(newPet);
    
    //     petsCount();
    //     displayPetCards();
    //     displayPetTable();
    
    //     inputName.value = "";
    //     inputAge.value = "";
    //     inputGender.value = "";
    //     inputBreed.value = "";    
    //     inputService.value = "";

    //     showNotifications("Successful registion", "alert-successful");

    // }else{
    //     showNotifications("Please fill out all the required fields", "alert-error");
    // }
}

function addInfo(){
    salon.pets[salon.pets.length - 1].payment = inputPayment.value;
    salon.pets[salon.pets.length - 1].description = inputDescription.value;

    displayPetCards();
    displayPetTable();

    inputPayment.value = "";
    inputDescription.value = "";

    showNotifications("Successful adding information", "alert-successful");

    inputPayment.classList.add("hidden");
    inputDescription.classList.add("hidden");
    getE("btn-add").classList.add("hidden");
}

function deletePet(id){
    salon.pets.splice(id, 1);
    petsCount();
    displayPetCards();
    displayPetTable();
}

// pets default
function init(){
    // creating predefined obj
    let pet1 = new Pet("Scooby",60,"Male","Great Dane","Dental cleaning","Dog");
    let pet2 = new Pet("Scrappy",50,"Male","Doberman","Bath and drying","Dog");
    let pet3 = new Pet("Tweety",80,"Female","Eclectus","Nail trimming","Parrot",undefined,"A red with blue parrot");
    salon.pets.push(pet1, pet2, pet3);
    // executing fn
    displayPetTable();
    displayPetCards();
    petsCount();
}

displayFooterInfo();
window.onload=init();