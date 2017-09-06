import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import scrollToElement from 'scroll-to-element';

import {
    onChangeField,
    onUpdateValidationMessage,
    onUpdateValidationMessages
} from './actions';

class Form extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {refs: {}};
    }

    getChildContext() {
        return {
            onBlurField: this.onBlurField,
            onChangeField: this.onChangeField,
            onSetRef: this.onSetRef
        };
    }

    onSetRef = (name, ref) => {
        this.setState({refs: Object.assign(this.state.refs, {[name]: ref})});
    }

    onBlurField = (name, value) => {
        this.onChangeField(name, value);

        const validator = this.props.asyncValidator;
        if (validator && validator[name]) {
            validator[name](value, this.props.formData).then(error => {
                if (error) {
                    this.props.onUpdateValidationMessage(name, error);
                }
            });
        }
    };

    onChangeField = (name, value) => {
        this.props.onChangeField(name, value);

        // When changing a field, we only use the validator for that specific field
        const validator = this.props.validator;
        if (validator && validator[name]) {
            this.props.onUpdateValidationMessage(name, validator[name](value, this.props.formData));
        }
    };

    onSubmit = event => {
        event.preventDefault();

        const {
            asyncValidator,
            formData,
            validator
        } = this.props;

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
            }

            this.props.onUpdateValidationMessages(validationMessages);
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
    onBlurField: PropTypes.func,
    onChangeField: PropTypes.func,
    onSetRef: PropTypes.func
}

Form.propTypes = {
    asyncValidator: PropTypes.object,
    children: PropTypes.array,
    formData: PropTypes.object,
    onChangeField: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onUpdateValidationMessage: PropTypes.func.isRequired,
    validator: PropTypes.object
};

const ConnectedForm = connect(state => {
    return {
        formData: state.getIn(['form', 'formData'])
    };
}, dispatch => {
    return {
        onChangeField: (name, value) => dispatch(onChangeField(name, value)),
        onUpdateValidationMessage: (name, value) => dispatch(onUpdateValidationMessage(name, value)),
        onUpdateValidationMessages: values => dispatch(onUpdateValidationMessages(values))
    };
})(Form);

export default ConnectedForm;
