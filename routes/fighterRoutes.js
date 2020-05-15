const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

router.get('/', (req, res) => {
    res.send('List of fighter');
});

router.get('/:id', (req, res) => {
    res.send(`Fighter with id: ${req.params.id}`);
});

router.post('/', (req, res) => {
    res.send('Create fighter');
});

router.put('/:id', (req, res) => {
    res.send(`Update fighter ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`Delete fighter ${req.params.id}`);
});

// TODO: Implement route controllers for fighter

module.exports = router;