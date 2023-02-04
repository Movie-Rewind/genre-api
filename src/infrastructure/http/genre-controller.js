const express = require('express');
const SaveGenreCommand = require('../../application/save-genre/save-genre-command');
const router = express.Router();
const container = require('../../container');
const GenreAlreadyExistsError = require('../../domain/genre/errors/genre-already-exists-error');
const GenreNotFoundError = require('../../domain/genre/errors/genre-not-found-error');
const FindGenreByOmdbIdCommand = require('../../application/find-genre-by-omdb-id/find-genre-by-omdb-id-command');


router.post('/', async (req, res, next) => {
	const genre = req.body;
	try {
		const command = new SaveGenreCommand(genre);
		const saveGenre = container.resolve('saveGenre');
		const response = await saveGenre.save(command);
		res.status(201).json(response);
	} catch (error) {
		if (error instanceof GenreAlreadyExistsError) {
			return res.status(400).json({
				message: error.message,
				description: 'The id is in database',
			});
		}
		next(error);
	}
});

router.get('/omdb/:omdb_id', async (req, res, next) => {
	const {omdb_id} = req.params;
	try {
		const command = new FindGenreByOmdbIdCommand({omdb_id});
		const findGenreByOmdbId = container.resolve('findGenreByOmdbId');
		const response = await findGenreByOmdbId.find(command);
		res.status(200).json({...response});
	} catch (error) {
		if (error instanceof GenreNotFoundError) {
			return res.status(404).json({
				message: error.message,
				description: 'The genre not found',
			});
		}
		next(error);
	}
});

module.exports = router;
