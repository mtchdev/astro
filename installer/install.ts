import * as logger from 'log-update';

import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as unzip from 'unzipper';
import * as cp from 'child_process';
import * as yn from 'yesno';
import * as https from 'https';
import axios from 'axios';

export interface AstroSchema {
    name: string,
    version: number,
    description: string,
    author: string,
    license: string,
    astro: {
        version: any
    }
}

export class Installer {

    private input: Input;
    private install: string;
    private persist: boolean;

    public host: string;
    public version: string;
    public released: string;

    constructor() {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

        this.host = 'https://raw.githubusercontent.com/spliitzx/astro/release/astro-release.zip';
        this.input = new Input();
        axios.get('https://raw.githubusercontent.com/spliitzx/astro/release/meta.json').then((data: any) => {
            if (!data.data['version']) {
                console.log('Failed to get latest version.');
                process.exit();
            }

            this.version = data.data['version'];
            this.released = data.data['release'];
            this.start();
        }).catch((err) => {
            console.error('Failed to get installer metadata (stack trace below):');
            throw new Error(err);
        });
    }

    async start() {

        await this.checkExists().catch(() => {
            console.log('Project already exists in this directory. If you want to update, run: npm run update');
            return process.exit();
        });

        this.header();
        Storage.install.name = await this.input.in('Project Name');
        Storage.install.version = await this.input.in('Version', '1.0.0');
        Storage.install.description = await this.input.in('Description');
        Storage.install.author = await this.input.in('Author');
        Storage.install.license = await this.input.in('License', 'ISC');
        Storage.install.astro.version = this.version;

        console.log('\n');
        console.log(JSON.stringify(Storage.install, null, 4));
        console.log('\n');
        yn.ask('Installing with the above options, is this correct? (y/n)', true, (ok: boolean) => {
            if (ok)
                setTimeout(() => this.beginInstall(), 500);
            else {
                console.log('\nInstallation cancelled.');
                return process.exit();
            }
        });
    }

    async header() {
        let header = '';
        header += '|--------------------------------------------|';
        header += `\n|${this.centerText('ASTRO')}|`;
        header += `\n|${this.centerText('')}|`;
        header += `\n|${this.centerText('v' + this.version)}|`;
        header += `\n|${this.centerText(this.released)}|`;
        header += `\n|${this.centerText('Install Astro')}|`;
        header += '\n|--------------------------------------------|\n';
        console.log(header);
    }

    change(to: string, sec?: number) : Promise<any> {
        return new Promise<any>((resolve: any, reject: any) => {
            setTimeout(() => {
                this.persist = true;
                this.install = to;
                resolve();
            }, sec ? sec : 500);
        })
    }

    async beginInstall() {
        const FRAMES = ['-', '\\', '|', '/'];
        let i = 0;
        this.install = 'Preparing installation';
        let log = setInterval(() => {
            const FRAME = FRAMES[i = ++i % FRAMES.length];

            if (this.persist) {
                this.persist = false;
                logger.done();
            } else {
                logger(`${FRAME} ${this.install}...`);
            }
        }, 100);

        await this.change('Downloading');

        await this.getFromHost();

        await this.change('Extracting', 2000);
        await this.downloadFiles();

        await this.change('Writing files', 1000);
        await this.createAstroJson();  
        
        await this.change('Installing packages');
        await this.npmInstall();

        await this.change('Copying files');
        await this.copyFiles();

        this.cleanUp();

        clearInterval(log);
        logger.done();
        console.log('\nFinished! Go build something amazing.');
        process.exit();
    }

    writeTempMain() {
        let schema: AstroSchema;
        schema = {
            ...Storage.install
        };

        fs.writeFileSync(__dirname + '/temp/astro.json', JSON.stringify(schema, null, 4));
    }

    // Installer methods

    async getFromHost() : Promise<any> {
        return new Promise<any>((resp, rej) => {
            https.get(this.host, (res) => {
                let file = fs.createWriteStream(__dirname + '/temp/astro.zip');
                res.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resp();
                });
            })
        });
    }

    async downloadFiles() {
        if (!fs.existsSync(__dirname + '/temp/extract'))
            await fs.mkdirSync(__dirname + '/temp/extract');

        fs.createReadStream(__dirname + '/temp/astro.zip').pipe(unzip.Extract({
            path: __dirname + '/temp/extract'
        }));
    }

    async createAstroJson() {
        let astro = await fs.readFileSync(__dirname + '/temp/astro.json');
        await fs.writeFileSync(__dirname + '/temp/extract/astro.json', astro);
    }

    npmInstall() : Promise<any> {
        let npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
        let path = __dirname + '/temp/extract';

        return new Promise<any>((resolve, reject) => {
            let proc = cp.exec(`cd ${path} && ${npm} install`);
            proc.stdout.pipe(process.stdout);
            proc.on('exit', () => {
                resolve();
            });
        });
    }

    async copyFiles() : Promise<any> {
        return new Promise<any>((resolve, reject) => {
            fse.copy(__dirname + '/temp/extract', __dirname + '/../src').then(() => resolve()).catch((e) => reject(e));
        });
    }
    
    async checkExists() : Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (fs.existsSync(__dirname + '/../src'))
                reject();
            else
                resolve();
        });
    }

    cleanUp() : void {
        if (fs.existsSync(__dirname + '/temp/extract'))
            fse.removeSync(__dirname + '/temp/extract');
    }

    centerText(text: string) {
        let spaces = 44;
        let unsorted = spaces - text.length;
        let slug = [];
        let unshift = false;

        slug.push(text);
        for (let i = 0; i < unsorted; i++) {
            if (unshift)
                slug.push(' ');
            else
                slug.unshift(' ');
            
            unshift = !unshift;
        }

        return slug.join('');
    }

}

import * as readline from 'readline';

export class Input {

    private stdin: any;

    constructor() {
        this.stdin = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });;
    }

    in(question: string, defaultValue?: string) : Promise<any> {
        return new Promise<any>((resolve: any, reject: any) => {
            this.stdin.question(question + ': ', (ans: string) => resolve(ans));
            if (defaultValue !== undefined)
                this.stdin.write(defaultValue);
        });
    }
}

export var Storage = {
    install: {
        name: null,
        version: null,
        description: null,
        author: null,
        license: null,
        astro: {
            version: null
        }
    }
}