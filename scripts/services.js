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
        saveItems(newService); //from the LS
        displayItems(); //display the services on the HTML
        inputService.val("");
        inputPrice.val("");
        showNotifications("Successful adding", "alert-successful");
    }else{
        showNotifications("Please fill out all the required fields", "alert-error");
    }
}

function displayItems(){
    let items=readItems(); //getting the items from the LS
    let htmlList=$("#services");
    htmlList.html("");
    let li;
    for(let i=0; i<items.length; i++){
        let item=items[i];
        li=`<li>${item.description} - ${item.price}</li>`;
        htmlList.append(li);
    }
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