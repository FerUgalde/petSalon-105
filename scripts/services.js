var services = [];

//similar to window.onload
$(document).ready(function() {
    console.log("Services page");

    //add the hook events
    $("#btnService").click(addService);

    //loading data
    displayItems(services);
});

function Service(description,price){
    this.description = description;
    this.price = price;
}

function addService(){
    let inputService = $("#txtService");
    let inputPrice = $("#txtPrice");
    let newService = new Service(inputService.val(), inputPrice.val());
    let listService = [inputService.val(), inputPrice.val()];
    if(validService(listService)){
        services.push(newService);
        saveItems(newService, "servicesDB"); //from the LS
        displayItems(); //display the services on the HTML
        inputService.val("");
        inputPrice.val("");
        showNotifications("Successful adding", "alert-successful");
    }else{
        showNotifications("Please fill out all the required fields", "alert-error");
    }
}

function displayItems(){
    let items=readItems("servicesDB"); //getting the items from the LS
    let htmlList=$("#services");
    htmlList.html("");
    let li;
    for(let i=0; i<items.length; i++){
        let item=items[i];
        li=`<li class="list-group-item d-flex justify-content-between flex-row"><span>Service: ${item.description}  </span>  <span> Price: ${item.price}</span> <button class="btn btn-danger" onclick="deleteService(${i})">Delete Service</button></li>`;
        htmlList.append(li);
    }
    calulateIncome();
}

function deleteService(index){
    deleteItem(index, 'servicesDB');
    services.splice(index, 1);
    displayItems();
}

function validService(aService){
    let validation=true;
    $("input").each(function() {
        $(this).removeClass("alert-error");
    });
    if(aService.some(value => value == "")){
        validation=false;
        $("input").each(function() {
            if($(this).val() == ""){
                $(this).addClass("alert-error");
            };
        });
    }
    return validation;
}

function showNotifications(msg, type){
    $("#notifications").removeClass("hidden");
    $("#notifications").html(`<p class="${type}">${msg}</p>`);

    setTimeout(function(){
        $("#notifications").addClass("hidden");
    },3000);
}

function calulateIncome(){
    let items=readItems("servicesDB"); 
    let htmlList=$("#calcIncome");
    htmlList.html("");
    let incoming=0;

    for(let i=0; i<items.length; i++){
        let item=parseFloat(items[i].price);;
        incoming = incoming+item;
    }
    htmlList.html(`$${incoming.toFixed(2)}`);
}