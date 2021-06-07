/// Recover and parse cart in session storage ///
const cart = JSON.parse(sessionStorage.getItem("cart"));

/// display empty message when cart in storage is null ///
window.addEventListener("load", () => {
	if (checkIfCartIsEmpty() === false) {
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

		const priceInEuro = (product.price / 1000).toFixed(2) + " €";
		const totalPriceInEuro =
			((product.price * product.amount) / 1000).toFixed(2) + " €";

		const productBox = cloneElt.getElementById("cartProduct-");
		productBox.setAttribute("id", "cartProduct-" + index);

		const productName = cloneElt.getElementById("productName-");
		productName.textContent = product.name;
		productName.setAttribute("id", product.id);

		const productOption = cloneElt.getElementById("option-");
		productOption.textContent = "Objectif: " + product.option;
		productOption.setAttribute("id", "option-" + index);

		const substractButton = cloneElt.getElementById("cart__lessAmountButton-");
		substractButton.setAttribute("onclick", `substractProduct(${index})`);
		substractButton.setAttribute("id", "cart__lessAmountButton-" + index);

		const productAmount = cloneElt.getElementById("amount-");
		productAmount.textContent = product.amount;
		productAmount.setAttribute("id", "amount-" + index);

		const addButton = cloneElt.getElementById("cart__moreAmountButton-");
		addButton.setAttribute("onclick", `addProduct(${index})`);
		addButton.setAttribute("id", "cart__moreAmountButton-" + index);

		const eraseButton = cloneElt.getElementById("erasebutton-");
		eraseButton.setAttribute("onclick", `eraseProduct(${index})`);
		eraseButton.setAttribute("id", "erasebutton-" + index);

		const productPrice = cloneElt.getElementById("productPrice-");
		productPrice.textContent = priceInEuro;
		productPrice.setAttribute("id", "productPrice-" + index);

		const productTotalPrice = cloneElt.getElementById("productTotalPrice-");
		productTotalPrice.textContent = totalPriceInEuro;
		productTotalPrice.setAttribute("id", "productTotalPrice-" + index);

		document.getElementById("cartBody").appendChild(cloneElt);
	});
};

