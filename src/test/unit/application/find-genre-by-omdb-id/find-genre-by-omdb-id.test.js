const Genre = require('../../../../domain/genre/Genre');
const FindGenreByOmdbId = require('../../../../application/find-genre-by-omdb-id/index')
const FindGenreByOmdbIdCommand = require('../../../../application/find-genre-by-omdb-id/find-genre-by-omdb-id-command')
const FindGenreByOmdbIdResponse = require('../../../../application/find-genre-by-omdb-id/find-genre-by-omdb-id-response');
const GenreNotFoundError = require('../../../../domain/genre/errors/genre-not-found-error');

describe('Find genre by omdb id', () => {
	const genreRepositoryMock = {findByOmdbId: jest.fn()};
	const id = 619;
	const genreMock = {
		'omdb_id': 619,
		id: 555,
		name: "Drama"
	}

	beforeEach(() => {
		findGenreByOmdbIdMock = new FindGenreByOmdbId({
			genreRepository: genreRepositoryMock
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	})

	test('Should find the genre', async () => {
		const foundGenre = new Genre(genreMock);
		genreRepositoryMock.findByOmdbId.mockReturnValue(foundGenre);

		const commandMock = new FindGenreByOmdbIdCommand({omdb_id: id});
		const response = await findGenreByOmdbIdMock.find(commandMock);

		expect(genreRepositoryMock.findByOmdbId).toHaveBeenCalledTimes(1);
		expect(genreRepositoryMock.findByOmdbId).toHaveBeenCalledWith(619);
		expect(response).toBeInstanceOf(FindGenreByOmdbIdResponse);
	});

	test('Should return genre not found error', async () => {
		genreRepositoryMock.findByOmdbId.mockReturnValue(null);
		const commandMock = new FindGenreByOmdbIdCommand({omdb_id: id});

		await expect(findGenreByOmdbIdMock.find(commandMock)).rejects.toThrow(GenreNotFoundError);

		expect(genreRepositoryMock.findByOmdbId).toHaveBeenCalledTimes(1);
		expect(genreRepositoryMock.findByOmdbId).toHaveBeenCalledWith(619);
	});
})