export const INITIALIZE_FORM = 'INITIALIZE_FORM';
export const ON_CHANGE_FIELD = 'ON_CHANGE_FIELD';
export const ON_UPDATE_VALIDATION_MESSAGE = 'ON_UPDATE_VALIDATION_MESSAGE';
export const ON_UPDATE_VALIDATION_MESSAGES = 'ON_UPDATE_VALIDATION_MESSAGES';

export const initializeForm = formName => {
    return {type: INITIALIZE_FORM, formName};
};

export const onChangeField = (formName, fieldName, value) => {
    return {type: ON_CHANGE_FIELD, formName, payload: {name: fieldName, value}};
};

export const onUpdateValidationMessage = (formName, fieldName, value) => {
    return {type: ON_UPDATE_VALIDATION_MESSAGE, formName, payload: {name: fieldName, value}};
};

export const onUpdateValidationMessages = (formName, values) => {
    return {type: ON_UPDATE_VALIDATION_MESSAGES, formName, payload: values};
};
