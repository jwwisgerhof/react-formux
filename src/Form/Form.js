import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import scrollToElement from 'scroll-to-element';

import {
    initializeForm,
    onChangeField,
    onUpdateValidationMessage,
    onUpdateValidationMessages
} from './actions';

class Form extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {refs: {}};
    }

    componentWillMount() {
        this.props.initializeForm(this.props.name);
    }

    getChildContext() {
        return {
            formName: this.props.name,
            onBlurField: this.onBlurField,
            onChangeField: this.onChangeField,
            onSetRef: this.onSetRef
        };
    }

    onSetRef = (name, ref) => {
        this.setState({refs: Object.assign(this.state.refs, {[name]: ref})});
    }

    onBlurField = (fieldName, value) => {
        this.onChangeField(fieldName, value);

        const validator = this.props.asyncValidator;
        if (validator && validator[fieldName]) {
            validator[fieldName](value, this.props.formData).then(error => {
                if (error) {
                    this.props.onUpdateValidationMessage(this.props.name, fieldName, error);
                }
            });
        }
    };

    onChangeField = (fieldName, value) => {
        this.props.onChangeField(this.props.name, fieldName, value);

        // When changing a field, we only use the validator for that specific field
        const validator = this.props.validator;
        if (validator && validator[fieldName]) {
            this.props.onUpdateValidationMessage(this.props.name, fieldName, validator[fieldName](value, this.props.formData));
        }
    };

    onSubmit = event => {
        event.preventDefault();

        const {
            asyncValidator,
            formData,
            onFinalValidationStart,
            onFinalValidationFail,
            validator
        } = this.props;

        if (onFinalValidationStart) {
            onFinalValidationStart();
        }

        const validationMessages = {};

        // Sync validate all fields
        if (validator) {
            Object.keys(validator).forEach(key => {
                const m = validator[key](formData.get(key), formData);
                if (m) {
                    validationMessages[key] = m;
                }
            });
        }

        // Start async validation of all fields
        const promises = [];
        if (asyncValidator) {
            Object.keys(asyncValidator).forEach(key => {
                // No need to call async validation on a field that already has a synced error
                if (!validationMessages.hasOwnProperty(key) || validationMessages[key] === undefined) {
                    // Wrap the async validation in a promise to add the key
                    promises.push(new Promise(resolve => {
                        asyncValidator[key](formData.get(key), formData).then(error => {
                            resolve({key, message: error});
                        });
                    }));
                }
            });
        }

        Promise.all(promises).then(values => {
            values.forEach(validationResponse => {
                if (validationResponse.message) {
                    validationMessages[validationResponse.key] = validationResponse.message;
                }
            });

            if (Object.keys(validationMessages).length === 0) {
                this.props.onSubmit(formData);
            } else {
                const ref = this.state.refs[Object.keys(validationMessages)[0]];
                scrollToElement(ref, {
                    offset: -50,
                    ease: 'out-circ',
                    duration: 500
                });
                ref.focus();

                if (onFinalValidationFail) {
                    onFinalValidationFail();
                }
            }

            this.props.onUpdateValidationMessages(this.props.name, validationMessages);
        });
    };

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                {this.props.children}
                <br /><br />
                {JSON.stringify(this.props.formData)}
            </form>
        )
    }
}

Form.childContextTypes = {
    formName: PropTypes.string,
    onBlurField: PropTypes.func,
    onChangeField: PropTypes.func,
    onSetRef: PropTypes.func
}

Form.propTypes = {
    asyncValidator: PropTypes.object,
    children: PropTypes.array,
    formData: PropTypes.object,
    name: PropTypes.string.isRequired,
    onChangeField: PropTypes.func.isRequired,
    onFinalValidationStart: PropTypes.func,
    onFinalValidationFail: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    onUpdateValidationMessage: PropTypes.func.isRequired,
    validator: PropTypes.object
};

const ConnectedForm = connect((state, ownProps) => {
    return {
        formData: state.getIn(['formux', ownProps.name, 'formData'])
    };
}, dispatch => {
    return {
        initializeForm: name => dispatch(initializeForm(name)),
        onChangeField: (formName, fieldName, value) => dispatch(onChangeField(formName, fieldName, value)),
        onUpdateValidationMessage: (formName, fieldName, value) => dispatch(onUpdateValidationMessage(formName, fieldName, value)),
        onUpdateValidationMessages: (formName, values) => dispatch(onUpdateValidationMessages(formName, values))
    };
})(Form);

ConnectedForm.propTypes = {
    asyncValidator: PropTypes.object,
    children: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onFinalValidationStart: PropTypes.func,
    onFinalValidationFail: PropTypes.func,
    validator: PropTypes.object
}

export default ConnectedForm;
