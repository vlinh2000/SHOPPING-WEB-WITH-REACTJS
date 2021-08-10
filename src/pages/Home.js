import { Container } from '@material-ui/core';
import { React, useState, useEffect } from 'react';
import Product from '../components/ListProduct';
import PaginationApp from '../components/PaginationApp';
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import axios from 'axios';
const useStyle = makeStyles((theme) => ({
    searchResult: {
        color: "#bc1400",
        fontWeight: 700,
        fontSize: 17,
    },
    ml: {
        marginLeft: 30
    }
}))

const Home = () => {
    const classes = useStyle();
    const [products, setProducts] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const pageData = useSelector(state => state.pageData);
    const searchValue = useSelector(state => state.searchItem.value);

    // GET ALL PRODUCTS IN PAGE & LIMIT
    useEffect(() => {
        const url = `http://127.0.0.1:8000/products?page=${pageData.page}&limit=${pageData.limit}`;
        axios.get(url).then((res) => {
            if (searchValue !== '') {
                const dataHaveSearch = res.data.data.filter((product) => product.TenHH.toLowerCase().includes(searchValue.toLowerCase()));
                setProducts(dataHaveSearch);
            } else {
                setProducts(res.data.data);
            }
            setTotalPage(res.data.totalPage);

        }).catch((err) => console.log(err));

    }, [pageData.page, searchValue])
    return (
        <div>
            <Container>
                {searchValue ? <p className={classes.ml}>Kết quả tìm kiếm cho <span className={classes.searchResult}>{searchValue}</span></p> : ''}
                <Product products={products} />
                <PaginationApp page={pageData.page} totalPage={totalPage} />
            </Container>
        </div>
    );
};

Home.propTypes = {
    page: PropTypes.number,
    handleChangePage: PropTypes.func,
    searchValue: PropTypes.string,
    data: PropTypes.array,
    totalPage: PropTypes.number,
    limit: PropTypes.number
};

export default Home;