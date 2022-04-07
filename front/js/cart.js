displayPanier();
function getCart() {
  let cart = localStorage.getItem("produit");
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}
var total = 0;

function displayPanier() {
  document.getElementById("cart__items").innerHTML = "";
  let panier = getCart();

  panier.forEach((element) => {
    getInfosProduits(element);
  });
}

function getInfosProduits(element) {
  let id = element.idProduit;

  var httpRequest = new XMLHttpRequest();
  const url = "http://localhost:3000/api/products/" + id;

  httpRequest.onreadystatechange = handleResponse;
  httpRequest.open("GET", url);
  httpRequest.send();
  console.log("1");

  function handleResponse() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        const item = JSON.parse(httpRequest.responseText);
        console.log("2");

        let infosProduits = {
          name: item.name,
          price: item.price,
          image: item.imageUrl,
          alt: item.altTxt,
          description: item.description,
        };
        displayOneItem(element, infosProduits);
        total += getPrice(element, infosProduits);

        const supprimer = Array.from(
          document.getElementsByClassName("deleteItem")
        );
        console.log(supprimer);
        displayTotalPrice();
      }
    }
  }
}

function getPrice(item, info) {
  var prix = info.price * item.nmbrArticle;
  return prix;
}

function displayOneItem(item, info) {
  var oneItem =
    '<article class="cart__item" data-id="' +
    item.idProduit +
    '" data-color="' +
    item.colorOption +
    '">  <div class="cart__item__img">    <img src="' +
    info.image +
    '" alt="' +
    info.alt +
    '">  </div>  <div class="cart__item__content"><div class="cart__item__content__description"><h2>' +
    info.name +
    "</h2>    <p>" +
    item.colorOption +
    "</p>      <p>" +
    info.price +
    '€</p>    </div>    <div class="cart__item__content__settings">      <div class="cart__item__content__settings__quantity">     <p>Qté : ' +
    '</p>        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="' +
    item.nmbrArticle +
    '">      </div><div class="cart__item__content__settings__delete"><p class="deleteItem" onclick="removeFromcart(\'' +
    item.idProduit +
    "','" +
    item.colorOption +
    "')\">Supprimer</p></div></div></div></article>";

  var content = document.getElementById("cart__items").innerHTML;
  content = content + oneItem;
  document.getElementById("cart__items").innerHTML = content;

  // var content = document.getElementById("cart__items").innerHTML;
}

function displayTotalPrice() {
  document.getElementById("totalPrice").innerHTML = total;
}

function removeFromcart(id, couleur) {
  panier = getCart();
  console.log("ready");
  for (i = 0; i < panier.length; i++) {
    console.log(i);

    if (panier[i].idProduit === id && panier[i].colorOption === couleur) {
      panier.splice(i, 1);
      console.log("deleted");
      break;
    }
  }

  localStorage.setItem("produit", JSON.stringify(panier));
  displayPanier();
  total = 0;
}

/******************************************commander  */

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

infoTab = [ firstName, lastName, address, city, email];

infoTab.forEach((element) => {
  element.addEventListener("keyup", (e) => {
    console.log(e.target.value);
    const tab = wichRegex(element);
    const regex = tab[0];
    const errorMessage = tab[1];
    const wichOne=getError(element.name);
    console.log('wichOne');
    console.log(element.name);
    checkInput(element, regex, errorMessage ,wichOne);
  });
});

function getError(element) {
if(element === "firstName")return document.getElementById("firstNameErrorMsg");
if(element === "lastName")return document.getElementById("lastNameErrorMsg");
if(element === "address")return document.getElementById("addressErrorMsg");
if(element === "city")return document.getElementById("cityErrorMsg");
if(element === "email")return document.getElementById("emailErrorMsg");


}

function wichRegex(element) {
  const noNumbers = new RegExp("^[a-z]*$");
  const emailReg = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
  const errorEmail = "entrez un format email correct";
  const errorname = "ne mettez pas de numeros";

  if (element === email) {
    return [emailReg, errorEmail];
  } else {
    return [noNumbers, errorname];
  }
}

function checkInput(element, regex, errorMessage,wichOne) {
  console.log(element);

  if (!regex.test(element.value)) {
    wichOne.innerText = errorMessage;
  }else{
    wichOne.innerText = "";
  }
}
