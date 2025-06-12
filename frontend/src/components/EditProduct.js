import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState({ name:'', price: ''});

    useEffect(() => {
        axios.get(`/api/products/${id}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`/api/products/${id}`, product)
            .then(response => {
                console.log('Product updated successfully: ', response);
            })
            .catch(error => {
                console.error('Error updating product: ', error);
            });
    };

    return (
        <div>
            <h2>Edit Product</h2>
            <a href="/">Zurück</a>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={product.name} onChange={e => setProduct({ ...product, name: e.target.value })} />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="text" value={product.price} onChange={e => setProduct({ ...product, price: e.target.value })} />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default EditProduct;