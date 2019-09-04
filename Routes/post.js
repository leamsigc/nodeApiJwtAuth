const router = require('express').Router();
const checkAuth = require('../Midleware');
router.get('/', checkAuth, (req, res) => {
	res.json({
		posts: {
			title: 'Simple test Post here',
			description: 'Simple Description for this post here '
		}
	});
	// res.send(req.user);
});

module.exports = router;
