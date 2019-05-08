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

export interface SQLQueryModel {
    where(match: string, from: string): Promise<QueryResult>;
    whereArray(params: ToMatch[]): Promise<QueryResult>;
    all(): Promise<QueryResult>;
    insert(params: Insert[]): Promise<QueryResult>;
    update(params: Insert[], where: ToMatch[]): Promise<QueryResult>;
}

export function SQLResultTransformer(result: any): QueryResult {
    return {
        result: result
    }
}