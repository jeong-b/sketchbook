const Router = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const usersRouter = Router();

usersRouter.use(bodyParser.urlencoded({ extended: true }));
usersRouter.use(cookieParser());

const UsersDB = require("../controllers/usersDB.js");
const { Auth } = require("../middlewares/auth.js");

usersRouter.route('/register').post(UsersDB.register);
usersRouter.route('/login').post(UsersDB.login);
usersRouter.route('/auth').get(UsersDB.auth);
usersRouter.route('/logout').get(UsersDB.logout);

module.exports = usersRouter;
