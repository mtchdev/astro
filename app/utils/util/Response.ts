interface ResponseTemplate {
    status?: number,
    message?: string,
    data?: any
};

export class Response {
    private response: ResponseTemplate;

    constructor(private sender: any) { }

    success(message: ResponseTemplate) {
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

    error(message: ResponseTemplate) {
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