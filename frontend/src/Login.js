import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
    const history = useHistory();
    const [isSignUp, setIsSignUp] = useState(false);
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
                console.log("Login ", username)
                history.push('/MainPage', { username: username });

            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                console.log('Login failed. Please try again.');
            });
    };

    return (
        <div className="loginContainer" id="loginContainer">
                <form onSubmit={handleSubmit}>
                <h1>Sign in</h1>
                <input type="text" className="username" id="username" placeholder="Email" value={username} onChange={handleUsernameChange} />
                <input type="password" className="password" id="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
                </form>
        </div>
    );
}

export default Login;