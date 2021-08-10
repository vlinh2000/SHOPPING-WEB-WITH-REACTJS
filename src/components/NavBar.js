import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Toolbar, AppBar, Tooltip, Button, Badge } from '@material-ui/core';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import PropTypes from 'prop-types';
import Profile from './Profile';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    mgr: {
        marginRight: theme.spacing(3),
    },
    mgl: {
        marginLeft: theme.spacing(5)
    },
    title: {
        flexBasis: '80%',
    },
    linkTheme: {
        textDecoration: 'none',
        color: '#FFF',
        '&:hover': {
            color: "#ddd"
        }
    }
}));

export default function NavBar({ userName, isLogin, handleLogout }) {
    const classes = useStyles();
    const numCart = useSelector(state => state.cart.products.length);
    return (
        <div >
            <AppBar position="fixed">
                <Toolbar className={classes.root}>
                    <Typography variant="h6" id='wrapLogo'>
                        <Link to="/" className={classes.linkTheme}>
                            VietLinh store
                        </Link>
                    </Typography>
                    <Typography className={classes.root}>
                        <SearchBar />
                        <Link to="/cart" className={`${classes.linkTheme} ${classes.mgr} ${classes.mgl}`} >
                            <Tooltip title="Giỏ hàng">{numCart === 0 ? <ShoppingCartOutlinedIcon /> : <Badge badgeContent={numCart} color="secondary"><ShoppingCartOutlinedIcon /></Badge>}</Tooltip>
                        </Link>
                        {isLogin ? <Profile userName={userName} handleLogout={handleLogout} /> : <Button variant='outlined' color='secondary'><Link to="/login" className={classes.linkTheme}>
                            LOG IN
                        </Link></Button>}


                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
NavBar.propTypes = {
    numCart: PropTypes.number,
    handleSearchValue: PropTypes.func,
    value: PropTypes.string
};