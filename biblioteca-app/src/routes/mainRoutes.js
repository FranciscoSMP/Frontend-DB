const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.home);
router.post('/insert', mainController.insertData);

module.exports = router;
