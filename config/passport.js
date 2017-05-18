const winston = require('winston')
const LocalStrategy = require('passport-local').Strategy

module.exports = (passport, pool) => {
	passport.use(new LocalStrategy((username, password, cb) => {
		pool.connect((err, client, done) => {
			if(err) {
				winston.error('Error fetchning client from pool', err)
				return cb(err)
			}

			client.query('SELECT id, username FROM users WHERE username=$1 AND password=$2', [username, password], (err, result) => {
				done(err)

				if(err) {
					winston.error('Error when selecting user on login', err)
					return cb(err)
				}

				if(result.rows.length > 0) {
					cb(null, result.rows[0])
				} else {
					cb(null, false)
				}
			})
		})
	}
	))

	passport.serializeUser((user, done) => {
		done(null, user.id)
	})

	passport.deserializeUser((id, cb) => {
		pool.connect((err, client, done) => {
			if(err) {
				winston.error('error fetchning client from pool', err)
				return cb(err)
			}

			client.query('SELECT id, username FROM users WHERE id = $1', [parseInt(id, 10)], (err, results) => {
				done(err)

				if(err) {
					winston.error('Error when selecting user on session deserialize', err)
					return cb(err)
				}

				cb(null, results.rows[0])
			})
		})
	})
}
