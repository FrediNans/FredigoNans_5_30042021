/// Constant used to recover and parse cart in session storage ///
const cart = sessionStorage.getItem("cart");
var productsInCart = JSON.parse(cart);

/// Function used to display each product in cart ///
(function () {
	{
		displayProductsAdded();
		displayAmountBox();
		displayInputAndButton();
	}
})();

function displayProductsAdded() {
	for (productAdded of productsInCart) {
		const productNameColumn = document.getElementById("product__name__column");
		const productPriceColumn = document.getElementById("price__column");
		const productTotalPriceColumn = document.getElementById(
			"total__product__price__column"
		);

		const productPrice = (productAdded.price / 1000).toFixed(2) + " €";
		const productPriceTotal =
			((productAdded.price * productAdded.amount) / 1000).toFixed(2) + " €";

		let productName = document.createElement("div");
		productName.textContent = productAdded.name;
		productName.setAttribute("class", "box");
		let price = document.createElement("div");
		price.textContent = productPrice;
		price.setAttribute("class", "box");
		let totalProductPrice = document.createElement("div");
		totalProductPrice.textContent = productPriceTotal;
		totalProductPrice.setAttribute("class", "box");

		productNameColumn.appendChild(productName);
		productPriceColumn.appendChild(price);
		productTotalPriceColumn.appendChild(totalProductPrice);
	}
}

function displayAmountBox() {
	for (let i = 0; i < productsInCart.length; i++) {
		const productAmountColumn = document.getElementById("amount__column");
		let amountOfProduct = document.createElement("div");
		amountOfProduct.setAttribute("id", "box-" + i);
		productAmountColumn.appendChild(amountOfProduct);
	}
}
console.log(productsInCart.length);

function displayInputAndButton() {
	for (let i = 0; i < productsInCart.length; i++) {
		const productAmountBox = document.getElementById("box-" + i);
		let amountInput = document.createElement("input");
		amountInput.setAttribute("value", productsInCart[i].amount);
		amountInput.setAttribute("id", "input" + i);
		amountInput.setAttribute(
			"class",
			"box col-6 col-md-3 col-lg-2 mx-auto border-0 text-center bg-light"
		);

		productAmountBox.appendChild(amountInput);
	}
}
console.log(productsInCart.length);
