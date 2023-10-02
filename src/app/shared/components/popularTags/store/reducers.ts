import { createFeature, createReducer, on } from '@ngrx/store';
import { PopularTagsStateInterface } from '../types/popularTagsState.interface';
import {
  getPopularTagsAction,
  getPopularTagsFailureAction,
  getPopularTagsSuccessAction,
} from './actions';

const initialState: PopularTagsStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const popularTagsFeature = createFeature({
  name: 'popularTags',
  reducer: createReducer(
    initialState,
    on(
      getPopularTagsAction,
      (state): PopularTagsStateInterface => ({
        ...state,
        isLoading: true,
      })
    ),
    on(
      getPopularTagsSuccessAction,
      (state, action): PopularTagsStateInterface => ({
        ...state,
        isLoading: false,
        data: action.popularTags,
      })
    ),
    on(
      getPopularTagsFailureAction,
      (state, action): PopularTagsStateInterface => ({
        ...state,
        isLoading: false,
      })
    )
  ),
});

export const {
  name: popularTagsFeatureKey,
  reducer: popularTagsReducer,
  selectError,
  selectData,
  selectIsLoading,
} = popularTagsFeature;
