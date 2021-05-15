/// Constant used to recover and parse cart in session storage ///
const cart = sessionStorage.getItem("cart");
const productsInCart = JSON.parse(cart);

/// Function used to display each product in cart ///
(function () {
	for (productAdded of productsInCart) {
		displayProductsAdded();
	}
})();

function displayProductsAdded() {
	const productNameColumn = document.getElementById("product__name__column");
	const productAmountColumn = document.getElementById("amount__column");
	const productPriceColumn = document.getElementById("price__column");
	const productTotalPriceColumn = document.getElementById(
		"total__product__price__column"
	);
	const amountCaseForInput = document.getElementById("case");
	const productPrice = (productAdded.price / 1000).toFixed(2) + " €";
	const productPriceTotal =
		((productAdded.price * productAdded.amount) / 1000).toFixed(2) + " €";

	let productName = document.createElement("div");
	productName.textContent = productAdded.name;
	productName.setAttribute("class", "case");
	let amountOfProduct = document.createElement("div");
	amountOfProduct.textContent = productAdded.amount;
	amountOfProduct.setAttribute("id", "case");
	let price = document.createElement("div");
	price.textContent = productPrice;
	price.setAttribute("class", "case");
	let totalProductPrice = document.createElement("div");
	totalProductPrice.textContent = productPriceTotal;
	totalProductPrice.setAttribute("class", "case");
	productNameColumn.appendChild(productName);
	productAmountColumn.appendChild(amountOfProduct);
	productPriceColumn.appendChild(price);
	productTotalPriceColumn.appendChild(totalProductPrice);
}
