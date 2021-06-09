/**
 * Recover cart in session storage and parse it
 *  * @param {amount: number, id: string,name: string, option: string,  price: number } product
 */
const cart = JSON.parse(sessionStorage.getItem("cart"));

/**
 * Check if cart is empty
 * If cart is empty display html empty message
 * Else display html content and calculate total cart price
 * @event onload
 */
window.addEventListener("load", () => {
	if (checkIfCartIsEmpty() === false) {
		displayHtmlContent();
		calculateCartPrice();
	}
});

/**
 * Find index of each product with id and selected option
 * Get template in html file
 * Update content with session storage object
 * Assign a unique id to each element
 * Assign function to add, substact and erase button
 * By passing the index as a parameter
 * Clone template
 * @param {lenses: [string], _id: string, name: string, price: number, description:  string, imageUrl: string} product
 * @param {index}
 */
displayHtmlContent = () => {
	cart.forEach((product) => {
		const index = cart.findIndex(
			(p) => p.id === product.id && p.option === product.option
		);
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

		const productAmount = cloneElt.getElementById("amount-");
		productAmount.textContent = product.amount;
		productAmount.setAttribute("id", "amount-" + index);

		const productPrice = cloneElt.getElementById("productPrice-");
		productPrice.textContent = priceInEuro;
		productPrice.setAttribute("id", "productPrice-" + index);

		const productTotalPrice = cloneElt.getElementById("productTotalPrice-");
		productTotalPrice.textContent = totalPriceInEuro;
		productTotalPrice.setAttribute("id", "productTotalPrice-" + index);
		/// Assign function to button ///
		const substractButton = cloneElt.getElementById("cart__lessAmountButton-");
		substractButton.setAttribute("onclick", `changeQuantity(${index}, 0)`);
		substractButton.setAttribute("id", "cart__lessAmountButton-" + index);

		const addButton = cloneElt.getElementById("cart__moreAmountButton-");
		addButton.setAttribute("onclick", `changeQuantity(${index}, 2)`);
		addButton.setAttribute("id", "cart__moreAmountButton-" + index);

		const eraseButton = cloneElt.getElementById("erasebutton-");
		eraseButton.setAttribute("onclick", `eraseProduct(${index})`);
		eraseButton.setAttribute("id", "erasebutton-" + index);

		/// Display html ///
		document.getElementById("cartBody").appendChild(cloneElt);
	});
};

/**
 * Function assigned to add and substact buttons
 * Change quantity of product and update the html content
 * Update product total price and cart total price
 * Operator add = 2 substract = 0
 * @param {*} index
 * @param {*} operator
 */

const changeQuantity = (index, operator) => {
	if (operator > 1) {
		cart[index].amount++;
	}
	if (operator < 1 && cart[index].amount > 1) {
		cart[index].amount--;
	}
	const amount = document.getElementById("amount-" + index);
	amount.textContent = cart[index].amount;
	const totalPrice = document.getElementById("productTotalPrice-" + index);
	totalPrice.textContent =
		((cart[index].price * cart[index].amount) / 1000).toFixed(2) + " €";
	sessionStorage.setItem("cart", JSON.stringify(cart));
	calculateCartPrice();
};

/**
 * Function assigned to erase button
 * Erase product with selected index
 * Update html content
 * @param {*} index
 */
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
/**
 * Dysplay message when cart is empty
 * @returns {false}
 */
const checkIfCartIsEmpty = () => {
	if (cart === null || cart.length === 0) {
		document.getElementById("cart").setAttribute("class", "d-none");
		document.getElementById("emptyCart").setAttribute("class", "d-block");
	} else {
		return false;
	}
};
/**
 * Calcul cart price and push result in storage
 */
const calculateCartPrice = () => {
	totalPrice = [];
	cart.forEach((product) => {
		const index = cart.indexOf(product);
		totalPrice.push(cart[index].amount * cart[index].price);
	});
	const reducer = (accumulator, currentValue) => accumulator + currentValue;
	const htmlCartPrice = document.getElementById("totalCartPrice");
	const cartPrice = totalPrice.reduce(reducer, 0);
	htmlCartPrice.textContent = (cartPrice / 1000).toFixed(2) + " €";

	sessionStorage.setItem("cartPrice", JSON.stringify(cartPrice));
};
/**
 * function assign to "Commander" button
 * Open order form
 */
