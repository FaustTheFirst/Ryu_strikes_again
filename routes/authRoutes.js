const { Router } = require('express');
const AuthService = require('../services/authService');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.post('/login', (req, res, next) => {
    try {
        // TODO: Implement login action
        AuthService.login(req.body);
        console.log('route LOGIN');
        res.data = data;
        console.log(res.data, 'data');
    } catch (err) {
        res.err = err;
        console.log(res.err, 'err');
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;