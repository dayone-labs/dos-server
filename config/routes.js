const { requiresLogin } = require('./middlewares/authorization')
const users = require('../app/users')

module.exports = function (app, passport, pool) {
	app.get('/api/logout', users.logout)
	app.get('/api/ping', requiresLogin, users.ping)

	app.get('/admin/login', (req, res) => {
		res.render('login')
	})
	app.post('/admin/login', passport.authenticate('local', { failureRedirect: '/admin/login' }), (req, res) => {
		res.render('home')
	})

	app.use(function (err, req, res, next) {
		if (err.message && (~err.message.indexOf('not found'))) {
			return next()
		}

		console.error(err.stack)

		return res.status(500).json({error: 'Error on backend occurred.'})
	})

	app.use(function (req, res) {
		const payload = {
			url: req.originalUrl,
			error: 'Not found'
		}
		if (req.accepts('json')) return res.status(404).json(payload);

		res.status(404).render('404', payload)
	})
}

