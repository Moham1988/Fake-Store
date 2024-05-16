

let renderData = document.querySelector(".renderData");
let renderCartData = document.querySelector(".renderCartData");
let dynamic_count = document.querySelector(".dynamic-count");
let tContainer = document.querySelector(".tContainer");
let line = document.querySelector(".line");
let total_price = document.getElementById("total_price");
let emptyCart = document.querySelector(".emptyCart");
let cItems = document.querySelector(".cItems");
let emptyC= false;
let arrr = [];
let calculateTotal = [];

//Get Data from API

async function getData(){
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    // console.log(data);

    data.map((ele)=>{
     let productMainDiv= document.createElement("div");
     let createImgEle = document.createElement("img");
     let createTitle = document.createElement("p");
     let createPriceEle = document.createElement("p");
     let btnEle = document.createElement("button");
     let btnText = document.createTextNode("Add to Cart");
     let createPriceText = document.createTextNode(`Price : $${ele.price}`);
     let createTextTitle = document.createTextNode(`${ele.title.slice(0,35)}...`);
     createImgEle.setAttribute("src", ele.image);
     createImgEle.setAttribute("class", "myImages");
     productMainDiv.setAttribute("class", "box-main")
     createTitle.appendChild(createTextTitle);
     createPriceEle.setAttribute("class", "price-element")
     btnEle.setAttribute("class","btn-element")
     createPriceEle.appendChild(createPriceText);
     createTitle.setAttribute("class", "productTitle")
     btnEle.appendChild(btnText);
     productMainDiv.appendChild(createImgEle);
     productMainDiv.appendChild(createTitle);
     productMainDiv.appendChild(createPriceEle);
     productMainDiv.appendChild(btnEle);
     renderData.appendChild(productMainDiv);
   

     function addToCart(img , price){
        arrr.push({ii : img , pp : price});
        
        alert("Product Added to Cart")
        dynamic_count.innerHTML++;
        emptyC = true;
        if (emptyC){
            cItems.style.display="flex";
            emptyCart.style.display="none";

        }
        let cartMDiv=document.createElement("div");
        let cartImgEle = document.createElement("img");
        let cartTrashBtn = document.createElement("i");
        cartTrashBtn.setAttribute("class", "fa-solid fa-trash")
        tContainer.style.display= "flex";
        line.style.display= "block";

        function deleteItm (){
            cartMDiv.remove();
            dynamic_count.innerHTML--;
        }
        cartTrashBtn.addEventListener("click", deleteItm)
        cartImgEle.setAttribute("src" , img)
        cartImgEle.setAttribute("class" , "cartImgElement")
        cartMDiv.setAttribute("class", "cart-styling")

        let cartPriceEle = document.createElement("p");
        let cartPriceText = document.createTextNode(`$${price}`);
        cartPriceEle.setAttribute("class", "cart-pprice")
        cartPriceEle.appendChild(cartPriceText);

        
        cartMDiv.appendChild(cartImgEle);
        cartMDiv.appendChild(cartPriceEle);
        cartMDiv.appendChild(cartTrashBtn);
        renderCartData.appendChild(cartMDiv);
        calculateTotal.push(price);
        let myTotal= calculateTotal.reduce((accum , curVal )=>{

            return accum + curVal
         })
         total_price.innerHTML=`Total Price : $${myTotal}`


     }

     btnEle.addEventListener("click",()=>addToCart(ele.image, ele.price))

    })


}
getData();





// const MAX_PRODUCTS = 30;
// const listWrapper = document.querySelector(".list-wrapper");
// const searchInput = document.querySelector("#search-input");
// const categoryFilter = document.querySelector("#category");
// const notFoundMessage = document.querySelector("#not-found-message");
// const filterWrapper = document.querySelector('.filter-wrapper');

// let timer; // Variable to store the timer for delay

// // Function to show the filter wrapper
// const showFilterWrapper = () => {
//     clearTimeout(timer); // Clear any existing timer
//     filterWrapper.style.display = "block"; // Show the filter wrapper
// };

// // Function to hide the filter wrapper
// const hideFilterWrapper = () => {
//     // Set a timer to hide the filter wrapper after 500 milliseconds (adjust as needed)
//     timer = setTimeout(() => {
//         filterWrapper.style.display = "none";
//     }, 500);
// };

// // Function to toggle the filter wrapper visibility
// const toggleFilterWrapper = () => {
//     if (filterWrapper.style.display === "block") {
//         hideFilterWrapper();
//     } else {
//         showFilterWrapper();
//     }
// };

// // Event listeners for mouse events
// listWrapper.addEventListener("mouseenter", showFilterWrapper);
// listWrapper.addEventListener("mouseleave", hideFilterWrapper);
// filterWrapper.addEventListener("mouseenter", showFilterWrapper);
// filterWrapper.addEventListener("mouseleave", hideFilterWrapper);

// // Event listener for click event
// listWrapper.addEventListener("click", () => {
//     toggleFilterWrapper();
// });


// let allProducts = [];

