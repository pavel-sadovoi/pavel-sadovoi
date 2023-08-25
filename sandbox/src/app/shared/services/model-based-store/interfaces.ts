export interface Data<T> {
    resetData(fields?: string[]): this;
    resetDirty(fields?: string[]): this;
    getInitialData(fields?: string[]): any;
    isDirty: boolean;
    isEqual(model: Data<T>): boolean;
    serialize(): T;
    deserialize(data: T): Data<T>;
}
