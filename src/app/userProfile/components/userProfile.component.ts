import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Params,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, combineLatest, filter, map } from 'rxjs';
import { FeedComponent } from 'src/app/shared/components/feed/components/feed.component';
import { ProfileInterface } from 'src/app/shared/types/profile.interface';
import { selectData, selectError, selectIsLoading } from '../store/reducers';
import { selectCurrentUser } from 'src/app/auth/store/reducers';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { getUserProfileActions } from '../store/actions';
import { UserProfileStateInterface } from '../types/userProfileState.interface';

@Component({
  selector: 'mc-user-profile',
  templateUrl: './userProfile.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FeedComponent],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userProfile!: ProfileInterface;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  userProfileSubscription!: Subscription;
  slug: string = '';
  apiUrl!: string;
  slugValue: string | null = '';

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeValues();

    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.userProfileSubscription.unsubscribe()
  }

  initializeValues(): void {
    // const isFavorites = this.router.url.includes('favorites')
    this.slugValue = this.route.snapshot.paramMap.get('slug');
    this.slug = this.slugValue ? this.slugValue : '';
    this.isLoading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectError);
    // this.apiUrl = isFavorites
    //   ? `/articles?favorited=${this.slug}`
    //   : `/articles?author=${this.slug}`
  }

  initializeListeners(): void {
    this.userProfileSubscription = this.store
      .pipe(select(selectData))
      .subscribe((userProfile: any) => {
        this.userProfile = userProfile;
      });

    this.route.params.subscribe((params: Params) => {
      this.slug = params['slug'];
      this.fetchUserProfile();
    });
  }

  fetchUserProfile(): void {
    this.store.dispatch(
      getUserProfileActions.getUserProfile({ slug: this.slug })
    );
  }
  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites');
    return (this.apiUrl = isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`);
  }

  isCurrentUserProfile$ = combineLatest(
    this.store.pipe(select(selectCurrentUser), filter(Boolean)),
    this.store.pipe(select(selectData), filter(Boolean))
  ).pipe(
    map(
      ([currentUser, userProfile]: [
        CurrentUserInterface,
        ProfileInterface
      ]) => {
        return currentUser.username === userProfile.username;
      }
    )
  );
}
