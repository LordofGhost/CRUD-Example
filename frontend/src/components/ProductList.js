import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect (() => {
        axios.get(`/api/products`)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    return (
        <div>
            <h2>Product List</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <a href={`/edit/${product.id}`}>{product.name}</a> - ${product.price}
                    </li>
                ))}
            </ul>
            <a href="/create">Add Product</a>
        </div>
    )
}

export default ProductList;