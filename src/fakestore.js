
fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => {
        console.log(json); // Log the products array
        return data
    })

   const allProducts = data
function displayProducts(data) {
    product = {
        Name : data.name,
        id : product.id,
        description : product.discription,
        image : product.image,
        price : product.price,
        rating : product.rating,
        title : product.tittle,

    }
    console.log(Name);
}

