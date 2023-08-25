import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { EMPTY, catchError, switchMap, tap } from 'rxjs';
import { Filter, GeneralResponse, StoreConfig, StoreState } from '../../interfaces';


export abstract class StoreService<T, R, F extends Filter = never> extends ComponentStore<StoreState<T, F>> {
  private httpClient = inject(HttpClient)

  readonly data = this.select(state => state.data);

  constructor(private storeConfig: StoreConfig<T, R>) {
    super({
      data: null,
      error: null,
      filter: null,
      status: 'loading'
    })
  }

  load = this.effect<Partial<F>>(params$ => {
    const methodConfig = this.storeConfig.methods.load;
    if (!methodConfig) return EMPTY;

    const { service } = methodConfig;
    const { Type } = this.storeConfig;

    return params$.pipe(
      tap(() => this.patchState({ status: 'loading' })),
      switchMap(params => this.httpClient.post<GeneralResponse<R>>(service, { params })),
      tap({
        next: response => this.patchState({ data: new Type(response.data), error: null }),
        error: error => this.patchState({ status: 'error', error }),
      }),
      catchError(() => EMPTY)
    )
  })

  create = this.effect<T>(item$ => {
    const methodConfig = this.storeConfig.methods.create;
    if (!methodConfig) return EMPTY;

    const { service } = methodConfig;
    const { Type } = this.storeConfig;
    return item$.pipe(
      tap(item => this.patchState({ data: item })),
      switchMap(item => this.httpClient.post<GeneralResponse<R>>(service, item)),
      tap({
        next: response => this.patchState({ data: new Type(response.data), error: null }),
        error: error => this.patchState({ status: 'error', error }),
      }),
      catchError(() => EMPTY)
    )
  })

  remove = this.effect<Record<string, any>>(item$ => {
    const methodConfig = this.storeConfig.methods.delete;
    if (!methodConfig) return EMPTY;
    const { service } = methodConfig;
  
    return item$.pipe(
      switchMap(params => this.httpClient.post<T>(service, { params })),
      tap({
        next: () => this.patchState({ data: null, error: null }),
        error: error => this.patchState({ status: 'error', error }),
      }),
      catchError(() => EMPTY)
    )
  })
}
