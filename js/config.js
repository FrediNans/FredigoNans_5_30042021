/**
 * Switch url for using localhost
 * @param {url}
 */

const findHost = () => {
	const herokuUrl = "https://projet5-orinoco.herokuapp.com";
	const localUrl = "http://localhost:3000";
	if (location.hostname === "127.0.0.1") {
		return localUrl;
	} else {
		return herokuUrl;
	}
};
const apiUrl = findHost();
console.log(findHost());
