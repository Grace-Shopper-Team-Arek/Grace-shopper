import React from 'react';
import { useNavigate } from 'react-router-dom';

const GuestHome = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div>
                <button 
                    className="btn btn-primary mr-2"
                    onClick={() => navigate('./login')}
                >
                    Login
                </button>
                <button 
                    className="btn btn-secondary"
                    onClick={() => navigate('/register')}
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default GuestHome;

