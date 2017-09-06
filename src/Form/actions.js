export const ON_BLUR_FIELD = 'ON_BLUR_FIELD';
export const ON_CHANGE_FIELD = 'ON_CHANGE_FIELD';
export const ON_UPDATE_VALIDATION_MESSAGE = 'ON_UPDATE_VALIDATION_MESSAGE';
export const ON_UPDATE_VALIDATION_MESSAGES = 'ON_UPDATE_VALIDATION_MESSAGES';

export const onChangeField = (name, value) => {
    return {type: ON_CHANGE_FIELD, payload: {name, value}};
};

export const onUpdateValidationMessage = (name, value) => {
    return {type: ON_UPDATE_VALIDATION_MESSAGE, payload: {name, value}};
};

export const onUpdateValidationMessages = values => {
    return {type: ON_UPDATE_VALIDATION_MESSAGES, payload: values};
};
