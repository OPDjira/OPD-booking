import React, { useState } from 'react';
import CampusSelection from './CampusSelection';

const MainPage = ({ username }) => {
    const [selectedCampus, setSelectedCampus] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const handleCampusSelect = (campus) => {
        setSelectedCampus(campus);
    };

    const handleDateTimeSelect = (campus, date, time) => {
        setSelectedCampus(campus);
        setSelectedDate(date);
        setSelectedTime(time);
    };

    const campuses = [
        { id: 11, name: 'Корпус А' },
        { id: 12, name: 'Корпус Б' },
        { id: 13, name: 'Корпус В' },
    ];

    return (
        <div>
            <h1>Бронирование аудиторий</h1>
            <CampusSelection 
                campuses={campuses} 
                onSelect={handleCampusSelect} 
                onDateTimeSelect={handleDateTimeSelect} 
                username={username}/>
        </div>
    );
};

export default MainPage;