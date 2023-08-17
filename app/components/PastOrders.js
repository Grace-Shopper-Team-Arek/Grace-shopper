import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPastOrdersThunk } from '../reducers/fetchPastOrders';

const PastOrders = (props) => {
    const { fetchPastOrders, pastOrders, auth } = props;

    console.log(props)

    useEffect(() => {
        if (auth.id) {
            fetchPastOrders(auth.id);
        }
    }, [auth]);

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    Past Orders
                </div>
                <div className="card-body">
                    {pastOrders && pastOrders.length === 0 ? (
                        <p>You have no past orders.</p>
                    ) : (
                        <div>
                            {pastOrders && pastOrders?.lineItems?.map(order => (
                                <div key={order.id}>
                                    <strong>Name:</strong> {order.product.name}
                                    <strong>Order ID:</strong> {order.id}
                                    <strong>Quantity:</strong> {order.quantity}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        pastOrders: state.pastOrders,
        auth: state.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPastOrders: (token) => dispatch(fetchPastOrdersThunk(token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PastOrders);
