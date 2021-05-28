/// Constant used to retrieve the id of selected product in url ///

const id = window.location.search.substring(1);

/// Function to be used asynchronously with the promise ///

(async function () {
	const product = await getProduct(); /// Await fetch ///
	displayHtmlContent(product);
	productToAddUpdate(product);
})();

/// Promise ///
function getProduct() {
	return (
		fetch(`https://projet5-orinoco.herokuapp.com/api/cameras/${id}`)
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
	const priceInEuro = (product.price / 1000).toFixed(2) + " €";
	const substractButton = document.getElementById("productButtonLess");
	const addButton = document.getElementById("productButtonMore");
	const addToCartButton = document.getElementById("cartButton");

	let productOptionSelect = document.getElementById("lensesOptions");
	let options = product.lenses;
	options.forEach((lenses) => {
		let option = document.createElement("option");
		option.textContent = lenses;
		option.setAttribute("id", lenses);
		productOptionSelect.appendChild(option);
	});

	productImage = document
		.getElementById("productImage")
		.setAttribute("src", product.imageUrl);
	productName = document.getElementById("productName").textContent =
		"Réf : " + product.name;
	productPrice = document.getElementById("productPrice").textContent =
		priceInEuro;
	productDescription = document.getElementById(
		"productDescription"
	).textContent = product.description;

	/// Assign function to button ///

	substractButton.setAttribute("onclick", "substractProduct()");
	addButton.setAttribute("onclick", "addProduct()");
	addToCartButton.setAttribute("onclick", "addToCart()");
};

/// Product object ///

let productToAdd = {
	id: id,
	name: "",
	price: 0,
	amount: 1,
	option: "Aucun",
};

/// dynamically modifies the product object ///

let productToAddUpdate = (product) => {
	productToAdd.name = product.name;
	productToAdd.price = product.price;
	productToAddAmountUpdate();
};

/// Update amount of product ///

let productToAddAmountUpdate = () => {
	const productAmount = document.getElementById("productAmount");
	productAmount.textContent = productToAdd.amount;
};

/// Function assign to substract button ///

let substractProduct = () => {
	if (productToAdd.amount > 1) {
		productToAdd.amount--;
		productToAddAmountUpdate();
	}
};

/// Function assign to add button ///

let addProduct = () => {
	productToAdd.amount++;
	productToAddAmountUpdate();
};

/// Updates the option chosen by customer ///

let productToAddOptionUpdate = () => {
	const selectOption = document.getElementById("lensesOptions");
	let index = selectOption.selectedIndex;
	productToAdd.option = selectOption[index].value;
};

/// Load the cart if it exists ///

const productInStorage = sessionStorage.getItem("cart");
let productsInCart = JSON.parse(productInStorage);

/// Check if the cart exists ///
/// If exists, updates it and sends in storage ///
/// Otherwise creates the cart, adds the product and sends in storage ///

let addProductInStorage = () => {
	if (productInStorage !== null) {
		productToAddAmountUpdate();
		productToAddOptionUpdate();
		updateProduct();
		sessionStorage.setItem("cart", JSON.stringify(productsInCart));
	} else {
		productsInCart = [];
		productsInCart.push(productToAdd);
		sessionStorage.setItem("cart", JSON.stringify(productsInCart));
	}
};

/// check whith id and option if product is allready in cart ///
/// If allready in , update amount ///
/// otherwise add product in cart ///

let updateProduct = () => {
	const index = productsInCart.findIndex(
		(p) => p.id === productToAdd.id && p.option === productToAdd.option
	);
	console.log(index);
	if (index !== -1) {
		productsInCart[index].amount =
			productsInCart[index].amount + productToAdd.amount;
	} else {
		productsInCart.push(productToAdd);
	}
};

/// Function assigned to add to cart button ///

let addToCart = () => {
	addProductInStorage();
	/// Open confirmation page ///
	document.getElementById("comfirm__page").setAttribute("class", "d-block");
	document.getElementById("main").setAttribute("class", "d-none");
};
