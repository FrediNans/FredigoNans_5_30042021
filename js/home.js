/**
 * When the page loads await getProducts return
 * Then display html for each product
 * @async
 * @event onload
 */
const hideLoader = () => {
	document.getElementById("loader").setAttribute("class", "hide");
};
setTimeout("hideLoader()", 6000);
window.addEventListener("load", async () => {
	const products = await getProducts();
	for (product of products) {
		displayHtml(product);
	}
});

/**
 * Fetch api
 * If response is ok return the response in json format
 * Else display an error page and log response status in console
 * @async
 * @return {Promise}
 */
const getProducts = async () => {
	const response = await fetch(`${apiUrl}/api/cameras`);
	if (response.ok) {
		return response.json();
	} else {
		document.getElementById("errorPage").setAttribute("class", "d-block");
		document.getElementById("main").setAttribute("class", "d-none");
		console.log(response.status);
	}
};

/**
 * Get template in html file
 * Update content with api
 * Assign id to href card link @param {url}
 * Assign a unique id to each element
 * Clone template
 * @param {lenses: [string], _id: string, name: string, price: number, description:  string, imageUrl: string} product
 */
const displayHtml = (product) => {
	const templateElt = document.getElementById("templateArticle");
	const cloneElt = document.importNode(templateElt.content, true);

	const htmlProductImage = cloneElt.getElementById("cardImage-");
	htmlProductImage.src = product.imageUrl;
	htmlProductImage.setAttribute("id", "cardImage-" + product._id);

	const htmlProductName = cloneElt.getElementById("cardName-");
	htmlProductName.textContent = product.name;
	htmlProductName.setAttribute("id", "cardName-" + product._id);

	const htmlCardLink = cloneElt.getElementById("cardId-");
	htmlCardLink.href = "product.html?" + product._id;
	htmlCardLink.setAttribute("id", "cardId-" + product._id);

	const htmlProductPrice = cloneElt.getElementById("cardPrice-");
	htmlProductPrice.textContent = (product.price / 1000).toFixed(2) + " €";
	htmlProductPrice.setAttribute("id", "cardPrice-" + product._id);

	document.getElementById("main").appendChild(cloneElt);
};
