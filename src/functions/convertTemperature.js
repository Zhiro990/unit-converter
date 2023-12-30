module.exports = (from, to, number) => {
	let availableUnits = ["C", "F", "K", "R", "Re"];

	if (
		!from ||
		!to ||
		typeof from != "string" ||
		typeof to != "string" ||
		!availableUnits.includes(from) ||
		!availableUnits.includes(to)
	)
		throw "Invalid unit!";

	if (typeof number != "number") throw "Invalid number!";

	if (from == to) return number;

	let functions = {
		C: {
			F: x => x * (9 / 5) + 32,
			K: x => x + 273.15,
			R: x => x * (9 / 5) + 491.67,
			Re: x => x * (4 / 5)
		},
		F: {
			C: x => (x - 32) * (5 / 9),
			K: x => (x - 32) * (5 / 9) + 273.15,
			R: x => x + 459.67,
			Re: x => (x - 32) * (4 / 9)
		},
		K: {
			C: x => x - 273.15,
			F: x => (x - 273.15) * (9 / 5) + 32,
			R: x => (x - 273.15) * (9 / 5) + 491.67,
			Re: x => x * 237.15 * (4 / 5)
		},
		R: {
			C: x => (x - 491.67) * (5 / 9),
			F: x => x - 459.67,
			K: x => (x - 491.67) * (5 / 9) + 273.15,
			Re: x => (x - 491.67) * (4 / 9)
		},
		Re: {
			C: x => x * (5 / 4),
			F: x => x * (9 / 4) + 32,
			K: x => x * (5 / 4) + 273.15,
			R: x => x * (9 / 4) + 491.67
		}
	};

	return functions[from][to](number);
};
