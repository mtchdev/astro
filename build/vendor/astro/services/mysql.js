"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_config_1 = require("../../../config/database.config");
const Logger_1 = require("../util/Logger");
const typeorm_1 = require("typeorm");
var connection;
function createInstance() {
    return __awaiter(this, void 0, void 0, function* () {
        if (connection) {
            return false;
        }
        if (!database_config_1.DBConfig.enabled) {
            return Logger_1.Logger.log('Database integration is disabled.', 'warn');
        }
        try {
            connection = yield typeorm_1.createConnection(Object.assign({}, database_config_1.DBConfig.mysql, { type: 'mysql', entities: [
                    'app/models/*{.ts,.js}'
                ] }));
            Logger_1.Logger.log('Connected to database.');
        }
        catch (e) {
            let error = e.message;
            if (error.includes('ECONNREFUSED')) {
                Logger_1.Logger.log(`${e}. Retrying...`, 'error');
                setTimeout(() => {
                    createInstance();
                }, 5000);
            }
            else {
                Logger_1.Logger.log(e, 'error');
            }
        }
    });
}
exports.createInstance = createInstance;
exports.instance = connection;
//# sourceMappingURL=mysql.js.map