const {ApplicationError} = require('@Movie-Rewind/core');

class GenreAlreadyExistsError extends ApplicationError {
	constructor(message) {
		super(message);
		this.message = 'GenreAlreadyExistsError';
	}
}

module.exports = GenreAlreadyExistsError;
