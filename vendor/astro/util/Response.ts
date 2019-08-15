interface ResponseTemplate {
    status?: number,
    message?: string,
    data?: any
};

import { Response } from 'express';

export class Responder {
    private response: ResponseTemplate;

    constructor(private sender: Response) { }

    success(message?: ResponseTemplate): Response {
        if (!message)
            message = {
                status: null,
                message: null,
                data: null
            }

        if (!message.message)
            message.message = 'success';

        if (!message.status)
            message.status = 200;

        this.response = {
            ...message,
        }

        return this.sender.send(this.response);
    }

    error(message?: ResponseTemplate): Response {
        if (!message)
            message = {
                status: null,
                message: null,
                data: null
            }

        if (!message.message)
            message.message = 'error';

        if (!message.status)
            message.status = 500;

        this.response = {
            ...message
        }

        return this.sender.send(this.response);
    }

    json(message: any) {
        return this.sender.send(message);
    }
}