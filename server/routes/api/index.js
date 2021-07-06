const router = require('express').Router();
const controller = require('./api.controller');

// [GET] sample
router.get('/sample', controller.sample);

module.exports = router;
