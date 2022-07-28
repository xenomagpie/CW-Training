import { legacy_createStore as createStore } from 'redux'; // notice that createStore is deprecated
import reducer from './reducer';

const store = createStore(reducer);

export default store;