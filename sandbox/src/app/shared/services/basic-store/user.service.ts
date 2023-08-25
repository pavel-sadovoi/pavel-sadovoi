import { Injectable } from '@angular/core';
import { StoreService } from './service-store.service';
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
