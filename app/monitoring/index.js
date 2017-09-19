const winston = require('winston')

module.exports = {
	health: (db) => (req, res, next) => {
		db.query('SELECT 1', (err) => {
			if(err) {
				winston.error('Error running health check query on DB', err)
				return next(err)
			}

			res.sendStatus(200)
		})
	}
}

