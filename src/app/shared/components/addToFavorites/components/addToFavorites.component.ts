import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToFavoritesAction } from '../store/actions';

@Component({
  selector: 'mc-add-to-favorites',
  templateUrl: './addToFavorites.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class AddToFavoritesComponent implements OnInit {
  @Input('isFavorited') isFavoritedProps!: boolean;
  @Input('favoritesCount') favoritesCountProps!: number;
  @Input('articleSlug') articleSlugProps!: string;

  favoritesCount!: number;
  isFavorited!: boolean;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.favoritesCount = this.favoritesCountProps;
    this.isFavorited = this.isFavoritedProps;
  }

  handleLike(): void {
    this.store.dispatch(
      addToFavoritesAction.addToFavorites({
        isFavorited: this.isFavorited,
        slug: this.articleSlugProps,
      })
    );

    if (this.isFavorited) {
      this.favoritesCount = this.favoritesCount - 1;
    } else {
      this.favoritesCount = this.favoritesCount + 1;
    }
    this.isFavorited = !this.isFavorited;
  }
}
