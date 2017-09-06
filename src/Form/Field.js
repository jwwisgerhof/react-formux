import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
    onBlurField,
    onChangeField
} from "./actions";

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

    onBlur = () => {
        this.props.onBlur(this.props.name);
    }

    render() {
        const FieldComponent = this.props.field;

        return (
            <FieldComponent {...sanitizeProps(this.props)}
                            error={!!this.props.validationMessage}
                            onChange={this.onChange}
                            onBlur={this.onBlur}
                            helperText={this.props.validationMessage || this.props.helperText || undefined}
                            value={this.props.value} />
        );
    }
}

Field.propTypes = {
    field: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    validationMessage: PropTypes.string,
    value: PropTypes.any.isRequired
};

// Connected
const FieldConnected = connect((state, ownProps) => {
    return {
        validationMessage: state.form.validationMessages[ownProps.name] || undefined,
        value: state.form.formData[ownProps.name] || ''
    }
}, dispatch => {
    return {
        onBlur: name => dispatch(onBlurField(name)),
        onChange: (name, value) => dispatch(onChangeField(name, value))
    };
})(Field);

export default FieldConnected;
