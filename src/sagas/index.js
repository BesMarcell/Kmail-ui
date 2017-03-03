import map from 'lodash/map';
import * as account from './account';
// import * as kmail from './kmail';

export default function * rootSaga() {
  const sagas = { ...account };
  // const sagas = { ...account, ...kmail };
  yield map(sagas, saga => saga());
}
