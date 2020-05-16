const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

//GET all users ////////////////////////////////////////////////////////////////
router.get('/', (req, res, next) => {
    const listOfUsers = UserService.showList('names');
    if(!listOfUsers) {
        res.status(200).json({ messsage: "List of users is empty for now" });
    } else {
        let obj = [];
        listOfUsers.forEach(elem => {
            let { id, password, ...temp } = elem;
            obj.push(temp);
        });

        req.body = obj;
        next();
    }
}, (req, res) => {
    res.status(200).json({ "All users": req.body });
});

//GET user with given ID //////////////////////////////////////////////////////////
router.get('/:id', (req, res, next) => {
    const findOfUser = UserService.search({ id: req.params.id });
    if(!findOfUser) {
        res.status(404).json({
            error: true,
            messsage: "User is not found"
        });
    } else {
        const { id, password, ...obj } = findOfUser;
        req.body = obj;
        next();
    }
}, (req, res) => {
    res.status(200).json({ "User found": req.body });
});

//POST new user ////////////////////////////////////////////////////////////
router.post('/', createUserValid, (req, res, next) => {
    const createOfUser = UserService.createUser(req.body);
    if(!createOfUser) {
        res.status(400).json({
            error: true,
            messsage: "Failed to create user"
        });
    } else {
        const { id, password, ...temp } = createOfUser;
        req.body = temp;
        next();
    }
}, (req, res) => {
    res.status(200).json({ "User created": req.body });
});

//PUT update current user ////////////////////////////////////////////////////////////
router.put('/:id', (req, res, next) => {
    if(!UserService.search({ id: req.params.id })) {
        res.status(404).json({
            error: true,
            messsage: "User is not found"
        });
    } else {
        next();
    }
}, updateUserValid, (req, res, next) => {
    const updateOfUser = UserService.updateUser(req.params.id, req.body);
    if(!updateOfUser) {
        res.status(400).json({
            error: true,
            messsage: "User is not updated"
        });
    } else {
        const { id, password, ...temp } = updateOfUser;
        req.body = temp;
        next();
    }
}, (req, res) => {
    res.status(200).json({ "User updated": req.body });
});

//DELETE current user ///////////////////////////////////////////////////////////////////
router.delete('/:id', (req, res, next) => {
    const deleteOfUser = UserService.deleteUser(req.params.id);
    if(!deleteOfUser) {
        res.status(404).json({
            error: true,
            messsage: "User is not found"
        });
    } else {
        const { id, password, ...temp } = deleteOfUser;
        req.body = temp;
        next();
    }
}, (req, res) => {
    res.status(200).json({ "User deleted": req.body });
});

module.exports = router;