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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ModelTemplate = `import { Model } from 'vendor/astro/http/Model';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity(tableName)
export class modelName extends Model {

}
`;
const fs_1 = __importDefault(require("fs"));
const readline = __importStar(require("readline"));
const database_config_1 = require("../../config/database.config");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
cli();
function cli() {
    if (!database_config_1.DBConfig.enabled) {
        console.log('Warning! Database integration is disabled in database.config\n\n');
    }
    rl.question('Model Name: ', (name) => {
        rl.question('DB Table: ', (table) => generate(ModelTemplate, name, table));
    });
}
function generate(template, cliName, cliTable) {
    return __awaiter(this, void 0, void 0, function* () {
        let slug = template.replace(/modelName/g, cliName);
        let temp = slug.replace(/tableName/g, "'" + cliTable + "'");
        yield fs_1.default.writeFileSync('app/models/' + cliName + '.ts', temp);
        setTimeout(() => {
            console.log('Successfully created ' + cliName + '.ts');
            rl.close();
        }, 250);
    });
}
//# sourceMappingURL=model.generator.js.map