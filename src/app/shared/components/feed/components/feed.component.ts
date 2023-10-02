import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { ErrorMessageComponent } from '../../errorMessage/components/errorMessage.component';
import { LoadingComponent } from '../../loading/components/loading.component';
import { PaginationComponent } from '../../pagination/components/pagination.component';
import { Store } from '@ngrx/store';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { GetFeedResponseInterface } from '../types/getFeedResponse.interface';
import { environment } from 'src/environments/environment';
import { feedActions } from '../store/actions';
import { selectData, selectError, selectIsLoading } from '../store/reducers';
import queryString from 'query-string';
import { TagListComponent } from '../../tagList/components/tagList.component';
import { AddToFavoritesComponent } from '../../addToFavorites/components/addToFavorites.component';

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
    TagListComponent,
    AddToFavoritesComponent
  ],
})
export class FeedComponent implements OnInit, OnDestroy, OnChanges {
  @Input('apiUrl') apiUrlProps!: string;
  limit = environment.limit;
  baseUrl!: string;
  queryParamsSubscription!: Subscription;
  currentPage!: number;
  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    feed: this.store.select(selectData),
  });
  ngOnInit(): void {
    this.initializeValues();
    // this.fetchData()
    this.initializeListeners(); // метод, где нах-ся все подписки для получ-я query парам-в url
    // console.log('Initialized feed')
  }

  initializeValues(): void {
    this.baseUrl = this.router.url.split('?')[0];
  }

  initializeListeners(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        // this.currentPage = Number(params.page || '1')
        this.currentPage = Number(params['page'] || '1');
        // console.log('currentPage', this.currentPage)
        this.fetchData();
      }
    );
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged =
      !changes['apiUrlProps'].firstChange &&
      changes['apiUrlProps'].currentValue !==
        changes['apiUrlProps'].previousValue;
    // console.log('isApiUrlChanged', isApiUrlChanged)
    // console.log('changes', changes)

    if (isApiUrlChanged) {
      this.fetchData();
    }
  }

  fetchData(): void {
    // this.store.dispatch(getFeedAction({ url: this.apiUrlProps }))
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = queryString.parseUrl(this.apiUrlProps);
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
    this.store.dispatch(feedActions.getFeed({ url: apiUrlWithParams }));
  }
}
