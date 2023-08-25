import { inject, Injectable, OnDestroy } from '@angular/core';
import { Query as AkitaQuery, Store as AkitaStore } from '@datorama/akita';
import { Filter, GeneralResponse, StoreConfig, StoreState } from '../../interfaces';
import { HttpClient } from '@angular/common/http';
import { takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Injectable()
class Store<T, F> extends AkitaStore<StoreState<T, F>> {
    constructor() {
        super({
            data: null,
            error: null,
            filter: null,
            status: 'loading'
        })
    }
}

@Injectable()
class Query<T, F> extends AkitaQuery<StoreState<T, F>> {
    constructor(store: Store<T, F>) {
        super(store);
    }
}

@Injectable()
export abstract class StoreService<T, R, F extends Filter = never> implements OnDestroy {
    store = inject(Store<T, F>, { self: true })
    query = inject(Query<T, F>, { self: true })
    httpClient = inject(HttpClient);

    constructor(private storeConfig: StoreConfig<T, R>) {
        this.store.update({ data: storeConfig.defaultvalue });
    }

    load(params: Partial<F>): void {
        const methodConfig = this.storeConfig.methods.load;
        if (!methodConfig) return;

        const { Type } = this.storeConfig;
        this.httpClient.post<GeneralResponse<R>>(methodConfig.service, { ...params ?? {} }).pipe(
            takeUntilDestroyed(),
        ).subscribe({
            next: resp => this.store.update({ data: new Type(resp.data), status: 'success' }),
            error: (error: GeneralResponse<never>) => this.store.update({ error: error.error, status: 'error' }),
        })
    }

    reset() {
        this.store.reset();
    }

    ngOnDestroy() {
        this.store.destroy();
    }
}
