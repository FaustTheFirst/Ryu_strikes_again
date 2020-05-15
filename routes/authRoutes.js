const { Router } = require('express');
const AuthService = require('../services/authService');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.post('/login', (req, res, next) => {
        // TODO: Implement login action
    const checkEmail = AuthService.login({ email: req.headers.authorization });

    if(!checkEmail) {
        res.status(404).json({ error: true, message: "User is not found" });
    } else if(req.body.password !== checkEmail.password) {
        res.status(403).json({ error: true, message: "Wrong password" });
    } else {
        res.status(200).json({ message: "Access granted" });
    }
});

module.exports = router;