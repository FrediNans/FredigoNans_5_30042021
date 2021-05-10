/// main function ///

(async function () {
	const items = await getItems();

	for (item of items) {
		displayItem(item);
	}
})();

/// promise ///

function getItems() {
	return fetch("https://projet5-orinoco.herokuapp.com/api/furniture")
		.then(function (httpResponse) {
			return httpResponse.json();
		})
		.then(function (items) {
			return items;
		})
		.catch(function (error) {
			alert(error);
		});
}

/// create html bloc for each item in api ///

function displayItem(item) {
	const url = "product.html?";
	const templateElt = document.getElementById("templateArticle");
	const cloneElt = document.importNode(templateElt.content, true);
	const price = item.price / 1000;
	const priceDecimal = price.toFixed(2) + " €";

	cloneElt.getElementById("card__image").src = item.imageUrl;
	cloneElt.getElementById("card__name").textContent = item.name;
	cloneElt.getElementById("card__id").href = url + item._id;
	cloneElt.getElementById("card__price").textContent = priceDecimal;

	document.getElementById("main").appendChild(cloneElt);
}

/// on click open item page ///
