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
const Logger_1 = require("../astro/util/Logger");
const router_config_1 = require("config/router.config");
exports.ProdEnvironment = {
    useLocal: true,
    process: () => {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                Logger_1.Logger.log('Starting server in production environment...');
                router_config_1.RouterConfig.log_requests = false;
                require('../../index.ts');
                resolve();
            }
            catch (e) {
                reject(e);
            }
        }));
    }
};
//# sourceMappingURL=prod.env.js.map