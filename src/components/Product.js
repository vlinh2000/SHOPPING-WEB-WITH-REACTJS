import React from 'react';
import './Product.css';
import { Link } from 'react-router-dom';
const product = ({ MSHH, HinhAnh, TenHH, Gia }) => {
    return (
        <li class="card text-white">
            <Link to={`/product/${MSHH}`} className="product" >
                <img class="card-img-top" src={HinhAnh} alt={MSHH} />
                <div class="card-body">
                    <h4 class="card-title">{TenHH}</h4>
                    <p className="price">    {Gia.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    })}</p>
                </div>
            </Link>
        </li>
    );
};

export default product;