const order = () => {
	document.getElementById("cartPage").setAttribute("class", "d-none");
	document.getElementById("orderPage").setAttribute("class", "d-block");
};

/**
 * Regex array
 * @array [0] Regex firstName type text
 * @index [1] Regex lastName type text
 * @array [2] Regex address type text + number
 * @index [3] Regex type postal code
 * @index [4] Regex city type text
 * @index [5] Regex type email
 */
const regex = [
	/^[A-Za-z\à\â\ä\é\è\ê\ë\ï\î\ô\ö\ù\û\ü\ÿ\ç\æ\œ\ \'\,\.\/\-]+$/,
	/^[A-Za-z\à\â\ä\é\è\ê\ë\ï\î\ô\ö\ù\û\ü\ÿ\ç\æ\œ\ \'\,\.\/\-]+$/,
	/^[A-Za-z0-9\à\â\ä\é\è\ê\ë\ï\î\ô\ö\ù\û\ü\ÿ\ç\æ\œ\ \'\,\.\/\-]+$/,
	/^(F-)?((2[A|B])|[0-9]{2})[0-9]{3}$/,
	/^[A-Za-z\à\â\ä\é\è\ê\ë\ï\î\ô\ö\ù\û\ü\ÿ\ç\æ\œ\ \'\,\.\/\-]+$/,
	/^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})*$/,
];

/**
 * Get order form
 * @constant {form}
 */
const form = document.forms["contact"];

/**
 * Auto call function
 * Assign function to each input whith id in param
 * Create array and puch all input id
 * @param {input}
 */
const arrayOfInput = [];
(() => {
	for (input of form) {
		arrayOfInput.push(input.id);
		input.setAttribute("oninput", `checkInput(${input.id})`);
	}
})();

/**
 * Function assigned to input
 * Compare input values ​​with regex
 * Depending on the result displays an error message and changes the style
 * @param {*} input
 * @event input
 */
const checkInput = (input) => {
	const index = arrayOfInput.indexOf(input.id);
	if (
		regex[index].test(form[index].value) !== true ||
		form[index].value.length < 1
	) {
		document
			.getElementById(input.id)
			.setAttribute("class", "inputText invalidInput");
		document
			.getElementById("errorMessage-" + input.id)
			.setAttribute("class", "errorMessageShow");
	} else {
		document
			.getElementById(input.id)
			.setAttribute("class", "inputText validInput");
		document
			.getElementById("errorMessage-" + input.id)
			.setAttribute("class", "errorMessageHide");
	}
};

/**
 * Check if there are empty inputs
 * Depending on the result displays an error message and changes the style
 * @event onclick
 */
const checkEmptyInput = () => {
	arrayOfInput.forEach((input) => {
		const index = arrayOfInput.indexOf(input);
		if (regex[index].test(form[input].value) !== true) {
			document.getElementById(input).setAttribute("class", "invalidInput");
			document
				.getElementById("emptyFormMessage")
				.setAttribute("class", "errorMessageShow");
		}
	});
};

/**
 * Compare all input whith regex
 * If there is an error return false
 * Else return true
 * @returns {true, false}
 * @event onclick
 */
const checkValue = () => {
	if (
		regex[0].test(form.firstName.value) !== true ||
		regex[1].test(form.lastName.value) !== true ||
		regex[2].test(form.address.value) !== true ||
		regex[3].test(form.postalCode.value) !== true ||
		regex[4].test(form.city.value) !== true ||
		regex[5].test(form.email.value) !== true
	) {
		return false;
	} else {
		return true;
	}
};

/**
 * If checkvalue return true
 * Create array of product id
 * Creates an array of id of all products in the cart
 * Creates contact object to send to server
 * Send Object to server
 * If response is ok push response in session storage
 * Open confirmation page
 * Else display error page
 * If checkValue return false return
 * @async
 * @event onclick
 */
const postRequest = async () => {
	checkEmptyInput();
	if (checkValue() === true) {
		const ids = cart.map((product) => {
			return product.id;
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
		return;
	}
};
