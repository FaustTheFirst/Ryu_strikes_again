const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

router.get('/', (req, res, next) => {
    const listOfFighters = FighterService.showList('fighters');
    if(!listOfFighters) {
        res.status(404).json({
            error: true,
            messsage: "List of fighters is empty"
        });
    } else {
        req.body = listOfFighters;
        next();
    }
}, responseMiddleware, (req, res) => {
    res.status(200).json({ "All fighters": req.body });
});

router.get('/:id', (req, res, next) => {
    const findOfFighter = FighterService.search({ id: req.params.id });
    if(!findOfFighter) {
        res.status(404).json({
            error: true,
            messsage: "Fighter is not found"
        });
    } else {
        req.body = findOfFighter;
        next();
    }
}, responseMiddleware, (req, res) => {
    res.status(200).json({ "Fighter found": req.body });
});

router.post('/', (req, res, next) => {
    if(FighterService.search( {email: req.body.email} )) {
        res.status(400).json({ 
            error: true,
        messsage: "Email already exists" });
    } else {
        next();
    }
}, createFighterValid, (req, res, next) => {
    const createOfFighter = FighterService.createFighter(req.body);
    if(!createOfFighter) {
        res.status(400).json({
            error: true,
            messsage: "Failed to create fighter"
        });
    } else {
        req.body = createOfFighter;
        next();
    }
}, responseMiddleware, (req, res) => {
    res.status(200).json({ "Fighter created": req.body });
});

router.put('/:id', updateFighterValid, (req, res, next) => {
    const updateOfFighter = FighterService.updateFighter(req.params.id, req.body);
    if(!updateOfFighter) {
        res.status(400).json({
            error: true,
            messsage: "Fighter is not updated"
        });
    } else {
        req.body = updateOfFighter;
        next();
    }
}, responseMiddleware, (req, res) => {
    res.status(200).json({ "Fighter updated": req.body });
});

router.delete('/:id', (req, res, next) => {
    const deleteOfFighter = FighterService.deleteFighter(req.params.id);
    if(!deleteOfFighter) {
        res.status(404).json({
            error: true,
            messsage: "Fighter is not found"
        });
    } else {
        req.body = deleteOfFighter;
        next();
    }
}, responseMiddleware, (req, res) => {
    res.status(200).json({ "Fighter deleted": req.body });
});

// TODO: Implement route controllers for fighter

module.exports = router;