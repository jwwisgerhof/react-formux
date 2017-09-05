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
        return (
            <form onSubmit={this.onSubmit}>
                {this.props.children}
            </form>
        )
    }
}

Form.propTypes = {
    children: PropTypes.array,
    onSubmit: PropTypes.func.isRequired,
    onUpdateValidator: PropTypes.func.isRequired,
    validator: PropTypes.func
};

const ConnectedForm = connect(state => {
    return {};
}, dispatch => {
    return {
        onUpdateValidator: validator => dispatch(onUpdateValidator(validator))
    }
})(Form);

export default ConnectedForm;
