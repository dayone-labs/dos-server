module.exports = {
	requiresLogin: (req, res, next) => {
		if (req.user) return next()

		res.sendStatus(401)
	},

	requiresAdmin: (req, res, next) => {
		if (req.user && req.user.type === 'admin') return next()

		res.sendStatus(401)
	}
}
