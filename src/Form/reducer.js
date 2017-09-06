import Immutable from 'immutable';

import {
    ON_BLUR_FIELD,
    ON_CHANGE_FIELD,
    ON_UPDATE_VALIDATION_MESSAGE,
    ON_UPDATE_VALIDATION_MESSAGES
} from './actions';

const initialState = Immutable.fromJS({
    formData: {},
    validationMessages: {}
});

const formReducer = (state = initialState, action) => {
    switch(action.type) {
        case ON_BLUR_FIELD:
            return state;
        case ON_CHANGE_FIELD:
            return state.setIn(['formData', action.payload.name], action.payload.value);
        case ON_UPDATE_VALIDATION_MESSAGE:
            return state.setIn(['validationMessages', action.payload.name], action.payload.value);
        case ON_UPDATE_VALIDATION_MESSAGES:
            return state.set('validationMessages', Immutable.Map(action.payload));
        default:
            return state;
    }
};

export default formReducer;