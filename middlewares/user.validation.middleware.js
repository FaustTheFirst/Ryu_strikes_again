const { user } = require('../models/user');
const createUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during creation

    const temp = {};
    const emailValidPattern = /^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@gmail.com$/;
    const phoneNumberValidPattern = /^\+380\d{9}$/;
    
    Object.keys(req.body).forEach(elem => {
        if(!user.hasOwnProperty(elem)) {
            temp[elem] = `${elem} is not defined for user`;
            return void 0;
        }

        if(req.body[elem] === '') {
            temp[elem] = `${elem} required`;
        } else if(req.body[elem].length > 64) {
            temp[elem] = `${elem} exceeds the characters limit`;
        }
    });

    if(!temp.email && 
        !req.body.email.match(emailValidPattern)) {
        temp.email = 'Invalid email';
    }

    if(!temp.password && 
        req.body.password.length < 3) {
        temp.password = 'Password is too short';
    }

    if(!temp.phoneNumber && 
        !req.body.phoneNumber.match(phoneNumberValidPattern)) {
        temp.phoneNumber = 'Invalid phone number';
    }

    if(!(Object.entries(temp).length === 0)) {
        res.status(400).json({ error: true, message: temp });
    } else {
        next();
    }
}

const updateUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during update

    const temp = {};
    const emailValidPattern = /^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@gmail.com$/;
    const phoneNumberValidPattern = /^\+380\d{9}$/;
    
    Object.keys(req.body).forEach(elem => {
        if(!user.hasOwnProperty(elem)) {
            temp[elem] = `${elem} is not defined for user`;
            return void 0;
        }
        
        if(req.body[elem] === '') {
            temp[elem] = `${elem} required`;
        } else if(req.body[elem].length > 64) {
            temp[elem] = `${elem} exceeds the characters limit`;
        }
    });

    if(req.body.email && 
        !temp.email && 
        !req.body.email.match(emailValidPattern)) {
        temp.email = 'Invalid email';
    }

    if(req.body.password && 
        !temp.password && 
        req.body.password.length < 3) {
        temp.password = 'Password is too short';
    }

    if(req.body.phoneNumber && 
        !temp.phoneNumber && 
        !req.body.phoneNumber.match(phoneNumberValidPattern)) {
        temp.phoneNumber = 'Invalid phone number';
    }

    if(!(Object.entries(temp).length === 0)) {
        res.status(400).json({ error: true, message: temp });
    } else {
        next();
    }
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;