import HttpError from "http-errors";
import messageapp from '../data/messages.js'

const validateUserPassword = (req, res, next) => {
    console.log(`---> passwordHandler: ValiditeUserPassword`);
    const body = req.body;
    if (body.password) {
        if(/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/.test(body.password)){
            next();
        }else{
            next(HttpError(400, { message: messageapp.password_invalid_format }))
        }
    }
}

export default{
    validateUserPassword
}