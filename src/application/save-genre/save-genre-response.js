class SaveGenreResponse {
	constructor(genre) {
		this.genre = genre.toObject();
	}
}

module.exports = SaveGenreResponse;
