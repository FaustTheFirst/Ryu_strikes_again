const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();
router.get('/', (req, res) => {
    const listOfUsers = UserService.showList('names');
    if(!listOfUsers) {
        res.status(404).json({
            error: true,
            messsage: "List of users is empty"
        });
    } else {
        res.status(200).json({ "All users": listOfUsers });
    }
});

router.get('/:id', (req, res) => {
    const findOfUser = UserService.search({ id: req.params.id });
    if(!findOfUser) {
        res.status(404).json({
            error: true,
            messsage: "User is not found"
        });
    } else {
        res.status(200).json({ "User found": findOfUser });
    }
});

router.post('/', createUserValid, (req, res, next) => {
    const createOfUser = UserService.createUser(req.body);
    if(!createOfUser) {
        res.status(400).json({
            error: true,
            messsage: "Failed to create user"
        });
    } else {
        res.status(200).json({ "User created": createOfUser });
    }
});

router.put('/:id', (req, res) => {
    res.send(`Update user ${UserService.updateUser(req.params.id, req.body)}`);
});

router.delete('/:id', (req, res) => {
    const deleteOfUser = UserService.deleteUser(req.params.id);
    if(!deleteOfUser) {
        res.status(404).json({
            error: true,
            messsage: "User is not found"
        });
    } else {
        res.status(200).json({ "User deleted": deleteOfUser });
    }
});
// TODO: Implement route controllers for user

module.exports = router;