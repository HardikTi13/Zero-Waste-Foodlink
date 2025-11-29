const express = require('express');
const router = express.Router();
const { getNgos, createNgo } = require('../controllers/ngoController');

router.get('/', getNgos);
router.post('/', createNgo);

module.exports = router;