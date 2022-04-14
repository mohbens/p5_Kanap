getAndDisplayOrderId();

function getOrderId() {
  //fais un GET de orderId  depuis la base de données apres avoir envoyer les informations de l'utilisateurs
  const orderId = window.location.search; //url
  const urlSearchParams = new URLSearchParams(orderId);
  console.log(urlSearchParams);
  const order = urlSearchParams.get("orderId");
  console.log(order);
  return order;
}
function getAndDisplayOrderId() {
  const orderId = getOrderId();
  document.getElementById("orderId").innerHTML = orderId;
}
