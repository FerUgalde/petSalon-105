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
let petID=0;
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
    this.id=petID++;
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
    //getE("notifications").classList.remove("hidden");
    $("#notifications").slideDown(1000);
    getE("notifications").innerHTML=`<p class="${type}">${msg}</p>`
    $("#notifications").slideUp(2000);
    //getE("notifications-copy").classList.remove("hidden");
    $("#notifications-copy").slideDown(1000);
    getE("notifications-copy").innerHTML=`<p class="${type}">${msg}</p>`
    $("#notifications-copy").slideUp(2000);

    // setTimeout(function(){
    //     getE("notifications").classList.add("hidden");
    //     getE("notifications-copy").classList.add("hidden");
    // },3000);
}

function register(){
    let fields = [inputName.value, inputAge.value, inputGender.value, inputBreed.value, inputService.value, inputType.value];

    if(isValid(fields)==true){

        let newPet = new Pet(inputName.value, inputAge.value, inputGender.value, inputBreed.value, inputService.value, inputType.value, inputPayment.value, inputDescription.value);
    
        salon.pets.push(newPet);

        saveItems(newPet,"petDB");
    
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
}

function addInfo(){
    indexPet = salon.pets.length-1;
    payment=salon.pets[indexPet].payment;
    description=salon.pets[indexPet].description;
    salon.pets[indexPet].payment = inputPayment.value;
    salon.pets[indexPet].description = inputDescription.value;

    updateItem(indexPet, "petDB", inputPayment.value, inputDescription.value);

    displayPetCards();
    displayPetTable();

    inputPayment.value = "";
    inputDescription.value = "";

    showNotifications("Successful adding information", "alert-successful");

    inputPayment.classList.add("hidden");
    inputDescription.classList.add("hidden");
    getE("btn-add").classList.add("hidden");
}

function deletePet(petID){
    let deleteIndex;
    for(let i=0;i<salon.pets.length;i++){
        let pet = salon.pets[i];
        if(pet.id == petID){
            deleteIndex = i;
            break;
        }
    }
    getE(petID).remove();
    deleteItem(deleteIndex, "petDB");
    salon.pets.splice(deleteIndex, 1);
    petsCount();
    displayPetTable();
}

function getServices(){
    let servicesList = readItems("servicesDB");
    for(let i = 0; i<servicesList.length; i++){
        let service = servicesList[i];
        $("#selectService").append(
            `<option value="${service.description}">${service.description}</option>`
        );
    }
}

// pets default
function init(){
    // creating predefined obj
    let pet1 = new Pet("Scooby",60,"Male","Great Dane","Dental cleaning","Dog");
    let pet2 = new Pet("Scrappy",50,"Male","Doberman","Bath and drying","Dog");
    let pet3 = new Pet("Tweety",80,"Female","Eclectus","Nail trimming","Parrot",undefined,"A red with blue parrot");
    salon.pets.push(pet1, pet2, pet3);

    saveItems(pet1,"petDB");
    saveItems(pet2,"petDB");
    saveItems(pet3,"petDB");

    // executing fn
    getServices();
    displayPetTable();
    displayPetCards();
    petsCount();
}

displayFooterInfo();
window.onload=init();