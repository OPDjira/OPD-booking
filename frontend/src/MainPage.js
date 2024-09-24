import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './mainPage.css';


const MainPage = ({ location }) => {
    const history = useHistory();
    const { student_email } = location.state || '';
    const [loading, setLoading] = useState(false);


    const campuses = [
        { id: 13, name: 'Гидротехнический корпус-1' },
    ];

        const [selectedCampus, setSelectedCampus] = useState(null);
        const [selectedDate, setSelectedDate] = useState('');
        const [selectedTime, setSelectedTime] = useState('');

        const handleCampusSelect = (event) => {
            const selectedCampusId = parseInt(event.target.value);
            const campus = campuses.find((campus) => campus.id === selectedCampusId);
            setSelectedCampus(campus);
        };

        const handleDateChange = (date) => {
            setSelectedDate(date);
            setSelectedTime('');
        };

        const handleTimeChange = (time) => {
            setSelectedTime(time);
        };

        const handleBackToCampusSelect = () => {
            setSelectedCampus(null);
            setSelectedDate('');
            setSelectedTime('');

        };

        const handleBackToDateSelect = () => {
            setSelectedDate('');
            setSelectedTime('');
        };

        const handleBackToTimeSelect = () => {
            setSelectedTime('');
        };

    const renderTimeButtons = () => {
        const now = new Date();
        const currentHour = now.getHours();
        const today = now.toISOString().split('T')[0];
        const times = ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
        return times.map((time, index) => {
            const [hour] = time.split(':').map(Number);
            if (selectedDate === today && hour <= currentHour) {
                return null;
            }
            return (
                <button className="time-button" key={index} onClick={() => handleTimeChange(time)}>
                    {time}
                </button>
            );
        });
    };

    const renderDateButtons = () => {
        const today = new Date();
        const currentHour = today.getHours();
        const buttons = [];

        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            if (i === 0 && currentHour >= 18) {
                date.setDate(date.getDate() + 1);
            }
            buttons.push(
                <button key={i} onClick={() => handleDateChange(date.toISOString().split('T')[0])}>
                    {`${date.getDate()} ${getMonthName(date.getMonth())}, ${getDayName(date.getDay())}`}
                </button>
            );
        }
        return buttons;
    };


    const getMonthName = (monthIndex) => {
        const months = [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ];
        return months[monthIndex];
    };

    const getDayName = (dayIndex) => {
        const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        return days[dayIndex];
    };

    const handleProceedToAuditoriumSelection = () => {
        setLoading(true); // Установка состояния загрузки перед началом запроса
        let selectedValues = {
            building: selectedCampus.id,
            date: selectedDate,
            time: selectedTime
        };

        const jsonData = JSON.stringify(selectedValues);
        console.log(jsonData);
        fetch('http://localhost:8000/booking/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        })
            .then(response => {
                setLoading(false); // Обновление состояния загрузки после завершения запроса
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                console.log('Booking successful!');
                console.log('Booking Data:', data);
                history.push('/Gidro1', { selectedCampus: selectedCampus, selectedDate: selectedDate, selectedTime: selectedTime, unavailableAuditoriums: data, student_email: student_email });
            })
            .catch(error => {
                setLoading(false); // Обновление состояния загрузки в случае ошибки
                console.error('There was a problem with the fetch operation:', error);
                console.log('Booking failed. Please try again.');
            });
    };

        return (
            <div className='main_page'>
                <div className='MainPageContainer'>
                <h1 className='MainPageContainer' >Бронирование аудиторий</h1>
                {!selectedCampus ? (
                    <div>
                        <h2 className='MainPageContainer'>Выберите корпус:</h2>
                        <select value={selectedCampus ? selectedCampus.id : ''} onChange={handleCampusSelect}>
                            <option value="">Выберите корпус</option>
                            {campuses.map((campus) => (
                                <option key={campus.id} value={campus.id}>
                                    {campus.name}
                                </option>
                            ))}
                        </select>
                    </div>
                ) : !selectedDate ? (
                    <div>
                            <h2 className='MainPageContainer'>Выбран корпус: {selectedCampus.name}</h2>
                            <h2 className='MainPageContainer'>Выберите дату:</h2>
                        <div>
                            {renderDateButtons()}
                        </div>
                        <button className='backStep' onClick={handleBackToCampusSelect}>Назад к выбору корпуса</button>
                    </div>
                ) : !selectedTime ? (
                    <div>
                                <h2 className='MainPageContainer'>Выбран корпус: {selectedCampus.name}</h2>
                                <h2 className='MainPageContainer'>Выбрана дата: {selectedDate}</h2>
                                <h2 className='MainPageContainer'>Выберите время:</h2>
                        <div>
                            {renderTimeButtons()}
                        </div>
                        <button className='backStep' onClick={handleBackToDateSelect}>Назад к выбору даты</button>
                    </div>
                ) : (
                    <div>
                                    <h2 className='MainPageContainer'>Выбран корпус: {selectedCampus.name}</h2>
                                    <h2 className='MainPageContainer'>Выбрана дата: {selectedDate}</h2>
                                    <h2 className='MainPageContainer'>Выбрано время: {selectedTime}</h2>
                        <button className='backStep' onClick={handleBackToTimeSelect}>Назад к выбору времени</button>
                        <button className='chooseRoomStep' onClick={handleProceedToAuditoriumSelection}>Перейти к выбору аудиторий</button>
                    </div>
                )}
                {loading && <p>Loading...</p>}
                </div>
            </div>
        );
    };



export default MainPage;