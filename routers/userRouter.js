import Router from 'express';
import userController from '../controllers/userController.js';
import authHandler from '../middleware/authHandler.js'
import userHandler from '../middleware/userHandler.js';
import passwordHandler from '../middleware/passwordHandler.js'


const router = Router();

router.use((req, res, next) => {
    console.log('---> userRouter.js');
    next();
});

router.route('/:username')
    .get((req,res, next) => {
        userController.getUser(req, res);
        next();    
    });

router.use(userHandler.validateUserEmail);

const addTimestamp = (req, res, next) => {
    console.log('---> userRouter:addTimestamp');
    req.body.timestamp = new Date();
    next();
}

router.route('/register')
    .post(passwordHandler.validateUserPassword)
    .post(authHandler.encryptPassword)
    .post(addTimestamp)
    .post(userController.register);

router.route('/login')
    .post(userController.login);


router.route('/grants')
    .post(userController.addGrants)
    .delete(userController.deleteGrants)
    .put(userController.updateGrants);

router.route('/user')
    .put(userController.activateUser);

router.route('*')
    .delete(userController.deleteUser);
export default router;