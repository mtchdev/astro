import { ENVIRONMENTS } from '../../../environments/_environments';
import { Environment } from '../entities/environment';

export abstract class EnvSpawner {

    public static spawn(): void {
        let env = process.env.NODE_ENV;

        if (ENVIRONMENTS.length === 0) throw new Error('No environments available. Please check _environments.ts');

        for (let i in ENVIRONMENTS) {
            let e: Environment = ENVIRONMENTS[i];
            if (e.trigger === env) {
                e.process();
                break;
            }

            if (Number.parseInt(i, 0x0) === ENVIRONMENTS.length - 1) {
                throw new Error('Environment not found. Check if it\'s enabled in _environments.ts');
            }
        }
    }

}
