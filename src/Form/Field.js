import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const sanitizeProps = props => {
    const copy = Object.assign({}, {...props});
    delete copy.field;
    delete copy.touched;
    delete copy.validationMessage;
    return copy;
};

class Field extends React.PureComponent {
    onBlur = event => {
        this.context.onBlurField(this.props.name, event.target.value);
    };

    // Should be abstracted away and be formed into a single consistent thing
    onChange = event => {
        this.context.onChangeField(this.props.name, event.target.value);
    }

    onSetRef = ref => {
        if (ref) {
            this.context.onSetRef(this.props.name, ref);
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

Field.contextTypes = {
    onBlurField: PropTypes.func.isRequired,
    onChangeField: PropTypes.func.isRequired,
    onSetRef: PropTypes.func.isRequired
}

Field.propTypes = {
    field: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    validationMessage: PropTypes.string,
    value: PropTypes.any.isRequired
};

// Connected
const FieldConnected = connect((state, ownProps) => {
    return {
        validationMessage: state.getIn(['form', 'validationMessages', ownProps.name]),
        value: state.getIn(['form', 'formData', ownProps.name]) || ''
    }
}, dispatch => {
    return {};
})(Field);

export default FieldConnected;
