getAndDisplayAllProducts();

function getProductId() {
  //retourne l'Id du produit depuis l'Url
  const idDuProduit = window.location.search; //url
  const urlSearchParams = new URLSearchParams(idDuProduit);
  console.log(urlSearchParams);
  const leId = urlSearchParams.get("id");
  return leId;
}
function getAndDisplayAllProducts() {
  //affiche le produit en sélectionnant  son id  depuis l'url
  const leId = getProductId();
  console.log(leId);

  httpRequest = new XMLHttpRequest();
  const url = "http://localhost:3000/api/products/" + leId;

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
      document.getElementsByClassName("item")[0].innerHTML =
        '<div style="font-size: xxx-large;text-transform: uppercase;font-weight: bold;">ce produit est indisponible </div>';
    }
  }
}
function displayProducts(product) {
  //affiche le produit
  console.log(product);

  document.getElementById("title").innerHTML = product.name;
  document.getElementById("price").innerHTML = product.price;
  document.getElementById("description").innerHTML = product.description;

  document.getElementsByClassName("item__img")[0].innerHTML =
    '<img src="' + product.imageUrl + '" alt="' + product.altTxt + '">';

  var colorOptions = "";

  product.colors.forEach((color) => {
    console.log(color);
    colorOptions += '<option value="' + color + '">' + color + "</option>";
  });

  document.getElementById("colors").innerHTML = colorOptions;
}

/***********bouton ajouter */

const ajouterPanier = document.querySelector("#addToCart");
console.log(ajouterPanier);

/**envoyer le panier */

ajouterPanier.addEventListener("click", (event) => {
  event.preventDefault();
  const leId = getProductId();
  const colorsoption = document.querySelector("#colors");
  const colorChoice = colorsoption.value;
  console.log(colorChoice);

  const quantityProduit = document.querySelector("#quantity");
  const quantity = quantityProduit.value;
  console.log(quantity);

  let infoProduit = {
    idProduit: leId,
    colorOption: colorChoice,
    nmbrArticle: quantity,
  };
  console.log(infoProduit);
  if (infoProduit.nmbrArticle < 1 || infoProduit.nmbrArticle > 100) {
    console.log("wrong quantity");
  } else {
    pushLocalStorage(infoProduit);
  }
});

/*******************localStorage***************/
function pushLocalStorage(infoProduit) {
  //remplit le localStorage avec le produit selectionné
  let produitlocalStorage = JSON.parse(localStorage.getItem("produit"));
  var exists = false;
  if (produitlocalStorage) {
    produitlocalStorage.forEach((element) => {
      if (
        element.idProduit === infoProduit.idProduit &&
        element.colorOption === infoProduit.colorOption
      ) {
        element.nmbrArticle =
          parseInt(infoProduit.nmbrArticle) + parseInt(element.nmbrArticle);
        console.log("ok");
        exists = true;
        // break;
      }
    });
    if (!exists) {
      produitlocalStorage.push(infoProduit);
    }
  } else {
    produitlocalStorage = [];
    produitlocalStorage.push(infoProduit);
  }

  localStorage.setItem("produit", JSON.stringify(produitlocalStorage));
  console.log(produitlocalStorage);
}
