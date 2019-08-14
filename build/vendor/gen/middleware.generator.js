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
const MiddlewareTemplate = `import { Middleware } from 'vendor/astro/http/Middleware';

export class MiddlewareName extends Middleware {

    constructor(private request, data) {
        super(data);
    }

    run() {
        return this.next();
    }

}`;
const fs_1 = __importDefault(require("fs"));
const readline = __importStar(require("readline"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
cli();
function cli() {
    rl.question('Middleware Name: ', (ans) => generate(MiddlewareTemplate, ans));
}
function generate(template, cliName) {
    return __awaiter(this, void 0, void 0, function* () {
        let temp = template.replace(/MiddlewareName/g, cliName);
        yield fs_1.default.writeFileSync('app/middleware/' + cliName + '.ts', temp);
        setTimeout(() => {
            console.log('Successfully created ' + cliName + '.ts');
            rl.close();
        }, 250);
    });
}
//# sourceMappingURL=middleware.generator.js.map