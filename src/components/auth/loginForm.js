import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const LoginForm = (props) => {
    return (
        <form>
            <TextField
                id="login-email"
                label="Email"
                onChange={props.emailChange}
                type="email"
                margin="normal"
                variant="outlined"
            />
            <TextField
                id="login-password"
                label="Senha"
                onChange={props.passwordChange}
                type="password"
                margin="normal"
                variant="outlined"
            />
            <Button variant="contained" color="primary" onClick={() => props.firebase.signIn(this.state.email, this.state.password)}>
                Login
            </Button>
        </form>
    );
}

export default LoginForm;