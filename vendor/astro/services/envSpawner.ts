import { ENVIRONMENTS } from '../../../environments/_environments';
import { Environment } from '../entities/environment';
import Log from '../util/Logger';

export abstract class EnvSpawner {

    public static spawn(): void {
        let env = process.env.NODE_ENV.replace(/ /g, '');

        if (ENVIRONMENTS.length === 0) {
            Log('No environment\'s available. Add some or check _environments.ts', 'error');
        }

        for (let i in ENVIRONMENTS) {
            let e: Environment = ENVIRONMENTS[i];
            if (e.trigger instanceof Array) {
                let index = e.trigger.findIndex((trigger: string) => trigger === env);
                if (index >= 0) {
                    e.process();
                    break;
                }
            } else {
                if (e.trigger === env) {
                    e.process();
                    break;
                }
            }

            if (Number.parseInt(i, 0x0) === ENVIRONMENTS.length - 1) {
                Log(`Environment '${env}' does not exist. Check if it's enabled in the _environments.ts array or the start script.`, 'error');
                process.exit();
            }
        }
    }

}
