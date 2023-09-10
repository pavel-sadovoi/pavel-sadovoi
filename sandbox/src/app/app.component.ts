import { Component, Input, OnInit, Output, inject } from '@angular/core';
import { UserService } from './shared/services/basic-store/user.service';
import { FilterService } from './shared/services/filter.service';
import { User2Service } from './shared/services/ngrx-component-store/user2.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UserService, FilterService, User2Service]
})
export class AppComponent {
  users = [
    {
      label: 'User 1',
      value: 1
    },
    {
      label: 'User 2',
      value: 2
    }
  ];

  form = new FormGroup({
    userId: new FormControl(0, [Validators.required])
  })

  constructor() {
    this.form.valueChanges.subscribe(console.log)
  }
}
