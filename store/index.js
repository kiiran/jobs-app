import { AsyncStorage } from 'react-native';
import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk),
    autoRehydrate()
  )
);

// * Add '.purge()' to clear the stored data
// !!! If you ever change the way data is stored (array/object/string),
//     use redux-persist-migrate to create migrations
persistStore(store, { storage: AsyncStorage, whitelist: ['likedJobs'] });

export default store;
