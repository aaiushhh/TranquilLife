var express=require("express");

var loginController=require("../src/login/loginController");
var whoLoggedController = require("../src/whoLogged/whoLoggedController");
const productivityController = require('../src/productivity/productivityController');


const router=express.Router();

router.route('/login/login').post(loginController.loginLoginControllerFn);
router.route('/login/create').post(loginController.createLoginControllerFn);
router.route('/login/users').get( loginController.getAllUserDataControllerFn)
router.delete('/login/users/:id', loginController.deleteUserByIdControllerFn);
router.get('/login/email/:username', loginController.getEmailByUsernameControllerFn);

//jugad
    router.get('/whoLogged/fetch', whoLoggedController.getWhoLoggedFn);
router.delete('/whoLogged/del', whoLoggedController.delWhoLoggedFn);
router.post('/whoLogged/create', whoLoggedController.whoLoggedcreateLoginControllerFn);


//todo
router.post('/productivity/addTodoList', productivityController.addTodoListControllerFn);
router.get('/productivity/fetchTasks/:username', productivityController.fetchTasksByUsernameControllerFn);

module.exports = router;