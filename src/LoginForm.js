import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

// JWForm
import Formux from './Form/Form';
import Field from './Form/ContextField';

// Local
import validator from './validation';
import asyncValidator from './asyncValidation';

export default class LoginForm extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {saving: false};
    }

    static propTypes = {
        initialValues: PropTypes.object
    };

    onValidationStart = () => this.setState({saving: true});
    onValidationFail = () => this.setState({saving: false});

    onSubmit = values => {
        console.log('Success!', values);
    };

    render() {
        return (
            <Formux name="login-form"
                onSubmit={this.onSubmit}
                validator={validator}
                asyncValidator={asyncValidator}
                onFinalValidationStart={this.onValidationStart}
                onFinalValidationFail={this.onValidationFail}>
                <Field name='name' label="Username" field={TextField} fullWidth helperText="Type in your username" />
                <br /><br />
                <Field name='description' label="Description" field={TextField} fullWidth />
                <br /><br />
                {this.state.saving ? (
                    <Button raised color="contrast" type="submit" disabled>Saving...</Button>
                ) : (
                    <Button raised color="primary" type="submit">Go!</Button>
                )}
            </Formux>
        );
    }
};
