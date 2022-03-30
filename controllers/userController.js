import HttpError from "http-errors";
import userModel from '../models/usersModel.js'
import bcrypt from 'bcrypt';
import messageapp from '../data/messages.js';

const register = (req, res, next) => {
    console.log(`---> userController::register`);

    try {
        const body = req.body;
        let result;

        if (!body.username || !body.password) {
            next(HttpError(400, { message: messageapp.parameter_not_especified }))
        } else {


            console.log(`---> userController::register ${body.password}`);
            const user = { username: body.username, password: body.password, timestamp: (body.timestamp || 0) };

            result = userModel.loginUser(user);
            if (result != undefined) {
                next(HttpError(400, { message: messageapp.user_error_login }));

            } else {

                result = userModel.createUser(user);

                if (result < 0)
                    next(HttpError(400, { message: messageapp.user_error_register }))

                res.status(201).json(result);

            }

        }

    } catch (error) {
        next(error);
    }

};

const login = (req, res, next) => {
    console.log(`---> userController::login`);

    try {
        const body = req.body;

        if (!body.username || !body.password) {
            next(HttpError(400, {  message: messageapp.parameter_not_especified }))
        } else {

            const user = { username: body.username, password: body.password, timestamp: (body.timestamp || 0) };
            const result = userModel.loginUser(user);

            if (result === undefined) {
                next(HttpError(400, { message: messageapp.user_error_login }));
            } else {
                console.log(`---> userController::login ${result.password}`);
                console.log(`---> userController::login ${body.password}`);

                if (!bcrypt.compareSync(body.password, result.password))
                    next(HttpError(400, { message: messageapp.user_error_login  }));
                else
                    res.status(200).json(result);
            }
        }

    } catch (error) {
        next(error);
    }
};


const getUser = (req, res, next) => {
    console.log(`---> userController::Get User`);
    
    
    try {
        const user = { username: req.params.username, timestamp: (req.timestamp || 0) };
        const getUser = userModel.getUser(user);

        if (getUser === undefined) {
            next(HttpError(400, { message: user_error_username }));
        } else {
            const result = JSON.parse(JSON.stringify(getUser));
            delete result.password;
            res.status(200).json(result);
        }
    }
    catch (error) {
        next(error);
    }
}

const addGrants = (req, res, next)=>{
    console.log(`---> userController::Add user grants`);
    if(!req.body.grants){
        next();
    }else{
        try {
            const user= { username: req.body.username, password: req.body.password, grants: req.body.grants};
            const result = userModel.addGrants(user);
            if (result === undefined) {
                next(HttpError(400, { message: messageapp.user_error_login }));
            } else {
                res.status(200).json(result);
            }
        }
        catch (error) {
            next(error);
        }
    }
};

const deleteGrants = (req, res, next)=>{
    console.log(`---> userController::Delete user grants`);
    if(!req.body.grants){
        next();
    }else{
        try {
            const body = req.body;
            const user = {username: body.username, grants: body.grants};
            const result = userModel.deleteGrants(user);

            if (result === undefined) {
                next(HttpError(400, { message: messageapp.user_error_login }));
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            next(error);
        }
    }
};

const updateGrants = (req, res, next)=>{
    console.log(`---> userController::Update user grants`);
    if(!req.body.grants){
        next();
    }else{
        try {
            const user= { username: req.body.username, password: req.body.password, grants: req.body.grants};
            const result = userModel.updateGrants(user);
            if (result === undefined) {
                next(HttpError(400, { message: messageapp.user_error_login }));
            } else {
                res.status(200).json(result);
            }
        }
        catch (error) {
            next(error);
        }
    }   
};

const deleteUser = (req, res, next)=>{
    console.log(`---> userController::Delete user`);
    if(!req.body.username || !req.body.password){
        next();
    }else{
        try {
            const user = { username: req.body.username, password: req.body.password};
            const delteduser = userModel.deleteUser(user);
            if (result === undefined) {
                next(HttpError(400, { message: messageapp.user_error_login }));
            } else {
                res.status(200).json(delteduser);
            }
        }
        catch (error) {
            next(error);
        }
    }   
};

const activateUser = (req, res, next)=>{
    console.log(`---> userController::Activate user`);
    
    if(!req.body.username || !req.body.password){
        next();
    }else{
        try {
            const user = { username: req.body.username, password: req.body.password};
            const userActivated = userModel.activateUser(user);
            
            if (result === undefined) {
                next(HttpError(400, { message: messageapp.user_error_login }));
            } else {
                res.status(200).json(userActivated);
            }
        }
        catch (error) {
            next(error);
        }
    }   
}

export default {
    register,
    login,
    getUser, 
    addGrants,
    deleteGrants,
    updateGrants,
    deleteUser,
    activateUser
}