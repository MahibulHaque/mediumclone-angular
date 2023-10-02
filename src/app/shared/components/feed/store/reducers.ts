import { createFeature, createReducer, on } from '@ngrx/store';
import { FeedStateInterface } from '../types/feedState.interface';
import { feedActions } from './actions';
import { routerNavigationAction } from '@ngrx/router-store';
const initialState: FeedStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const feedFeature = createFeature({
  name: 'feed',
  reducer: createReducer(
    initialState,
    on(
      feedActions.getFeed,
      (state): FeedStateInterface => ({
        ...state,
        isLoading: true,
      })
    ),
    on(
      feedActions.getFeedSuccess,
      (state, action): FeedStateInterface => ({
        ...state,
        isLoading: false,
        data: action.feed,
      })
    ),
    on(
      feedActions.getFeedFailure,
      (state): FeedStateInterface => ({
        ...state,
        isLoading: false,
      })
    ),
    on(routerNavigationAction, (): FeedStateInterface => initialState)
  ),
});

export const {
  name: feedFeatureKey,
  reducer: feedReducer,
  selectIsLoading,
  selectError,
  selectData,
} = feedFeature;
