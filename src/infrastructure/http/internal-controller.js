const express = require('express');
const router = express.Router();
const container = require('../../container');

router.get('/liveness', (req, res) => {
	return res.status(200).json({response: 'I\'m alive'});
});

router.get('/readiness', async (req, res) => {
	let ready = true;
	const dbHandler = container.resolve('mongoDbHandler');
	try {
		const services = [await dbHandler.getInstance()];
		services.forEach((service) => {
			if (!service) {
				ready = false;
			}
		});
		if (!ready) {
			return res.status(500).json({response: 'Not ready'});
		}

		return res.status(200).json({response: 'I\'m ready'});
	} catch (err) {
		console.error(err);
		return res.status(500).json({response: 'Not ready'});
	}
});

module.exports = router;
