require('dotenv').config()

const express = require('express')
const passport = require('passport')
const pg = require('pg')
const winston = require('winston')
const config = require('./config')

const port = process.env.PORT || 9000
const app = express()

const dbConfig = {
	user: config.db.user,
	password: config.db.password,
	database: config.db.database,
	host: config.db.host,
	port: config.db.port,
	max: config.db.max,
	idleTimeoutMillis: config.db.idleTimeoutMillis,
}

const pool = new pg.Pool(dbConfig)
pool.on('error', function (err) {
	winston.error('idle client error', err.message, err.stack)
})

module.exports = app

require('./config/passport')(passport, pool)
require('./config/express')(app, passport, pool)
require('./config/routes')(app, passport, pool)

app.listen(port, () => {
	if(app.get('env') === 'test') return

	winston.log('Express app started on port ' + port)
})
