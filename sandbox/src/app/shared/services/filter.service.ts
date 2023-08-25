import { Injectable } from '@angular/core';
import {  BehaviorSubject } from 'rxjs';

@Injectable()
export class FilterService<T extends object = never> {


  private filter$ = new BehaviorSubject<T>({} as T)
  filter = this.filter$.asObservable();

  constructor() {console.log('Created')}
}
