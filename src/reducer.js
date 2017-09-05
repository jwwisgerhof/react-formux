import {combineReducers} from 'redux';
import formReducer from './Form/reducer';

const reducer = combineReducers({
    form: formReducer
});

export default reducer;