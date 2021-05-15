/// Constant used to retrieve the id of selected product in url ///
const id = window.location.search.substring(1);

/// Function to be used asynchronously with the promise ///
(async function () {
	const product = await getProduct(); /// Await fetch ///
	displayProduct(product);
	addToCart(product);
	console.log(product);
})();

/// Promise ///
function getProduct() {
	return fetch(`https://projet5-orinoco.herokuapp.com/api/furniture/${id}`)
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
		});
}

/// Function used to display the retrieved element in API ///
function displayProduct(product) {
	const productPriceCalc = (product.price / 1000).toFixed(2) + " €";

	let productOptionSelect = document.getElementById("varnish__options");
	let options = product.varnish;

	options.forEach((color) => {
		let option = document.createElement("option");
		option.textContent = color;
		option.setAttribute("id", color);
		productOptionSelect.appendChild(option);
	});

	productImage = document
		.getElementById("product__image")
		.setAttribute("src", product.imageUrl);
	productName = document.getElementById("product__name").textContent =
		product.name;
	productPrice = document.getElementById("product__price").textContent =
		productPriceCalc;
	productDescription = document.getElementById(
		"product__description"
	).textContent = product.description;
}

/// Function used to add product in session storage ///
function addToCart(product) {
	const productName = product.name;
	const addButton = document.getElementById("product__button__more");
	const removeButton = document.getElementById("product__button__less");
	const productAmount = document.getElementById("product__amount");
	const addToCartButton = document.getElementById("cart__button");
	const productInStorage = sessionStorage.getItem("cart");

	/// Button used to remove product in cart ///
	removeButton.addEventListener("click", function () {
		if (productAmount.value > 1) {
			productAmount.value--;
			productToAdd.amount--; /// update the product object ///
		}
	});

	/// Button used to add product in cart ///
	addButton.addEventListener("click", function () {
		productAmount.value++;
		productToAdd.amount++; /// update the product object ///
	});

	/// Function used to initialyse or update storage in session storage ///
	function addProductInStorage() {
		if (productInStorage) {
			productInCart = JSON.parse(productInStorage);
			updateProductAmount();
			sessionStorage.setItem("cart", JSON.stringify(productInCart));
		} else {
			productInCart = [];
			productInCart.push(productToAdd);
			sessionStorage.setItem("cart", JSON.stringify(productInCart));
		}
	}

	/// Function used to push product in cart or update them if allready exist ///
	function updateProductAmount() {
		const currentIndex = productInCart.findIndex(
			(p) => p.id === productToAdd.id
		);
		if (currentIndex !== -1) {
			productInCart[currentIndex].amount =
				productInCart[currentIndex].amount + productToAdd.amount;
			console.log(typeof productToAdd.amount);
		} else {
			productInCart.push(productToAdd);
		}
	}

	/// Product ///
	let productToAdd = {
		id: id,
		name: productName,
		price: product.price,
		amount: 1,
	};

	/// Add to cart button ///
	addToCartButton.addEventListener("click", function () {
		addProductInStorage();
		/// Open confirmation page ///
		document.getElementById("comfirm__page").setAttribute("class", "d-block");
		document.getElementById("main").setAttribute("class", "d-none");
	});
}
