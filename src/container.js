const awilix = require('awilix');

const mongoDbHandler = require('./infrastructure/persistance/mongo/db-handler');
const {logger} = require('@Movie-Rewind/core');
const MUUID = require('uuid-mongodb');
const container = awilix.createContainer({
	injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
	mongoDbHandler: awilix.asFunction(mongoDbHandler),
	logger: awilix.asValue(logger),
	muuid: awilix.asValue(MUUID),
});

module.exports = container;