// fetch(`https://fakestoreapi.com/products?limit=${MAX_PRODUCTS}`)
// .then(response => {
//     if (!response.ok) {
//         throw new Error('Failed to reach data');
//     }
//     return response.json();
// })
// .then(data => {
//    allProducts = data;
//    displayProducts(allProducts);
//    console.log(allProducts);
// })
// .catch(error => console.error('Failed to get data'));

// async function fetchProductData(id) {
//     try {
//         const product = await fetch(`https://fakestoreapi.com/products/${id}`)
//         .then(response => response.json());
//         return product;
//     } catch (error) {
//         console.error("Failed to fetch Product Data")
//     }
// }

// function displayProducts(products) {
//     listWrapper.innerHTML = "";

//     products.forEach((product) => {
   
//         const listItem = document.createElement("div");
//         listItem.className = "list-item";
//         listItem.innerHTML = `
//             <div class="img-wrap">
//                 <img src="${product.image}" alt="${product.title}" />
//             </div>

//             <div class="name-wrap">
//                 <p class="caption-fonts"> ${product.title}</p>
//             </div>

//             <div class="price-wrap">
//                 <p class="caption-fonts">$${product.price}</p>
//             </div>
//             <div class="category-wrap">
//             <p class="caption-fonts">${product.category}</p>
//             </div>
//             <div id = "btn1">
//                 <button id="main-btn">Add to cart</button>
//             </div>
//         `;
       
//         listItem.addEventListener("click", async() => {
//             const fetchedProduct = await fetchProductData(product.id);
//             console.log(fetchedProduct); // Do something with the fetched product data
//         });

//         listWrapper.appendChild(listItem);
//     });
// }

// searchInput.addEventListener("keyup", handleSearch);

// function handleSearch() {
//     const searchTerm = searchInput.value.toLowerCase();
//     let filteredProducts;

//     if (categoryFilter.value !== "all") {
//         filteredProducts = allProducts.filter((product) => {
//             return product.category.toLowerCase() === categoryFilter.value.toLowerCase();
//         });
//     } else {
//         filteredProducts = allProducts;
//     }

//     // Filter products based on search term
//     filteredProducts = filteredProducts.filter((product) => {
//         return product.title.toLowerCase().includes(searchTerm);
//     });

//     displayProducts(filteredProducts);
    
//     // Show "Product not found" message only if no results are found
//     if (filteredProducts.length === 0 && searchTerm !== "") {
//         notFoundMessage.style.display = "block";
//     } else {
//         notFoundMessage.style.display = "none";
//     }
// }

// const closeButton = document.querySelector(".search-close-icon");
// closeButton.addEventListener("click", clearSearch);

// function clearSearch() {
//     searchInput.value = "";
//     displayProducts(allProducts);
//     notFoundMessage.style.display = "none";
// }




// const cards = document.getElementById('main-btn');
// const cart = document.getElementById('cart');
// const totalElement = document.getElementById('total'); 
// const selectedItems = {};

// function handleCardClick(event) {
//     const card = event.currentTarget;
//     const itemId = card.id;
//     const itemName = card.querySelector('h2').textContent;
//     const itemPrice = parseFloat(card.querySelector('.price').textContent); 

//     if (selectedItems[itemId]) {
//         selectedItems[itemId].count++;
//     } else {
//         selectedItems[itemId] = {
//             name: itemName,
//             price: itemPrice,
//             count: 1,
//         };
//     }

//     updateCart();
// }

// function updateCart() {
//     cart.innerHTML = '';
//     let total = 0; 

//     for (const itemId in selectedItems) {
//         const item = selectedItems[itemId];
//         const listItem = document.createElement('li');
//         const quantityContainer = document.createElement('div'); 
//         const quantityText = document.createElement('span'); 
//         const addButton = document.createElement('button');
//         const subtractButton = document.createElement('button');

//         addButton.textContent = ' + ';
//         subtractButton.textContent = ' - ';

//         quantityText.textContent = item.count; 

//         addButton.addEventListener('click', () => {
//             addItem(itemId);
//         });

//         subtractButton.addEventListener('click', () => {
//             removeItem(itemId);
//         });

//         const hr = document.createElement('hr');

//         quantityContainer.appendChild(subtractButton); 
//         quantityContainer.appendChild(quantityText); 
//         quantityContainer.appendChild(addButton); 
//         quantityContainer.appendChild(hr); 

//         listItem.textContent = ` ${item.name} -  $${item.price * item.count} `;
//         listItem.appendChild(quantityContainer); 
//         cart.appendChild(listItem);

//         total += item.price * item.count; 
//     }

//     totalElement.textContent = `Total Amount: $${total.toFixed(2)}`; 
// }

// function addItem(itemId) {
//     if (selectedItems[itemId]) {
//         selectedItems[itemId].count++;
//     }
//     updateCart();
// }

// function removeItem(itemId) {
//     if (selectedItems[itemId]) {
//         selectedItems[itemId].count--;
//         if (selectedItems[itemId].count <= 0) {
//             delete selectedItems[itemId];
//         }
//     }
//     updateCart();
// }

// cards.forEach((card) => {
//     card.addEventListener('click', handleCardClick);
// });
