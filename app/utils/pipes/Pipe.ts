export class Pipe {

    public input: any;
    public output: any;
    public runDefault: boolean = true;

    constructor() {
        if (this.runDefault)
            this.run();
    }

    run() {}
}