displayPanier();

function getCart() {
  let cart = localStorage.getItem("produit");
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}

var prices = {};

function displayPanier() {
  total = 0;
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

  function handleResponse() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        const item = JSON.parse(httpRequest.responseText);

        infosProduits = {
          name: item.name,
          price: item.price,
          image: item.imageUrl,
          alt: item.altTxt,
          description: item.description,
        };

        displayOneItem(element, infosProduits);
        prices[id] = item.price;

        displayTotalPrice();
      }
    }
  }
}

/******************   quantity listner**************** */

function quantityChanged() {
  document
    .querySelector('input[name="itemQuantity"]')
    .addEventListener("change", () => {
      let quantityInput = document.querySelector('input[name="itemQuantity"]');
      let produitlocalStorage = JSON.parse(localStorage.getItem("produit"));
      produitlocalStorage.forEach((element) => {
        // if (
        //   element.idProduit === infoProduit.idProduit &&
        //   element.colorOption === infoProduit.colorOption
        // ) {
        //   localStorage.setItem("produit", JSON.stringify(produitlocalStorage));
        //   element.nmbrArticle =
        //     parseInt(infoProduit.nmbrArticle) + parseInt(element.nmbrArticle);
        // }

        console.log(quantityInput.value);
      });
    });
}

/************************************************* */

function displayTotalPrice() {
  var total = 0;
  var panier = getCart();
  panier.forEach((element) => {
    if (prices[element.idProduit]) {
      total = total + element.nmbrArticle * prices[element.idProduit];
    }
  });

  document.getElementById("totalPrice").innerHTML = total;
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
    '">  </div>  <div class="cart__item__content"><div class="cart__item__conte/nt__description"><h2>' +
    info.name +
    "</h2>    <p>" +
    item.colorOption +
    "</p>      <p>" +
    info.price +
    '€</p>    </div>    <div class="cart__item__content__settings">      <div class="cart__item__content__settings__quantity">     <p>Qté : ' +
    '</p>        <input type="number" class="itemQuantity" name="itemQuantity" onchange="changeQuantity(\'' +
    item.idProduit +
    "'," +
    "this" +
    ",'" +
    item.colorOption +
    '\')" min="1" max="100" value="' +
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
function changeQuantity(id, element, couleur) {
  console.log(element.value);
  console.log(id);
  console.log(couleur);

  let panier = getCart();

  for (i = 0; i < panier.length; i++) {
    if (panier[i].idProduit === id && panier[i].colorOption === couleur) {
      panier[i].nmbrArticle = element.value;

      break;
    }
  }

  localStorage.setItem("produit", JSON.stringify(panier));
  displayTotalPrice();
}

function removeFromcart(id, couleur) {
  let panier = getCart();

  for (i = 0; i < panier.length; i++) {
    if (panier[i].idProduit === id && panier[i].colorOption === couleur) {
      panier.splice(i, 1);

      break;
    }
  }

  localStorage.setItem("produit", JSON.stringify(panier));
  displayPanier();
}

/******************************************commander  */
// validateur = [
//   {
//     idElement :"firstName",
//     idErrorElement :"firstNameErrorMsg",
//     regex :"^[a-z]*$",
//     messageError :"ne mettez pas de numeros",

//   }, {
//     idElement :"lastName",
//     idErrorElement :"lastNameErrorMsg",
//     regex :"^[a-z]*$",
//     messageError :"ne mettez pas de numeros",

//   }

// ]

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

infoTab = [firstName, lastName, address, city, email];

infoTab.forEach((element) => {
  element.addEventListener("keyup", (e) => {
    const tab = wichRegex(element);
    const regex = tab[0];
    const errorMessage = tab[1];
    const wichOne = getError(element.name);
    console.log("wichOne");

    checkInput(element, regex, errorMessage, wichOne);
  });
});

function getError(element) {
  return document.getElementById(element + "ErrorMsg");
}

function wichRegex(element) {
  const noNumbers = new RegExp("^[a-zA-Z ]*$");
  const emailReg = new RegExp(
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  );
  const errorEmail = "entrez un format email correct";
  const errorname = "ne mettez pas de numeros";

  if (element === email) {
    return [emailReg, errorEmail];
  } else {
    return [noNumbers, errorname];
  }
}

function checkInput(element, regex, errorMessage, wichOne) {
  if (!regex.test(element.value)) {
    wichOne.innerText = errorMessage;
  } else {
    wichOne.innerText = "";
  }
}

/*********bouton commander */

document.getElementById("order").addEventListener("click", (event) => {
  event.preventDefault();
  let ValidInfo = true;

  // infoTab.forEach((element) => {
  //   if (ValidInfo === true) {
  //     if (!regex.test(element.value)) {
  //       ValidInfo = false;
  //     }
  //   }
  // });

  if (ValidInfo === true) {
    infoClient = order();
  }
});

async function order() {
  const infoClient = {
    contact: {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    },
    products: getFormatedCart(),
  };

  const response = await fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(infoClient),
  }).then(function (res) {
    console.log(res);

    if (res.ok) {
      return res;
    }
  });

  console.log(response);
  const content = await response.json();
  console.log(content);
  window.location.href =
    "file:///C:/Users/Track.B/Desktop/P5-Dev-Web-Kanap-master/front/html/confirmation.html?orderId=" +
    content.orderId;
}

function getFormatedCart() {
  a = getCart();
  // let formated = {};
  let formated = [];

  a.forEach((element) => {
    let c = element.idProduit;
    // formated [c]={colorOption: element.colorOption,
    //   nmbrArticle: element.nmbrArticle}
    // console.log(c);
    // let b = {
    //   [c]: {
    //     colorOption: element.colorOption,
    //     nmbrArticle: element.nmbrArticle,
    //   },
    // };

    formated.push(c);
  });
  console.log(formated);
  return formated;
}
