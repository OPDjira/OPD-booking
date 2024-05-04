import React, { useState } from 'react';
import CampusSelection from './blog';

const App = () => {
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
        { id: 1, name: 'Корпус А' },
        { id: 2, name: 'Корпус Б' },
        { id: 3, name: 'Корпус В' },
    ];

    return (
        <div>
            <h1>Бронирование аудиторий</h1>
            <CampusSelection campuses={campuses} onSelect={handleCampusSelect} onDateTimeSelect={handleDateTimeSelect} />
            {/* Здесь можно добавить дополнительные компоненты для даты, времени и т. д. */}
        </div>
    );
};

export default App;