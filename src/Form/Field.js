import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {onChangeField} from "./actions";

const sanitizeProps = props => {
    const copy = Object.assign({}, {...props});
    delete copy.field;
    delete copy.touched;
    delete copy.validationMessage;
    return copy;
};

class Field extends React.PureComponent {
    // Should be abstracted away and be formed into a single consistent thing
    onChange = event => {
        this.props.onChange(this.props.name, event.target.value);
    }

    render() {
        console.log('Re-rendering field [' + this.props.name + ']');
        const FieldComponent = this.props.field;

        return (
            <FieldComponent {...sanitizeProps(this.props)}
                            error={!!this.props.validationMessage}
                            onChange={this.onChange}
                            helperText={this.props.validationMessage || this.props.helperText || undefined}
                            value={this.props.value} />
        );
    }
}

Field.propTypes = {
    field: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    touched: PropTypes.bool.isRequired,
    validationMessage: PropTypes.string,
    value: PropTypes.any.isRequired
};

// Connected
const FieldConnected = connect((state, ownProps) => {
    return {
        touched: state.form.touched[ownProps.name] || false,
        validationMessage: state.form.validationMessages[ownProps.name] || undefined,
        value: state.form.formData[ownProps.name] || ''
    }
}, dispatch => {
    return {
        onChange: (name, value) => dispatch(onChangeField(name, value))
    };
})(Field);

export default FieldConnected;
