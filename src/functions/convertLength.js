module.exports = (from, to, number) => {
	let availableUnits = [
		"km",
		"hm",
		"dam",
		"m",
		"dm",
		"cm",
		"mm",
		"in",
		"ft",
		"yd",
		"mi"
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
		metrics: (x, y, z) =>
			z * 10 ** -(availableUnits.indexOf(x) - availableUnits.indexOf(y)),
		m: {
			in: x => x / 0.0254,
			ft: x => x / 0.3048,
			yd: x => x / 0.9144,
			mi: x => x / 1609.344
		},
		in: {
			m: x => x * 0.0254,
			ft: x => x / 12,
			yd: x => x / 36,
			mi: x => x / 63600
		},
		ft: {
			m: x => x * 0.3048,
			in: x => x * 12,
			yd: x => x / 3,
			mi: x => x / 5280
		},
		yd: {
			m: x => x * 0.9144,
			in: x => x * 36,
			ft: x => x * 3,
			mi: x => x / 1760
		},
		mi: {
			m: x => x * 1609.344,
			in: x => x * 63600,
			ft: x => x * 5280,
			yd: x => x * 1760
		}
	};

	if (from.endsWith("m") && to.endsWith("m"))
		return functions.metrics(from, to, number);

	let current = from;
	let result = number;

	if (current.endsWith("m") && current != "m") {
		result = functions.metrics(current, "m", result);
		current = "m";
	}

	if (to.endsWith("m") && to != "m") {
		if (current != "m") {
			result = functions[current]["m"](result);
		}
		result = functions.metrics("m", to, result);
	} else {
		result = functions[current][to](result);
	}

	return result;
};
