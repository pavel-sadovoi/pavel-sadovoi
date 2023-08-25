import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { createStore, withProps, select } from '@ngneat/elf';
import { Filter, GeneralResponse, StoreConfig, StoreState } from '../../interfaces';


export abstract class StoreService<T, R, F extends Filter = never> {
  private httpClient = inject(HttpClient)

  store = createStore({ name:'test' }, withProps<StoreState<T, F>>({
    data: this.storeConfig.defaultvalue,
    error: null,
    filter: null,
    status: 'loading'
  }))

  data$ = this.store.pipe(select((state) => state.data));

  constructor(private storeConfig: StoreConfig<T, R>) {

  }

  load(params: Partial<F>): void {
    const methodConfig = this.storeConfig.methods.load;
    if (!methodConfig) return;

    const { Type } = this.storeConfig;
    this.httpClient.post<GeneralResponse<R>>(methodConfig.service, { ...params ?? {} }).subscribe({
        next: resp => {
          this.store.update(state => ({ ...state, data: new Type(resp.data), status: 'success' } satisfies StoreState<T, F>));
          this.store.initialState = this.store.state;
        },
        error: (error: GeneralResponse<never>) => this.store.update(state => ({ ...state, error: error.error, status: 'error' } satisfies StoreState<T, F>)),
    })
  }
}
