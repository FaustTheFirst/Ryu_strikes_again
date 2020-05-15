const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    // TODO: Implement methods to work with fighters
    showList(object) {
        const list = FighterRepository.getAll(object);
        if(list.length === 0) {
            return null;
        }

        return list;
    }

    createFighter(body) {
        const newFighter = FighterRepository.create(body);
        if(!newFighter) {
            return null;
        }

        return newFighter;
    }

    updateFighter(id, changes) {
        const updation = FighterRepository.update(id, changes);
        if(!updation) {
            return null;
        }
        
        return updation;
    }

    deleteFighter(id) {
        const deletion = FighterRepository.delete(id);
        if(deletion.length === 0) {
            return null;
        }

        return deletion;
    }

    search(search) {
        const item = FighterRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
}

module.exports = new FighterService();