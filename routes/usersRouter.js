const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logout } = require('../controllers/authController');

router.get('/', (req, res) => {
    res.send('Hello, this is the users route!');
});

router.post('/register', registerUser);


module.exports = router;