import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {onUpdateValidator} from './actions';

class Form extends React.PureComponent {
    onSubmit = event => {
        event.preventDefault();
    };

    componentDidMount() {
        if (this.props.validator) {
            this.props.onUpdateValidator(this.props.validator);
        }
    }

    render() {
        console.log('Re-rendering form with form data: ', this.props.formData);
        return (
            <form onSubmit={this.onSubmit}>
                {this.props.children}
                <br /><br />
                {JSON.stringify(this.props.formData)}
            </form>
        )
    }
}

Form.propTypes = {
    children: PropTypes.array,
    formData: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    onUpdateValidator: PropTypes.func.isRequired,
};

const ConnectedForm = connect(state => {
    return {
        formData: state.form.formData
    };
}, dispatch => {
    return {
        onUpdateValidator: validator => dispatch(onUpdateValidator(validator))
    };
})(Form);

export default ConnectedForm;
