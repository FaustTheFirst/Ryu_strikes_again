const { user } = require('../models/user');
const UserService = require('../services/userService');
const createUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during creation

    const temp = {};
    const emailValidPattern = /^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@gmail.com$/;
    const phoneNumberValidPattern = /^\+380\d{9}$/;
    
    Object.keys(user).filter(elem => elem !== 'id').forEach(elem => {
        if(!req.body.hasOwnProperty(elem)) {
            temp[elem] = `${elem} is required`;
        }
    });
    
    Object.keys(req.body).forEach(elem => {
        if(!user.hasOwnProperty(elem) || elem === 'id') {
            temp[elem] = `${elem} is not defined for user`;
            return void 0;
        }

        if(req.body[elem] === '') {
            temp[elem] = `${elem} is empty`;
        } else if(req.body[elem].length > 64) {
            temp[elem] = `${elem} exceeds the characters limit`;
        }
    });

    if(!temp.email) {
        if(UserService.search({ email: req.body.email })) {
            temp.email = 'Email already exists';
        } else if(!req.body.email.match(emailValidPattern)) {
            temp.email = 'Invalid email';
        }
    }
    
    if(!temp.phoneNumber) {
        if(UserService.search({ phoneNumber: req.body.phoneNumber })) {
            temp.phoneNumber = 'Phone number already exists';
        } else if(!req.body.phoneNumber.match(phoneNumberValidPattern)) {
            temp.phoneNumber = 'Invalid phone number';}
    }

    if(!temp.password && 
        req.body.password.length < 3) {
        temp.password = 'Password is too short';
    }

    if(!(Object.entries(temp).length === 0)) {
        res.status(400).json({ error: true, message: temp });
    } else {
        next();
    }
}

const updateUserValid = (req, res, next) => {

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
        !temp.email) {
            if(!req.body.email.match(emailValidPattern)) {
                temp.email = 'Invalid email';
            } else if(UserService.search({ email: req.body.email })) {
                temp.email = 'Email already exists';
            }
    }

    if(req.body.phoneNumber && 
        !temp.phoneNumber) {
            if(!req.body.phoneNumber.match(phoneNumberValidPattern)) {
                temp.phoneNumber = 'Invalid phone number';
            } else if(UserService.search({ phoneNumber: req.body.phoneNumber })) {
                temp.phoneNumber = 'Phone number already exists';
            }
    }

    if(req.body.password && 
        !temp.password && 
        req.body.password.length < 3) {
        temp.password = 'Password is too short';
    }

    if(!(Object.entries(temp).length === 0)) {
        res.status(400).json({ error: true, message: temp });
    } else {
        next();
    }
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;