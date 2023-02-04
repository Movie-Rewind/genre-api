class Genre {
	constructor({
		id,
		name,
		omdb_id,
	}) {
		this._id = id;
		this._name = name;
		this._omdb_id = omdb_id;
	}

	get id() {
		return this._id;
	}

	get name() {
		return this._name;
	}

	get omdb_id() {
		return this._omdb_id;
	}

	set id(value) {
		this._id = value;
	};

	set name(value) {
		this._name = value;
	}

	set omdb_id(value) {
		this._omdb_id = value;
	}

	toObject() {
		const jsonReturn = {};
		const properties = Object.getOwnPropertyNames(this);
		for (let i = 0; i < properties.length; i++) {
			jsonReturn[properties[i].replace('_', '')] = this[properties[i]];
		}
		return jsonReturn;
	}
}

module.exports = Genre;
