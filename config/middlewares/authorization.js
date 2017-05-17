module.exports = {
	requiresLogin: (req, res, next) => {
		if (req.user) return next()

		res.sendStatus(401)
	}
}
