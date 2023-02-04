class FindGenreByOmdbIdResponse {
	constructor(genre) {
		this.genre = genre.toObject();
	}
}

module.exports = FindGenreByOmdbIdResponse;
