const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();
router.get('/', (req, res, next) => {
    const listOfUsers = UserService.showList('names');
    if(!listOfUsers) {
        res.status(404).json({
            error: true,
            messsage: "List of users is empty"
        });
    } else {
        req.body = listOfUsers;
        next();
    }
}, responseMiddleware, (req, res) => {
    res.status(200).json({ "All users": req.body });
});

router.get('/:id', (req, res, next) => {
    const findOfUser = UserService.search({ id: req.params.id });
    if(!findOfUser) {
        res.status(404).json({
            error: true,
            messsage: "User is not found"
        });
    } else {
        req.body = findOfUser;
        next();
    }
}, responseMiddleware, (req, res) => {
    res.status(200).json({ "User found": req.body });
});

router.post('/', (req, res, next) => {
    if(UserService.search( {email: req.body.email} )) {
        res.status(400).json({ 
            error: true,
        messsage: "Email already exists" });
    } else {
        next();
    }
}, createUserValid, (req, res, next) => {
    const createOfUser = UserService.createUser(req.body);
    if(!createOfUser) {
        res.status(400).json({
            error: true,
            messsage: "Failed to create user"
        });
    } else {
        req.body = createOfUser;
        next();
    }
}, responseMiddleware, (req, res) => {
    res.status(200).json({ "User created": req.body });
});

router.put('/:id', updateUserValid, (req, res, next) => {
    const updateOfUser = UserService.updateUser(req.params.id, req.body);
    if(!updateOfUser) {
        res.status(400).json({
            error: true,
            messsage: "User is not updated"
        });
    } else {
        req.body = updateOfUser;
        next();
    }
}, responseMiddleware, (req, res) => {
    res.status(200).json({ "User updated": req.body });
});

router.delete('/:id', (req, res, next) => {
    const deleteOfUser = UserService.deleteUser(req.params.id);
    if(!deleteOfUser) {
        res.status(404).json({
            error: true,
            messsage: "User is not found"
        });
    } else {
        req.body = deleteOfUser;
        next();
    }
}, responseMiddleware, (req, res) => {
    res.status(200).json({ "User deleted": req.body });
});
// TODO: Implement route controllers for user

module.exports = router;