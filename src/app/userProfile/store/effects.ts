import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserProfileService } from '../services/userProfile.service';
import { getUserProfileActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { ProfileInterface } from 'src/app/shared/types/profile.interface';

export const GetUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    userProfileService = inject(UserProfileService)
  ) => {
    return actions$.pipe(
      ofType(getUserProfileActions.getUserProfile),
      switchMap(({ slug }) => {
        return userProfileService.getUserProfile(slug).pipe(
          map((userProfile: ProfileInterface) => {
            return getUserProfileActions.getUserProfileSuccess({ userProfile });
          }),
          catchError(() => {
            return of(getUserProfileActions.getUserProfileFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
