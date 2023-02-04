class FindGenreByOmdbIdCommand {
	constructor({omdb_id}) {
		this._omdb_id = omdb_id;
	}

	get omdb_id() {
		return this._omdb_id;
	}

	set omdb_id(value) {
		this._omdb_id = value;
	}
}

module.exports = FindGenreByOmdbIdCommand;
