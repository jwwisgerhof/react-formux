import {combineReducers} from 'redux-immutable';
import formReducer from './Form/reducer';

const reducer = combineReducers({
    form: formReducer
});

export default reducer;