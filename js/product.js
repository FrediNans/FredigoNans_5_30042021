/// constant used to retrieve the id in the url ///

const id = window.location.search.substring(1);

/// function to be used asynchronously with the promise ///

(async function () {
	const product = await getProduct(); /// await fetch ///
	displayProduct(product);
	addArrayInfo(product);
	for (color of product.varnish) {
		displayVarnish(color); /// loop use to chain each object of the "varnich" array in api///
	}
})();

/// promise ///

function getProduct() {
	return fetch(`https://projet5-orinoco.herokuapp.com/api/furniture/${id}`)
		.then(function http(httpResponse) {
			if (httpResponse.ok === false) {
				document.getElementById("errorPage").setAttribute("class", "d-block"); /// condition used to display an error page if the fetch fails ///
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

/// function used to display the retrieved element in the api ///

function displayProduct(product) {
	const productName = product.name;
	const productPrice = (product.price / 1000).toFixed(2) + " €";
	document.getElementById("item__name").innerHTML = productName;
	document.getElementById("item__image").setAttribute("src", product.imageUrl);
	document.getElementById("item__description").innerHTML = product.description;
	document.getElementById("item__price").innerHTML = productPrice;
}

/// function used to display the different varnished retrieve in the API ///

function displayVarnish() {
	const templateElt = document.getElementById("templateArticle");
	const cloneElt = document.importNode(templateElt.content, true);

	cloneElt.getElementById("varnish__sample").className += color;

	document.getElementById("varnish__collapse").appendChild(cloneElt);
}

/// function used to activate the drop-down menu for varnish selection ///

const dropDownButtonShow = document.getElementById("dropDownButtonShow");
const dropDownMenu = document.getElementById("varnish__collapse");

function showMenu() {
	dropDownMenu.classList.toggle("height-1");
}

/// fu
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
function addArrayInfo(product) {
	const productName = product.name;
	const productKey = product.name;
	const productPrice = (product.price / 1000).toFixed(2) + " €";
	let productInCart = [];

	document
		.getElementById("cart__button")
		.addEventListener("click", function () {
			localStorage.setItem(id, productAmount.value);
			console.log(productInCart);
			document.getElementById("comfirm__page").setAttribute("class", "d-block");
			document.getElementById("main").setAttribute("class", "d-none");
		});
}
