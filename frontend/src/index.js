import jQuery from 'jquery'
const element = document.getElementById("login");
element.addEventListener("click", login);


async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginData = { username, password };
    console.log(JSON.stringify(loginData)); // Выводим данные в формате JSON
    fetch('http://127.0.0.1:8000/login/', { //должен быть норм адрес бэкенд-сервера
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
            alert('Login successful!');
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Login failed. Please try again.');
        });
}