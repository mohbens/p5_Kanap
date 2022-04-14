getAndDisplayAllProducts();

function getAndDisplayAllProducts() {
  //apporte et affiche tout les produit depuis l'API
  httpRequest = new XMLHttpRequest();
  const url = "http://localhost:3000/api/products";

  httpRequest.onreadystatechange = handleResponse;
  httpRequest.open("GET", url);
  httpRequest.send();
}

function handleResponse() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      const products = JSON.parse(httpRequest.responseText);

      displayProducts(products);
    } else {
      console.log("Il y a eu un problème avec la requête.");
    }
  }
}

function displayProducts(products) {
  //la boucle pour afficher le produits
  products.forEach((element) => {
    displayOneProduct(element);
  });
}

function displayOneProduct(product) {
  //affiche un seul produit dans le DOM
  let element =
    '<a href="./product.html?id=' +
    product._id +
    ' "> <article><img src="' +
    product.imageUrl +
    '" alt="' +
    product.altTxt +
    '"> <h3 class="productName">' +
    product.name +
    '</h3><p class="productDescription">' +
    product.description +
    "</p>  </article></a> ";

  let content = document.getElementById("items").innerHTML;
  content = content + element;
  document.getElementById("items").innerHTML = content;
}