/// Function assigned to add and substact buttons ///
const substractProduct = (index) => {
	if (cart[index].amount <= 1) {
		return false;
	} else {
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

const addProduct = (index) => {
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
const eraseProduct = (index) => {
	cart.splice(index, 1);
	sessionStorage.setItem("cart", JSON.stringify(cart));
	const element = document.getElementById("cartTemplate");
	while (element.nextElementSibling !== null) {
		element.nextElementSibling.remove();
	}
	if (checkIfCartIsEmpty() === false) {
		calculateCartPrice();
		displayHtmlContent();
	}
};

/// Dysplay message when cart is empty ///
const checkIfCartIsEmpty = () => {
	if (cart === null || cart.length === 0) {
		document.getElementById("cart").setAttribute("class", "d-none");
		document.getElementById("emptyCart").setAttribute("class", "d-block");
	} else {
		return false;
	}
};
const cartPrice = JSON.parse(sessionStorage.getItem("cartPrice"));

/// Calcul cart price and push result in storage ///
const calculateCartPrice = () => {
	if (checkIfCartIsEmpty() === false) {
		totalPrice = [];
		cart.forEach((product) => {
			const index = cart.indexOf(product);
			totalPrice.push(cart[index].amount * cart[index].price);
		});
		const reducer = (accumulator, currentValue) => accumulator + currentValue;
		const htmlCartPrice = document.getElementById("totalCartPrice");
		htmlCartPrice.textContent =
			(totalPrice.reduce(reducer, 0) / 1000).toFixed(2) + " €";
		sessionStorage.setItem(
			"cartPrice",
			JSON.stringify(totalPrice.reduce(reducer, 0))
		);
	}
};

const order = () => {
	document.getElementById("cartPage").setAttribute("class", "d-none");
	document.getElementById("orderPage").setAttribute("class", "d-block");
};

const checkEmail = (mail) => {
	const mailFormat =
		/^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})*$/;
	return mail.value.match(mailFormat);
};
const checkInputText = (input) => {
	const textFormat =
		/^[A-Za-z\à\â\ä\é\è\ê\ë\ï\î\ô\ö\ù\û\ü\ÿ\ç\æ\œ\ \'\,\.\/\-]+$/;
	return input.value.match(textFormat);
};

const checkAddress = (address) => {
	const textFormat =
		/^[A-Za-z0-9\à\â\ä\é\è\ê\ë\ï\î\ô\ö\ù\û\ü\ÿ\ç\æ\œ\ \'\,\.\/\-]+$/;
	return address.value.match(textFormat);
};

const checkPostalCode = (postalCode) => {
	const postalcodeFormat = /^(F-)?((2[A|B])|[0-9]{2})[0-9]{3}$/;
	return postalCode.value.match(postalcodeFormat);
};

const displayInvalidInputStyle = (inputName, errorname) => {
	inputName.setAttribute("class", "inputText invalidInput");
	errorname.setAttribute("class", "d-block errorMessage");
};
const displayValidInputStyle = (inputName, errorname) => {
	inputName.setAttribute("class", "inputText validInput");
	errorname.setAttribute("class", "d-none errorMessage");
};
/// check input ///

const form = document.forms["contact"];

const checkValue = () => {
	const firstNameErrorMessage = document.getElementById("firstNameError");
	const lastNameErrorMessage = document.getElementById("lastNameError");
	const addressErrorMessage = document.getElementById("addressError");
	const postalCodeErrorMessage = document.getElementById("postalError");
	const cityErrorMessage = document.getElementById("cityError");
	const emailErrorMessage = document.getElementById("emailError");

	if (checkInputText(form.firstName) === null) {
		displayInvalidInputStyle(form.firstName, firstNameErrorMessage);
		return false;
	} else {
		displayValidInputStyle(form.firstName, firstNameErrorMessage);
	}
	if (checkInputText(form.lastName) === null) {
		displayInvalidInputStyle(form.lastName, lastNameErrorMessage);
		return false;
	} else {
		displayValidInputStyle(form.lastName, lastNameErrorMessage);
	}
	if (checkAddress(form.address) === null) {
		displayInvalidInputStyle(form.address, addressErrorMessage);
		return false;
	} else {
		displayValidInputStyle(form.address, addressErrorMessage);
	}
	if (checkPostalCode(form.postalCode) === null) {
		displayInvalidInputStyle(form.postalCode, postalCodeErrorMessage);
		return false;
	} else {
		displayValidInputStyle(form.postalCode, postalCodeErrorMessage);
	}
	if (checkInputText(form.city) === null) {
		displayInvalidInputStyle(form.city, cityErrorMessage);
		return false;
	} else {
		displayValidInputStyle(form.city, cityErrorMessage);
	}
	if (checkEmail(form.email) === null) {
		displayInvalidInputStyle(form.email, emailErrorMessage);
		return false;
	} else {
		displayValidInputStyle(form.email, emailErrorMessage);
	}
	return true;
};

const postRequest = async () => {
	if (checkValue() === true) {
		let ids = [];
		cart.forEach((product) => {
			ids.push(product._id);
		});
		const cartValidation = {
			contact: {
				firstName: form.firstName.value,
				lastName: form.lastName.value,
				address: form.address.value + " " + form.postalCode.value,
				city: form.city.value,
				email: form.email.value,
			},
			products: ids,
		};
		console.log(cartValidation);
		const myInit = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(cartValidation),
		};
		let response = await fetch(`${apiUrl}/api/cameras/order`, myInit);
		if (response.ok) {
			saveResponse = await response.json();
			sessionStorage.setItem("response", JSON.stringify(saveResponse));
			const openPage = (window.location = "confirm.html");
			openPage = await saveResponse;
		} else {
			document.getElementById("orderPage").setAttribute("class", "d-none");
			document.getElementById("errorPage").setAttribute("class", "d-block");
			console.log(response.status);
		}
	} else {
		checkValue();
	}
};
