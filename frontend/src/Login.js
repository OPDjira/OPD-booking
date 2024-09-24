import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';

function Login() {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const loginData = { username, password };
        fetch('http://localhost:8000/login/', {
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
                console.log(data);
                history.push('/MainPage2', { student_email: username });
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                toast.error('Login failed. Please try again.');
            });
    };

    return (
       <div className="login">
        <div className="loginContainer" id="loginContainer">
                <form onSubmit={handleSubmit}>
                <h1>Sign in</h1>
                <input type="text" className="username" id="username" placeholder="Email" value={username} onChange={handleUsernameChange} />
                <input type="password" className="password" id="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                <button type="submit">Login</button>
                </form>
        </div>
            <ToastContainer />
        </div>
    );
}

export default Login;
