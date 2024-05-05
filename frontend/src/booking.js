import React, { useState, useEffect } from 'react';

function BookingInfo() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/booking/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Booking successful!');
            console.log('Booking Data:', data); // Выводим полученные данные о бронированиях
            setBookings(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            console.log('Booking failed. Please try again.');
        });
    }, []);

    return (
        <div>
            <h2>Booking Information</h2>
            <ul>
                {bookings.map((booking, index) => (
                    <li key={index}>
                        <strong>Booking {index + 1}:</strong> Audience {booking.audience}, Time {booking.time}, Date {booking.date}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookingInfo;
