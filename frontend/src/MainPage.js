import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import "./MainPage.css";


function MainPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { student_email } = location.state || {};
    console.log(student_email);
    const [loading, setLoading] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [displayedDays, setDisplayedDays] = useState([]);
    const res = getBookings(student_email);

    useEffect(() => {
        const daysArray = [];
        const startDate = new Date(currentDate);

        // Сдвигаем дату на нужный день недели (понедельник)
        const dayOfWeek = startDate.getDay(); // Получаем день недели (0 - вс, 1 - пн, ...)
        const shift = (dayOfWeek === 0) ? -6 : (1 - dayOfWeek); // Если воскресенье, сдвигаем на -6
        startDate.setDate(startDate.getDate() + shift); // Устанавливаем начало недели на понедельник

        // Добавляем 28 дней
        for (let i = 0; i < 28; i++) {
            const newDate = new Date(startDate);
            newDate.setDate(startDate.getDate() + i);
            daysArray.push(newDate);
        }

        setDisplayedDays(daysArray);
    }, [currentDate]);

    // Обнуляем время в текущей дате
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Устанавливаем время на 00:00

    return (
        <div className="body">
            <header className="header">
                <article className="logo">
                    <span className="logo-icon">P.</span> PolyBooking
                </article>
                <article className="user-profile">
                    <div className="profile-avatar">
                        <img src='https://via.placeholder.com/50' alt="Аватар пользователя" />
                    </div>
                    <div className="profile-info">
                        <button className="profile-name">{student_email}</button>
                    </div>
                </article>
            </header>
            <main className="calendar-container">
                <section className="calendar-header">
                    <h2>{currentDate.toLocaleString('ru-RU', { month: 'long' }).charAt(0).toUpperCase() + currentDate.toLocaleString('ru-RU', { month: 'long' }).slice(1)} {currentDate.getFullYear()}</h2>
                    <button className="reserve-btn">Забронировать аудиторию</button>
                </section>
                <section className="weekdays">
                    <article className="weekday">Пн</article>
                    <article className="weekday">Вт</article>
                    <article className="weekday">Ср</article>
                    <article className="weekday">Чт</article>
                    <article className="weekday">Пт</article>
                    <article className="weekday">Сб</article>
                    <article className="weekday">Вс</article>
                </section>
                <section className="calendar-grid">
                    {displayedDays.map((date, index) => {
                        const isPastDate = date < today; // Проверяем, если дата прошедшая
                        return (
                            <article className={`calendar-cell ${isPastDate ? 'inactive' : ''}`} key={index}>
                                <span className="day-number">{date.getDate()}</span>
                                <div className="event">14:00 ГЗ 25</div>
                                <div className="delete-btn">🗑</div>
                            </article>
                        );
                    })}
                </section>
            </main>

        </div>
    );
}



function getBookings(email) {
    let username = email;
    const jsonData = JSON.stringify({ username: username });
    console.log(jsonData);
    fetch('http://localhost:8000/lk/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
            body: jsonData
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        console.log('User\'s reservations have been received successfully!');
        console.log('Reservations data:', data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        console.log('Booking failed. Please try again.');
    });
}


export default MainPage;
