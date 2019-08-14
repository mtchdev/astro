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
const fs_1 = __importDefault(require("fs"));
const mysql_1 = __importDefault(require("mysql"));
const database_config_1 = require("../config/database.config");
const instance = mysql_1.default.createConnection(Object.assign({}, database_config_1.DBConfig.mysql, { port: database_config_1.DBConfig.mysql.port }));
instance.connect();
(() => __awaiter(this, void 0, void 0, function* () {
    let directories = yield fs_1.default.readdirSync(__dirname + '/schema');
    for (let i = 0; i < directories.length; i++) {
        let dir = yield fs_1.default.readFileSync(__dirname + '/schema/' + directories[i], "utf8");
        instance.query(mysql_1.default.format(dir), (err) => {
            if (err) {
                throw new Error(err);
            }
            console.log('Migrated ' + directories[i].replace(new RegExp(/.sql/, 'g'), '') + ' successfully.');
            if (i == directories.length - 1) {
                console.log(`Finished! Successfully completed ${directories.length} ${directories.length === 1 ? 'migration' : 'migrations'}.`);
                return process.exit();
            }
        });
    }
}))();
//# sourceMappingURL=factory.js.map