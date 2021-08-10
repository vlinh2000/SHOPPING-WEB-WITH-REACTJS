import { React } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { changePage } from '../redux/productSlice';
import { useDispatch, } from 'react-redux';

const PaginationApp = ({ page = 1, totalPage = 1 }) => {
    const dispatch = useDispatch()
    const handleOnchange = (e, value) => {
        const action = changePage(value);
        dispatch(action);
    }
    return (
        <div className="container pagination" >
            <Pagination count={totalPage} page={page} color="primary" onChange={handleOnchange} defaultPage={page} />
        </div>
    );
};

export default PaginationApp;