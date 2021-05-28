/// function to be used asynchronously with the promise ///
(async function () {
	const items = await getItems(); /// await fetch ///

	for (item of items) {
		displayItem(item); /// loop use to chain each object of api ///
	}
})();

/// promise ///
function getItems() {
	return (
		fetch("https://projet5-orinoco.herokuapp.com/api/cameras")
			// fetch("http://localhost:3000/api/cameras")
			.then(function (httpResponse) {
				return httpResponse.json();
			})
			.then(function (items) {
				return items;
			})
			.catch(function (error) {
				alert(error);
			})
	);
}

/// create html bloc for each item in api ///
function displayItem(item) {
	const templateElt = document.getElementById("templateArticle");
	const cloneElt = document.importNode(templateElt.content, true);

	cloneElt.getElementById("cardImage").src = item.imageUrl;
	cloneElt.getElementById("cardName").textContent = item.name;
	cloneElt.getElementById("cardId").href = "product.html?" + item._id;
	cloneElt.getElementById("cardPrice").textContent =
		(item.price / 1000).toFixed(2) + " €";

	document.getElementById("main").appendChild(cloneElt);
}
