/// function to be used asynchronously with the promise ///
(async function () {
	const products = await getProducts();
	for (product of products) {
		const key = product._id;
		let productInCart = localStorage.getItem(key);
		if (productInCart != null) {
			displayProductInCart(product);
			productAmount.value = productInCart; //clonage
			console.log(productInCart);
		}

		//displayItem(item); /// loop use to chain each object of api ///
	}
})();

/// promise ///
function getProducts() {
	return fetch("https://projet5-orinoco.herokuapp.com/api/furniture")
		.then(function (httpResponse) {
			return httpResponse.json();
		})
		.then(function (products) {
			return products;
		})
		.catch(function (error) {
			alert(error);
		});
}
function displayProductInCart(product) {
	const productNameValid = product.name;
}

const addButton = document.getElementById("product__button__more");
const removeButton = document.getElementById("product__button__less");
const productAmount = document.getElementById("product__amount");

removeButton.addEventListener("click", function () {
	if (productAmount.value > 1) {
		productAmount.value--;
	}
});
addButton.addEventListener("click", function () {
	productAmount.value++;
});
