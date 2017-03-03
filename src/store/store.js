import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import mySaga from '../sagas';

export default function configureStore() {

  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, process.env.NODE_ENV === 'development' &&
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(sagaMiddleware));

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }
  sagaMiddleware.run(mySaga);

  return store;
}
