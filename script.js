const strengthMeter = document.querySelector("#strength-meter");
const passwordInput = document.querySelector("#password-input");
const reasonsContainer = document.querySelector("#reasons");

passwordInput.addEventListener("input", updateStrengthMeter);

updateStrengthMeter();

function updateStrengthMeter() {
	const weaknesses = calculatePasswordStrength(passwordInput.value);
	let strength = 100;
	reasonsContainer.innerHTML = "";

	weaknesses?.forEach((weakness) => {
		if (weakness == null) return;
		strength -= weakness.deduction;
		reasonsContainer.innerHTML += `<div>${weakness.meesage}</div>`;
	});
	console.log(strength);
	strengthMeter.style.setProperty("--strength", strength);
}

function calculatePasswordStrength(password) {
	const weakness = [];
	weakness.push(lenthWeakness(password));
	weakness.push(lowercaseWeakness(password));
	weakness.push(uppercaseWeakness(password));
	weakness.push(numberWeakness(password));
	weakness.push(specialCharactersWeakness(password));
	weakness.push(repeatCharactersWeakness(password));
	return weakness;
}

function lenthWeakness(password) {
	const length = password.length;

	if (length <= 5) {
		return {
			meesage: "Your password is too short.",
			deduction: 40,
		};
	}

	if (length <= 10) {
		return {
			meesage: "Your password could be longer.",
			deduction: 15,
		};
	}
}

function lowercaseWeakness(password) {
	return characterTypeWeakness(password, /[a-z]/g, "lowercase charaters");
}
function uppercaseWeakness(password) {
	return characterTypeWeakness(password, /[A-Z]/g, "uppercase charaters");
}
function numberWeakness(password) {
	return characterTypeWeakness(password, /[0-9]/g, "number");
}
function specialCharactersWeakness(password) {
	return characterTypeWeakness(
		password,
		/[^0-9a-zA-Z\s]/g,
		"special characters"
	);
}
function characterTypeWeakness(password, regex, type) {
	const matches = password.match(regex) || [];

	if (matches.length === 0) {
		return {
			meesage: `Your password has no ${type}.`,
			deduction: 20,
		};
	}
	if (matches.length <= 2) {
		return {
			meesage: `Your password could use more ${type}.`,
			deduction: 5,
		};
	}
}

function repeatCharactersWeakness(password) {
	const matches = password.match(/(.)\1/g) || [];
	if (matches.length > 0) {
		return {
			meesage: `Your password has ${matches.length} sets of repeat characters.`,
			deduction: matches.length * 10,
		};
	}
}
