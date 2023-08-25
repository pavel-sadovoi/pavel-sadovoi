export class User {
    id = '';
    name = '';

    constructor(data?: ApiUser) {
        if (data) {
            this.id = data.Id,
                this.name = data.Name
        }
    }
}

export interface UserFilter {
    name: string;
}

export interface StoreConfig<T, R = any> {
    defaultvalue: T extends Array<any> ? T : T | null;
    Type: new (data: R) => T
    methods: Partial<MethodConfigs>
}


export interface StoreState<T, F> {
    data: T | null,
    filter: Partial<F> | null,
    status: 'loading' | 'success' | 'error',
    error: null | string
}


export type Filter = Record<string, any>;

export interface ApiUser {
    Id: string,
    Name: string
}

export interface GeneralResponse<T> {
    success: boolean,
    data: T,
    error: string | null
}

type MethodConfigs = {
    load: MethodConfig,
    delete: Omit<MethodConfig, 'Type'>;
    create: MethodConfig,
    update: MethodConfig
}

interface MethodConfig {
    service: string,
    params?: Record<string, any>
}
