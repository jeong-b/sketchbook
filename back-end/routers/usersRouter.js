const Router = require("express");

const usersRouter = Router();

const UsersDB = require("../controllers/usersDB.js");
const { Auth } = require("../middlewares/auth.js");

usersRouter.route('/register').post(UsersDB.register);
usersRouter.route('/idCheck').post(UsersDB.idCheck);
usersRouter.route('/login').post(UsersDB.login);
usersRouter.route('/auth').get(Auth, UsersDB.auth);
usersRouter.route('/logout').get(UsersDB.logout);
usersRouter.route('/mail').post(UsersDB.mail);

module.exports = usersRouter;
