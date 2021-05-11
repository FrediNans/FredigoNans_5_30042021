/// constant used to retrieve the id in the url ///
const id = window.location.search.substring(1);

/// function to be used asynchronously with the promise ///
(async function () {
	const item = await getItem(); /// await fetch ///

	displayItem(item);

	for (color of item.varnish) {
		displayVarnish(color); /// loop use to chain each object of the "varnich" array in api///
	}
})();

/// promise ///
function getItem() {
	return fetch(`https://projet5-orinoco.herokuapp.com/api/furniture/${id}`)
		.then(function http(httpResponse) {
			if (httpResponse.ok === false) {
				document.getElementById("errorPage").setAttribute("class", "d-block"); /// condition used to display an error page if the fetch fails ///
				document.getElementById("main").setAttribute("class", "d-none");
			}
			return httpResponse.json();
		})
		.then(function (item) {
			return item;
		})
		.catch(function (error) {
			console.log(error);
		});
}

/// function used to display the retrieved element in the api ///
function displayItem(item) {
	document.getElementById("item__name").innerHTML = item.name;
	document.getElementById("item__image").setAttribute("src", item.imageUrl);
	document.getElementById("item__description").innerHTML = item.description;
	document.getElementById("item__price").innerHTML =
		(item.price / 1000).toFixed(2) + " €";
}

/// function used to display the different varnished retrieve in the API ///
function displayVarnish() {
	const templateElt = document.getElementById("templateArticle");
	const cloneElt = document.importNode(templateElt.content, true);

	cloneElt.getElementById("varnish__sample").className += color;

	document.getElementById("varnish__collapse").appendChild(cloneElt);
}

/// function used to activate the drop-down menu ///

const dropDownButtonShow = document.getElementById("dropDownButtonShow");
const dropDownMenu = document.getElementById("varnish__collapse");

function showMenu() {
	dropDownMenu.classList.toggle("height-1");
}

/// fu
localStorage.removeItem("ref");

console.log();
