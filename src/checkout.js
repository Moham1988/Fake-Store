let place_order = document.getElementById("place_order");
let name = document.getElementById("name");
let city = document.getElementById("city");
let num = document.getElementById("num");
let email = document.getElementById("email");
let address = document.getElementById("address");


function placeOrder(){
    if(name.value && city.value && num.value && email.value && address.value){

        alert("Place Order Successfully");
        window.location.href="shopping-cart.html"
    }else{
        alert("Please Fill out this all fields !");
    }


}

place_order.addEventListener("click",placeOrder );