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
const ip = require('ip');
exports.DevEnvironment = {
    useLocal: true,
    process: () => {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                Logger_1.Logger.log('Starting server in development environment...');
                require('../../index.ts');
                if (ip.address() !== '127.0.0.1' || ip.address() !== '::1') {
                    Logger_1.Logger.log('Host is not on a local address.', 'warn');
                }
                resolve();
            }
            catch (e) {
                reject(e);
            }
        }));
    }
};
//# sourceMappingURL=dev.env.js.map