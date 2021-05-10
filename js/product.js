const id = window.location.search.substring(1);
(async function () {
	const item = await getItem();
	const colors = item.varnish;
	for (color of colors) {
		displayVarnish(color);
		displayItem(item);
	}
})();
/// promise ///

function getItem() {
	return fetch(`https://projet5-orinoco.herokuapp.com/api/furniture/${id}`)
		.then(function http(httpResponse) {
			if (httpResponse.ok === false) {
				document.getElementById("errorPage").setAttribute("class", "d-block");
				document.getElementById("main").setAttribute("class", "d-none");
			}
			return httpResponse.json();
		})

		.then(function (item) {
			return item;
		})

		.catch(function (error) {
			alert(error);
		});
}

function displayItem(item) {
	const itemName = document.getElementById("item__name");
	const itemImage = document.getElementById("item__image");
	const itemImageUrl = item.imageUrl;
	const itemDescription = document.getElementById("item__description");
	const itemPrice = document.getElementById("item__price");
	const price = item.price / 1000;
	const priceDecimal = price.toFixed(2) + " €";

	itemName.innerHTML = item.name;
	itemImage.setAttribute("src", itemImageUrl);
	itemDescription.innerHTML = item.description;
	itemPrice.innerHTML = priceDecimal;
}

function displayVarnish() {
	const templateElt = document.getElementById("templateArticle");
	const cloneElt = document.importNode(templateElt.content, true);

	cloneElt.getElementById("varnish__sample").className += color;
	cloneElt.getElementById("varnish__color").textContent = color;

	document.getElementById("item__options").appendChild(cloneElt);
}
