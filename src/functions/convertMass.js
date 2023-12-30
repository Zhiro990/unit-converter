module.exports = (from, to, number) => {
	let availableUnits = [
		"Gt",
		"Mt",
		"kt",
		"t",
		"kg",
		"g",
		"mg",
		"q",
		"lb",
		"oz",
		"gr",
		"ct"
	];

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
		tg: (x, y, z) =>
			z * 1000 ** -(availableUnits.indexOf(x) - availableUnits.indexOf(y)),
		g: {
			q: x => x / 100000,
			lb: x => x / 453.59237,
			oz: x => x / 28.349523125,
			gr: x => x * 15.4323583529,
			ct: x => x * 5
		},
		q: {
			g: x => x * 100000,
			lb: x => x * 220.4622621849,
			oz: x => x * 3527.396195,
			gr: x => x * 1543235.83529,
			ct: x => x * 500000
		},
		lb: {
			g: x => x * 453.59237,
			q: x => x / 220.4622621849,
			oz: x => x * 16,
			gr: x => x * 6999.9999995010485,
			ct: x => x * 2267.961849844431
		},
		oz: {
			g: x => x * 28.349523125,
			q: x => x * 3527.396195,
			lb: x => x / 16,
			gr: x => x * 437.4999999936214,
			ct: x => x * 141.7476156233139
		},
		gr: {
			g: x => x / 15.4323583529,
			q: x => x / 1543235.83529,
			lb: x => x / 6999.9999995010485,
			oz: x => x / 437.4999999936214,
			ct: x => x / 3.0864716705800004
		},
		ct: {
			g: x => x / 5,
			q: x => x / 500000,
			lb: x => x / 2267.961849844431,
			oz: x => x / 141.7476156233139,
			gr: x => x * 3.0864716705800004
		}
	};

	let tg = availableUnits.slice(0, 7);

	if (tg.includes(from) && tg.includes(to))
		return functions.tg(from, to, number);

	let current = from;
	let result = number;

	if (tg.includes(from) && from != "g") {
		result = functions.tg(from, "g", result);
		current = "g";
	}
	if (tg.includes(to) && to != "g") {
		if (current != "g") {
			result = functions[current]["g"](result);
		}
		result = functions.tg("g", to, result);
	} else {
		result = functions[current][to](result);
	}
	return result;
};
