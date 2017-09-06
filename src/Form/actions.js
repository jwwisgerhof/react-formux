export const ON_BLUR_FIELD = 'ON_BLUR_FIELD';
export const ON_CHANGE_FIELD = 'ON_CHANGE_FIELD';
export const ON_UPDATE_VALIDATOR = 'ON_UPDATE_VALIDATOR';

export const onBlurField = name => {
    return {type: ON_BLUR_FIELD, payload: name};
};

export const onChangeField = (name, value) => {
    return {type: ON_CHANGE_FIELD, payload: {name, value}};
};

export const onUpdateValidator = validator => {
    return {type: ON_UPDATE_VALIDATOR, payload: validator};
};
