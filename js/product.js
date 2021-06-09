/**
 * Get the id set in the url
 * @param {URLSearchParams}
 * @constant {string}
 */
const id = window.location.search.substring(1);

/**
 * When the page loads await getProduct return
 * Then display html for product
 * @async
 * @event onload
 */
window.addEventListener("load", async () => {
	const product = await getProduct();
	product.amount = 1;
	sessionStorage.setItem("currentProduct", JSON.stringify(product));
	displayHtmlContent(product);
	currentProductUpdate(product);
});

/**
 * Fetch api
 * If response is ok return the response in json format
 * Else display an error page and log response status in console
 * @async
 * @return {Promise}
 */
const getProduct = async () => {
	return fetch(`${apiUrl}/api/cameras/${id}`).then((response) => {
		if (response.ok) {
			return response.json();
		} else {
			document.getElementById("errorPage").setAttribute("class", "d-block");
			document.getElementById("main").setAttribute("class", "d-none");
			console.log(response.status);
		}
	});
};

/**
 * Update content with api
 * Create an option for each lense in the select list with the foreach loop
 * Assign a unique id to each option
 * @param {lenses: [string], _id: string, name: string, price: number, description:  string,amount: number, imageUrl: string} product
 */

const displayHtmlContent = (product) => {
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
};

/**
 * common object used to group all infos before sending them to the cart
 * @param {id: string, name: string, price: number, amount: number, option: string} currentProduct
 */
let currentProduct = {
	id: id,
	name: "",
	price: 0,
	amount: 1,
	option: "",
};
let currentProductUpdate = (product) => {
	currentProduct.name = product.name;
	currentProduct.price = product.price;
};

/**
 * Function assigned to add and substact buttons
 * Change quantity of product and update the html content
 * Operator add = 2 substract = 0
 * @param {*} operator
 */

const changeQuantity = (operator) => {
	const displayHtmlQuantity = document.getElementById("productAmount");
	if (operator > 1) {
		currentProduct.amount++;
		displayHtmlQuantity.textContent = currentProduct.amount;
	}
	if (operator < 1 && currentProduct.amount > 1) {
		currentProduct.amount--;
		displayHtmlQuantity.textContent = currentProduct.amount;
	}
};

/**
 * Load the cart if it exists
 */
let cart = JSON.parse(sessionStorage.getItem("cart"));

/**
 * Update current option
 * Check if the cart exists
 * If exists, updates it and sends in storage
 * Otherwise creates the cart, adds the current product and sends in storage
 * Open the add to cart confirmation page
 */

const addToCart = () => {
	const selectOption = document.getElementById("lensesOptions");
	const indexOption = selectOption.selectedIndex;
	currentProduct.option = selectOption[indexOption].value;
	if (cart !== null) {
		updateProductInCart();
		sessionStorage.setItem("cart", JSON.stringify(cart));
	} else {
		cart = [];
		cart.push(currentProduct);
		sessionStorage.setItem("cart", JSON.stringify(cart));
	}
	document.getElementById("comfirm__page").setAttribute("class", "d-block");
	document.getElementById("main").setAttribute("class", "d-none");
};

/**
 * Check whith id and option if product is allready in cart
 * If allready in , update amount
 * Otherwise add product in cart
 */
const updateProductInCart = () => {
	const index = cart.findIndex(
		(p) => p.id === currentProduct.id && p.option === currentProduct.option
	);
	if (index !== -1) {
		cart[index].amount = cart[index].amount + currentProduct.amount;
	} else {
		cart.push(currentProduct);
	}
};
