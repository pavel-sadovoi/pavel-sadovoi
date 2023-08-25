import { Component, Input, OnInit, Output, inject } from '@angular/core';
import { UserService } from './shared/services/basic-store/user.service';
import { FilterService } from './shared/services/filter.service';
import { User2Service } from './shared/services/ngrx-component-store/user2.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UserService, FilterService, User2Service]
})
export class AppComponent implements OnInit {

  @Input({ required: true }) id: number | null = null;

  title = 'sandbox';

  userSrv = inject(UserService);

  @Output() user = this.userSrv.data$

  ngOnInit() {
  }
}
