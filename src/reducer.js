import {combineReducers} from 'redux-immutable';
import formReducer from './Form/reducer';

const reducer = combineReducers({
    formux: formReducer
});

export default reducer;