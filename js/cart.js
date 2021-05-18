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
		displayAmountBox();
		calculCartPrice();
		displayInputs();
		displayButtons();
		moreAndRemoveButtonsEvent();
		mobileInputEvent();
	}
})();

/// Function used to display each product in cart ///
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
		productName.setAttribute("class", "box fs-5");
		let price = document.createElement("div");
		price.textContent = productPrice;
		price.setAttribute("class", "box fs-5");
		let totalProductPrice = document.createElement("div");
		totalProductPrice.textContent = productPriceTotal;
		totalProductPrice.setAttribute("class", "box fs-5");

		productNameColumn.appendChild(productName);
		productPriceColumn.appendChild(price);
		productTotalPriceColumn.appendChild(totalProductPrice);
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
	console.log(cartPrice);
}

/// Function used to create divs with a unique id to manage inputs and buttons ///
function displayAmountBox() {
	for (let i = 0; i < productsInCart.length; i++) {
		const productAmountColumn = document.getElementById("amount__column");

		let amountOfProduct = document.createElement("div");
		amountOfProduct.setAttribute("id", "box-" + i);
		amountOfProduct.setAttribute("class", "box d-flex ");

		productAmountColumn.appendChild(amountOfProduct);
	}
}

function displayInputs() {
	for (let i = 0; i < productsInCart.length; i++) {
		const productAmountBox = document.getElementById("box-" + i);

		let amountInput = document.createElement("input");
		amountInput.setAttribute("value", productsInCart[i].amount);
		amountInput.setAttribute("id", "input-" + i);
		amountInput.setAttribute(
			"class",
			"box col-6 col-md-3 col-lg-2 mx-auto border-0 text-center bg-light h-50"
		);
		amountInput.setAttribute("min", "1");
		amountInput.setAttribute("max", "99");
		if (window.matchMedia("(max-width: 576px)").matches) {
			amountInput.setAttribute(
				"class",
				"box col-6 h-50 col-md-3 col-lg-2 mx-auto border-2 border-secondary text-center bg-white br1"
			);
			amountInput.setAttribute("type", "number");
		}

		productAmountBox.appendChild(amountInput);
	}
}

function displayButtons() {
	for (let i = 0; i < productsInCart.length; i++) {
		const productAmountBox = document.getElementById("box-" + i);

		let moreAmountButtons = document.createElement("button");
		moreAmountButtons.setAttribute(
			"class",
			"text-center moreAndLessAmountButtons shadow-sm btn-secondary br1 border-0 text-white fw-bold"
		);
		moreAmountButtons.setAttribute("id", "addButton-" + i);
		moreAmountButtons.textContent = "+";
		let lessAmountButtons = document.createElement("button");
		lessAmountButtons.setAttribute(
			"class",
			"text-center moreAndLessAmountButtons shadow-sm col-3 h-50 btn-secondary br1 border-0 text-white fw-bold"
		);
		lessAmountButtons.setAttribute("id", "removeButton-" + i);
		lessAmountButtons.textContent = "-";
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
function moreAndRemoveButtonsEvent() {
	for (let i = 0; i < productsInCart.length; i++) {
		if (window.matchMedia("(min-width: 576px)").matches) {
			document
				.getElementById("addButton-" + i)
				.addEventListener("click", function () {
					productsInCart[i].amount++;
					sessionStorage.setItem("cart", JSON.stringify(productsInCart));
					window.location.reload();
					console.log(productsInCart[i].amount);
				});
			document
				.getElementById("removeButton-" + i)
				.addEventListener("click", function () {
					if (productsInCart[i].amount > 1) {
						productsInCart[i].amount--;
						sessionStorage.setItem("cart", JSON.stringify(productsInCart));
						window.location.reload();
						console.log(productsInCart[i].amount);
					}
				});
		}
	}
}

function mobileInputEvent() {
	for (let i = 0; i < productsInCart.length; i++) {
		if (window.matchMedia("(max-width: 576px)").matches) {
			document
				.getElementById("input-" + i)
				.addEventListener("change", function () {
					productsInCart[i].amount = document.getElementById(
						"input-" + i
					).value;
					/// ! important, without this line the number of products can be negative ! ///
					if (document.getElementById("input-" + i).value < 1) {
						productsInCart[i].amount = 1;
					}
					sessionStorage.setItem("cart", JSON.stringify(productsInCart));
					window.location.reload();
				});
		}
	}
}
