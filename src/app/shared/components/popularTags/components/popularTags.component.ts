import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { PopularTagType } from 'src/app/shared/types/popularTag.type';
import { selectData, selectError, selectIsLoading } from '../store/reducers';
import { getPopularTagsAction } from '../store/actions';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../../loading/components/loading.component';
import { ErrorMessageComponent } from '../../errorMessage/components/errorMessage.component';

@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popularTags.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingComponent, ErrorMessageComponent],
})
export class PopularTagsComponent implements OnInit {
  popularTags$: Observable<PopularTagType[] | null> = of(null);
  isLoading$: Observable<boolean> = of(false);
  error$: Observable<string | null> = of(null);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues(): void {
    this.popularTags$ = this.store.select(selectData);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectError);
  }

  fetchData(): void {
    this.store.dispatch(getPopularTagsAction());
  }
}
