module.exports = {
	renderLogin: (req, res) => {
		res.render('login')
	},

	login: (req, res) => {
		if(req.user.type === 'admin') {
			res.redirect('/admin/panel')
		} else {
			res.redirect('/admin/login')
		}
	},

	renderPanel: (req, res) => {
		res.render('admin-panel')
	}
}
