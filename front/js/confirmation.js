getAndDisplayOrderId();

function getOrderId() {
  const orderId= window.location.search; //url
  const urlSearchParams = new URLSearchParams(orderId);
  console.log(urlSearchParams);
  const order = urlSearchParams.get("orderId");
  console.log(order);
  return order;
}
function getAndDisplayOrderId(){
const orderId = getOrderId();
document.getElementById("orderId").innerHTML = orderId;

}