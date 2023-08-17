import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPastOrdersThunk } from '../reducers/fetchPastOrders';

const PastOrders = (props) => {
    const { fetchPastOrders, pastOrders, auth } = props;

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
                        <ul className="list-group">
                            {pastOrders && pastOrders?.lineItems?.map(order => (
                                <li key={order.id} className="list-group-item mb-3">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <img src={order.product.imageUrl} alt={order.product.name} className="img-fluid" />
                                        </div>
                                        <div className="col-md-9">
                                            <strong>Name:</strong> {order.product.name}<br />
                                            <strong>Order ID:</strong> {order.id}<br />
                                            <strong>Quantity:</strong> {order.quantity}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
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
