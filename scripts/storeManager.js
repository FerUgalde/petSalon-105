
function saveItems(item,key){
    let itemsArray = readItems(key); // getting LS data
    if (!itemsArray.some(existingItem => isEqual(existingItem, item))){
        itemsArray.push(item); // add the new item to ythe array
        let val = JSON.stringify(itemsArray); //this is an string
        localStorage.setItem(key,val)
    }
}

function deleteItem(item,key){
    let itemsArray = readItems(key); // getting LS data
    itemsArray.splice(item, 1); // remove the item from array
    let val = JSON.stringify(itemsArray); //this is an string
    localStorage.setItem(key, val);
}

function updateItem(item,key,value1,value2){
    let itemsArray = readItems(key);
    if(item >= 0 && item < itemsArray.length){
        let objUpdate = itemsArray[item];
        objUpdate.payment = value1;
        objUpdate.description = value2;
        let val = JSON.stringify(itemsArray);
        localStorage.setItem(key, val);
    }
}

function readItems(key){
    //getting items from LS
    let data=localStorage.getItem(key);
    if(!data){ // NOT data?
        return []; // create the array
    }else{
        //if we have data
        let list = JSON.parse(data); // parse the data back
        return list;
    }
}

// Función para comparar dos objetos y determinar si son iguales
function isEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}