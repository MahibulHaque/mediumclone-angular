import { createFeature, createReducer, on } from '@ngrx/store';
import { UserProfileStateInterface } from '../types/userProfileState.interface';
import { getUserProfileActions } from './actions';

const initialState: UserProfileStateInterface = {
  data: null,
  isLoading: false,
  error: null,
};

const userProfileFeature = createFeature({
  name: 'userProfile',
  reducer: createReducer(
    initialState,
    on(
      getUserProfileActions.getUserProfile,
      (state): UserProfileStateInterface => ({
        ...state,
        isLoading: true,
      })
    ),
    on(
      getUserProfileActions.getUserProfileSuccess,
      (state, action): UserProfileStateInterface => ({
        ...state,
        isLoading: false,
        data: action.userProfile,
      })
    ),
    on(
      getUserProfileActions.getUserProfileFailure,
      (state): UserProfileStateInterface => ({
        ...state,
        isLoading: false,
      })
    )
  ),
});

export const {
  name: userProfileFeatureKey,
  reducer: userProfileReducer,
  selectIsLoading,
  selectData,
  selectError,
} = userProfileFeature;
