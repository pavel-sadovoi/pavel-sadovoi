import { Injectable } from '@angular/core';
import { StoreService } from './ngrx-component-store.service';
import { ApiUser, User, UserFilter } from '../../interfaces';

@Injectable()
export class User2Service extends StoreService<User, ApiUser, UserFilter> {
  constructor() {
    super({
      defaultvalue: null,
      Type: User,
      methods: {
        load: {
          service: 'Users.GetUser',
          params: { ClassName: 'TUserParam' }
        }
      }
    });
  }
}
