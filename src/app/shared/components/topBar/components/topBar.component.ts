import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, of } from 'rxjs';
import {
  selectCurrentUser,
  selectIsLoggedIn,
} from 'src/app/auth/store/reducers';



@Component({
  selector: 'mc-topbar',
  templateUrl: './topBar.component.html',
  standalone: true,
  imports:[
    CommonModule, RouterLink
  ]
})
export class TopBarComponent {
  constructor(private store: Store) {}

  data$ = combineLatest({
    isLoggedIn: this.store.select(selectIsLoggedIn),
    currentUser: this.store.select(selectCurrentUser),
  })
}
