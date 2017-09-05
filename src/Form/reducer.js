import {
    ON_CHANGE_FIELD,
    ON_UPDATE_VALIDATOR
} from './actions';

const initialState = {
    formData: {},
    validator: undefined,
    validationMessages: {},
    touched: {}
};

const formReducer = (state = initialState, action) => {
    switch(action.type) {
        case ON_CHANGE_FIELD:
            const newState = Object.assign({}, {...state});
            newState.formData[action.payload.name] = action.payload.value;
            newState.touched[action.payload.name] = true;
            newState.validationMessages = state.validator(newState.formData) || undefined;
            return newState;
        case ON_UPDATE_VALIDATOR:
            return Object.assign({}, {...state}, {validator: action.payload});
        default:
            return state;
    }
};

export default formReducer;