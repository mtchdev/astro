import { Pipe } from './Pipe';

export class SQLDataPipe extends Pipe {

    private toRemove: any[];
    
    constructor(input: any, toRemove: any[]) {
        super();

        this.input = input;
        this.toRemove = toRemove;
        this.runDefault = false;
    }

    run() : Promise<any> {
        return new Promise<any>((resolve: any, reject: any) => {
            if (this.toRemove == undefined)
                return resolve(this.input);

            if (this.toRemove.length == 0)
                return resolve(this.input);

            for (let i = 0; i < this.toRemove.length; i++) {
                if (this.input instanceof Array) {
                    for (let x = 0; x < this.input.length; x++) {
                        delete this.input[x][this.toRemove[i]];
                    }
                } else {
                    delete this.input[this.toRemove[i]];
                }

                if (i == this.toRemove.length - 1)
                    resolve(this.input);
            }
        });
    }

}