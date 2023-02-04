const Genre = require('../Genre');

const mongoGenreParser = ({muuid}) => {
	return {
		toDomain: ({
			_id,
			omdb_id,
			name,
		}) => {
			const id = (muuid.from(_id)).toString();
			return new Genre({
				id,
				omdb_id,
				name,

			});
		},
		toDocument: ({
			id,
			omdb_id,
			name,
		}) => {
			const _id = muuid.from(id);
			return {
				_id,
				omdb_id,
				name,
			};
		},
	};
};

module.exports = mongoGenreParser;
