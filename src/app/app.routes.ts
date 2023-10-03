import { Route } from '@angular/router';
import { UserFeedComponent } from './userFeed/components/userFeed.component';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('src/app/globalFeed/globalFeed.routes').then(
        (m) => m.globalFeedRoutes
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('src/app/auth/auth.routes').then((m) => m.registerRoutes),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('src/app/auth/auth.routes').then((m) => m.loginRoutes),
  },
  {
    path:'feed',
    component: UserFeedComponent
  },
  {
    path: 'profiles',
    loadChildren: () =>
      import('src/app/userProfile/userProfile.routes').then(
        (m) => m.userProfileRoutes
      ),
  },
];
