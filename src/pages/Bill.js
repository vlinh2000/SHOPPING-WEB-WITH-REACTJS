import { Paper, Select, Table, TableRow, TableBody, TableCell, Container, TableHead, IconButton, Typography, Button, Dialog, DialogContent, DialogContentText, DialogActions, TextField, makeStyles, MenuItem } from '@material-ui/core'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { React, useState } from 'react';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { shipData } from '../components/ShipData'
import { useSnackbar } from 'notistack';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearData } from '../redux/cartSlice'
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
    root: {
        padding: '20px 20px'
    },
    address: {
        color: "#e5242f",
        fontWeight: 700,
        fontSize: 13
    },
    phoneNumber: {
        fontSize: 14,
        fontWeight: 700
    },
    info: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    changeAddress: {
        fontSize: 13
    },
    defaultAddress: {
        color: '#aaa',
        marginRight: 10
    },
    ship: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '50px',
    },
    infoBuying: {
        marginTop: 10,
        marginBottom: 30,
        display: 'flex',
        justifyContent: 'space-between'
    },
    infoOne: {
        fontSize: 15,
        marginTop: 3
    },
    btnComfirm: {
        marginRight: 10
    },
    category: {
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 10
    },
    price: {
        fontWeight: 700,
        color: "#e5001c"
    }
}))

const Bill = () => {
    const [checked, setChecked] = useState(false);
    const [address, setAdress] = useState('Xã Xuân Hòa, huyên Kế Sách , tỉnh Sóc Trăng');
    const [addressExample, setAddressExample] = useState('');
    const [ship, setShip] = useState(0);
    const classes = useStyles();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const data = useSelector(state => state.cart)

    const ordered = () => {
        const date = new Date();
        const cart = JSON.parse(localStorage.getItem('Cart'));
        const products = cart.products.map((product) => {
            return { MSHH: product.MSHH, SoLuong: product.SoLuong, GiaDatHang: product.Gia }
        })
        const TongTien = cart.totalPrice + shipData[ship].price;
        const NgayDH = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        date.setDate(date.getDate() + 4)
        const NgayGH = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        const headers = {
            'Content-Type': 'application/json',
            "x-access-token": localStorage.getItem('token')
        }

        axios.post('http://127.0.0.1:8000/bill', { NgayDH, NgayGH, TongTien, products }, { headers: headers }).then(({ data }) => {
            if (data.success) {
                enqueueSnackbar(data.message, { variant: 'success' });
                const action = clearData();
                dispatch(action);
                history.replace('/');
            }
            else enqueueSnackbar(data.message, { variant: 'danger' });
        })
        // 
    }

    const handleClickChangeAddress = () => {
        setChecked((prev) => !prev)
    }

    const handleChangeAddress = ({ target }) => {
        setAddressExample(target.value);
    }
    const handleClickSaveAddress = () => {
        setAdress(addressExample);
        setChecked(false)
    }

    const handleClickExit = () => {
        setChecked(false);
    }

    const handleChangeShip = ({ target }) => {
        setShip(target.value)
    }

    return (
        <div>
            <Container>
                <Paper elevation={3} className={classes.root}>
                    <div className={classes.info}>
                        <Typography><LocationOnOutlinedIcon /> Địa chỉ: <span className={classes.phoneNumber}>(+84) 387746559 </span> <span className={classes.address}>{address}</span></Typography>
                        <Typography className={classes.changeAddress} ><span className={classes.defaultAddress}>Mặc định</span> <IconButton onClick={handleClickChangeAddress} variant='outlined' color='primary'><EditOutlinedIcon fontSize="small" /></IconButton> </Typography>
                        <Dialog maxWidth='lg' open={checked} onClose={handleClickExit}>
                            <DialogContent>
                                <DialogContentText >
                                    <TextField onChange={handleChangeAddress} label="Nhập địa chỉ mới" value={addressExample}> </TextField>
                                </DialogContentText>
                                <DialogActions>
                                    <Button startIcon={<SaveOutlinedIcon />} onClick={handleClickSaveAddress} variant="outlined" color='primary' >Lưu</Button>
                                    <Button startIcon={<CancelOutlinedIcon />} onClick={handleClickExit} variant="outlined" color='secondary' >Thoát</Button>
                                </DialogActions>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div>
                        <div className={classes.ship}>
                            <Typography ><LocalShippingOutlinedIcon /> Chọn đơn vị vận chuyển</Typography>
                            <Select className='ml-2' value={ship} onChange={handleChangeShip}  >
                                {shipData.map((shiper) => <MenuItem key={shiper.idShiper} value={shiper.idShiper}>{shiper.name}</MenuItem>)}
                            </Select>
                        </div>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'>#</TableCell>
                                    <TableCell align='center'>Hình ảnh</TableCell>
                                    <TableCell align='center'>Tên sản phẩm</TableCell>
                                    <TableCell align='center'>Số lượng</TableCell>
                                    <TableCell align='center'>Thành tiền</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.products.map((product, index) => (<TableRow>
                                    <TableCell align='center'>{index + 1}</TableCell>
                                    <TableCell align='center'>
                                        <img width='60px' height='60px' src={product.HinhAnh} alt={product.MSHH} />
                                    </TableCell>
                                    <TableCell align='center'>{product.TenHH}</TableCell>
                                    <TableCell align='center'>{product.SoLuong}</TableCell>
                                    <TableCell align='center'>{product.SoLuong * product.Gia}</TableCell>
                                </TableRow>))}
                            </TableBody>
                        </Table>
                    </div>
                    <Typography align='center' >
                        <img src={shipData[ship].img} alt='GHTK' width='100px' heigh='100px' />
                    </Typography>
                    <div className={classes.infoBuying}>
                        <div></div>
                        <div>
                            <Typography className={classes.infoOne}>
                                <span className={classes.category}>Tổng tiền :</span><span>{data.totalPrice}</span>
                            </Typography>
                            <Typography className={classes.infoOne}>
                                <span className={classes.category}>Giảm giá :</span> <span>0</span>
                            </Typography>
                            <Typography className={classes.infoOne}>
                                <span className={classes.category}>Phí ship :</span> <span>{shipData[ship].price}</span>
                            </Typography>
                            <Typography className={classes.infoOne}>
                                <span className={classes.category}>Tổng thanh toán :</span><span className={classes.price}>{data.totalPrice + shipData[ship].price}</span>
                            </Typography>
                        </div>
                    </div>
                    <Typography align='right'>
                        <Button variant='contained' color='primary' className={classes.btnComfirm} onClick={ordered} >Xác nhận</Button>
                        <Link to='/cart' style={{ textDecoration: 'none' }}>
                            <Button variant='contained' color='secondary'>Quay lại</Button>
                        </Link>
                    </Typography>
                </Paper>
            </Container>
        </div>
    );
};

export default Bill;