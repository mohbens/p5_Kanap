let panier = getCard();

function getCard() {
  let cart = localStorage.getItem("produit");
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}

panier.forEach((element) => {
  getInfosProduits(element);
});

function getInfosProduits(element) {
  let id = element.idProduit;

  let httpRequest = new XMLHttpRequest();
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
      }
    }
  }
}

function displayOneItem(item, info) {
  console.log(info);
  console.log(item);

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
    
    '</p>        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="'+item.nmbrArticle +'">      </div><div class="cart__item__content__settings__delete"><p class="deleteItem">Supprimer</p></div></div></div></article>';

  var content = document.getElementById("cart__items").innerHTML;
  content = content + oneItem;
  document.getElementById("cart__items").innerHTML = content;
}
