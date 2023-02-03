require('dotenv').config();
const {gracefulStopper} = require('@Movie-Rewind/core');
const express = require('express');
const container = require('./container');
const helmet = require('helmet');
const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());

const internalRoutes = require('./infrastructure/http/internal-controller.js');

app.use('/internal', internalRoutes);

const signals = ['SIGTERM', 'SIGINT', 'SIGUSR1', 'SIGUSR2'];
signals.map((signal) => process.on(signal, () => {
	const dbHandler = container.resolve('mongoDbHandler');
	gracefulStopper({dbHandler});
}));

app.listen(port, () => {
	console.log(`Template api listening: [${port}]`);
});
