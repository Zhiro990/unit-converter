module.exports = (from, to, number) => {
	let availableUnits = ["yr", "mo", "wk", "d", "h", "min", "s", "ms"];

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
		yr: {
			mo: x => x * 12,
			wk: x => x * 52.1429,
			d: x => x * 365,
			h: x => x * 8760,
			min: x => x * 525600,
			s: x => x * 31536000,
			ms: x => x * 31536000000
		},
		mo: {
			yr: x => x / 12,
			wk: x => x * 4.34524,
			d: x => x * 30.4167,
			h: x => x * 730.001,
			min: x => x * 43800,
			s: x => x * 2628002.88,
			ms: x => x * 262802880
		},
		wk: {
			yr: x => x / 52.1429,
			mo: x => x / 4.34524,
			d: x => x * 7,
			h: x => x * 168,
			m: x => x * 10080,
			s: x => x * 604800,
			ms: x => x * 604800000
		},
		d: {
			yr: x => x / 365,
			mo: x => x / 30.4167,
			wk: x => x / 7,
			h: x => x * 24,
			min: x => x * 1440,
			s: x => x * 86400,
			ms: x => x * 86400000
		},
		h: {
			yr: x => x / 8760,
			mo: x => x / 730.001,
			wk: x => x / 168,
			d: x => x / 24,
			min: x => x * 60,
			s: x => x * 3600,
			ms: x => x * 3600000
		},
		min: {
			yr: x => x / 525600,
			mo: x => x / 43800,
			wk: x => x / 10080,
			d: x => x / 1440,
			h: x => x / 60,
			s: x => x * 60,
			ms: x => x * 60000
		},
		s: {
			yr: x => x / 31536000,
			mo: x => x / 2628002.88,
			wk: x => x / 604800,
			d: x => x / 86400,
			h: x => x / 3600,
			min: x => x / 60,
			ms: x => x * 1000
		},
		ms: {
			yr: x => x / 31536000000,
			mo: x => x / 2628002880,
			wk: x => x / 604800000,
			d: x => x / 86400000,
			h: x => x / 3600000,
			min: x => x / 60000,
			s: x => x / 1000
		}
	};

	return functions[from][to](number);
};
