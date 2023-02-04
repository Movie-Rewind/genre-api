class GenreRepository {
	constructor() {
		this.collection = 'genres';
	}

	async findById(id) {
		throw new Error('Method not implemented yet');
	}

	async getAll() {
		throw new Error('Method not implemented yet');
	}

	async save(genre) {
		throw new Error('Method not implemented yet');
	}

	async update(genre) {
		throw new Error('Method not implemented yet');
	}

	async delete(id) {
		throw new Error('Method not implemented yet');
	}

	async findByOmdbId(omdb_id) {
		throw new Error('Method not implemented yet');
	}
}

module.exports = GenreRepository;
