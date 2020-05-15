const { UserRepository } = require('../repositories/userRepository');

class UserService {

    // TODO: Implement methods to work with user
    showList(object) {
        const list = UserRepository.getAll(object);
        if(list.length === 0) {
            return null;
        }

        return list;
    }

    createUser(body) {
        const newUser = UserRepository.create(body);
        if(!newUser) {
            return null;
        }

        return newUser;
    }

    updateUser(id, changes) {
        const updation = UserRepository.update(id, changes);
        console.log(chan, 'updated');
        return updation;
    }

    deleteUser(id) {
        const deletion = UserRepository.delete(id);
        if(deletion.length === 0) {
            return null;
        }

        return deletion;
    }

    search(search) {
        const item = UserRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
}

module.exports = new UserService();