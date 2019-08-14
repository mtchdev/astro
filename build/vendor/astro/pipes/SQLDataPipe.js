"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pipe_1 = require("./Pipe");
class SQLDataPipe extends Pipe_1.Pipe {
    constructor(input, toRemove) {
        super();
        this.input = input;
        this.toRemove = toRemove;
        this.runDefault = false;
    }
    run() {
        return new Promise((resolve, reject) => {
            if (this.toRemove == undefined)
                return resolve(this.input);
            if (this.toRemove.length == 0)
                return resolve(this.input);
            for (let i = 0; i < this.toRemove.length; i++) {
                if (this.input instanceof Array) {
                    for (let x = 0; x < this.input.length; x++) {
                        delete this.input[x][this.toRemove[i]];
                    }
                }
                else {
                    delete this.input[this.toRemove[i]];
                }
                if (i == this.toRemove.length - 1)
                    resolve(this.input);
            }
        });
    }
}
exports.SQLDataPipe = SQLDataPipe;
//# sourceMappingURL=SQLDataPipe.js.map