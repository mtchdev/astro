export default abstract class State {
    public static storage: object;

    static setState(values: object): void {
        this.storage = values;
    }

    static setAndPersist(values: object): void {
        this.storage = {
            ...this.storage,
            ...values
        };
    }

    static setSpecificRoot(key: string, value: any): void {
        this.storage[key] = value;
    }
}
