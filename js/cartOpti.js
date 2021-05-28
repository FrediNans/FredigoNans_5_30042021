/// Recover and parse cart in session storage ///
let cart = sessionStorage.getItem("cart");
cart = JSON.parse(cart);

/// Creation of the html party and sending of product data ///

let displayHtmlContent = () => {
	cart.forEach((product) => {
		const index = cart.indexOf(product);
		const templateElt = document.getElementById("cartTemplate");
		const cloneElt = document.importNode(templateElt.content, true);
		const price = (product.price / 1000).toFixed(2) + " €";
		const totalPrice =
			((product.price * product.amount) / 1000).toFixed(2) + " €";

		cloneElt
			.getElementById("cartProduct-")
			.setAttribute("id", "cartProduct-" + index);

		cloneElt.getElementById("productName-").textContent = product.name;
		cloneElt.getElementById("productName-").setAttribute("id", product.id);

		cloneElt.getElementById("option-").textContent =
			"Objectif: " + product.option;
		cloneElt.getElementById("option-").setAttribute("id", "option-" + index);

		const functionToSubstract = `substractProduct(${index})`;
		cloneElt
			.getElementById("cart__lessAmountButton-")
			.setAttribute("onclick", functionToSubstract);

		cloneElt.getElementById("amount-").textContent = product.amount;
		cloneElt.getElementById("amount-").setAttribute("id", "amount-" + index);

		const functionToAdd = `addProduct(${index})`;
		cloneElt
			.getElementById("cart__moreAmountButton-")
			.setAttribute("onclick", functionToAdd);

		const functionToErase = `eraseProduct(${index})`;
		cloneElt
			.getElementById("erasebutton-")
			.setAttribute("onclick", functionToErase);

		cloneElt.getElementById("productPrice-").textContent = price;
		cloneElt
			.getElementById("productPrice-")
			.setAttribute("id", "productPrice-" + index);

		cloneElt.getElementById("productTotalPrice-").textContent = totalPrice;
		cloneElt
			.getElementById("productTotalPrice-")
			.setAttribute("id", "productTotalPrice-" + index);

		document.getElementById("cartBody").appendChild(cloneElt);
	});
};
displayHtmlContent();
/// Function assigned to add and substact buttons ///
let substractProduct = (index) => {
	if (cart[index].amount > 1) {
		cart[index].amount--;
		sessionStorage.setItem("cart", JSON.stringify(cart));
		let amount = document.getElementById("amount-" + index);
		amount.textContent = cart[index].amount;
		let totalPrice = document.getElementById("productTotalPrice-" + index);
		totalPrice.textContent =
			((cart[index].price * cart[index].amount) / 1000).toFixed(2) + " €";
		calculateCartPrice();
	}
};

let addProduct = (index) => {
	cart[index].amount++;
	sessionStorage.setItem("cart", JSON.stringify(cart));
	let amount = document.getElementById("amount-" + index);
	amount.textContent = cart[index].amount;
	let totalPrice = document.getElementById("productTotalPrice-" + index);
	totalPrice.textContent =
		((cart[index].price * cart[index].amount) / 1000).toFixed(2) + " €";
	calculateCartPrice();
};

/// Function assigned to erase button ///
let eraseProduct = (index) => {
	cart.splice(index, 1);
	sessionStorage.setItem("cart", JSON.stringify(cart));
	let element = document.getElementById("cartTemplate");
	while (element.nextElementSibling !== null) {
		element.nextElementSibling.remove();
	}
	calculateCartPrice();
	displayHtmlContent();
	showEmptyCartMessage();
};

/// Dysplay message when cart is empty ///
let showEmptyCartMessage = () => {
	const cartPrice = document.getElementById("totalCartPrice");
	if (cartPrice.textContent === "0.00 €") {
		document.getElementById("cart").setAttribute("class", "d-none");
		document.getElementById("emptyCart").setAttribute("class", "d-block");
	}
};

/// Calcul cart price and push result in storage ///
calculateCartPrice = () => {
	let cartPrice = {
		total: [],
	};
	cart.forEach((product) => {
		const index = cart.indexOf(product);
		let totalProductPrice = cart[index].amount * cart[index].price;
		cartPrice.total.push(totalProductPrice);
	});

	const reducer = (accumulator, currentValue) => accumulator + currentValue;
	document.getElementById("totalCartPrice").textContent =
		(cartPrice.total.reduce(reducer, 0) / 1000).toFixed(2) + " €";
	if (cartPrice !== null) {
	}
	showEmptyCartMessage();
};
calculateCartPrice();

/// test post request ///
let ids = ["5be1ed3f1c9d44000030b061"];
let contact = {
	firstName: "Test",
	lastName: "Test",
	address: "16 rue jesaispas",
	city: "Bourg",
	email: "moimoimoi@mail.test",
};
let cartValidation = {
	contact: contact,
	products: ids,
};
const myInit = {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
	body: JSON.stringify(cartValidation),
};
let postRequest = () => {
	fetch("https://projet5-orinoco.herokuapp.com/api/cameras/order", myInit)
		//fetch("http://localhost:3000/api/cameras/order", myInit)
		.then((res) => res.json())
		.then((res) => console.log(res));
};
postRequest();
