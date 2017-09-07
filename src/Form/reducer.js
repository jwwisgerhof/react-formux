import Immutable from 'immutable';

import {
    INITIALIZE_FORM,
    ON_CHANGE_FIELD,
    ON_UPDATE_VALIDATION_MESSAGE,
    ON_UPDATE_VALIDATION_MESSAGES
} from './actions';

const initialState = Immutable.fromJS({
    formData: {},
    validationMessages: {}
});

const formReducer = (state = initialState, action) => {
    const formName = action.formName;

    switch(action.type) {
        case INITIALIZE_FORM:
            return state.set(formName, initialState);
        case ON_CHANGE_FIELD:
            return state.setIn([formName, 'formData', action.payload.name], action.payload.value);
        case ON_UPDATE_VALIDATION_MESSAGE:
            return state.setIn([formName, 'validationMessages', action.payload.name], action.payload.value);
        case ON_UPDATE_VALIDATION_MESSAGES:
            return state.setIn([formName, 'validationMessages'], Immutable.Map(action.payload));
        default:
            return state;
    }
};

export default formReducer;