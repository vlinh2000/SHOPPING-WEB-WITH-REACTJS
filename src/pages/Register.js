import { Button, Container, IconButton, Paper, Tooltip, Typography } from '@material-ui/core';
import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import FaceIcon from '@material-ui/icons/Face';
import LockIcon from '@material-ui/icons/Lock';
import HomeIcon from '@material-ui/icons/Home';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import EmailIcon from '@material-ui/icons/Email';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center'
    },
    textField: {
        margin: '25px 0px',
        display: 'flex',
        alignItems: 'center'
    },
    form: {
        display: 'inline-block',
        padding: '10px 70px'
    },
    status: {
        fontSize: 13,
        fontWeight: 700,
        color: "#45a545",
        marginTop: 5
    },
    icon: {
        marginRight: theme.spacing(3)
    },
    loginBtn: {
        marginLeft: theme.spacing(3)
    }
}))

const Register = () => {
    const classes = useStyles();
    const [user, setUser] = useState({})
    const [status, setStatus] = useState('');
    const [samepass, setSamePass] = useState({ valid: true, errMessage: "" })

    const handleChange = ({ target }) => {
        setUser((prev) => ({ ...prev, [target.name]: target.value }))
    };

    const samePass = () => {
        if (user.PassWord !== user.rePassWord) { setSamePass({ valid: false, errMessage: "Xác nhận mật khẩu không chính xác." }) } else setSamePass({ valid: true, errMessage: "" })
    }

    const register = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/register', user).then(({ data }) => setStatus(data.message));

    }

    useEffect(() => {
        const removeStatusID = setInterval(() => setStatus(''), 5000)
        return () => {
            clearInterval(removeStatusID);
        }
    }, [status])
    return (
        <div>
            <Container className={classes.root}>
                <Paper className={classes.form} elevation={3}>
                    <Typography>Đăng ký</Typography>
                    <p className={classes.status} color='success' >{status}</p>
                    <form onSubmit={register} >
                        <div className={classes.textField}> <FaceIcon className={classes.icon} /> <TextField onChange={handleChange} size="small" id="outlined-basic" label="Họ tên" name="HoTenKH" required ></TextField></div>
                        <div className={classes.textField}><PersonIcon className={classes.icon} /> <TextField onChange={handleChange} size="small" id="outlined-basic" label="Tài khoản" name="UserName" required></TextField></div>
                        <div className={classes.textField}> <LockIcon className={classes.icon} /><TextField onChange={handleChange} size="small" type='password' id="outlined-basic" label="Mật khẩu" name="PassWord" required></TextField></div>
                        <div className={classes.textField}> <LockIcon className={classes.icon} /><TextField onChange={handleChange} error={!samepass.valid} helperText={samepass.errMessage} onBlur={samePass} size="small" type='password' id="outlined-basic" label="Xác nhận mật khẩu" name="rePassWord" required></TextField></div>
                        <div className={classes.textField}><HomeIcon className={classes.icon} /> <TextField onChange={handleChange} size="small" id="outlined-basic" label="Địa chỉ" name="DiaChi" required></TextField></div>
                        <div className={classes.textField}> <PhoneAndroidIcon className={classes.icon} /><TextField onChange={handleChange} type='number' size="small" id="outlined-basic" label="Số điện thoại" name="SoDienThoai" required></TextField></div>
                        <div className={classes.textField}><EmailIcon className={classes.icon} /> <TextField onChange={handleChange} type='email' size="small" id="outlined-basic" label="Email" name="Email" required></TextField></div>
                        <Button type='submit' variant='contained' color='primary' >
                            Đăng ký
                        </Button>
                        <Tooltip className={classes.loginBtn} title="Đã có tài khoản ? Đăng nhập ngay !" placement='right'><Link to='/login' style={{ textDecoration: 'none' }}><IconButton color='secondary'><NotListedLocationIcon /></IconButton></Link></Tooltip>
                    </form>
                </Paper>
            </Container>

        </div >
    );
};

Register.propTypes = {};

export default Register;