import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/constants';
import { LIKE_JOB, DISMISS_JOB, CLEAR_LIKED_JOBS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case REHYDRATE:
      return action.payload.likedJobs || [];
    case LIKE_JOB:
      return _.uniqBy([
        action.payload, ...state
      ], 'jobkey');
    case DISMISS_JOB:
      return _.reject(state, action.payload);
    case CLEAR_LIKED_JOBS:
      return [];
    default:
      return state;
  }
}
