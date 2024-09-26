import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import "./MainPage.css";
import deleteIcon from './delete-btn.svg';
import accountIcon from './account.svg';
import logo from './icon.svg';


function MainPage() {
    const location = useLocation();
    const { student_email } = location.state || {};
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [displayedDays, setDisplayedDays] = useState([]);
    const [bookings, setBookings] = useState([]); // Храним бронирования

    // Получаем бронирования студента при загрузке компонента
    useEffect(() => {
        getBookings(student_email)
            .then(data => {
                console.log("Bookings data:", data); // Лог для проверки данных
                setBookings(data);
            })
            .catch(error => console.error(error));
    }, [student_email]);

    // Создаем массив отображаемых дней
    useEffect(() => {
        const daysArray = [];
        const startDate = new Date(currentDate);

        const dayOfWeek = startDate.getDay();
        const shift = (dayOfWeek === 0) ? -6 : (1 - dayOfWeek);
        startDate.setDate(startDate.getDate() + shift);

        for (let i = 0; i < 28; i++) {
            const newDate = new Date(startDate);
            newDate.setDate(startDate.getDate() + i);
            daysArray.push(newDate);
        }

        setDisplayedDays(daysArray);
    }, [currentDate]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Функция для перехода на страницу бронирования
    const handleNewBooking = () => {
        navigate('/BookingPage', { state: { student_email } });
    };

     const handleLogout = () => {
        navigate('/'); 
    };

    // Функция для получения бронирований по дате
    const getBookingsForDate = (date) => {
        const formattedDate = date.toISOString().split('T')[0]; // Преобразуем дату в формат YYYY-MM-DD
        return bookings.filter(booking => booking.date === formattedDate);
    };

    // Функция для удаления бронирования при клике на значок корзины
    const handleDeleteClick = async (booking) => {
            const result = await deleteBooking(booking);
            if (result && result.success) {
                // После успешного удаления обновляем данные бронирований
                setBookings(prevBookings => prevBookings.filter(b => b !== booking));
        }
    };

    return (
        <div className="body">
            <header className="header">
                <article className="logo">
                    <img src={logo} alt="Логотип" /> PolyBooking
                </article>
                <article className="user-profile">
                    <div className="profile-avatar">
                        <img src={accountIcon} alt="Аватар пользователя" />
                    </div>
                    <div className="profile-info">
                        <span className="profile-name">{student_email}</span>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>Выйти</button>

                </article>
            </header>
            <main className="calendar-container">
                <section className="calendar-header">
                    <h2>{currentDate.toLocaleString('ru-RU', { month: 'long' }).charAt(0).toUpperCase() + currentDate.toLocaleString('ru-RU', { month: 'long' }).slice(1)} {currentDate.getFullYear()}</h2>
                    <button className="reserve-btn" onClick={handleNewBooking}>Забронировать аудиторию</button>
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
                        const isPastDate = date < today;
                        const dayBookings = getBookingsForDate(date);

                        return (
                            <article className={`calendar-cell ${isPastDate ? 'inactive' : ''}`} key={index}>
                                <span className="day-number">{date.getDate()}</span>
                                {dayBookings.map((booking, bookingIndex) => (
                                    <div
                                        key={bookingIndex}
                                        className="event"
                                        onMouseEnter={(e) => e.currentTarget.classList.add('hovered')}
                                        onMouseLeave={(e) => e.currentTarget.classList.remove('hovered')}
                                    >
                                        {booking.time} {booking.audience_name} {"ГК 1"}
                                        <div className="delete-btn" onClick={() => handleDeleteClick(booking)}>
                                             <img src={deleteIcon} alt="Удалить" className="delete-icon" />
                                        </div>
                                    </div>
                                ))}
                            </article>
                        );
                    })}
                </section>
            </main>
        </div>
    );
}

// Модифицированная функция для получения бронирований
async function getBookings(email) {
    let username = email;
    const jsonData = JSON.stringify({ username: username });

    try {
        const response = await fetch('http://localhost:8000/lk/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        console.log('User\'s reservations have been received successfully!');

        // Проверяем, есть ли в полученном объекте поле "bookings" и является ли оно массивом
        if (Array.isArray(data.bookings)) {
            return data.bookings;
        } else {
            console.error('No bookings array found in response:', data);
            return []; // Возвращаем пустой массив, если бронирования не найдены
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return []; // Возвращаем пустой массив в случае ошибки
    }
}

async function deleteBooking(booking) {
    const jsonData = JSON.stringify({
        audience: booking.audience,
        date: booking.date,
        time: booking.time,
        ordered_by: booking.ordered_by,
    });

    try {
        const response = await fetch('http://localhost:8000/delete_booking/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        if (data.success) {
            console.log('Booking deleted successfully');
        } else {
            console.error('Failed to delete booking:', data.error);
        }

        return data;
    } catch (error) {
        console.error('There was a problem with the delete operation:', error);
    }
}



export default MainPage;
