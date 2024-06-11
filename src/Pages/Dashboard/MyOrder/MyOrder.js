import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import useAuth from "../../../Hook/useAuth";

const MyOrder = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const myOrderUri = `http://localhost:5000/orders/${user.email}`;

        fetch(myOrderUri)
            .then(res => res.json())
            .then(result => setOrders(result));
    }, [orders, user.email]);

    const handleDeleteOrder = productId => {
        const cancelConfirmation = window.confirm('Do you want to cancel your order?');

        if (cancelConfirmation) {
            const productUri = `http://localhost:5000/orders/${productId}`;
            fetch(productUri, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(result => {
                    toast.error(`Order canceled successfully`, {
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
                    <h3 className="fw-bold">My Order</h3>
                </div>

                <Table responsive hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Order Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            orders.map((order, index) => <tr>
                                <td>{index + 1}</td>
                                <td><img src={order.img} style={{ width: '72px', border: '1px solid gray', borderRadius: '4px' }} alt="" /></td>
                                <td>{order.title}</td>
                                <td>${order.price}</td>
                                <td>{order.status}</td>
                                <td><Button onClick={() => handleDeleteOrder(order._id)} variant="danger" size="sm">CANCEL</Button></td>
                            </tr>)
                        }
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default MyOrder;