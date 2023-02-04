const Genre = require('../../../../domain/genre/Genre');
const SaveGenre = require('../../../../application/save-genre/index');
const SaveGenreCommand = require('../../../../application/save-genre/save-genre-command');
const GenreAlreadyExistsError = require('../../../../domain/genre/errors/genre-already-exists-error');

describe('Save genre', () => {
	const genreRepositoryMock = {save: jest.fn(), findByOmdbId: jest.fn()};
	const idGeneratorMock = {generate: jest.fn()};
	const genreMock = {
		id: 999,
		name: 'Drama'
	}

	afterEach(() => {
		jest.clearAllMocks()
	});

	beforeEach(() => {
		saveGenreMock = new SaveGenre({
			genreRepository: genreRepositoryMock,
			idGenerator: idGeneratorMock
		});
	});

	test('Should save genre with correct data', async () => {
		const idMock = 619;
		const commandMock = new SaveGenreCommand(genreMock);
		const genreToSave = new Genre({id: idMock, ...genreMock});
		idGeneratorMock.generate.mockReturnValue(idMock);

		await saveGenreMock.save(commandMock);
		genreToSave.omdb_id = 999
		genreToSave.id = idMock

		expect(genreRepositoryMock.save).toHaveBeenCalledTimes(1);

		expect(genreRepositoryMock.save).toHaveBeenCalledWith(genreToSave);

		expect(idGeneratorMock.generate).toHaveBeenCalledTimes(1);

		expect(genreRepositoryMock.findByOmdbId).toHaveBeenCalledTimes(1);
		expect(genreRepositoryMock.findByOmdbId).toHaveBeenCalledWith(999);
	});

	test('Should return genre already exists error', async () => {
		genreRepositoryMock.findByOmdbId.mockReturnValue({});

		const commandMock = new SaveGenreCommand(genreMock);

		await expect(saveGenreMock.save(commandMock)).rejects.toThrow(GenreAlreadyExistsError);
		expect(genreRepositoryMock.findByOmdbId).toHaveBeenCalledTimes(1);
		expect(genreRepositoryMock.findByOmdbId).toHaveBeenCalledWith(999);
		expect(idGeneratorMock.generate).toHaveBeenCalledTimes(0);
	});
});