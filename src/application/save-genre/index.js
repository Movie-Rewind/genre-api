const Genre = require('../../domain/genre/Genre');
const SaveGenreResponse = require('./save-genre-response');
const GenreAlreadyExistsError = require('../../domain/genre/errors/genre-already-exists-error');

class SaveGenre {
	constructor({genreRepository, idGenerator}) {
		this.genreRepository = genreRepository;
		this.idGenerator = idGenerator;
	}

	async save(genre) {
		const queryGenre = await this.genreRepository.findByOmdbId(genre.id);

		this._checkIfExistsGenre(queryGenre);

		const genreDomain = new Genre(this._parseIds(genre));

		await this.genreRepository.save(genreDomain);
		return new SaveGenreResponse(genreDomain);
	}

	_parseIds(genre) {
		genre.omdb_id = genre.id;
		genre.id = this.idGenerator.generate();
		return genre;
	}

	_checkIfExistsGenre(genre) {
		if (genre) {
			throw new GenreAlreadyExistsError('Genre already exists');
		}
	}
}

module.exports = SaveGenre;
