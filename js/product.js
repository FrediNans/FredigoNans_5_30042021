/// Constant used to retrieve the id of selected product in url ///
const id = window.location.search.substring(1);

/// Function to be used asynchronously with the promise ///
(async function () {
	const product = await getProduct(); /// Await fetch ///
	displayHtmlContent(product);
	currentProductUpdate(product);
})();
/// Promise ///

function getProduct() {
	return (
		fetch(`${apiUrl}/api/cameras/${id}`)
			//return fetch(`http://localhost:3000/api/cameras/${id}`)
			.then(function http(httpResponse) {
				/// Condition used to display an error page if the fetch fails  ///

				if (httpResponse.ok === false) {
					document.getElementById("errorPage").setAttribute("class", "d-block");
					document.getElementById("main").setAttribute("class", "d-none");
				}
				return httpResponse.json();
			})
			.then(function (product) {
				return product;
			})
			.catch(function (error) {
				console.log(error);
			})
	);
}

///  Dynamically display the html content of the selected product ///
let displayHtmlContent = (product) => {
	const productOptionSelect = document.getElementById("lensesOptions");
	const options = product.lenses;
	options.forEach((lenses) => {
		const option = document.createElement("option");
		option.textContent = lenses;
		option.setAttribute("id", lenses);
		productOptionSelect.appendChild(option);
	});

	const productImage = document.getElementById("productImage");
	productImage.setAttribute("src", product.imageUrl);

	const productName = document.getElementById("productName");
	productName.textContent = "Réf : " + product.name;

	const priceInEuro = (product.price / 1000).toFixed(2) + " €";
	const productPrice = document.getElementById("productPrice");
	productPrice.textContent = priceInEuro;

	const productDescription = document.getElementById("productDescription");
	productDescription.textContent = product.description;

	/// Assign function to button ///
	const substractButton = document.getElementById("productButtonLess");
	substractButton.setAttribute("onclick", "substractProduct()");

	const addButton = document.getElementById("productButtonMore");
	addButton.setAttribute("onclick", "addProduct()");

	const addToCartButton = document.getElementById("cartButton");
	addToCartButton.setAttribute("onclick", "addToCart()");
};

/// Product object ///
let currentProduct = {
	id: id,
	name: "",
	price: 0,
	amount: 1,
	option: "",
};
/// dynamically modifies the product object ///
let currentProductUpdate = (product) => {
	currentProduct.name = product.name;
	currentProduct.price = product.price;
};

/// Function assign to substract button ///
let substractProduct = () => {
	if (currentProduct.amount > 1) {
		currentProduct.amount--;
		const productAmount = document.getElementById("productAmount");
		productAmount.textContent = currentProduct.amount;
	}
};

/// Function assign to add button ///
let addProduct = () => {
	currentProduct.amount++;
	const productAmount = document.getElementById("productAmount");
	productAmount.textContent = currentProduct.amount;
};

/// Load the cart if it exists ///
let cart = JSON.parse(sessionStorage.getItem("cart"));

/// Check if the cart exists ///
/// If exists, updates it and sends in storage ///
/// Otherwise creates the cart, adds the product and sends in storage ///
let addToCart = () => {
	const selectOption = document.getElementById("lensesOptions");
	const index = selectOption.selectedIndex;
	currentProduct.option = selectOption[index].value;

	if (cart !== null) {
		updateProductInCart();
		sessionStorage.setItem("cart", JSON.stringify(cart));
	} else {
		cart = [];
		cart.push(currentProduct);
		sessionStorage.setItem("cart", JSON.stringify(cart));
	}

	/// Open confirmation page ///
	document.getElementById("comfirm__page").setAttribute("class", "d-block");
	document.getElementById("main").setAttribute("class", "d-none");
};

/// check whith id and option if product is allready in cart ///
/// If allready in , update amount ///
/// otherwise add product in cart ///
let updateProductInCart = () => {
	const index = cart.findIndex(
		(p) => p.id === currentProduct.id && p.option === currentProduct.option
	);
	if (index !== -1) {
		cart[index].amount = cart[index].amount + currentProduct.amount;
	} else {
		cart.push(currentProduct);
	}
};
