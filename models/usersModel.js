import users from '../data/user.js';

class User {

    createUser(user) {
        console.log(`---> userModel::createUser ${user.username}`);
        
        users.push(user);
        return users.find(element => element.username == user.username);


    }

    loginUser(user) {
        console.log(`---> userModel::loginUser ${user.username}`);

        return users.find(element => (element.username == user.username))
    }

    getUser(user){
        console.log(`---> userModel::getUser ${user.username}`);
        
        return users.find(e => (e.username == user.username));
    }

    addGrants(user){
        console.log(`---> userModel::addGrants ${user.username}`);
        let getUser = users.find(e => (e.username == user.username));
        getUser.grants= user.grants;
        return getUser;    
    }

    deleteGrants(user){
        console.log(`---> userModel::deleteGrants ${user.username}`);
        
        let userFound = users.find(e => (e.username == user.username));
        user.grants.forEach(e => {
            let index = userFound.grants.indexOf(e);
            if (index !== -1) {
                userFound.grants.splice(index, 1);
            }    
        });
        return userFound;
    }

    updateGrants(user){
        console.log(`---> userModel::updateGrants ${user.username}`);
        let userFound = users.find(e => (e.username == user.username))
        user.grants.forEach(e => {
            userFound.grants.push(e);
        });
        return userFound;
    }

    deleteUser(user){
        console.log(`---> userModel::deleteUser ${user.username}`);
        const userfound = users.find(e => (e.username == user.username));
        if(userfound!=undefined){
            userfound.active=0;
        }
        return userfound;
    }
    activateUser(user){
        console.log(`---> userModel::deleteUser ${user.username}`);
        const userfound = users.find(e => (e.username == user.username));
        if(userfound!=undefined){
            userfound.active=1
        }
        return userfound;
    }
}

export default new User();