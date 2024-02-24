// display registered pets count
function petsCount(){
    getE("count").innerHTML =`
    <p>The number of pets currently registered are: <span class="num-pets">${salon.pets.length}</span></p>
    `;
}

// display petCards with all info
function displayPetCards(){
    let petList = readItems("petDB");
    getE('pets').innerHTML="";
    let card="";
    for(let i=0; i<petList.length; i++){
        let pet = petList[i];
        card +=`
        <div id="${pet.id}" class="petCards">
            <div class="x-delete"><button class="x-delete" onclick="deletePet(${pet.id})">❌</button></div>
            <p><span class="inf-card">Name:</span> ${pet.name}</p>
            <p><span class="inf-card">Age:</span> ${pet.age}</p>
            <p><span class="inf-card">Gender:</span> ${pet.gender}</p>
            <p><span class="inf-card">Breed:</span> ${pet.breed}</p>
            <p><span class="inf-card">Service:</span> ${pet.service}</p>
            <p><span class="inf-card">Description:</span> ${pet.description}</p>
        </div>
        `;
    }
    getE('pets').innerHTML=card;
}

// display table of pets
function displayPetTable(order){
    getE('t_pet').innerHTML="";
    let infoT="";
    let pet="";
    let lengthPet = salon.pets.length;

    for(let i=0; i<salon.pets.length; i++){
        let j = i;
        if(order==true){
            lengthPet -= 1;
            pet = salon.pets[lengthPet];
            j=lengthPet;
        }else{
            pet = salon.pets[i];
        }
        infoT += `
        <tr>
            <td>${pet.name}</td>
            <td>${pet.age}</td>
            <td>${pet.gender}</td>
            <td>${pet.breed}</td>
            <td>${pet.service}</td>
            <td>${pet.type}</td>
            <td>${pet.payment}</td>
            <td><button class="x-delete" onclick="deletePet(${pet.id})">❌</button></td>
        </tr>
        `;
    }
    getE('t_pet').innerHTML=infoT;
}

// invert information
let invert = false;
function invertPets(){
    invert = !invert;
    displayPetTable(invert);
}

// display the information about the pet salon
function displayFooterInfo(){
    getE("info").innerHTML=`
    <p>🐩Welcome to ${salon.name}🐈</p><p>📍We are located in ${salon.address.street}, ${salon.address.number}, ${salon.address.zip}</p><p>You can call us 📞${salon.phone}</p>
    `;
}
