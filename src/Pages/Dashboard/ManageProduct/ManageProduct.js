import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from "react-bootstrap";
import { toast } from 'react-toastify';

const ManageProduct = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [products]);

    const handleDeleteProduct = productId => {
        const deleteConfirmation = window.confirm('Do you want to delete product?');

        if (deleteConfirmation) {
            const productUri = `http://localhost:5000/product/${productId}`;

            fetch(productUri, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(result => {
                    toast.error(`Product deleted successfully`, {
                        position: "bottom-left",
                        autoClose: 2000,
                    });
                })
        }
    };

    return (
        <div>
            <Container>
                <div className="mb-4">
                    <h3 className="fw-bold">Manage Products</h3>
                </div>

                <Table responsive hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Availability</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            products.map((product, index) => <tr>
                                <td>{index + 1}</td>
                                <td><img src={product.img} style={{ width: '72px', border: '1px solid gray', borderRadius: '4px' }} alt="" /></td>
                                <td>{product.title}</td>
                                <td>${product.price}</td>
                                <td>In Stock</td>
                                <td><Button onClick={() => handleDeleteProduct(product._id)} variant="danger" size="sm">DELETE</Button></td>
                            </tr>)
                        }
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default ManageProduct;