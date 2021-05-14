const product = sessionStorage.getItem("cart");
const products = JSON.parse(product);

(function () {
	for (productAdded of products) {
		displayProductAdded();
	}
})();

function displayProductAdded() {
	const cartTableCol1 = document.getElementById("cart__table__col-1");
	const cartTableCol2 = document.getElementById("cart__table__col-2");
	const cartTableCol3 = document.getElementById("cart__table__col-3");
	const cartTableCol4 = document.getElementById("cart__table__col-4");
	const productPrice = (productAdded.price / 1000).toFixed(2) + " €";
	const productPriceTotal =
		((productAdded.price * productAdded.amount) / 1000).toFixed(2) + " €";

	let productName = document.createElement("td");
	productName.textContent = productAdded.name;
	let amount = document.createElement("td");
	amount.textContent = productAdded.amount;
	let price = document.createElement("td");
	price.textContent = productPrice;
	let totalPrice = document.createElement("td");
	totalPrice.textContent = productPriceTotal;

	cartTableCol1.appendChild(productName);
	cartTableCol2.appendChild(amount);
	cartTableCol3.appendChild(price);
	cartTableCol4.appendChild(totalPrice);
}
