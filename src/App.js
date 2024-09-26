import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import BookingPage from './BookingPage';



function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/MainPage" element={<MainPage />} />
                <Route path="/BookingPage" element={<BookingPage />} />
            </Routes>

        </Router>

    );
}

export default App;
