import { Button, Container, Paper, Typography, IconButton, Tooltip } from '@material-ui/core';
import { React, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import { Link, useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textField: {
        margin: '30px 0px'
    },
    form: {
        marginTop: 100,
        display: 'inline-block',
        padding: '30px 70px'
    },
    status: {
        fontSize: 13,
        fontWeight: 700,
        color: "rgb(220, 0, 78)",
        marginTop: 5
    },
    registerBtn: {
        marginLeft: theme.spacing(3)
    }
}))

const Login = ({ handleLogin }) => {
    const classes = useStyles();
    const history = useHistory();
    const [user, setUser] = useState({});
    console.log(history);
    const login = () => {
        axios.post('http://127.0.0.1:8000/login', {
            userName: user.userName,
            pass: user.pass
        }).then(({ data }) => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                handleLogin(true)
                history.goBack();
            } else {
                handleLogin(false);
            }

        });
    }

    const handleChange = ({ target }) => {
        setUser((prev) => ({ ...prev, [target.name]: target.value }))
    }
    return (
        <div>
            <Container className={classes.root}>
                <Paper className={classes.form} elevation={3}>
                    <Typography>Đăng nhập</Typography>
                    <p className={classes.status}></p>
                    <form noValidate>
                        <div className={classes.textField}><TextField onChange={handleChange} size="small" id="outlined-basic" variant="outlined" label="User Name" name='userName'></TextField></div>
                        <div className={classes.textField}> <TextField onChange={handleChange} size="small" id="outlined-basic" variant="outlined" label="Pass Word" name='pass'></TextField></div>
                        <Button variant='contained' color='primary' onClick={login}>
                            Đăng nhập
                        </Button>
                        <Tooltip className={classes.registerBtn} title="Chưa có tài khoản ? Đăng ký ngay !" placement='right'><Link to='/register' style={{ textDecoration: 'none' }}><IconButton color='secondary'><NotListedLocationIcon /></IconButton></Link></Tooltip>
                    </form>
                </Paper>
            </Container>

        </div >
    );
};

Login.propTypes = {};

export default Login;