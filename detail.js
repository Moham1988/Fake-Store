// main.js

document.addEventListener('DOMContentLoaded', function() {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            products.forEach(product => {
                const productLink = document.createElement('a');
                productLink.classList.add('product');
                productLink.href = `product.html?id=${product.id}`;
                productLink.textContent = product.title;
                productList.appendChild(productLink);
            });
        });
});
