import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

// JWForm
import JWForm from './Form/Form';
import Field from './Form/Field';

// Local
import validator from './validation';

export default class LoginForm extends React.PureComponent {
    static propTypes = {
        initialValues: PropTypes.object
    };

    onSubmit = values => {
        console.log(values);
    };

    render() {
        return (
            <JWForm onSubmit={this.onSubmit} validator={validator}>
                <Field name='name' label="Username" field={TextField} fullWidth helperText="Type in your username" />
                <br /><br />
                <Field name='description' label="Description" field={TextField} fullWidth />
                <br /><br />
                <Button raised color="primary" type="submit">Go!</Button>
            </JWForm>
        );
    }
};
