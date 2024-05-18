// product.js

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(response => response.json())
            .then(product => {
                const productDetail = document.getElementById('product-detail');
                productDetail.innerHTML = `
                    <h1>${product.title}</h1>
                    <img src="${product.image}" alt="${product.title}" width="200">
                    <p>${product.description}</p>
                    <p><strong>Price: $${product.price}</strong></p>
                    <a href="index.html">Back to product list</a>
                `;
            });
    } else {
        document.getElementById('product-detail').innerHTML = 'Product ID not found';
    }
});
