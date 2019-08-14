"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("vendor/astro/http/Controller");
const User_1 = require("app/models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController extends Controller_1.Controller {
    constructor(data) {
        super(data);
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.db.find(User_1.User);
            return this.respondWithSuccess(users);
        });
    }
    getUser(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.db.findOne(User_1.User, {
                where: {
                    username: request.params.username
                }
            });
            if (!user) {
                return this.respondWithError('User not found.', 404);
            }
            return this.respondWithSuccess(user);
        });
    }
    addUser(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = new User_1.User();
            user.username = request.body.username;
            user.email = request.body.email;
            user.password = yield bcrypt_1.default.hash(request.body.password, 10);
            this.db.save(user);
            return this.respondWithSuccess();
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map