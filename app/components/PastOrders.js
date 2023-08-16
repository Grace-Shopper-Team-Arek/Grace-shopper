import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithToken } from '../store';

const PastOrders = () => {
    const [pastOrders, setPastOrders] = useState([]);
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(loginWithToken()).then(() => {
            getPastOrders();
        });
    }, [dispatch]);

    const getPastOrders = async () => {
        try {
            const { data } = await axios.get('/api/order/past', {
                headers: { authorization: auth.token }
            });
            
            setPastOrders(data);
        } catch (error) {
            console.error("Error fetching past orders:", error);
        }
    };

    return (
        <div>
            <h2>Past Orders</h2>
            {pastOrders.length === 0 ? (
                <p>You have no past orders.</p>
            ) : (
                <ul>
                    {pastOrders.map(order => (
                        <li key={order.id}>
                            <strong>Order ID:</strong> {order.id}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PastOrders;