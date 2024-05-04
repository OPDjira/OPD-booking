import React, { useState } from 'react';

const CampusSelection = ({ campuses, onSelect, onDateTimeSelect }) => {
    const [selectedCampus, setSelectedCampus] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const handleCampusSelect = (event) => {
        const selectedCampusId = parseInt(event.target.value);
        const campus = campuses.find((campus) => campus.id === selectedCampusId);
        setSelectedCampus(campus);
        onSelect(campus); // Передаем выбранный корпус родительскому компоненту
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedTime(''); // Обнуляем время при изменении даты
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

    const handleProceedToAuditoriumSelection = () => {
        const selectedValues = {
            campus: selectedCampus.id,
            date: selectedDate,
            time: selectedTime
        };
        const jsonData = JSON.stringify(selectedValues);
        console.log(jsonData); // Выводим выбранные значения в формате JSON
        fetch('http://127.0.0.1:8000/booking/', { //должен быть норм адрес бэкенд-сервера
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
                alert('Login successful!');
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                alert('Login failed. Please try again.');
            });
    };


    const renderTimeButtons = () => {
        const now = new Date();
        const currentHour = now.getHours();
        const today = now.toISOString().split('T')[0];
        const times = ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
        return times.map((time, index) => {
            const [hour] = time.split(':').map(Number);
            if (selectedDate === today && hour < currentHour) {
                return null; // Пропустить кнопку, если выбрана сегодняшняя дата и время меньше текущего
            }
            return (
                <button key={index} onClick={() => handleTimeChange(time)}>
                    {time}
                </button>
            );
        });
    };

    const renderDateButtons = () => {
        const today = new Date();
        const buttons = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
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

    return (
        <div>
            {!selectedCampus ? (
                <div>
                    <h2>Выберите корпус:</h2>
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
                    <h2>Выбран корпус: {selectedCampus.name}</h2>
                    <h2>Выберите дату:</h2>
                    <div>
                        {renderDateButtons()}
                    </div>
                    <button onClick={handleBackToCampusSelect}>Назад к выбору корпуса</button>
                </div>
            ) : !selectedTime? (
                        <div>
                            <h2>Выбран корпус: {selectedCampus.name}</h2>
                            <h2>Выбрана дата: {selectedDate}</h2>
                            <h2>Выберите время:</h2>
                            <div>
                                {renderTimeButtons()}
                            </div>
                            <button onClick={handleBackToDateSelect}>Назад к выбору даты</button>
                        </div>
            ) : (
                <div>
                    <h2>Выбран корпус: {selectedCampus.name}</h2>
                    <h2>Выбрана дата: {selectedDate}</h2>
                    <h2>Выбрано время: {selectedTime}</h2>
                    <button onClick={handleBackToTimeSelect}>Назад к выбору времени</button>
                    <button onClick={handleProceedToAuditoriumSelection}>Перейти к выбору аудиторий</button>
                </div>
            )}
        </div>
    );
};

export default CampusSelection;