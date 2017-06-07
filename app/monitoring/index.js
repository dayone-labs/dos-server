module.exports = {
	health: (pool) => (req, res, next) => {
		pool.connect((err, client, done) => {
			if(err) {
				winston.error('Error fetching client from pool on health check', err)
				return next(err)
			}

			client.query('SELECT 1', (err) => {
				done(err)

				if(err) {
					winston.error('Error running health check query on DB', err)
					return next(err)
				}

				res.sendStatus(200)
			})
		})
	}
}

