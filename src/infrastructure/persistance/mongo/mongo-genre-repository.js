const GenreRepository = require('../repositories/genre-repository');

class MongoGenreRepository extends GenreRepository {
	constructor({mongoDbHandler, genreDocumentParser}) {
		super();
		this.mongoDbHandler = mongoDbHandler;
		this.genreDocumentParser = genreDocumentParser;
	}

	async save(genre) {
		const db = await this.mongoDbHandler.getInstance();
		try {
			const genreDocument = this.genreDocumentParser.toDocument(genre);
			await db.collection(this.collection).insertOne(genreDocument);
		} catch (e) {
			throw new Error(e);
		}
	}

	async findByOmdbId(omdb_id) {
		const db = await this.mongoDbHandler.getInstance();
		try {
			const genreDocument = await db.collection(this.collection).findOne({omdb_id: parseInt(omdb_id)});
			return genreDocument ? this.genreDocumentParser.toDomain(genreDocument) : null;
		} catch (e) {
			throw new Error(e);
		}
	}
}

module.exports = MongoGenreRepository;
