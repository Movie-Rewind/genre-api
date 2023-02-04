const {ApplicationError} = require('@Movie-Rewind/core');

class GenreNotFoundError extends ApplicationError {
	constructor(message) {
		super(message);
		this.message = 'GenreNotFoundError';
	}
}

module.exports = GenreNotFoundError;
