import React from 'react';
import Product from './Product';

const ListProduct = ({ products }) => {
    return (
        <div className="container">
            <h5 className="mb-5 mt-5" style={{ textAlign: 'center' }}>ĐIỆN THOẠI</h5>
            <ul className='list-product'>
                {products.map((product) => <Product key={product.id} {...product} />)}
            </ul>
        </div>
    );
};

export default ListProduct;