import { InjectionToken, computed, inject, signal } from '@angular/core';
import { EMPTY, Subject, map, retry, shareReplay, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient } from "@angular/common/http";
import { FormControl } from '@angular/forms';
import { Filter, GeneralResponse, StoreConfig, StoreState } from '../../interfaces';

export abstract class StoreService<T, R, F extends Filter = never> {
  private httpClient = inject(HttpClient);

  private state = signal<StoreState<T | null, F>>({
    data: null,
    filter: null,
    error: null,
    status: "loading",
  });

  filterControl = new FormControl<Partial<F>>({});

  // selectors
  data = computed(() => this.state().data);
  filter = computed(() => this.state().filter);
  error = computed(() => this.state().error);
  status = computed(() => this.state().status);

  // sources
  retry$ = new Subject<void>();
  error$ = new Subject<Error>();
  filter$ = this.filterControl.valueChanges;

  readonly data$ = this.filter$.pipe(
    switchMap(filter => {
      const { load } = this.config.methods
      if (!load) return EMPTY;

      this.state.update(state => ({ ...state, status: "loading"}))
      return this.httpClient.post<GeneralResponse<R>>(load.service, filter ?? {}).pipe(
        retry({
          delay: (err) => {
            this.error$.next(err);
            return this.retry$;
          },
        }),
        map(response => new this.config.Type(response.data)),
      );

    }),
    shareReplay(),
  );

  constructor(
    private config: StoreConfig<T, R>
  ) {
    this.data$.pipe(takeUntilDestroyed()).subscribe((articles) =>
      this.state.update((state) => ({
        ...state,
        articles,
        status: "success",
      }))
    );

    this.filter$.pipe(takeUntilDestroyed()).subscribe((filter) =>
      this.state.update((state) => ({
        ...state,
        filter,
      }))
    );

    this.retry$
      .pipe(takeUntilDestroyed())
      .subscribe(() =>
        this.state.update((state) => ({ ...state, status: "loading" }))
      );

    this.error$.pipe(takeUntilDestroyed()).subscribe((error) =>
      this.state.update((state) => ({
        ...state,
        status: "error",
        error: error.message,
      }))
    );
  }
}
