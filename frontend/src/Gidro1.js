import React, { useState } from 'react';
import './gidro1.css';

function Gidro1( props ) {
    const { selectedCampus, selectedDate, selectedTime, selectedAudiences, student_email } = props.location.state;
    console.log(selectedCampus)
    console.log(selectedDate)
    console.log(selectedTime)
    console.log(selectedAudiences)
    console.log(student_email)
    // для бд
    const [selectedRoom, setselectedRoom] = useState(" ");
    const availableAuditoriums = [
        { 634: '325'},
        { 2116: '444'},
        { 609: '118'},
        { 619: '229'},
        { 618: '216'},
        { 873: '234'},
        { 1890: '123б'},
        { 1352: '123а'},
        { 1768: '423'},
        { 969: '106'},
        { 610: '119'},
        { 1394: '237'},
        { 629: '314'},
        { 606: '112'},
        { 612: '121'},
        { 631: '321'},
        { 1029: '326'},
        { 627: '310'},
        { 1041: '433'},
        { 620: '230'},
        { 973: '104'},
        { 608: '117'},
        { 621: '232'},
        { 614: '202'},
        { 626: '309'},
        { 630: '316'},
        { 1637: '217'},
        { 649: '439'},
        { 652: '121А'},
        { 1051: '438'},
        { 1053: '449'},
        { 644: '422'},
        { 615: '208'},
        { 1056: '412'},
        { 607: '113'},
        { 994: '224'},
        { 1054: '442'},
        { 648: '450'},
        { 650: '440'},
        { 605: '108'},
        { 1037: '317'},
        { 632: '322'}]

    function getName(auditorium) {
        return Object.values(auditorium)[0];
    }

    // Сортировка аудиторий по возрастанию name
    availableAuditoriums.sort((a, b) => {
        const nameA = getName(a);
        const nameB = getName(b);
        return nameA.localeCompare(nameB);
    });

    console.log(availableAuditoriums);

    function AuditoriumButton({ id, name, onClick }) {
        return (
            <button onClick={() => onClick(id)}>{name}</button>
        );
    }

    function AuditoriumButtons({ auditoriums, onClick }) {
        return (
            <div>
                {auditoriums.map(auditorium => (
                    <AuditoriumButton key={Object.keys(auditorium)[0]} id={Object.keys(auditorium)[0]} name={Object.values(auditorium)[0]} onClick={onClick} />
                ))}
            </div>
        );
    }
    
    //заглушка для недоступных комнат
    const unavailableRooms = ['2', '4', '6', '8', '10', '12', '14'];

    function handleRectClick(event) {
        //console.log(event.target);
        if (!unavailableRooms.includes(event.target.id)) { //проверка доступна ли комната
            setselectedRoom(event.target); //выделение нажатой комнаты
        }
    }

    const handleBookAuditorium = (auditoriumId) => {
        let selectedValues = {
            building: selectedCampus.id,
            audience: auditoriumId,
            date: "2024-05-04",
            time: selectedTime,
            email: student_email
        };

        console.log(selectedValues);
        const jsonData = JSON.stringify(selectedValues);

        fetch('http://127.0.0.1:8000/book/', {
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
                window.alert('Аудитория успешно забронирована!');
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                console.log('Booking failed. Please try again.');
                console.log(jsonData);
                window.alert('Не удалось забронировать аудиторию');
            });
    };

    return ( //svg добавлена в код напрямую для возможности взаимодействия


        
        <div className='gidro1_container'>
            <h2>Список аудиторий</h2>
            {availableAuditoriums.map(auditorium => (
                
                <button className="gidro1_container" key={Object.keys(auditorium)[0]} onClick={() => handleBookAuditorium(Object.values(auditorium)[0])}>
                    
                    Аудитория {Object.values(auditorium)[0]}
                </button>
            ))}
        </div>
        
    );
}

export default Gidro1;
