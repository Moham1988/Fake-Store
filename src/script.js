const MAX_PRODUCTS = 100;
const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-input");
const categoryFilter = document.querySelector("#category");
const notFoundMessage = document.querySelector("#not-found-message");
const filterWrapper = document.querySelector('.filter-wrapper');

let timer; // Variable to store the timer for delay

// Function to show the filter wrapper
const showFilterWrapper = () => {
    clearTimeout(timer); // Clear any existing timer
    filterWrapper.style.display = "block"; // Show the filter wrapper
};

// Function to hide the filter wrapper
const hideFilterWrapper = () => {
    // Set a timer to hide the filter wrapper after 500 milliseconds (adjust as needed)
    timer = setTimeout(() => {
        filterWrapper.style.display = "none";
    }, 500);
};

// Function to toggle the filter wrapper visibility
const toggleFilterWrapper = () => {
    if (filterWrapper.style.display === "block") {
        hideFilterWrapper();
    } else {
        showFilterWrapper();
    }
};

// Event listeners for mouse events
listWrapper.addEventListener("mouseenter", showFilterWrapper);
listWrapper.addEventListener("mouseleave", hideFilterWrapper);
filterWrapper.addEventListener("mouseenter", showFilterWrapper);
filterWrapper.addEventListener("mouseleave", hideFilterWrapper);

// Event listener for click event
listWrapper.addEventListener("click", () => {
    toggleFilterWrapper();
});


let allProducts = [];

fetch(`https://fakestoreapi.com/products?limit=${MAX_PRODUCTS}`)
.then(response => {
    if (!response.ok) {
        throw new Error('Failed to reach data');
    }
    return response.json();
})
.then(data => {
   allProducts = data;
   displayProducts(allProducts);
   console.log(allProducts);
})
.catch(error => console.error('Failed to get data'));

async function fetchProductData(id) {
    try {
        const product = await fetch(`https://fakestoreapi.com/products/${id}`)
        .then(response => response.json());
        return product;
    } catch (error) {
        console.error("Failed to fetch Product Data")
    }
}

function displayProducts(products) {
    listWrapper.innerHTML = "";

    products.forEach((product) => {
        const listItem = document.createElement("div");
        listItem.className = "list-item";
        listItem.innerHTML = `
            <div class="img-wrap">
                <img src="${product.image}" alt="${product.title}" />
            </div>

            <div class="name-wrap">
                <p class="caption-fonts">${product.title}</p>
            </div>

            <div class="price-wrap">
                <p class="caption-fonts">$${product.price}</p>
            </div>
        `;

        listItem.addEventListener("click", async() => {
            const fetchedProduct = await fetchProductData(product.id);
            console.log(fetchedProduct); // Do something with the fetched product data
        });

        listWrapper.appendChild(listItem);
    });
}

searchInput.addEventListener("keyup", handleSearch);

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    let filteredProducts;

    if (categoryFilter.value !== "all") {
        filteredProducts = allProducts.filter((product) => {
            return product.category.toLowerCase() === categoryFilter.value.toLowerCase();
        });
    } else {
        filteredProducts = allProducts;
    }

    // Filter products based on search term
    filteredProducts = filteredProducts.filter((product) => {
        return product.title.toLowerCase().includes(searchTerm);
    });

    displayProducts(filteredProducts);
    
    // Show "Product not found" message only if no results are found
    if (filteredProducts.length === 0 && searchTerm !== "") {
        notFoundMessage.style.display = "block";
    } else {
        notFoundMessage.style.display = "none";
    }
}

const closeButton = document.querySelector(".search-close-icon");
closeButton.addEventListener("click", clearSearch);

function clearSearch() {
    searchInput.value = "";
    displayProducts(allProducts);
    notFoundMessage.style.display = "none";
}
