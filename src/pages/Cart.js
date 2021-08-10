import { Table, TableRow, TableBody, TableContainer, TableCell, Container, TableHead, IconButton, Typography, Button, Paper, Tooltip } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import RemoveIcon from '@material-ui/icons/Remove';
import { React } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux'
import { increase, decrease, deleteProductInCart } from '../redux/cartSlice';

const useStyles = makeStyles(() => ({
    root: {
        padding: '30px 20px'
    },
    total: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#e5242f'
    },
    nullCart: {
        minHeight: 600,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    goShoppingBtn: {
        position: 'absolute',
        bottom: '43%',
        left: '50%'
    }
}))

const Cart = () => {
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar();
    const data = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const onHandleDecrease = (index) => {
        const action = decrease(index);
        dispatch(action);

    }
    const onHandleIncrease = (index) => {
        const action = increase(index);
        dispatch(action);
    }

    const onHandleDeleteProductInCart = (MSHH) => {
        const action = deleteProductInCart(MSHH)
        dispatch(action);
        enqueueSnackbar("Xóa sản phẩm thành công", { variant: 'success' })
    }

    if (data.products.length === 0) return <Container><Paper className={classes.nullCart} ><Link className={classes.goShoppingBtn} style={{ textDecoration: 'none' }} to='/'><Button variant='contained' color='secondary'>GO SHOPPING</Button></Link><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHZOCoGsqU9SMdS9TaWIAF6WhnbdehWjkkTw&usqp=CAU' alt='nullcart' /></Paper></Container>;
    return (
        <div>
            <Container>
                <Paper elevation={3} className={classes.root}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'>#</TableCell>
                                    <TableCell align='center'>Hình ảnh</TableCell>
                                    <TableCell align='center'>Tên sản phẩm</TableCell>
                                    <TableCell align='center'>Số lượng</TableCell>
                                    <TableCell align='center'>Giá</TableCell>
                                    <TableCell align='center'><SettingsIcon /></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {
                                    data.products.map((product, index) => (<TableRow key={product.MSHH}>
                                        <TableCell align='center'>{index + 1}</TableCell>
                                        <TableCell align='center'>
                                            <img width='60px' height='60px' src={product.HinhAnh} alt={product.MSHH} />
                                        </TableCell>
                                        <TableCell align='center'>{product.TenHH}</TableCell>
                                        <TableCell align='center'>
                                            <Tooltip title="Thêm số lượng">
                                                <IconButton disabled={product.SoLuong === product.SoLuongHang} onClick={() => onHandleIncrease(index)}  >
                                                    <AddCircleOutlineOutlinedIcon />
                                                </IconButton>
                                            </Tooltip>
                                            {product.SoLuong}
                                            <Tooltip title="Giảm số lượng">
                                                <IconButton disabled={product.SoLuong === 1} onClick={() => onHandleDecrease(index)}>
                                                    <RemoveIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align='center'>{product.Gia * product.SoLuong}</TableCell>
                                        <TableCell align='center'><Tooltip title='Xóa sản phẩm khỏi giỏ hàng' ><IconButton><DeleteForeverIcon color='primary' onClick={() => { onHandleDeleteProductInCart(product.MSHH) }} /></IconButton></Tooltip></TableCell>
                                    </TableRow>))}

                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography align='right' className='mt-5'>
                        <span className='mr-5'>Tổng tiền: <span className={classes.total}>đ {data.totalPrice} </span></span>
                        <Link to='/bill' style={{ textDecoration: 'none' }}>
                            <Button variant='contained' color="secondary">Đặt hàng</Button>
                        </Link>
                    </Typography>
                </Paper>

            </Container>
        </div>
    );
};

Cart.propTypes = {
    handleDecrease: PropTypes.func,
    handleIncrease: PropTypes.func,
    handleDeleteProductInCart: PropTypes.func,
    data: PropTypes.object,
};
export default Cart;