/// function to be used asynchronously with the promise ///
(async function () {
	const products = await getProducts(); /// await fetch ///
	for (product of products) {
		displayProduct(product); /// loop use to chain each object of api ///
	}
})();

/// promise ///
function getProducts() {
	return fetch(`${apiUrl}/api/cameras`)
		.then((httpResponse) => httpResponse.json())
		.then((products) => products)
		.catch((error) => alert(error));
}

/// create html bloc for each item in api ///
function displayProduct(product) {
	const templateElt = document.getElementById("templateArticle");
	const cloneElt = document.importNode(templateElt.content, true);
	cloneElt.getElementById("cardImage").src = product.imageUrl;
	cloneElt.getElementById("cardName").textContent = product.name;
	cloneElt.getElementById("cardId").href = "product.html?" + product._id;
	cloneElt.getElementById("cardPrice").textContent =
		(product.price / 1000).toFixed(2) + " €";
	document.getElementById("main").appendChild(cloneElt);
}
