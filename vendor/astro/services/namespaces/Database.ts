export interface DB {
    instance: any,
    connected: boolean,
    model: string
}

export interface QueryResult {
    result: any;
}

export interface ToMatch {
    match: string,
    with: any
}

export interface Insert {
    key: string,
    value: string
}

export interface Update {
    values: any,
    where: any
}

export interface SQLQueryModel {
    where(params: any): Promise<QueryResult>;
    all(): Promise<QueryResult>;
    insert(params: Insert[]): Promise<QueryResult>;
    update(params: Update): Promise<QueryResult>;
}

export function SQLResultTransformer(result: any): QueryResult {
    return {
        result: result
    }
}