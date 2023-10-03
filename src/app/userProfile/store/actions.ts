import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ProfileInterface } from 'src/app/shared/types/profile.interface';

export const getUserProfileActions = createActionGroup({
  source: 'userProfile',
  events: {
    'Get user profile': props<{ slug: string }>(),
    'Get User Profile Success': props<{ userProfile: ProfileInterface }>(),
    'Get user profile failure': emptyProps(),
  },
});
