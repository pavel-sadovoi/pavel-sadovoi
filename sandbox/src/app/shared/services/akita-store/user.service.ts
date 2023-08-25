import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { ApiUser, User } from '../../interfaces';


@Injectable()
export class UserService extends StoreService<User, ApiUser> {
  constructor() {
    super({
      defaultvalue: null,
      Type: User,
      methods: {
        load: {
          service: "Users.GetUser",
          params: { ClassName: 'TVEntUser' }
        }
      }
    })
  }
}
