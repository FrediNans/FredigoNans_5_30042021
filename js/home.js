(async function () {
	const items = await getItems();

	for (item of items) {
		displayItem(item);
	}
})();

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

function displayItem(item) {
	const templateElt = document.getElementById("templateArticle");
	const cloneElt = document.importNode(templateElt.content, true);

	cloneElt.getElementById("card__image").src = item.imageUrl;
	cloneElt.getElementById("card__name").textContent = item.name;

	document.getElementById("main").appendChild(cloneElt);
}
