const FindGenreByOmdbIdResponse = require('./find-genre-by-omdb-id-response');
const GenreNotFoundError = require('../../domain/genre/errors/genre-not-found-error');

class FindGenreByOmdbId {
	constructor({genreRepository}) {
		this.genreRepository = genreRepository;
	}

	async find({omdb_id}) {
		const genre = await this.genreRepository.findByOmdbId(omdb_id);
		this._checkIfExistsGenre(genre);
		return new FindGenreByOmdbIdResponse(genre);
	}


	_checkIfExistsGenre(genre) {
		if (!genre) {
			throw new GenreNotFoundError('Genre not found');
		}
	}
}

module.exports = FindGenreByOmdbId;
