import { Route } from '@angular/router';
import { UserProfileComponent } from './components/userProfile.component';

export const userProfileRoutes: Route[] = [
  {
    path: ':slug',
    component: UserProfileComponent,
  },
  {
    path: ':slug/favorites',
    component: UserProfileComponent,
  },
];
