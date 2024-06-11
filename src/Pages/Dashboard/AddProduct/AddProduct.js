import React from 'react';
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styles from './AddProduct.module.css';

const AddProduct = () => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = data => {
        fetch('http://localhost:5000/add-product', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {

            })

        toast.success(`Product added successfully`, {
            position: "bottom-left",
            autoClose: 2000,
        });
        reset();
    };

    return (
        <div>
            <Container>
                <div className="mb-4">
                    <h3 className="fw-bold">Add Product</h3>
                </div>

                <div>
                    <Container>
                        <form onSubmit={handleSubmit(onSubmit)} className={`${'pb-4'} ${styles.addProductForm}`}>
                            <input {...register("title", { required: true })} placeholder="Product title" />

                            <input {...register("img", { required: true })} placeholder="Insert direct image URL" />

                            <textarea {...register("description", { required: true })} placeholder="Product description" />

                            <input type="number" {...register("price", { required: true })} placeholder="Product price" />

                            <input type="submit" value="Add New Product" className="btn btn-secondary" />
                        </form>
                    </Container>
                </div>
            </Container>
        </div>
    );
};

export default AddProduct;