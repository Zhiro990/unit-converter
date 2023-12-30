module.exports = (from, to, number) => {
	let availableUnits = [
		"QB",
		"RB",
		"YB",
		"ZB",
		"EB",
		"PB",
		"TB",
		"GB",
		"MB",
		"kB",
		"B",
		"Qb",
		"Rb",
		"Yb",
		"Zb",
		"Eb",
		"Pb",
		"Tb",
		"Gb",
		"Mb",
		"kb",
		"b",
		"QiB",
		"RiB",
		"YiB",
		"ZiB",
		"EiB",
		"PiB",
		"TiB",
		"GiB",
		"MiB",
		"KiB",
		"Qib",
		"Rib",
		"Yib",
		"Zib",
		"Eib",
		"Pib",
		"Tib",
		"Gib",
		"Mib",
		"Kib"
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

	let tier = {
		Q: 11,
		R: 10,
		Y: 9,
		Z: 8,
		E: 7,
		P: 6,
		T: 5,
		G: 4,
		M: 3,
		K: 2,
		k: 2,
		B: 1,
		b: 1
	};

	let functions = {
		updown: (x, y, z, _) => {
			if (_ == 1) {
				return z * 1000 ** (tier[x[0]] - tier[y[0]]);
			} else {
				return z * 1024 ** (tier[x[0]] - tier[y[0]]);
			}
		}
	};

	if (
		((from.endsWith("iB") || from == "B") &&
			(to.endsWith("iB") || to == "B")) ||
		((from.endsWith("ib") || from == "b") && (to.endsWith("ib") || to == "b"))
	) {
		return functions.updown(from, to, number, 2);
	} else if (
		(from.length < 3 &&
			from.endsWith("B") &&
			to.length < 3 &&
			to.endsWith("B")) ||
		(from.length < 3 && from.endsWith("b") && to.length < 3 && to.endsWith("b"))
	) {
		return functions.updown(from, to, number, 1);
	}

	let current = from;
	let result = number;

	if (current.length > 1) {
		if (current.endsWith("B")) {
			if (current.includes("i")) {
				result = functions.updown(current, "B", result, 2);
			} else {
				result = functions.updown(current, "B", result, 1);
			}
			current = "B";
		} else {
			if (current.includes("i")) {
				result = functions.updown(current, "b", result, 2);
			} else {
				result = functions.updown(current, "b", result, 1);
			}
			current = "b";
		}
	}

	if (current != to.at(-1)) {
		if (to.endsWith("B")) {
			result = result / 8;
			current = "B";
		} else {
			result = result * 8;
			current = "b";
		}
	}

	if (to.length == 1) return result;

	if (to.includes("i")) {
		result = functions.updown(current, to, result, 2);
	} else {
		result = functions.updown(current, to, result, 1);
	}

	return result;
};
