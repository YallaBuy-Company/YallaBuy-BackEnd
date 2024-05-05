const express = require('express');
const userController = require('../controllers/users');

const router = express.Router();

router.get('/', userController.getUsers);

router.post('/', );

router.get('/:id', );

router.put('/:id', );

router.delete('/:id', );

module.exports = router;
