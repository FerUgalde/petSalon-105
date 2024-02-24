
function saveItems(item,key){
    let itemsArray = readItems(key); // getting LS data
    itemsArray.push(item); // add the new item to ythe array
    let val = JSON.stringify(itemsArray); //this is an string
    localStorage.setItem(key,val)
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