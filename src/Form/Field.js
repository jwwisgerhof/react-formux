import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const sanitizeProps = props => {
    const copy = Object.assign({}, {...props});
    delete copy.field;
    delete copy.touched;
    delete copy.validationMessage;
    delete copy.onSetRef;
    delete copy.formName;
    delete copy.onBlur;
    delete copy.onChange;
    return copy;
};

class Field extends React.PureComponent {
    onBlur = event => {
        this.props.onBlur(this.props.name, event.target.value);
    };

    // Should be abstracted away and be formed into a single consistent thing
    onChange = event => {
        this.props.onChange(this.props.name, event.target.value);
    }

    onSetRef = ref => {
        if (ref) {
            this.props.onSetRef(this.props.name, ref);
        }
    }

    render() {
        const FieldComponent = this.props.field;

        return (
            <FieldComponent {...sanitizeProps(this.props)}
                inputRef={this.onSetRef}
                error={!!this.props.validationMessage}
                onBlur={this.onBlur}
                onChange={this.onChange}
                helperText={this.props.validationMessage || this.props.helperText || undefined}
                value={this.props.value} />
        );
    }
}

Field.propTypes = {
    field: PropTypes.func.isRequired,
    formName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onSetRef: PropTypes.func.isRequired,
    validationMessage: PropTypes.string,
    value: PropTypes.any.isRequired
};

// Connected
const FieldConnected = connect((state, ownProps) => {
    return {
        validationMessage: state.getIn(['formux', ownProps.formName, 'validationMessages', ownProps.name]),
        value: state.getIn(['formux', ownProps.formName, 'formData', ownProps.name]) || ''
    }
}, dispatch => {
    return {};
})(Field);

export default FieldConnected;
