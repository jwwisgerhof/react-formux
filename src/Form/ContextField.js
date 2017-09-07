/**
 * The purpose of this Component is to translate context to the ConnectedField
 */
import React from 'react';
import PropTypes from 'prop-types';

import Field from './Field';

class ContextField extends React.PureComponent {
    render() {
        return (
            <Field {...this.props}
                formName={this.context.formName}
                onSetRef={this.context.onSetRef}
                onBlur={this.context.onBlurField}
                onChange={this.context.onChangeField} />
        );
    }
}

ContextField.contextTypes = {
    formName: PropTypes.string.isRequired,
    onBlurField: PropTypes.func.isRequired,
    onChangeField: PropTypes.func.isRequired,
    onSetRef: PropTypes.func.isRequired
}

export default ContextField;
