/// Recover and parse cart in session storage ///
let cart = JSON.parse(sessionStorage.getItem("cart"));

/// display empty message when cart in storage is null ///
window.addEventListener("load", () => {
	if (cart === null) {
		document.getElementById("cart").setAttribute("class", "d-none");
		document.getElementById("emptyCart").setAttribute("class", "d-block");
	} else {
		displayHtmlContent();
		calculateCartPrice();
	}
});

/// Creation of the html party and sending of product data ///
displayHtmlContent = () => {
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

		const orderButton = document.getElementById("orderButton");
		orderButton.setAttribute("onclick", "order()");
	});
};

/// Function assigned to add and substact buttons ///
let substractProduct = (index) => {
	if (cart[index].amount > 1) {
		cart[index].amount--;
		sessionStorage.setItem("cart", JSON.stringify(cart));
		const amount = document.getElementById("amount-" + index);
		amount.textContent = cart[index].amount;
		const totalPrice = document.getElementById("productTotalPrice-" + index);
		totalPrice.textContent =
			((cart[index].price * cart[index].amount) / 1000).toFixed(2) + " €";
		calculateCartPrice();
	}
};

let addProduct = (index) => {
	cart[index].amount++;
	sessionStorage.setItem("cart", JSON.stringify(cart));
	const amount = document.getElementById("amount-" + index);
	amount.textContent = cart[index].amount;
	const totalPrice = document.getElementById("productTotalPrice-" + index);
	totalPrice.textContent =
		((cart[index].price * cart[index].amount) / 1000).toFixed(2) + " €";
	calculateCartPrice();
};

/// Function assigned to erase button ///
let eraseProduct = (index) => {
	cart.splice(index, 1);
	sessionStorage.setItem("cart", JSON.stringify(cart));
	const element = document.getElementById("cartTemplate");
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
const cartPrice = JSON.parse(sessionStorage.getItem("cartPrice"));
/// Calcul cart price and push result in storage ///
calculateCartPrice = () => {
	let totalPrice = [];

	cart.forEach((product) => {
		const index = cart.indexOf(product);
		const totalProductPrice = cart[index].amount * cart[index].price;
		totalPrice.push(totalProductPrice);
	});

	const reducer = (accumulator, currentValue) => accumulator + currentValue;
	const htmlCartPrice = document.getElementById("totalCartPrice");
	htmlCartPrice.textContent =
		(totalPrice.reduce(reducer, 0) / 1000).toFixed(2) + " €";
	sessionStorage.setItem(
		"cartPrice",
		JSON.stringify(totalPrice.reduce(reducer, 0))
	);

	showEmptyCartMessage();
};

let order = () => {
	let ids = [];
	cart.forEach((product) => {
		ids.push(product.id);
	});
	sessionStorage.setItem("ids", JSON.stringify(ids));
	document.getElementById("cartPage").setAttribute("class", "d-none");
	document.getElementById("orderPage").setAttribute("class", "d-block");
};

let checkEmail = (mail) => {
	const mailformat =
		/^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})*$/;
	if (mail.value.match(mailformat)) {
		return true;
	} else {
		return false;
	}
};

let checkInputText = (input) => {
	const textFormat =
		/^[A-Za-z\à\â\ä\é\è\ê\ë\ï\î\ô\ö\ù\û\ü\ÿ\ç\æ\œ\ \'\,\.\/\-]+$/;
	if (input.value.match(textFormat)) {
		return true;
	} else {
		return false;
	}
};

let checkAddress = (address) => {
	const textFormat =
		/^[A-Za-z0-9\à\â\ä\é\è\ê\ë\ï\î\ô\ö\ù\û\ü\ÿ\ç\æ\œ\ \'\,\.\/\-]+$/;
	if (address.value.match(textFormat)) {
		return true;
	} else {
		return false;
	}
};
let checkPostalCode = (postalCode) => {
	const postalcodeFormat = /^(F-)?((2[A|B])|[0-9]{2})[0-9]{3}$/;
	if (postalCode.value.match(postalcodeFormat)) {
		return true;
	} else {
		return false;
	}
};

let displayInvalidInputStyle = (inputName, errorname) => {
	inputName.setAttribute("class", "inputText invalidInput");
	errorname.setAttribute("class", "d-block errorMessage");
};
let displayValidInputStyle = (inputName, errorname) => {
	inputName.setAttribute("class", "inputText validInput");
	errorname.setAttribute("class", "d-none errorMessage");
};
/// check input ///

const form = document.forms["contact"];

let checkValue = () => {
	const firstNameErrorMessage = document.getElementById("firstNameError");
	const lastNameErrorMessage = document.getElementById("lastNameError");
	const addressErrorMessage = document.getElementById("addressError");
	const postalCodeErrorMessage = document.getElementById("postalError");
	const cityErrorMessage = document.getElementById("cityError");
	const emailErrorMessage = document.getElementById("emailError");

	for (input of form) {
		if (input == " ") {
			return false;
		}
	}
	if (checkInputText(form.firstName) !== true) {
		displayInvalidInputStyle(form.firstName, firstNameErrorMessage);
		return false;
	} else {
		displayValidInputStyle(form.firstName, firstNameErrorMessage);
	}
	if (checkInputText(form.lastName) !== true) {
		displayInvalidInputStyle(form.lastName, lastNameErrorMessage);
		return false;
	} else {
		displayValidInputStyle(form.lastName, lastNameErrorMessage);
	}
	if (checkAddress(form.address) !== true) {
		displayInvalidInputStyle(form.address, addressErrorMessage);
		return false;
	} else {
		displayValidInputStyle(form.address, addressErrorMessage);
	}
	if (checkPostalCode(form.postalCode) !== true) {
		displayInvalidInputStyle(form.postalCode, postalCodeErrorMessage);
		return false;
	} else {
		displayValidInputStyle(form.postalCode, postalCodeErrorMessage);
	}
	if (checkInputText(form.city) !== true) {
		displayInvalidInputStyle(form.city, cityErrorMessage);
		return false;
	} else {
		displayValidInputStyle(form.city, cityErrorMessage);
	}
	if (checkEmail(form.email) !== true) {
		displayInvalidInputStyle(form.email, emailErrorMessage);
		return false;
	} else {
		displayValidInputStyle(form.email, emailErrorMessage);
	}
	return true;
};
let postRequest = async () => {
	const contact = {
		firstName: form.firstName.value,
		lastName: form.lastName.value,
		address: form.address.value + " " + form.postalCode.value,
		city: form.city.value,
		email: form.email.value,
	};
	const ids = JSON.parse(sessionStorage.getItem("ids"));
	const cartValidation = {
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
	if (checkValue() === true) {
		let response = await fetch(`${apiUrl}/api/cameras/order`, myInit);
		if (response.ok) {
			saveResponse = await response.json();
			sessionStorage.setItem("response", JSON.stringify(saveResponse));

			const openPage = (window.location = "confirm.html");
			openPage = await saveResponse;
		} else {
			alert(
				"Nous rencontrons des difficultés pour accéder au serveur. Veuillez réessayer ultérieurement."
			);
		}
	} else {
		checkValue();
	}
};
