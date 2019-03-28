const express = require('express');
const router = express.Router();
const authorizationControllers = require('../controllers/authorization');
const accountsControllers = require('../controllers/accounts');
const { upload } = require('../utils/configs');


// /api/accounts/signup => POST
router.post('/signup', authorizationControllers.signup);
// /api/accounts/login => POST
router.post('/login', authorizationControllers.login);
// /api/accounts/authorization => GET
router.get('/authorization', authorizationControllers.authorization);
// /api/accounts/search => GET
router.get('/search', accountsControllers.searchSimilarAccount);
// /api/accounts => GET
router.get('/', accountsControllers.getAccount);
// /api/accounts/avatar => PUT
router.put('/avatar', upload.single('avatar'), accountsControllers.changeAvatar);
// /api/accounts/follow => PUT
router.put('/follow', accountsControllers.follow);
// /api/accounts/unfollow => PUT
router.put('/unfollow', accountsControllers.unfollow);

module.exports = router;