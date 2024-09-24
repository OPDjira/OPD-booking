import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginPage.css';

function LoginPage() {
    const navigate = useNavigate();
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
                navigate('/MainPage', { state: { student_email: username } });
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
                <h1 className='SignIn'>Вход</h1>
                <input type="text" className="username" id="username" placeholder="Имя пользователя" value={username} onChange={handleUsernameChange} />
                <input type="password" className="password" id="password" placeholder="Пароль" value={password} onChange={handlePasswordChange} />
                <button className="submit" type="submit">Войти</button>
                </form>
        </div>
            <ToastContainer />
        </div>
    );
}

export default LoginPage;
