const { fighter } = require('../models/fighter');

const createFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during creation
    const temp = {};
    
    Object.keys(req.body).forEach(elem => {
        if(!fighter.hasOwnProperty(elem)) {
            temp[elem] = `${elem} is not defined for fighter`;
            return void 0;
        }

        if(req.body[elem] === '') {
            temp[elem] = `${elem} required`;
        } else if(req.body[elem].length > 64) {
            temp[elem] = `${elem} exceeds the characters limit`;
        }
    });

    if(!temp.health &&
        req.body.health > 100 &&
        req.body.health < 20) {
            temp.health = "Health value must be from 20 to 100";
        }

    if(!temp.power &&
        req.body.power > 10 &&
        req.body.power < 1) {
            temp.power = "Power value must be from 1 to 10";
        }

    if(!temp.defense &&
        req.body.defense > 10 &&
        req.body.defense < 1) {
            temp.defense = "Power value must be from 1 to 10";
        }

    if(!(Object.entries(temp).length === 0)) {
        res.status(400).json({ error: true, message: temp });
    } else {
        next();
    }
}

const updateFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during update
    const temp = {};
    
    Object.keys(req.body).forEach(elem => {
        if(!fighter.hasOwnProperty(elem)) {
            temp[elem] = `${elem} is not defined for fighter`;
            return void 0;
        }

        if(req.body[elem] === '') {
            temp[elem] = `${elem} required`;
        } else if(req.body[elem].length > 64) {
            temp[elem] = `${elem} exceeds the characters limit`;
        }
    });

    if(req.body.health &&
        !temp.health &&
        req.body.health > 100 &&
        req.body.health < 20) {
            temp.health = "Health value must be from 20 to 100";
        }

    if(req.body.power &&
        !temp.power &&
        req.body.power > 10 &&
        req.body.power < 1) {
            temp.power = "Power value must be from 1 to 10";
        }

    if(req.body.defense &&
        !temp.defense &&
        req.body.defense > 10 &&
        req.body.defense < 1) {
            temp.defense = "Power value must be from 1 to 10";
        }

    if(!(Object.entries(temp).length === 0)) {
        res.status(400).json({ error: true, message: temp });
    } else {
        next();
    }
}

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;