import { Express } from 'express';

interface InstanceInterface {
    app: Express;
}

export var Instance: InstanceInterface = {
    app: null
};
