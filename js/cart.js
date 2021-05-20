/// Function use to detect changes in screen size ///
/// Which allows to manage the media queries of the underlying functions ///
var timer;
window.addEventListener("resize", function () {
	clearTimeout(timer);
	timer = setTimeout(function () {
		window.location.reload();
	}, 500);
});

/// Constant used to recover and parse cart in session storage ///
const cart = sessionStorage.getItem("cart");
var productsInCart = JSON.parse(cart);

/// function use to call all other functions of cart ///
(function main() {
	{
		displayProductsAdded();
		calculateTotalProductPrice();
		displayAmountBox();
		calculCartPrice();
		displayInputs();
		displayButtons();
		addAndRemoveButtonsEvent();
		eraseButtonBox();
		displayEraseButtons();
		eraseButtonEvent();
		showEmptyCartMessage();
	}
})();
/// Function used to display each product in cart ///

function displayProductsAdded() {
	for (let i = 0; i < productsInCart.length; i++) {
		const productNameColumn = document.getElementById("productNameColumn");
		const productPriceColumn = document.getElementById("priceColumn");
		const productTotalPriceColumn = document.getElementById(
			"totalProductPriceColumn"
		);
		const productPrice = (productsInCart[i].price / 1000).toFixed(2) + " €";

		let productName = document.createElement("div");
		productName.textContent = productsInCart[i].name;
		productName.setAttribute("class", "cart__case");
		let price = document.createElement("div");
		price.textContent = productPrice;
		price.setAttribute("class", "cart__case");
		let totalProductPrice = document.createElement("div");
		totalProductPrice.setAttribute("class", "cart__case");
		totalProductPrice.setAttribute("id", "productPrice-" + i);

		productNameColumn.appendChild(productName);
		productPriceColumn.appendChild(price);
		productTotalPriceColumn.appendChild(totalProductPrice);
	}
}

function calculateTotalProductPrice() {
	for (let i = 0; i < productsInCart.length; i++) {
		const productPriceTotal =
			((productsInCart[i].price * productsInCart[i].amount) / 1000).toFixed(2) +
			" €";
		document.getElementById("productPrice-" + i).textContent =
			productPriceTotal;
	}
}

/// Function used to calculate total price of cart ///
function calculCartPrice(cartPrice) {
	var cartPrice = [];

	for (let i = 0; i < productsInCart.length; i++) {
		var totalProductPrice = productsInCart[i].price * productsInCart[i].amount;
		cartPrice.push(totalProductPrice);
	}

	const reducer = (accumulator, currentValue) => accumulator + currentValue;

	document.getElementById("totalCartPrice").textContent =
		(cartPrice.reduce(reducer, 0) / 1000).toFixed(2) + " €";
}

/// Function used to create divs with a unique id to manage inputs and buttons ///
function displayAmountBox() {
	for (let i = 0; i < productsInCart.length; i++) {
		const productAmountColumn = document.getElementById("amountColumn");

		let amountOfProduct = document.createElement("div");
		amountOfProduct.setAttribute("id", "box-" + i);
		amountOfProduct.setAttribute("class", "cart__case ");

		productAmountColumn.appendChild(amountOfProduct);
	}
}

function displayInputs() {
	for (let i = 0; i < productsInCart.length; i++) {
		const productAmountBox = document.getElementById("box-" + i);

		let amountInput = document.createElement("input");
		amountInput.setAttribute("value", productsInCart[i].amount);
		amountInput.setAttribute("id", "input-" + i);
		amountInput.setAttribute("class", "cart__input");
		amountInput.setAttribute("type", "number");
		if (window.matchMedia("(max-width: 576px)").matches) {
			amountInput.setAttribute("class", "cart__input");
		}

		productAmountBox.appendChild(amountInput);
	}
}

function displayButtons() {
	for (let i = 0; i < productsInCart.length; i++) {
		const productAmountBox = document.getElementById("box-" + i);

		let moreAmountButtons = document.createElement("button");
		moreAmountButtons.setAttribute("class", "cart__moreAmountButton");
		moreAmountButtons.setAttribute("id", "addButton-" + i);
		let lessAmountButtons = document.createElement("button");
		lessAmountButtons.setAttribute("class", "cart__lessAmountButton");
		lessAmountButtons.setAttribute("id", "removeButton-" + i);
		productAmountBox.appendChild(moreAmountButtons);
		productAmountBox.prepend(lessAmountButtons);
		document.getElementById("input-" + i).addEventListener("", function () {
			productsInCart[i].amount = document.getElementById("input-" + i).value;
			sessionStorage.setItem("cart", JSON.stringify(productsInCart));
		});
		if (window.matchMedia("(max-width: 576px)").matches) {
			moreAmountButtons.setAttribute("class", "d-none");
			lessAmountButtons.setAttribute("class", "d-none");
		}
	}
}
function addAndRemoveButtonsEvent() {
	for (let i = 0; i < productsInCart.length; i++) {
		document
			.getElementById("addButton-" + i)
			.addEventListener("click", function () {
				productsInCart[i].amount++;
				sessionStorage.setItem("cart", JSON.stringify(productsInCart));
				calculateTotalProductPrice();
				calculCartPrice();
				document.getElementById("input-" + i).value = productsInCart[i].amount;
			});
		document
			.getElementById("removeButton-" + i)
			.addEventListener("click", function () {
				if (productsInCart[i].amount > 1) {
					productsInCart[i].amount--;

					sessionStorage.setItem("cart", JSON.stringify(productsInCart));
					calculateTotalProductPrice();
					calculCartPrice();
					document.getElementById("input-" + i).value =
						productsInCart[i].amount;
				}
			});
		document
			.getElementById("input-" + i)
			.addEventListener("change", function () {
				/// ! important, without this condition the number of products can be negative ! ///
				if (document.getElementById("input-" + i).value < 1) {
					document.getElementById("input-" + i).value = 1;
				}
				productsInCart[i].amount = document.getElementById("input-" + i).value;
				sessionStorage.setItem("cart", JSON.stringify(productsInCart));
				calculateTotalProductPrice();
				calculCartPrice();
			});
	}
}

function eraseButtonBox() {
	for (let i = 0; i < productsInCart.length; i++) {
		const eraseButtonsBox = document.getElementById("eraseButtons");

		let eraseButtons = document.createElement("div");
		eraseButtons.setAttribute("class", "cart__erasecase");
		eraseButtons.setAttribute("id", "eraseButtonBox-" + i);
		eraseButtonsBox.appendChild(eraseButtons);
	}
}

function displayEraseButtons() {
	for (let i = 0; i < productsInCart.length; i++) {
		const eraseButtonBox = document.getElementById("eraseButtonBox-" + i);

		let eraseButtons = document.createElement("button");
		eraseButtons.setAttribute("class", "cart__erasebutton");
		eraseButtons.setAttribute("id", "eraseButton-" + i);
		eraseButtonBox.appendChild(eraseButtons);
	}
}

function eraseButtonEvent() {
	for (let i = 0; i < productsInCart.length; i++) {
		const eraseButton = document.getElementById("eraseButton-" + i);
		eraseButton.addEventListener("click", function () {
			productsInCart.splice(i, 1);
			sessionStorage.setItem("cart", JSON.stringify(productsInCart));

			window.location.reload();
		});
	}
}

function showEmptyCartMessage() {
	const cartPrice = document.getElementById("totalCartPrice");
	if (cartPrice.textContent === "0.00 €") {
		document.getElementById("cart").setAttribute("class", "d-none");
		document.getElementById("emptyCart").setAttribute("class", "d-block");
	}
}
