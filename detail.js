// main.js

document.addEventListener('DOMContentLoaded', function() {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            products.forEach(product => {
                const productLink = document.createElement('a');
                productLink.classList.add('product');
                productLink.href = 'javascript:getproductdetail('+product.id+')';//`http://details2.html?id=${product.id}`;
                productLink.id = `${product.id}`
                //productLink.onclick='getProductDetails(10)'
                productLink.textContent = product.title;
                productList.appendChild(productLink);
                
            });
        });
});
function getproductdetail(productId)
{
    fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(response => response.json())
    .then(product => {
        const productDetail = document.getElementById(productId);
        productDetail.innerHTML = `
            <h1>${product.title}</h1>
            <img src="${product.image}" alt="${product.title}" width="200">
            <p>${product.description}</p>
            <p><strong>Price: $${product.price}</strong></p>
            <a href="javascript:closeView()">Close Product Details</a>
        `;
        

    });
}

function closeView()
{
    //alert(1)
    window.location.reload()
}