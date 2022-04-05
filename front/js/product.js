getAndDisplayAllProducts();

function getProductId() {
  const idDuProduit = window.location.search; //url
  const urlSearchParams = new URLSearchParams(idDuProduit);
  console.log(urlSearchParams);
  const leId = urlSearchParams.get("id");
  return leId;
}
function getAndDisplayAllProducts() {
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
        '<div style="font-size: xxx-large;text-transform: uppercase;font-weight: bold;">ce produit est indiponible </div>';
    }
  }
}
function displayProducts(product) {
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











/*
basket.push(infoProduit);

function saveBasket(basket) {
  localStorage.setItem("produit", JSON.stringify(basket));
}
function getBasket() {
  let basket = localStorage.getItem("basket");
  if (basket == null) {
    return [];
  } else {
    return JSON.parse(basket);
  }
}

function addBasket(infoProduit) {
  let basket = getBasket();
  let foundProduct = infoProduit.find((p) => p._id == infoProduit._id);
  if (foundProduct != undefined) {
    foundProduct.quantity++;
  } else {
    infoProduit.quantity = 1;
    basket.push(infoProduit);
  }
  saveBasket(basket);
}

function removeFromBasket(infoProduit) {
  let basket = getBasket();
  basket = basket.filter((p) => p.id != infoProduit._id);
  saveBasket(basket);
}

function changeQuantity(product, quantity) {
  let basket = getBasket();
  let foundProduct = infoProduit.find((p) => p._id == infoProduit._id);
  if (foundProduct != undefined) {
    foundProduct.quantity += quantity;
    if (foundProduct.quantity <= 0) {
      removeFromBasket(foundProduct);
    }else{
      saveBasket(basket);    
    }
  }
}*/
