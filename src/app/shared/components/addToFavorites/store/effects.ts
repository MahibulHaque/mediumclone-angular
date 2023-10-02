import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AddToFavoritesService } from '../services/addToFavorites.service';
import { addToFavoritesAction } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { ArticleInterface } from 'src/app/shared/types/article.interface';

export const AddToFavoriteEffect = createEffect(
  (
    actions$ = inject(Actions),
    addToFavoriteService = inject(AddToFavoritesService)
  ) => {
    return actions$.pipe(
      ofType(addToFavoritesAction.addToFavorites),
      switchMap(({ isFavorited, slug }) => {
        const article$ = isFavorited
          ? addToFavoriteService.removeFromFavorites(slug)
          : addToFavoriteService.addToFavorites(slug);

        return article$.pipe(
          map((article: ArticleInterface) => {
            return addToFavoritesAction.addToFavoritesSuccess({ article });
          }),
          catchError(() => {
            return of(addToFavoritesAction.addToFavoritesFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
