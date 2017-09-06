import cloneDeep from 'lodash.clonedeep';

import {
    ON_BLUR_FIELD,
    ON_CHANGE_FIELD,
    ON_UPDATE_VALIDATOR
} from './actions';

const initialState = {
    formData: {},
    validationMessages: {},
    validator: undefined
};

const formReducer = (state = initialState, action) => {
    switch(action.type) {
        case ON_BLUR_FIELD:
            return state;
        case ON_CHANGE_FIELD:
            const newState = cloneDeep(state);
            const fieldName = action.payload.name;

            newState.formData[fieldName] = action.payload.value;

            if (state.validator && state.validator[fieldName]) {
                console.log(state.validator[fieldName](action.payload.value, newState.formData));
                newState.validationMessages[fieldName] = state.validator[fieldName](action.payload.value, newState.formData);
            }

            return newState;
        case ON_UPDATE_VALIDATOR:
            return Object.assign(cloneDeep(state), {validator: action.payload});
        default:
            return state;
    }
};

export default formReducer;