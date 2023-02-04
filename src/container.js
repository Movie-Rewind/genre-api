const awilix = require('awilix');


const {v4: uuidv4} = require('uuid');

const mongoDbHandler = require('./infrastructure/persistance/mongo/db-handler');
const {logger} = require('@Movie-Rewind/core');
const {idGenerator} = require('@Movie-Rewind/core');
const MUUID = require('uuid-mongodb');

// Commands
const SaveGenre = require('./application/save-genre');
const FindGenreByOmdbId = require('./application/find-genre-by-omdb-id');

// Repositories
const MongoGenreRepository = require('./infrastructure/persistance/mongo/mongo-genre-repository');

// Parsers
const genreDocumentParser = require('./domain/genre/services/genre-document-parser');

const container = awilix.createContainer({
	injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
	mongoDbHandler: awilix.asFunction(mongoDbHandler),
	logger: awilix.asValue(logger),
	muuid: awilix.asValue(MUUID),
	idGenerator: awilix.asFunction(idGenerator),
	uuidv4: awilix.asValue(uuidv4),
	saveGenre: awilix.asClass(SaveGenre),
	findGenreByOmdbId: awilix.asClass(FindGenreByOmdbId),
	genreDocumentParser: awilix.asFunction(genreDocumentParser),
	genreRepository: awilix.asClass(MongoGenreRepository),
});

module.exports = container;
