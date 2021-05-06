(async function () {
	const articles = await getArticles();

	for (article of articles) {
		displayArticle(article);
	}
})();

function getArticles() {
	return fetch("https://projet5-orinoco.herokuapp.com/api/furniture")
		.then(function (httpResponse) {
			return httpResponse.json();
		})
		.then(function (articles) {
			return articles;
		})
		.catch(function (error) {
			alert(error);
		});
}

function displayArticle(article) {
	const templateElt = document.getElementById("templateArticle");
	const cloneElt = document.importNode(templateElt.content, true);

	cloneElt.getElementById("card__image").src = article.imageUrl;
	cloneElt.getElementById("card__name").textContent = article.name;

	document.getElementById("main").appendChild(cloneElt);
}
