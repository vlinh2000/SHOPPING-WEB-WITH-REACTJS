import { React, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Carousel from '../components/Carousel';
import { Container, Button, Table, TableBody, TableCell, TableContainer, TableRow, Paper, ListItem, List, Typography } from '@material-ui/core';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { addToCart } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';




const useStyle = makeStyles((theme) => ({
    root: {
        padding: '10px 5px'
    },
    listItem: {
        fontSize: 14
    },
    addToCartBtn: {
        marginTop: 20
    }
}));


const ProductDetail = () => {
    const { productID } = useParams();
    const [product, setProduct] = useState({});
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyle();
    const dispatch = useDispatch()
    useEffect(() => {
        const url = `http://127.0.0.1:8000/products/${productID}`;
        axios.get(url).then((res) => {
            setProduct(res.data);
        }).catch((err) => console.log(err));

    }, [])

    const handleAddToCart = (product) => {
        const productToCart = { MSHH: product.MSHH, SoLuong: 1, SoLuongHang: product.SoLuongHang, Gia: product.Gia, HinhAnh: product.HinhAnh, TenHH: product.TenHH, GiamGia: product.GiamGia };
        const action = addToCart(productToCart);
        dispatch(action);
        enqueueSnackbar('Đã thêm sản phẩm vào giỏ hàng ! ', { variant: 'success' })
    }
    return (
        <Container >
            <Paper elevation={3} className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Typography align='center' variant='h6' >{product.TenHH}</Typography>
                        <Carousel listImg={[product.HinhAnh]} />
                    </Grid>
                    <Grid item xs={4}>
                        <h6>KHUYỄN MÃI</h6>
                        <List component='nav'>
                            <ListItem className={classes.listItem}>[Đặt trước] Tặng tai nghe OPPO trị giá 1.990.000 (Từ 21/7 - 6/8)</ListItem>
                            <ListItem className={classes.listItem}>[Đặt trước] Tặng Phiếu Mua Hàng 1.000.000đ (Đã trừ vào giá) (Từ 21/07 - 30/07)</ListItem>
                            <ListItem className={classes.listItem}>Trả góp 0% lãi suất</ListItem>
                            <ListItem className={classes.listItem}>Giảm thêm 5% (Tối đa 200K) khi thanh toán bằng ứng dụng VNPay QR-Code với mã: PT200</ListItem>
                        </List>
                        <Link to='/cart' style={{ textDecoration: 'none' }}>
                            <Button onClick={() => handleAddToCart(product)} className={classes.addToCartBtn} variant='outlined' color='secondary' startIcon={<AddShoppingCartOutlinedIcon />}>Mua hàng</Button>
                        </Link>
                    </Grid>
                    <Grid item xs={4}>
                        <h6>THÔNG SỐ KỸ THUẬT</h6>
                        <TableContainer >
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Màn hình:</TableCell>
                                        <TableCell>{product.ManHinh}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Hệ điều hành:</TableCell>
                                        <TableCell>{product.HeDieuHanh}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Camera sau:</TableCell>
                                        <TableCell>{product.CamSau}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Camera trước:</TableCell>
                                        <TableCell>{product.CamTruoc}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Chip:</TableCell>
                                        <TableCell>{product.Chip}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Màn hình:</TableCell>
                                        <TableCell>{product.Ram}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Hệ điều hành:</TableCell>
                                        <TableCell>{product.Rom}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Camera sau:</TableCell>
                                        <TableCell>{product.Sim}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

ProductDetail.propTypes = {
    addToCart: PropTypes.func
};
export default ProductDetail;
