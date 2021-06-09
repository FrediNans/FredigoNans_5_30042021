/**
 * Get the response and the total price of the basket in the sessionstorage
 * Display html content with the recovered data
 * Clears the sessionstorage when you quit the page
 * @event unload
 */
const response = JSON.parse(sessionStorage.getItem("response"));
const cartPrice = JSON.parse(sessionStorage.getItem("cartPrice"));
const orderElt = document.getElementById("orderId");
const billElt = document.getElementById("bill");

orderElt.textContent = "Votre numero de commande est le : " + response.orderId;
billElt.textContent =
	"D'ici quelques minutes vous recevrez une confirmation de commande ainsi que votre facture d'un montant de : " +
	(cartPrice / 1000).toFixed(2) +
	" €";

window.addEventListener("unload", () => {
	sessionStorage.clear();
});
