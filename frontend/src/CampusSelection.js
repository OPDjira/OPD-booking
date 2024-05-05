import React, { useState } from 'react';

const CampusSelection = ({ campuses, onSelect, onDateTimeSelect, username }) => {
    const [selectedCampus, setSelectedCampus] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [availableAuditoriums, setAvailableAuditoriums] = useState([]);
    const auditoriumIds = [1, 2, 3, 523, 550, 1104, 534, 1305, 514, 571, 538, 1080, 546, 520, 536, 533, 568, 788, 787, 545, 789, 1306, 570, 535, 2146, 1640, 532, 553, 2002, 531, 543, 1417, 557, 1294, 542, 525, 507, 1421, 785, 554, 1607, 1304, 521, 786, 527];

    const handleCampusSelect = (event) => {
        const selectedCampusId = parseInt(event.target.value);
        const campus = campuses.find((campus) => campus.id === selectedCampusId);
        setSelectedCampus(campus);
        onSelect(campus);
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

    const handleProceedToAuditoriumSelection = () => {
        let selectedValues = {
            building: selectedCampus.id,
            date: selectedDate,
            time: selectedTime
        };
        selectedValues = { building: 11, date: "2024-05-03", time: "10:00" };
        //пример для определеленной даты. Затем selectedValues поменять на const
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
                console.log('Booking successful!');
                console.log('Booking Data:', data);
                const bookingAuditoriumIds = data.bookings.map(booking => booking.audience);

                // Фильтруем массив аудиторий, оставляя только те, которые есть в массиве auditoriumIds, но отсутствуют в bookingAuditoriumIds
                const availableAuditoriums = auditoriumIds.filter(auditoriumId => !bookingAuditoriumIds.includes(auditoriumId));

                console.log('Доступные аудитории:', availableAuditoriums);

                setAvailableAuditoriums(availableAuditoriums);

            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                console.log('Booking failed. Please try again.');
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

    const handleBookAuditorium = (auditoriumId) => {
        const selectedValues = {
            building: selectedCampus.id,
            auditorium: auditoriumId,
            date: selectedDate,
            time: selectedTime,
            ordered_by: username
        };
        console.log(selectedValues);
        const jsonData = JSON.stringify(selectedValues);

        fetch('http://127.0.0.1:8000/newbooking', {
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
                console.log('Booking successful for auditorium', auditoriumId);
                console.log('Booking Data:', data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                console.log('Booking failed. Please try again.');
                console.log(jsonData);
            });
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
                    <button className='backStep' onClick={handleBackToCampusSelect}>Назад к выбору корпуса</button>
                </div>
            ) : !selectedTime ? (
                <div>
                    <h2>Выбран корпус: {selectedCampus.name}</h2>
                    <h2>Выбрана дата: {selectedDate}</h2>
                    <h2>Выберите время:</h2>
                    <div>
                        {renderTimeButtons()}
                    </div>
                    <button className='backStep' onClick={handleBackToDateSelect}>Назад к выбору даты</button>
                </div>
            ) : (
                <div>
                    <h2>Выбран корпус: {selectedCampus.name}</h2>
                    <h2>Выбрана дата: {selectedDate}</h2>
                    <h2>Выбрано время: {selectedTime}</h2>
                    <button className='backStep' onClick={handleBackToTimeSelect}>Назад к выбору времени</button>
                    <button className='chooseRoomStep' onClick={handleProceedToAuditoriumSelection}>Перейти к выбору аудиторий</button>
                </div>
            )}

            {availableAuditoriums.map((auditoriumId, index) => (
                <button key={index} onClick={() => handleBookAuditorium(auditoriumId)}>
                    Забронировать аудиторию {auditoriumId}
                </button>
            ))}
        </div>
    );
};



export default CampusSelection;