const container = require('../container');
function gracefultStopper() {
	console.log('SIGNAL RECEIVED. STOPPING');
	const dbHandler = container.resolve('mongoDbHandler');
	dbHandler.disconnect();
	console.log('SIGNAL PROCESSED. STOPPED');
	process.exit(0);
}

module.exports = gracefultStopper;
