const Genre = require('../../../../../domain/genre/Genre');
const MongoGenreRepository = require('../../../../../infrastructure/persistance/mongo/mongo-genre-repository');

describe('Genre repository', () => {
	const mongoDbHandlerMock = {getInstance: jest.fn()};
	const dbInstanceMock = {collection: jest.fn(), insertOne: jest.fn(), findOne: jest.fn()};
	const genreDocumentParserMock = {toDocument: jest.fn(), toDomain: jest.fn()};
	const genreMock = {
		id: 555,
		omdb_id: 619,
		name: 'Drama'
	}
	const collection = 'genres';

	afterEach(() => {
		jest.clearAllMocks();
	})

	beforeEach(() => {
		mongoGenreRepositoryMock = new MongoGenreRepository({
			mongoDbHandler: mongoDbHandlerMock,
			genreDocumentParser: genreDocumentParserMock
		});
	});

	test('Save function', async () => {
		const genreDomain = new Genre(genreMock);
		mongoDbHandlerMock.getInstance.mockReturnValue(dbInstanceMock);
		dbInstanceMock.collection.mockReturnValue(dbInstanceMock);
		dbInstanceMock.insertOne.mockReturnValue(true);
		genreDocumentParserMock.toDocument.mockReturnValue(genreMock);

		await mongoGenreRepositoryMock.save(genreDomain);

		expect(mongoDbHandlerMock.getInstance).toHaveBeenCalledTimes(1);
		expect(dbInstanceMock.collection).toHaveBeenCalledTimes(1);
		expect(dbInstanceMock.collection).toHaveBeenCalledWith(collection);
		expect(dbInstanceMock.insertOne).toHaveBeenCalledTimes(1);
		expect(dbInstanceMock.insertOne).toHaveBeenCalledWith(genreMock);

	});

	it('FindByOmdbId function success', async () => {
		const genreDomain = new Genre(genreMock);
		mongoDbHandlerMock.getInstance.mockReturnValue(dbInstanceMock);
		dbInstanceMock.collection.mockReturnValue(dbInstanceMock);
		dbInstanceMock.findOne.mockReturnValue(genreMock);
		genreDocumentParserMock.toDomain.mockReturnValue(genreDomain);

		const response = await mongoGenreRepositoryMock.findByOmdbId(genreMock.omdb_id);

		expect(mongoDbHandlerMock.getInstance).toHaveBeenCalledTimes(1);
		expect(dbInstanceMock.collection).toHaveBeenCalledTimes(1);
		expect(dbInstanceMock.collection).toHaveBeenCalledWith(collection);
		expect(dbInstanceMock.findOne).toHaveBeenCalledTimes(1);
		expect(dbInstanceMock.findOne).toHaveBeenCalledWith({omdb_id: genreMock.omdb_id});
		expect(response).toBe(genreDomain);
	});

	it('FindByOmdbId function error', async () => {
		const genreDomain = new Genre(genreMock);
		mongoDbHandlerMock.getInstance.mockReturnValue(dbInstanceMock);
		dbInstanceMock.collection.mockReturnValue(dbInstanceMock);
		dbInstanceMock.findOne.mockReturnValue(null);
		genreDocumentParserMock.toDomain.mockReturnValue(genreDomain);

		const response = await mongoGenreRepositoryMock.findByOmdbId(genreMock.omdb_id);

		expect(mongoDbHandlerMock.getInstance).toHaveBeenCalledTimes(1);
		expect(dbInstanceMock.collection).toHaveBeenCalledTimes(1);
		expect(dbInstanceMock.collection).toHaveBeenCalledWith(collection);
		expect(dbInstanceMock.findOne).toHaveBeenCalledTimes(1);
		expect(dbInstanceMock.findOne).toHaveBeenCalledWith({omdb_id: genreMock.omdb_id});
		expect(response).toBe(null);
	});
})