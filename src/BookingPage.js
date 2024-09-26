import React, { useState, useEffect } from 'react';
import './BookingPage.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import accountIcon from './account.svg';



function BookingPage() {
    const [selectedCampus, setSelectedCampus] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [loading, setLoading] = useState(false);
    const [availableAuditoriums, setAvailableAuditoriums] = useState([]);
    const [modalVisible, setModalVisible] = useState(false); // Для управления модальным окном
    const [selectedAuditorium, setSelectedAuditorium] = useState(null); // Для выбранной аудитории

    const location = useLocation();
    const { student_email } = location.state || {};
    const navigate = useNavigate();

    const campuses = [
        { id: 13, name: 'Гидротехнический корпус 1' },
    ];

    useEffect(() => {
        if (campuses.length > 0) {
            setSelectedCampus(campuses[0]);
        }
    }, []);

    const handleCampusSelect = (event) => {
        const selectedCampusId = parseInt(event.target.value);
        const campus = campuses.find((campus) => campus.id === selectedCampusId);
        setSelectedCampus(campus);
    };

    const generateDateOptions = () => {
        const today = new Date();
        const currentHour = today.getHours();
        const options = [];

        let startDate = new Date(today);

        if (currentHour >= 18) {
            startDate.setDate(startDate.getDate() + 1);
        }

        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);

            const value = date.toISOString().split('T')[0];
            const label = `${date.getDate()} ${getMonthName(date.getMonth())}, ${getDayName(date.getDay())}`;

            options.push({ key: value, value, label });
        }

        return options;
    };

    useEffect(() => {
        const dateOptions = generateDateOptions();
        if (dateOptions.length > 0) {
            setSelectedDate(dateOptions[0].value);
        }
    }, []);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        setSelectedTime('');
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    const generateTimeOptions = () => {
        const now = new Date();
        const currentHour = now.getHours();
        const today = now.toISOString().split('T')[0];
        const times = ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00'];

        return times.map((time, index) => {
            const [hour] = time.split(':').map(Number);
            if (selectedDate === today && hour <= currentHour) {
                return (
                    <option key={index} value={time} disabled>
                        {time} - Недоступно
                    </option>
                );
            }
            return (
                <option key={index} value={time}>
                    {time}
                </option>
            );
        });
    };

    const getMonthName = (monthIndex) => {
        const months = [
            'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
            'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
        ];
        return months[monthIndex];
    };

    const getDayName = (dayIndex) => {
        const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        return days[dayIndex];
    };

    const handleProceedToAuditoriumSelection = () => {
        if (!selectedCampus || !selectedDate || !selectedTime) return;

        setLoading(true);
        const selectedValues = {
            building: selectedCampus.id,
            date: selectedDate,
            time: selectedTime,
        };

        const jsonData = JSON.stringify(selectedValues);
        console.log(jsonData);
        fetch('http://localhost:8000/booking/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData,
        })
            .then((response) => {
                setLoading(false);
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then((data) => {
                console.log('Booking successful!');
                console.log('Booking Data:', data);
                data = data.bookings.map(booking => {
                    return { [booking.audience]: booking.name };
                });

                let Auditoriums = [
                    { 634: '325' },
                    { 2116: '444' },
                    { 609: '118' },
                    { 619: '229' },
                    { 618: '216' },
                    { 873: '234' },
                    { 1890: '123б' },
                    { 1352: '123а' },
                    { 1768: '423' },
                    { 969: '106' },
                    { 610: '119' },
                    { 1394: '237' },
                    { 629: '314' },
                    { 606: '112' },
                    { 612: '121' },
                    { 631: '321' },
                    { 1029: '326' },
                    { 627: '310' },
                    { 1041: '433' },
                    { 620: '230' },
                    { 973: '104' },
                    { 608: '117' },
                    { 621: '232' },
                    { 614: '202' },
                    { 626: '309' },
                    { 630: '316' },
                    { 1637: '217' },
                    { 649: '439' },
                    { 652: '121А' },
                    { 1051: '438' },
                    { 1053: '449' },
                    { 644: '422' },
                    { 615: '208' },
                    { 1056: '412' },
                    { 607: '113' },
                    { 994: '224' },
                    { 1054: '442' },
                    { 648: '450' },
                    { 650: '440' },
                    { 605: '108' },
                    { 1037: '317' },
                    { 632: '322' }]

                function getName(auditorium) {
                    return Object.values(auditorium)[0];
                }

                Auditoriums.sort((a, b) => {
                    const nameA = getName(a);
                    const nameB = getName(b);
                    return nameA.localeCompare(nameB);
                });

                const availableAuditoriums = Auditoriums.filter(auditorium => {
                    return !data.some(data => {
                        return Object.values(data)[0] === Object.values(auditorium)[0];
                    });
                });

                setAvailableAuditoriums(availableAuditoriums);
            })
            .catch((error) => {
                setLoading(false);
                console.error('There was a problem with the fetch operation:', error);
                console.log('Booking failed. Please try again.');
            });
    };
    console.log(availableAuditoriums);

    const handleAuditoriumClick = (auditorium) => {
        setSelectedAuditorium(auditorium);
        setModalVisible(true); // Открытие модального окна
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedAuditorium(null);
    };

    const handleConfirmBooking = () => {
        let selectedValues = {
            building: selectedCampus.id,
            audience: parseInt(Object.keys(selectedAuditorium)[0]),
            date: selectedDate,
            time: selectedTime,
            email: student_email
        };

        console.log(selectedValues);
        const jsonData = JSON.stringify(selectedValues);

        fetch('http://localhost:8000/book/', {
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
                console.log('Booking successful for auditorium');
                console.log('Booking Data:', data);
                toast.success('Аудитория успешно забронирована!');
                setTimeout(() => {
                    navigate('/MainPage', { state: { student_email } }); // Перенаправляем на главную страницу
                }, 3000);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                console.log('Booking failed. Please try again.');
                console.log(jsonData);
                toast.error('Не удалось забронировать аудиторию');

            });
        console.log(`Аудитория ${Object.keys(selectedAuditorium)[0]} забронирована!`);
        handleCloseModal(); // Закрытие модального окна
    };

    const handleLogout = () => {
        navigate('/');
    };

    useEffect(() => {
        if (selectedCampus && selectedDate && selectedTime) {
            handleProceedToAuditoriumSelection();
        }
    }, [selectedCampus, selectedDate, selectedTime]);

    return (
        <div>
            <header>
                <div className="logo">
                    <span className="logo-icon">P.</span> PolyBooking
                </div>
                <div className="user-profile">
                    <img src={accountIcon} alt="Аватар пользователя" />
                    <span className="profile-name">{student_email}</span>
                    <button className="logout-btn" onClick={handleLogout}>Выйти</button>
                </div>
            </header>
            <main>
                <section className="booking-section">
                    <div className="booking-controls">
                        <div className="control-item">
                            <label htmlFor="building">Выберите корпус:</label>
                            <select id="building" value={selectedCampus ? selectedCampus.id : ''} onChange={handleCampusSelect}>
                                {campuses.map((campus) => (
                                    <option key={campus.id} value={campus.id}>
                                        {campus.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="control-item">
                            <label htmlFor="date">Выберите дату:</label>
                            <select id="date" value={selectedDate} onChange={handleDateChange}>
                                {generateDateOptions().map((option) => (
                                    <option key={option.key} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="control-item">
                            <label htmlFor="time">Выберите время:</label>
                            <select id="time" value={selectedTime} onChange={handleTimeChange}>
                                <option value="">Выберите время</option>
                                {generateTimeOptions()}
                            </select>
                        </div>
                        {loading && <div>Ищу свободные аудитории...</div>}
                        <section className="room-selection-section">
                            <div className="room-grid">
                                {availableAuditoriums.map((auditorium, index) => (
                                    <button className="room" key={index} onClick={() => handleAuditoriumClick(auditorium)}>
                                        {Object.values(auditorium)[0]}
                                    </button>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Модальное окно для подтверждения бронирования */}
                    {modalVisible && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={handleCloseModal}>&times;</span>
                                <p className="modal-text">Вы хотите забронировать аудиторию {Object.values(selectedAuditorium)[0]}?</p>
                                <button className="confirm-btn" onClick={handleConfirmBooking}>Забронировать</button>
                            </div>
                        </div>
                    )}
                </section>
            </main>
            <ToastContainer />

        </div>
    );
}

export default BookingPage;
