"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
require('dotenv').config();
const serve_1 = require("vendor/astro/server/serve");
const instance_1 = require("vendor/astro/services/instance");
const mysql_1 = require("vendor/astro/services/mysql");
const APP = express_1.default();
serve_1.serve.up(APP);
instance_1.Instance.app = APP;
APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({
    extended: true
}));
mysql_1.createInstance();
require('./routes/api');
//# sourceMappingURL=index.js.map