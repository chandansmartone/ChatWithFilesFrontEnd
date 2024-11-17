// src/components/LoginForm.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../Utils/AuthProvide';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/ApiCalls'; // Import the loginUser service
import './LoginForm.css'; // Ensure this file is updated
import { SmLoading } from '../Utils/smallLoadingComponent/SmLoading';

const LoginForm = ({ setUserName }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isAuthenticated, login } = useAuth();
    const [loading,SetLoading]=useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            SetLoading(true);
            const response = await loginUser(email, password); // Call the service function
            
            // Set token in() localStorage
            localStorage.setItem('access_token', response.token);
            
            // Perform login and set user name
            login(response.token);
            setUserName(response.user?.username);
            
            // Redirect to home or dashboard
            navigate('/');
            SetLoading(false)
        } catch (error) {
            // Error is handled by the service's error handling, but you can also display custom messages here
            console.error('Login failed:', error);
            SetLoading(false)
        }
    };

    return (
        <div className="loginPage">
            <div className="login-container">
                <h2>Login to ChatWithFiles</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="btn">{loading?<SmLoading/>:"Log In"}</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
