import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { authFeatureKey, authReducer } from './app/auth/store/reducers';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import * as authEffects from './app/auth/store/effects';
import * as popularTagsEffects from './app/shared/components/popularTags/store/effects';
import * as feedEffects from './app/shared/components/feed/store/effects';
import * as addToFavoritesEffect from './app/shared/components/addToFavorites/store/effects';
import * as userProfileEffect from './app/userProfile/store/effects';
import {
  popularTagsFeatureKey,
  popularTagsReducer,
} from './app/shared/components/popularTags/store/reducers';
import {
  feedFeatureKey,
  feedReducer,
} from './app/shared/components/feed/store/reducers';

import {
  userProfileFeatureKey,
  userProfileReducer,
} from './app/userProfile/store/reducers';
import { provideRouterStore } from '@ngrx/router-store';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(appRoutes),
    provideStore(),
    provideState(authFeatureKey, authReducer),
    provideState(popularTagsFeatureKey, popularTagsReducer),
    provideState(feedFeatureKey, feedReducer),
    provideState(userProfileFeatureKey, userProfileReducer),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(
      authEffects,
      popularTagsEffects,
      feedEffects,
      addToFavoritesEffect,
      userProfileEffect
    ),
    provideRouterStore(),
  ],
});
