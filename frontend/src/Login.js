import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
    const history = useHistory();
    const [isSignUp, setIsSignUp] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const loginData = { username, password };
        console.log(JSON.stringify(loginData)); // Выводим данные в формате JSON
        fetch('http://127.0.0.1:8000/login/', { // Замените на нужный адрес бэкенд-сервера
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                console.log('Login successful!');
                history.push('/MainPage');

            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                console.log('Login failed. Please try again.');
            });
    };

    return (
        <div className="container" id="container">
            <div className={`form-container ${isSignUp ? 'sign-up-container' : 'sign-in-container'}`}>
                <form onSubmit={handleSubmit}>
                    <h1>{isSignUp ? 'Create Account' : 'Sign in'}</h1>
                    <span>{isSignUp ? 'or use your email for registration' : 'or use your account'}</span>
                    {isSignUp && <input type="text" placeholder="Name" />}
                    <input type="text" id="username" placeholder="Email" value={username} onChange={handleUsernameChange} />
                    <input type="password" id="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                    {!isSignUp && <a href="#">Forgot your password?</a>}
                    <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className={`overlay-panel ${isSignUp ? 'overlay-right' : 'overlay-left'}`}>
                        <h1>{isSignUp ? 'Hello, Friend!' : 'Welcome Back!'}</h1>
                        <p>{isSignUp ? 'Enter your personal details and start journey with us' : 'To keep connected with us please login with your personal info'}</p>
                        <button className="ghost" onClick={toggleForm}>{isSignUp ? 'Sign Up' : 'Sign In'}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;