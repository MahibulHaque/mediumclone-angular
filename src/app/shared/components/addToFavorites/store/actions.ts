import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ArticleInterface } from 'src/app/shared/types/article.interface';

export const addToFavoritesAction = createActionGroup({
  source: 'addToFavorites',
  events: {
    'Add to favorites': props<{ isFavorited: boolean; slug: string }>(),
    'Add to favorites success': props<{ article: ArticleInterface }>(),
    'Add to favorites failure': emptyProps(),
  },
});
