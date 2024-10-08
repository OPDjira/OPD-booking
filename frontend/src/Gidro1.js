import React, { useState } from 'react';
import './gidro1.css';
import { useHistory} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Gidro1( props ) {
    const [showAuditoriumList, setShowAuditoriumList] = useState(true);
    let { selectedCampus, selectedDate, selectedTime, unavailableAuditoriums, student_email } = props.location.state;
    const [selectedRoom, setselectedRoom] = useState(" ");

    const history = useHistory();
    const handleGoToMainPage = () => {
        history.push('/MainPage', { student_email: student_email });
    };

    const toggleView = () => {
        setShowAuditoriumList(prevState => !prevState);
    };

    // для бд
    unavailableAuditoriums = unavailableAuditoriums.bookings.map(booking => {
        return { [booking.audience]: booking.name };
    });

    let Auditoriums = [
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

    function containsValue(array, value) {
    for (let obj of array) {
        for (let key in obj) {
            if (obj[key] === value) {
                return true;
            }
        }
    }
    return false;
}

    function getName(auditorium) {
        return Object.values(auditorium)[0];
    }

    Auditoriums.sort((a, b) => {
        const nameA = getName(a);
        const nameB = getName(b);
        return nameA.localeCompare(nameB);
    });
    
    let availableAuditoriums = Auditoriums.filter(auditorium => {
    return !unavailableAuditoriums.some(unavailableAuditorium => {
        return Object.values(unavailableAuditorium)[0] === Object.values(auditorium)[0];
    });
    });

    console.log(availableAuditoriums);
    
    function handleRectClick(event) {
        if (!unavailableAuditoriums.includes(event.target.id)) { 
            setselectedRoom(event.target); 
        }
    }

    const handleBookAuditorium = (auditoriumId) => {
        let selectedValues = {
            building: selectedCampus.id,
            audience: parseInt(auditoriumId),
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
                console.log('Booking successful for auditorium', auditoriumId);
                console.log('Booking Data:', data);
                toast.success('Аудитория успешно забронирована!');
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                console.log('Booking failed. Please try again.');
                console.log(jsonData);
                toast.error('Не удалось забронировать аудиторию');

            });
    };

    return ( //svg добавлена в код напрямую для возможности взаимодействия

        <div className='container'>
            <h1>Гидротехнический корпус-1</h1>
            <h1>{selectedDate}</h1>
            <h1>{selectedTime}</h1>
            <button className= 'cnangeButton' onClick={toggleView}>Показать {showAuditoriumList ? 'план здания' : 'список аудиторий'}</button>
            {showAuditoriumList ? (
                <div className='gidro1_container'>
                    <h2>Список аудиторий</h2>
                    {availableAuditoriums.map(auditorium => (

                        <button className="gidro1_container" key={Object.keys(auditorium)[0]} onClick={() => handleBookAuditorium(Object.values(auditorium)[0])}>

                            Аудитория {Object.values(auditorium)[0]}
                        </button>
                    ))}
                </div>
            ) : (
                <div className='gidro2_container'>
                    <h2>План здания</h2>
                        <div className="App">
                            <div className="gidro1_floor2">
                                <h1>Этаж 2</h1>
                                <svg className="gidro2_container" version="1.1" viewBox="0 0 482.08 850.16" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style={{ transform: "scale(0.7)" }}>
                                    <g className="rect" transform="translate(-8.501 -7.9419)">
                                        <rect id="235" x="99.629" y="542.07" width="42.161" height="35.002" fill={containsValue(unavailableAuditoriums, '235') ? 'red' : (selectedRoom && selectedRoom.id === '235' ? 'green' : '#9966ff')} fillOpacity=".43922" fillRule="evenodd" onClick={(e) => handleRectClick(e)} />
                                        <rect id="234" x="99.541" y="578.4" width="42.426" height="35.797" fill={containsValue(unavailableAuditoriums, '234') ? 'red' : (selectedRoom && selectedRoom.id === '234' ? 'green' : '#9966ff')} fillOpacity=".43922" fillRule="evenodd" onClick={(e) => handleRectClick(e)} />
                                        <rect id="233" x="99.364" y="615.61" width="42.515" height="37.035" fill={containsValue(unavailableAuditoriums, '233') ? 'red' : (selectedRoom && selectedRoom.id === '233' ? 'green' : '#9966ff')} fillOpacity=".43922" fillRule="evenodd" onClick={(e) => handleRectClick(e)} />
                                        <rect id="232" x="99.187" y="654.06" width="42.603" height="35.002" fill={containsValue(unavailableAuditoriums, '232') ? 'red' : (selectedRoom && selectedRoom.id === '232' ? 'green' : '#9966ff')} fillOpacity=".43922" fillRule="evenodd" onClick={(e) => handleRectClick(e)} />
                                        <rect id="230" x="232" y="738.57" width="33.5" height="42.375" fill={containsValue(unavailableAuditoriums, '230') ? 'red' : (selectedRoom && selectedRoom.id === '230' ? 'green' : '#9966ff')} fillOpacity=".43922" fillRule="evenodd" onClick={(e) => handleRectClick(e)} />
                                        <rect id="229" x="266.5" y="738.44" width="39.75" height="42.125" fill={containsValue(unavailableAuditoriums, '229') ? 'red' : (selectedRoom && selectedRoom.id === '229' ? 'green' : '#9966ff')} fillOpacity=".43922" fillRule="evenodd" onClick={(e) => handleRectClick(e)} />
                                        <rect id="213" x="37.316" y="690.12" width="43.134" height="35.709" fill={containsValue(unavailableAuditoriums, '213') ? 'red' : (selectedRoom && selectedRoom.id === '213' ? 'green' : '#9966ff')} fillOpacity=".43922" fillRule="evenodd" onClick={(e) => handleRectClick(e)} />
                                        <rect id="238" x="99.407" y="127.52" width="41.986" height="36.336" fill={containsValue(unavailableAuditoriums, '238') ? 'red' : (selectedRoom && selectedRoom.id === '238' ? 'green' : '#9966ff')} fillOpacity=".44062" strokeWidth=".99339" onClick={(e) => handleRectClick(e)} />
                                        <rect id="239" x="99.54" y="53.924" width="42.282" height="72.672" fill={containsValue(unavailableAuditoriums, '239') ? 'red' : (selectedRoom && selectedRoom.id === '239' ? 'green' : '#9966ff')} fillOpacity=".44062" onClick={(e) => handleRectClick(e)} />
                                        <rect id="201" x="37.438" y="65.551" width="42.546" height="61.045" fill={containsValue(unavailableAuditoriums, '201') ? 'red' : (selectedRoom && selectedRoom.id === '201' ? 'green' : '#9966ff')} fillOpacity=".44062" onClick={(e) => handleRectClick(e)} />
                                        <rect id="202" x="37.702" y="127.92" width="42.282" height="54.702" fill={containsValue(unavailableAuditoriums, '202') ? 'red' : (selectedRoom && selectedRoom.id === '202' ? 'green' : '#9966ff')} fillOpacity=".44062" onClick={(e) => handleRectClick(e)} />
                                        <rect id="207" x="37.702" y="319.11" width="42.282" height="18.498" fill={containsValue(unavailableAuditoriums, '207') ? 'red' : (selectedRoom && selectedRoom.id === '207' ? 'green' : '#9966ff')} fillOpacity=".44062" onClick={(e) => handleRectClick(e)} />
                                        <rect id="207а" x="37.702" y="338.67" width="42.15" height="34.354" fill={containsValue(unavailableAuditoriums, '207a') ? 'red' : (selectedRoom && selectedRoom.id === '207a' ? 'green' : '#9966ff')} fillOpacity=".44062" onClick={(e) => handleRectClick(e)} />
                                        <rect id="241" x="107.91" y="448.56" width="49.145" height="72.316" fill={containsValue(unavailableAuditoriums, '241') ? 'red' : (selectedRoom && selectedRoom.id === '241' ? 'green' : '#9966ff')} fillOpacity=".44062" onClick={(e) => handleRectClick(e)} />
                                        <rect id="214" x="38.733" y="726.89" width="42.044" height="96.981" fill={containsValue(unavailableAuditoriums, '214') ? 'red' : (selectedRoom && selectedRoom.id === '214' ? 'green' : '#9966ff')} fillOpacity=".44062" ry="0" transform="rotate(.093717)" fillRule="evenodd" onClick={(e) => handleRectClick(e)} />
                                        <rect id="208" x="37.745" y="424.74" width="42.324" height="114.83" fill={containsValue(unavailableAuditoriums, '208') ? 'red' : (selectedRoom && selectedRoom.id === '208' ? 'green' : '#9966ff')} fillOpacity=".44062" onClick={(e) => handleRectClick(e)} />
                                    </g>
                                    <g transform="translate(-8.501 -7.9419)">
                                        <path transform="translate(8.501 7.9419)" d="m41.539 816.67v-2.4043h4.9214l0.11254 0.0729c0.57485 0.37234 0.9264 0.5871 1.1614 0.70945 0.0816 0.0425 0.12461 0.0598 0.16753 0.0672 0.07569 0.0131 0.20422 0.0668 0.42656 0.17799 0.20281 0.10145 0.2952 0.15221 0.75845 0.41666l0.33887 0.19345v0.0896l-0.27479-3e-3c-0.27305-3e-3 -0.3006-2e-3 -0.26765 0.01 0.03535 0.0123 0.24712 0.0235 0.44967 0.0237l0.09277 1e-4v3.0508h-7.8867zm5.0458-0.66057c-0.0013-1e-3 -0.0047-1e-3 -0.0075-3e-4 -0.0031 1e-3 -0.0022 2e-3 0.0024 2e-3 0.0041 1.7e-4 0.0064-7.6e-4 0.0051-2e-3zm-0.99198-4e-3c-0.01013-8e-4 -0.02771-8.1e-4 -0.03906-2e-5 -0.01135 8e-4 -0.0031 1e-3 0.01842 1e-3 0.02148 1e-5 0.03077-6.4e-4 0.02064-1e-3zm0.23034 1.8e-4c-0.0038-9.9e-4 -0.0099-9.9e-4 -0.01367 0-0.0038 9.8e-4 -6.83e-4 2e-3 0.0068 2e-3 0.0075 0 0.0106-8e-4 0.0068-2e-3zm-0.44238-5e-3c-0.01992-5e-3 -0.04251-8e-3 -0.03872-4e-3 5e-3 5e-3 0.01653 7e-3 0.03482 7e-3 0.01494 9e-5 0.01511-4e-5 0.0039-3e-3zm1.8173 1e-3c-0.0013-1e-3 -0.0047-1e-3 -0.0075-3.1e-4 -0.0031 1e-3 -0.0022 2e-3 0.0024 2e-3 0.0041 1.7e-4 0.0064-7.5e-4 0.0051-2e-3zm0.02438-5e-3c0.0032-2e-3 0.0044-5e-3 0.0027-7e-3s-0.0043-1e-3 -0.0057 1e-3c-0.0015 2e-3 -0.0054 5e-3 -0.0086 6e-3 -0.0052 2e-3 -0.0052 2e-3 0 2e-3 0.0032 1.3e-4 0.0084-1e-3 0.01161-3e-3zm-1.8544-0.0105c-0.0027-1e-3 -0.0071-1e-3 -0.0098 0s-4.88e-4 2e-3 0.0049 2e-3c0.0054 0 0.0076-8.9e-4 0.0049-2e-3zm1.7618-1.6e-4c-0.0048-9.3e-4 -0.01359-9.5e-4 -0.01953-6e-5 -0.0059 9e-4 -2e-3 2e-3 0.0087 2e-3 0.01074 3e-5 0.0156-7.1e-4 0.0108-2e-3zm-1.7266-4e-3c-0.0027-1e-3 -0.0071-1e-3 -0.0098 0s-4.89e-4 2e-3 0.0049 2e-3c0.0054 0 0.0076-8.8e-4 0.0049-2e-3zm0.81062-2e-4c-0.0059-8.9e-4 -0.01642-9.1e-4 -0.02344-4e-5 -7e-3 8.7e-4 -0.0022 2e-3 0.01067 2e-3 0.01289 2e-5 0.01864-6.9e-4 0.01277-2e-3zm0.08579 4.3e-4c-0.0013-1e-3 -0.0047-1e-3 -0.0075-3.1e-4 -0.0031 1e-3 -0.0022 2e-3 0.0024 2e-3 0.0041 1.7e-4 0.0064-7.5e-4 0.0051-2e-3z" fill="#daf4bd47" fillOpacity=".99221" fillRule="evenodd" />
                                        <path d="m477.86 799.46-24.32 3.52v-3.52" fillRule="evenodd" />
                                        <path d="m477.86 799.46v3.52h-24.32" fillRule="evenodd" />
                                        <path d="m456.9 802.98-3.36 17.12v-17.12" fillRule="evenodd" />
                                        <path d="m456.9 802.98v17.12h-3.36" fillRule="evenodd" />
                                        <path d="m414.5 815.62-0.8 27.04v-27.04" fillRule="evenodd" />
                                        <path d="m414.5 815.62v27.04h-0.8" fillRule="evenodd" />
                                        <path d="m396.42 802.98-0.32 2.56v-2.56" fillRule="evenodd" />
                                        <path d="m396.42 802.98v2.56h-0.32" fillRule="evenodd" />
                                        <path d="m396.42 812.26-0.8 30.4v-30.4" fillRule="evenodd" />
                                        <path d="m396.42 812.26v30.4h-0.8" fillRule="evenodd" />
                                        <path d="m396.1 802.98-0.48 2.56v-2.56" fillRule="evenodd" />
                                        <path d="m396.1 802.98v2.56h-0.48" fillRule="evenodd" />
                                        <path d="m378.98 802.98-0.8 39.68v-39.68" fillRule="evenodd" />
                                        <path d="m378.98 802.98v39.68h-0.8" fillRule="evenodd" />
                                        <path d="m360.26 802.98-0.64 39.68v-39.68" fillRule="evenodd" />
                                        <path d="m360.26 802.98v39.68h-0.64" fillRule="evenodd" />
                                        <path d="m359.62 802.98-0.16 39.68v-39.68" fillRule="evenodd" />
                                        <path d="m359.62 802.98v39.68h-0.16" fillRule="evenodd" />
                                        <path d="m324.26 799.46-0.64 43.2v-43.2" fillRule="evenodd" />
                                        <path d="m324.26 799.46v43.2h-0.64" fillRule="evenodd" />
                                        <path d="m323.46 842.66v-39.68z" fillRule="evenodd" />
                                        <path d="m323.62 802.98-0.16 39.68v-39.68" fillRule="evenodd" />
                                        <path d="m323.62 802.98v39.68h-0.16" fillRule="evenodd" />
                                        <path d="m286.34 842.66v-43.36z" fillRule="evenodd" />
                                        <path d="m286.34 842.66v-43.36z" fillRule="evenodd" />
                                        <path d="m286.34 802.98-0.8 39.68v-39.68" fillRule="evenodd" />
                                        <path d="m286.34 802.98v39.68h-0.8" fillRule="evenodd" />
                                        <path d="m264.74 802.98-0.8 39.68v-39.68" fillRule="evenodd" />
                                        <path d="m264.74 802.98v39.68h-0.8" fillRule="evenodd" />
                                        <path d="m248.42 802.98-0.32 4v-4" fillRule="evenodd" />
                                        <path d="m248.42 802.98v4h-0.32" fillRule="evenodd" />
                                        <path d="m248.42 813.54-0.64 29.12v-29.12" fillRule="evenodd" />
                                        <path d="m248.42 813.54v29.12h-0.64" fillRule="evenodd" />
                                        <path d="m248.1 802.98-0.32 4v-4" fillRule="evenodd" />
                                        <path d="m248.1 802.98v4h-0.32" fillRule="evenodd" />
                                        <path d="m266.34 738.34-0.8 39.68v-39.68" fillRule="evenodd" />
                                        <path d="m266.34 738.34v39.68h-0.8" fillRule="evenodd" />
                                        <path d="m307.14 738.34-0.8 43.36v-43.36" fillRule="evenodd" />
                                        <path d="m307.14 738.34v43.36h-0.8" fillRule="evenodd" />
                                        <path d="m325.54 738.34-0.8 43.36v-43.36" fillRule="evenodd" />
                                        <path d="m325.54 738.34v43.36h-0.8" fillRule="evenodd" />
                                        <path d="m343.46 738.34-0.8 43.36v-43.36" fillRule="evenodd" />
                                        <path d="m343.46 738.34v43.36h-0.8" fillRule="evenodd" />
                                        <path d="m361.22 738.34-0.48 43.36v-43.36" fillRule="evenodd" />
                                        <path d="m361.22 738.34v43.36h-0.48" fillRule="evenodd" />
                                        <path d="m360.42 778.02v-39.68z" fillRule="evenodd" />
                                        <path d="m360.74 738.34-0.32 39.68v-39.68" fillRule="evenodd" />
                                        <path d="m360.74 738.34v39.68h-0.32" fillRule="evenodd" />
                                        <path d="m398.82 738.34-0.8 43.36v-43.36" fillRule="evenodd" />
                                        <path d="m398.82 738.34v43.36h-0.8" fillRule="evenodd" />
                                        <path d="m398.02 744.42v-6.08z" fillRule="evenodd" />
                                        <path d="m398.02 738.34v43.36-37.28" fillRule="evenodd" />
                                        <path d="m436.1 738.34-0.8 43.36v-43.36" fillRule="evenodd" />
                                        <path d="m436.1 738.34v43.36h-0.8" fillRule="evenodd" />
                                        <path d="m453.54 799.46-18.24 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m453.54 799.46v0.8h-18.24" fillRule="evenodd" />
                                        <path d="m430.66 799.46-3.52 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m430.66 799.46v0.8h-3.52" fillRule="evenodd" />
                                        <path d="m427.14 799.46-10.4 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m427.14 799.46v0.8h-10.4" fillRule="evenodd" />
                                        <path d="m411.94 799.46-1.28 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m411.94 799.46v0.8h-1.28" fillRule="evenodd" />
                                        <path d="m400.74 799.46-2.72 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m400.74 799.46v0.8h-2.72" fillRule="evenodd" />
                                        <path d="m393.38 799.46-2.24 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m393.38 799.46v0.8h-2.24" fillRule="evenodd" />
                                        <path d="m384.42 799.46-4.96 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m384.42 799.46v0.8h-4.96" fillRule="evenodd" />
                                        <path d="m374.82 799.46-2.56 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m374.82 799.46v0.8h-2.56" fillRule="evenodd" />
                                        <path d="m365.7 799.46-1.6 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m365.7 799.46v0.8h-1.6" fillRule="evenodd" />
                                        <path d="m364.1 799.46-3.36 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m364.1 799.46v0.8h-3.36" fillRule="evenodd" />
                                        <path d="m356.1 799.46-13.92 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m356.1 799.46v0.8h-13.92" fillRule="evenodd" />
                                        <path d="m337.54 799.46-1.44 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m337.54 799.46v0.8h-1.44" fillRule="evenodd" />
                                        <path d="m326.82 799.46-2.56 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m326.82 799.46v0.8h-2.56" fillRule="evenodd" />
                                        <path d="m318.82 799.3-13.92 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m318.82 799.3v0.8h-13.92" fillRule="evenodd" />
                                        <path d="m300.26 799.3-0.48 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m300.26 799.3v0.8h-0.48" fillRule="evenodd" />
                                        <path d="m290.5 799.3-4.16 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m290.5 799.3v0.8h-4.16" fillRule="evenodd" />
                                        <path d="m281.7 799.3-3.2 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m281.7 799.3v0.8h-3.2" fillRule="evenodd" />
                                        <path d="m271.94 799.3-2.4 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m271.94 799.3v0.8h-2.4" fillRule="evenodd" />
                                        <path d="m269.54 799.3-1.92 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m269.54 799.3v0.8h-1.92" fillRule="evenodd" />
                                        <path d="m262.98 799.3-3.2 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m262.98 799.3v0.8h-3.2" fillRule="evenodd" />
                                        <path d="m253.06 799.3-4 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m253.06 799.3v0.8h-4" fillRule="evenodd" />
                                        <path d="m244.42 799.3-5.44 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m244.42 799.3v0.8h-5.44" fillRule="evenodd" />
                                        <path d="m232.26 799.3-1.92 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m232.26 799.3v0.8h-1.92" fillRule="evenodd" />
                                        <path d="m225.7 799.3-3.52 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m225.7 799.3v0.8h-3.52" fillRule="evenodd" />
                                        <path d="m215.62 799.3-3.84 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m215.62 799.3v0.8h-3.84" fillRule="evenodd" />
                                        <path d="m207.14 799.3-13.44 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m207.14 799.3v0.8h-13.44" fillRule="evenodd" />
                                        <path d="m193.7 799.3-0.48 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m193.7 799.3v0.8h-0.48" fillRule="evenodd" />
                                        <path d="m188.58 799.3-13.6 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m188.58 799.3v0.8h-13.6" fillRule="evenodd" />
                                        <path d="m174.98 799.3-0.48 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m174.98 799.3v0.8h-0.48" fillRule="evenodd" />
                                        <path d="m169.86 799.3-13.92 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m169.86 799.3v0.8h-13.92" fillRule="evenodd" />
                                        <path d="m151.3 799.46-1.12 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m151.3 799.46v0.8h-1.12" fillRule="evenodd" />
                                        <path d="m143.62 799.46-6.4 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m143.62 799.46v0.8h-6.4" fillRule="evenodd" />
                                        <path d="m141.86 744.9-39.68 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m141.86 744.9v0.8h-39.68" fillRule="evenodd" />
                                        <path d="m77.221 726.18-39.68 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m77.221 726.18v0.8h-39.68" fillRule="evenodd" />
                                        <path d="m77.221 689.06-39.68 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m77.221 689.06v0.8h-39.68" fillRule="evenodd" />
                                        <path d="m77.221 614.5-28.32 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m77.221 614.5v0.8h-28.32" fillRule="evenodd" />
                                        <path d="m48.901 614.5-11.36 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m48.901 614.5v0.8h-11.36" fillRule="evenodd" />
                                        <path d="m77.221 577.22-28.32 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m77.221 577.22v0.8h-28.32" fillRule="evenodd" />
                                        <path d="m48.901 577.22-11.36 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m48.901 577.22v0.8h-11.36" fillRule="evenodd" />
                                        <path d="m77.221 670.34-28.32 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m77.221 670.34v0.8h-28.32" fillRule="evenodd" />
                                        <path d="m48.901 670.34-11.36 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m48.901 670.34v0.8h-11.36" fillRule="evenodd" />
                                        <path d="m141.86 689.06-39.68 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m141.86 689.06v0.8h-39.68" fillRule="evenodd" />
                                        <path d="m141.86 652.9-29.92 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m141.86 652.9v0.8h-29.92" fillRule="evenodd" />
                                        <path d="m111.94 652.9-9.76 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m111.94 652.9v0.8h-9.76" fillRule="evenodd" />
                                        <path d="m141.86 614.5-29.92 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m141.86 614.5v0.8h-29.92" fillRule="evenodd" />
                                        <path d="m111.94 614.5-9.76 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m111.94 614.5v0.8h-9.76" fillRule="evenodd" />
                                        <path d="m141.86 577.22-39.68 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m141.86 577.22v0.8h-39.68" fillRule="evenodd" />
                                        <path d="m154.98 802.98-0.8 39.68v-39.68" fillRule="evenodd" />
                                        <path d="m154.98 802.98v39.68h-0.8" fillRule="evenodd" />
                                        <path d="m132.58 799.46-13.92 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m132.58 799.46v0.8h-13.92" fillRule="evenodd" />
                                        <path d="m107.62 447.94-0.8 24v-24" fillRule="evenodd" />
                                        <path d="m107.62 447.94v24h-0.8" fillRule="evenodd" />
                                        <path d="m107.62 534.34-0.8 5.92v-5.92" fillRule="evenodd" />
                                        <path d="m107.62 534.34v5.92h-0.8" fillRule="evenodd" />
                                        <path d="m107.62 515.78-0.8 12v-12" fillRule="evenodd" />
                                        <path d="m107.62 515.78v12h-0.8" fillRule="evenodd" />
                                        <path d="m107.62 497.22-0.8 11.84v-11.84" fillRule="evenodd" />
                                        <path d="m107.62 497.22v11.84h-0.8" fillRule="evenodd" />
                                        <path d="m107.62 478.5-0.8 12v-12" fillRule="evenodd" />
                                        <path d="m107.62 478.5v12h-0.8" fillRule="evenodd" />
                                        <path d="m116.9 501.38-9.28 3.52v-3.52" fillRule="evenodd" />
                                        <path d="m116.9 501.38v3.52h-9.28" fillRule="evenodd" />
                                        <path d="m116.9 482.82-9.28 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m116.9 482.82v3.36h-9.28" fillRule="evenodd" />
                                        <path d="m116.9 464.26-9.28 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m116.9 464.26v3.36h-9.28" fillRule="evenodd" />
                                        <path d="m116.9 520.1-6.4 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m116.9 520.1v3.36h-6.4" fillRule="evenodd" />
                                        <path d="m110.5 520.42-2.88 3.04v-3.36" fillRule="evenodd" />
                                        <path d="m110.5 520.42v2.72l-2.88 0.32" fillRule="evenodd" />
                                        <path d="m156.74 521.38-14.88 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m156.74 521.38v0.8h-14.88" fillRule="evenodd" />
                                        <path d="m141.86 521.38-24.96 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m141.86 521.38v0.8h-24.96" fillRule="evenodd" />
                                        <path d="m152.74 294.18-9.28 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m152.74 294.18v0.8h-9.28" fillRule="evenodd" />
                                        <path d="m143.46 294.18-0.8 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m143.46 294.18v0.8h-0.8" fillRule="evenodd" />
                                        <path d="m136.1 294.18-5.76 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m136.1 294.18v0.8h-5.76" fillRule="evenodd" />
                                        <path d="m123.78 294.18-13.28 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m123.78 294.18v0.8h-13.28" fillRule="evenodd" />
                                        <path d="m152.74 312.9-40.8 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m152.74 312.9v0.8h-40.8" fillRule="evenodd" />
                                        <path d="m111.94 312.9-1.44 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m111.94 312.9v0.8h-1.44" fillRule="evenodd" />
                                        <path d="m133.7 294.98-0.8 17.92v-17.92" fillRule="evenodd" />
                                        <path d="m133.7 294.98v17.92h-0.8" fillRule="evenodd" />
                                        <path d="m152.74 331.46-22.72 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m152.74 331.46v0.8h-22.72" fillRule="evenodd" />
                                        <path d="m123.46 331.46-12.96 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m123.46 331.46v0.8h-12.96" fillRule="evenodd" />
                                        <path d="m77.221 294.34-28.32 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m77.221 294.34v0.64h-28.32" fillRule="evenodd" />
                                        <path d="m48.901 294.34-11.2 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m48.901 294.34v0.64h-11.2" fillRule="evenodd" />
                                        <path d="m80.101 318.18-5.28 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m80.101 318.18v0.64h-5.28" fillRule="evenodd" />
                                        <path d="m68.101 318.18-30.4 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m68.101 318.18v0.64h-30.4" fillRule="evenodd" />
                                        <path d="m80.101 337.54-2.88 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m80.101 337.54v0.64h-2.88" fillRule="evenodd" />
                                        <path d="m70.661 337.54-32.96 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m70.661 337.54v0.64h-32.96" fillRule="evenodd" />
                                        <path d="m132.42 324.74-0.64 6.72v-6.72" fillRule="evenodd" />
                                        <path d="m132.42 324.74v6.72h-0.64" fillRule="evenodd" />
                                        <path d="m132.42 313.7-0.64 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m132.42 313.7v4.48h-0.64" fillRule="evenodd" />
                                        <path d="m77.221 539.94-28.32 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m77.221 539.94v0.8h-28.32" fillRule="evenodd" />
                                        <path d="m48.901 539.94-11.36 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m48.901 539.94v0.8h-11.36" fillRule="evenodd" />
                                        <path d="m77.221 256.9-39.52 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m77.221 256.9v0.8h-39.52" fillRule="evenodd" />
                                        <path d="m77.221 126.66-39.52 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m77.221 126.66v0.8h-39.52" fillRule="evenodd" />
                                        <path d="m77.221 182.5-39.52 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m77.221 182.5v0.8h-39.52" fillRule="evenodd" />
                                        <path d="m77.221 238.34-39.52 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m77.221 238.34v0.8h-39.52" fillRule="evenodd" />
                                        <path d="m141.86 219.78-29.92 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m141.86 219.78v0.8h-29.92" fillRule="evenodd" />
                                        <path d="m111.94 219.78-9.76 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m111.94 219.78v0.8h-9.76" fillRule="evenodd" />
                                        <path d="m141.86 163.78-39.68 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m141.86 163.78v0.8h-39.68" fillRule="evenodd" />
                                        <path d="m141.86 126.66-29.92 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m141.86 126.66v0.8h-29.92" fillRule="evenodd" />
                                        <path d="m111.94 126.66-9.76 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m111.94 126.66v0.8h-9.76" fillRule="evenodd" />
                                        <path d="m13.221 373.38-4.32 50.88v-50.88" fillRule="evenodd" />
                                        <path d="m13.221 373.38v50.88h-4.32" fillRule="evenodd" />
                                        <path d="m111.46 853.38-4.16 4.1603v-4.1603" fillRule="evenodd" />
                                        <path d="m111.46 853.38v4.1603h-4.16" fillRule="evenodd" />
                                        <path d="m107.3 853.38-25.76 4.1603v-4.1603" fillRule="evenodd" />
                                        <path d="m107.3 853.38v4.1603h-25.76" fillRule="evenodd" />
                                        <path d="m456.9 823.62-3.36 22.4v-22.4" fillRule="evenodd" />
                                        <path d="m456.9 823.62v22.4h-3.36" fillRule="evenodd" />
                                        <path d="m37.701 366.98-2.56 6.4v-6.4" fillRule="evenodd" />
                                        <path d="m37.701 366.98v6.4h-2.56" fillRule="evenodd" />
                                        <path d="m35.141 366.5-0.8 6.88v-6.88" fillRule="evenodd" />
                                        <path d="m35.141 366.5v6.88h-0.8" fillRule="evenodd" />
                                        <path d="m37.701 87.462-2.56 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m37.701 87.462v4.48h-2.56" fillRule="evenodd" />
                                        <path d="m35.141 87.142-0.32 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m35.141 87.142v5.28h-0.32" fillRule="evenodd" />
                                        <path d="m34.821 87.142-0.48 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m34.821 87.142v5.28h-0.48" fillRule="evenodd" />
                                        <path d="m37.701 65.382-2.56 8v-8" fillRule="evenodd" />
                                        <path d="m37.701 65.382v8h-2.56" fillRule="evenodd" />
                                        <path d="m35.141 65.382-0.8 8.32v-8.32" fillRule="evenodd" />
                                        <path d="m35.141 65.382v8.32h-0.8" fillRule="evenodd" />
                                        <path d="m37.701 217.86-2.56 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m37.701 217.86v4.48h-2.56" fillRule="evenodd" />
                                        <path d="m35.141 217.54-0.8 5.12v-5.12" fillRule="evenodd" />
                                        <path d="m35.141 217.54v5.12h-0.8" fillRule="evenodd" />
                                        <path d="m37.701 106.18-2.56 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m37.701 106.18v4.32h-2.56" fillRule="evenodd" />
                                        <path d="m35.141 105.7-0.8 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m35.141 105.7v5.28h-0.8" fillRule="evenodd" />
                                        <path d="m37.701 348.26-2.56 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m37.701 348.26v4.48h-2.56" fillRule="evenodd" />
                                        <path d="m35.141 347.78-0.8 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m35.141 347.78v5.28h-0.8" fillRule="evenodd" />
                                        <path d="m37.701 124.74-2.56 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m37.701 124.74v4.48h-2.56" fillRule="evenodd" />
                                        <path d="m35.141 124.42-0.48 5.12v-5.12" fillRule="evenodd" />
                                        <path d="m35.141 124.42v5.12h-0.48" fillRule="evenodd" />
                                        <path d="m34.661 124.42-0.32 5.12v-5.12" fillRule="evenodd" />
                                        <path d="m34.661 124.42v5.12h-0.32" fillRule="evenodd" />
                                        <path d="m37.701 143.46-2.56 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m37.701 143.46v4.32h-2.56" fillRule="evenodd" />
                                        <path d="m35.141 142.98-0.8 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m35.141 142.98v5.28h-0.8" fillRule="evenodd" />
                                        <path d="m37.701 329.7-2.56 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m37.701 329.7v4.32h-2.56" fillRule="evenodd" />
                                        <path d="m35.141 329.22-0.8 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m35.141 329.22v5.28h-0.8" fillRule="evenodd" />
                                        <path d="m37.701 310.98-2.56 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m37.701 310.98v4.48h-2.56" fillRule="evenodd" />
                                        <path d="m35.141 310.66-0.8 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m35.141 310.66v5.28h-0.8" fillRule="evenodd" />
                                        <path d="m37.701 162.02-2.56 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m37.701 162.02v4.48h-2.56" fillRule="evenodd" />
                                        <path d="m35.141 161.54-0.32 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m35.141 161.54v5.28h-0.32" fillRule="evenodd" />
                                        <path d="m34.821 161.54-0.48 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m34.821 161.54v5.28h-0.48" fillRule="evenodd" />
                                        <path d="m37.701 292.42-2.56 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m37.701 292.42v4.32h-2.56" fillRule="evenodd" />
                                        <path d="m35.141 291.94-0.8 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m35.141 291.94v5.28h-0.8" fillRule="evenodd" />
                                        <path d="m37.701 180.74-2.56 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m37.701 180.74v4.32h-2.56" fillRule="evenodd" />
                                        <path d="m35.141 180.26-0.48 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m35.141 180.26v5.28h-0.48" fillRule="evenodd" />
                                        <path d="m34.661 180.26-0.32 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m34.661 180.26v5.28h-0.32" fillRule="evenodd" />
                                        <path d="m37.701 199.3-2.56 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m37.701 199.3v4.32h-2.56" fillRule="evenodd" />
                                        <path d="m35.141 198.82-0.32 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m35.141 198.82v5.28h-0.32" fillRule="evenodd" />
                                        <path d="m34.821 198.82-0.48 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m34.821 198.82v5.28h-0.48" fillRule="evenodd" />
                                        <path d="m37.701 236.58-2.56 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m37.701 236.58v4.32h-2.56" fillRule="evenodd" />
                                        <path d="m35.141 236.1-0.8 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m35.141 236.1v5.28h-0.8" fillRule="evenodd" />
                                        <path d="m37.701 273.86-2.56 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m37.701 273.86v4.32h-2.56" fillRule="evenodd" />
                                        <path d="m35.141 273.38-0.8 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m35.141 273.38v5.28h-0.8" fillRule="evenodd" />
                                        <path d="m37.701 255.14-2.56 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m37.701 255.14v4.48h-2.56" fillRule="evenodd" />
                                        <path d="m35.141 254.66-0.64 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m35.141 254.66v5.28h-0.64" fillRule="evenodd" />
                                        <path d="m34.501 254.66-0.16 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m34.501 254.66v5.28h-0.16" fillRule="evenodd" />
                                        <path d="m160.1 537.7-0.8 4.16v-4.16" fillRule="evenodd" />
                                        <path d="m160.1 537.7v4.16h-0.8" fillRule="evenodd" />
                                        <path d="m160.1 519.14-0.8 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m160.1 519.14v5.28h-0.8" fillRule="evenodd" />
                                        <path d="m160.1 500.58-0.8 5.12v-5.12" fillRule="evenodd" />
                                        <path d="m160.1 500.58v5.12h-0.8" fillRule="evenodd" />
                                        <path d="m160.1 481.86-0.8 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m160.1 481.86v5.28h-0.8" fillRule="evenodd" />
                                        <path d="m160.1 463.3-0.8 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m160.1 463.3v5.28h-0.8" fillRule="evenodd" />
                                        <path d="m160.1 448.42-0.8 1.44v-1.44" fillRule="evenodd" />
                                        <path d="m160.1 448.42v1.44h-0.8" fillRule="evenodd" />
                                        <path d="m159.3 538.18-2.56 3.68v-3.68" fillRule="evenodd" />
                                        <path d="m159.3 538.18v3.68h-2.56" fillRule="evenodd" />
                                        <path d="m159.3 519.62-2.56 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m159.3 519.62v4.32h-2.56" fillRule="evenodd" />
                                        <path d="m159.3 500.9-2.56 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m159.3 500.9v4.48h-2.56" fillRule="evenodd" />
                                        <path d="m159.3 482.34-2.56 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m159.3 482.34v4.32h-2.56" fillRule="evenodd" />
                                        <path d="m159.3 463.62-2.56 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m159.3 463.62v4.48h-2.56" fillRule="evenodd" />
                                        <path d="m159.3 448.42-2.56 1.12v-1.12" fillRule="evenodd" />
                                        <path d="m159.3 448.42v1.12h-2.56" fillRule="evenodd" />
                                        <path d="m231.62 738.34-3.36 43.36v-43.36" fillRule="evenodd" />
                                        <path d="m231.62 738.34v43.36h-3.36" fillRule="evenodd" />
                                        <path d="m481.38 779.94-0.16 19.36v-19.36" fillRule="evenodd" />
                                        <path d="m481.38 779.94v19.36h-0.16" fillRule="evenodd" />
                                        <path d="m481.22 779.94-3.36 19.52v-19.52" fillRule="evenodd" />
                                        <path d="m481.22 779.94v19.52h-3.36" fillRule="evenodd" />
                                        <path d="m490.18 820.1-36.64 3.52v-3.52" fillRule="evenodd" />
                                        <path d="m490.18 820.1v3.52h-36.64" fillRule="evenodd" />
                                        <path d="m490.18 802.98-3.52 17.12v-17.12" fillRule="evenodd" />
                                        <path d="m490.18 802.98v17.12h-3.52" fillRule="evenodd" />
                                        <path d="m490.18 799.46-12.32 3.52v-3.52" fillRule="evenodd" />
                                        <path d="m490.18 799.46v3.52h-12.32" fillRule="evenodd" />
                                        <path d="m16.101 28.742-0.16 36.64v-36.64" fillRule="evenodd" />
                                        <path d="m16.101 28.742v36.64h-0.16" fillRule="evenodd" />
                                        <path d="m34.021 65.222-17.92 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m34.021 65.222v0.16h-17.92" fillRule="evenodd" />
                                        <path d="m34.341 70.182-0.16 3.52v-3.52" fillRule="evenodd" />
                                        <path d="m34.341 70.182v3.52h-0.16" fillRule="evenodd" />
                                        <path d="m34.341 254.66-0.16 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m34.341 254.66v5.28h-0.16" fillRule="evenodd" />
                                        <path d="m34.341 366.5-0.16 6.88v-6.88" fillRule="evenodd" />
                                        <path d="m34.341 366.5v6.88h-0.16" fillRule="evenodd" />
                                        <path d="m34.341 87.142-0.16 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m34.341 87.142v5.28h-0.16" fillRule="evenodd" />
                                        <path d="m34.341 347.78-0.16 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m34.341 347.78v5.28h-0.16" fillRule="evenodd" />
                                        <path d="m34.341 105.7-0.16 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m34.341 105.7v5.28h-0.16" fillRule="evenodd" />
                                        <path d="m34.341 329.22-0.16 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m34.341 329.22v5.28h-0.16" fillRule="evenodd" />
                                        <path d="m34.341 273.38-0.16 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m34.341 273.38v5.28h-0.16" fillRule="evenodd" />
                                        <path d="m34.341 142.98-0.16 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m34.341 142.98v5.28h-0.16" fillRule="evenodd" />
                                        <path d="m34.341 124.42-0.16 5.12v-5.12" fillRule="evenodd" />
                                        <path d="m34.341 124.42v5.12h-0.16" fillRule="evenodd" />
                                        <path d="m34.341 310.66-0.16 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m34.341 310.66v5.28h-0.16" fillRule="evenodd" />
                                        <path d="m34.341 291.94-0.16 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m34.341 291.94v5.28h-0.16" fillRule="evenodd" />
                                        <path d="m34.341 161.54-0.16 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m34.341 161.54v5.28h-0.16" fillRule="evenodd" />
                                        <path d="m34.341 180.26-0.16 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m34.341 180.26v5.28h-0.16" fillRule="evenodd" />
                                        <path d="m34.341 236.1-0.16 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m34.341 236.1v5.28h-0.16" fillRule="evenodd" />
                                        <path d="m34.341 198.82-0.16 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m34.341 198.82v5.28h-0.16" fillRule="evenodd" />
                                        <path d="m34.341 217.54-0.16 5.12v-5.12" fillRule="evenodd" />
                                        <path d="m34.341 217.54v5.12h-0.16" fillRule="evenodd" />
                                        <path d="m38.501 373.38h3.36z" fillRule="evenodd" />
                                        <path d="m38.501 373.38h3.36z" fillRule="evenodd" />
                                        <path d="m37.701 373.38h0.8z" fillRule="evenodd" />
                                        <path d="m37.701 373.38h0.8z" fillRule="evenodd" />
                                        <path d="m8.901 373.38h25.44z" fillRule="evenodd" />
                                        <path d="m8.901 373.38h25.44z" fillRule="evenodd" />
                                        <path d="m8.901 373.38" fillRule="evenodd" />
                                        <path d="m8.901 373.38" fillRule="evenodd" />
                                        <path d="m8.901 373.38" fillRule="evenodd" />
                                        <path d="m8.901 373.38" fillRule="evenodd" />
                                        <path d="m8.901 373.38" fillRule="evenodd" />
                                        <path d="m8.901 373.38" fillRule="evenodd" />
                                        <path d="m8.901 424.42v-51.04z" fillRule="evenodd" />
                                        <path d="m8.901 424.42v-51.04z" fillRule="evenodd" />
                                        <path d="m8.901 424.42v-51.04z" fillRule="evenodd" />
                                        <path d="m34.181 424.26-20.96 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m34.181 424.26v0.16h-20.96" fillRule="evenodd" />
                                        <path d="m8.901 424.42v-0.16z" fillRule="evenodd" />
                                        <path d="m13.221 424.26-4.32 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m13.221 424.26v0.16h-4.32" fillRule="evenodd" />
                                        <path d="m77.221 857.54v-29.28z" fillRule="evenodd" />
                                        <path d="m77.221 857.54v-29.28z" fillRule="evenodd" />
                                        <path d="m77.221 828.26-0.16 29.28v-29.28" fillRule="evenodd" />
                                        <path d="m77.221 828.26v29.28h-0.16" fillRule="evenodd" />
                                        <path d="m111.46 857.54-34.24 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m111.46 857.54v0.16h-34.24" fillRule="evenodd" />
                                        <path d="m77.221 857.54-0.16 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m77.221 857.54v0.16h-0.16" fillRule="evenodd" />
                                        <path d="m111.62 846.34-0.16 11.36v-11.36" fillRule="evenodd" />
                                        <path d="m111.62 846.34v11.36h-0.16" fillRule="evenodd" />
                                        <path d="m457.06 823.62-0.16 22.72v-22.72" fillRule="evenodd" />
                                        <path d="m457.06 823.62v22.72h-0.16" fillRule="evenodd" />
                                        <path d="m490.18 823.62-31.52 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m490.18 823.62v0.16h-31.52" fillRule="evenodd" />
                                        <path d="m458.66 823.62-1.6 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m458.66 823.62v0.16h-1.6" fillRule="evenodd" />
                                        <path d="m490.18 799.3-8.8 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m490.18 799.3v0.16h-8.8" fillRule="evenodd" />
                                        <path d="m481.38 799.46v-70.72z" fillRule="evenodd" />
                                        <path d="m481.38 799.46v-70.72z" fillRule="evenodd" />
                                        <path d="m481.38 779.94v19.52-0.16" fillRule="evenodd" />
                                        <path d="m481.38 799.46v-19.52z" fillRule="evenodd" />
                                        <path d="m481.38 799.3-0.16 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m481.38 799.3v0.16h-0.16" fillRule="evenodd" />
                                        <path d="m481.38 728.74-0.16 51.2v-51.2" fillRule="evenodd" />
                                        <path d="m481.38 728.74v51.2h-0.16" fillRule="evenodd" />
                                        <path d="m476.9 728.74-24.64 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m476.9 728.74v0.16h-24.64" fillRule="evenodd" />
                                        <path d="m452.26 728.74-0.16 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m452.26 728.74v0.16h-0.16" fillRule="evenodd" />
                                        <path d="m452.1 734.98v-6.08z" fillRule="evenodd" />
                                        <path d="m452.26 728.9-0.16 6.08v-6.08" fillRule="evenodd" />
                                        <path d="m452.26 728.9v7.68l-0.16-1.6" fillRule="evenodd" />
                                        <path d="m228.26 738.34-0.16 40v-40" fillRule="evenodd" />
                                        <path d="m228.26 738.34v40h-0.16" fillRule="evenodd" />
                                        <path d="m160.42 542.02-6.08 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m160.42 542.02v0.16h-6.08" fillRule="evenodd" />
                                        <path d="m154.34 542.02-8.96 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m154.34 542.02v0.16h-8.96" fillRule="evenodd" />
                                        <path d="m160.42 537.7-0.16 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m160.42 537.7v4.32h-0.16" fillRule="evenodd" />
                                        <path d="m160.42 519.14-0.16 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m160.42 519.14v5.28h-0.16" fillRule="evenodd" />
                                        <path d="m160.42 500.58-0.16 5.12v-5.12" fillRule="evenodd" />
                                        <path d="m160.42 500.58v5.12h-0.16" fillRule="evenodd" />
                                        <path d="m160.42 481.86-0.16 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m160.42 481.86v5.28h-0.16" fillRule="evenodd" />
                                        <path d="m160.42 463.3-0.16 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m160.42 463.3v5.28h-0.16" fillRule="evenodd" />
                                        <path d="m160.42 448.58-0.16 1.28v-1.28" fillRule="evenodd" />
                                        <path d="m160.42 448.58v1.28h-0.16" fillRule="evenodd" />
                                        <path d="m111.46 802.66-4.16 50.72v-50.72" fillRule="evenodd" />
                                        <path d="m111.46 802.66v50.72h-4.16" fillRule="evenodd" />
                                        <path d="m107.3 802.66-0.16 32.16v-32.16" fillRule="evenodd" />
                                        <path d="m107.3 802.66v32.16h-0.16" fillRule="evenodd" />
                                        <path d="m81.541 853.38-0.16 4.1603v-4.1603" fillRule="evenodd" />
                                        <path d="m81.541 853.38v4.1603h-0.16" fillRule="evenodd" />
                                        <path d="m81.541 799.3-0.16 32.96v-32.96" fillRule="evenodd" />
                                        <path d="m81.541 799.3v32.96h-0.16" fillRule="evenodd" />
                                        <path d="m81.381 799.3-0.96 58.24v-58.24" fillRule="evenodd" />
                                        <path d="m81.381 799.3v58.24h-0.96" fillRule="evenodd" />
                                        <path d="m80.421 799.3-3.2 58.24v-58.24" fillRule="evenodd" />
                                        <path d="m80.421 799.3v58.24h-3.2" fillRule="evenodd" />
                                        <path d="m77.221 824.74-0.8 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m77.221 824.74v3.36h-0.8" fillRule="evenodd" />
                                        <path d="m76.421 824.74-0.8 3.2v-3.36" fillRule="evenodd" />
                                        <path d="m76.421 824.74v3.36l-0.8-0.16" fillRule="evenodd" />
                                        <path d="m75.621 824.58-1.76 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m75.621 824.58v3.36h-1.76" fillRule="evenodd" />
                                        <path d="m73.861 827.94v-3.36z" fillRule="evenodd" />
                                        <path d="m73.861 827.94v-3.36z" fillRule="evenodd" />
                                        <path d="m73.861 824.58-1.44 3.2v-3.36" fillRule="evenodd" />
                                        <path d="m73.861 824.58v3.36l-1.44-0.16" fillRule="evenodd" />
                                        <path d="m72.421 824.42-0.16 3.36v-3.52" fillRule="evenodd" />
                                        <path d="m72.421 824.42v3.36h-0.16" fillRule="evenodd" />
                                        <path d="m72.261 824.26-1.6 3.2v-3.36" fillRule="evenodd" />
                                        <path d="m72.261 824.26v3.52l-1.6-0.32" fillRule="evenodd" />
                                        <path d="m70.661 824.1-0.16 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m70.661 824.1v3.36h-0.16" fillRule="evenodd" />
                                        <path d="m70.501 824.1-0.8 3.2v-0.8" fillRule="evenodd" />
                                        <path d="m70.501 824.1v3.36l-0.8-0.16" fillRule="evenodd" />
                                        <path d="m69.701 826.5-0.48 0.8v-0.96" fillRule="evenodd" />
                                        <path d="m69.701 826.5v0.8h-0.48" fillRule="evenodd" />
                                        <path d="m69.061 826.82v0.48l-0.16-0.16" fillRule="evenodd" />
                                        <path d="m69.221 826.34-0.16 0.96v-0.48" fillRule="evenodd" />
                                        <path d="m69.221 826.34v0.96h-0.16" fillRule="evenodd" />
                                        <path d="m57.221 819.14-0.48 1.28v-1.6" fillRule="evenodd" />
                                        <path d="m56.741 821.7-0.32 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m56.741 818.82-0.32 2.56v-2.72" fillRule="evenodd" />
                                        <path d="m56.741 818.82v1.6l-0.32 0.96" fillRule="evenodd" />
                                        <path d="m56.421 821.7-0.16 0.8v-0.96" fillRule="evenodd" />
                                        <path d="m56.421 821.7v0.8h-0.16" fillRule="evenodd" />
                                        <path d="m56.421 818.66-0.16 2.88v-3.04" fillRule="evenodd" />
                                        <path d="m56.421 818.66v2.72l-0.16 0.16" fillRule="evenodd" />
                                        <path d="m56.261 818.5-0.16 3.84v-3.84" fillRule="evenodd" />
                                        <path d="m56.261 818.5v4l-0.16-0.16" fillRule="evenodd" />
                                        <path d="m56.101 818.5-0.96 3.36v-4.16" fillRule="evenodd" />
                                        <path d="m56.101 818.5v3.84l-0.96-0.48" fillRule="evenodd" />
                                        <path d="m55.141 821.7v-4z" fillRule="evenodd" />
                                        <path d="m55.141 817.7v4.16-0.16" fillRule="evenodd" />
                                        <path d="m55.141 817.7-1.12 3.52v-4.16" fillRule="evenodd" />
                                        <path d="m55.141 817.7v4l-1.12-0.48" fillRule="evenodd" />
                                        <path d="m54.021 817.06-0.32 3.84v-3.52" fillRule="evenodd" />
                                        <path d="m54.021 817.06v4.16l-0.32-0.32" fillRule="evenodd" />
                                        <path d="m53.701 817.38-0.96 2.88v-1.92" fillRule="evenodd" />
                                        <path d="m53.701 817.38v3.52l-0.96-0.64" fillRule="evenodd" />
                                        <path d="m52.741 818.34-0.48 1.44v-0.96" fillRule="evenodd" />
                                        <path d="m52.741 818.34v1.92l-0.48-0.48" fillRule="evenodd" />
                                        <path d="m52.261 818.82-0.32 0.8v-1.12" fillRule="evenodd" />
                                        <path d="m52.261 818.82v0.96l-0.32-0.16" fillRule="evenodd" />
                                        <path d="m51.621 818.82v0.64l-0.32-0.32" fillRule="evenodd" />
                                        <path d="m51.941 818.5-0.32 0.96v-0.64" fillRule="evenodd" />
                                        <path d="m51.941 818.5v1.12l-0.32-0.16" fillRule="evenodd" />
                                        <path d="m44.261 806.82-0.8 0.64v-1.76" fillRule="evenodd" />
                                        <path d="m42.661 808.9-0.32 0.32v-0.48" fillRule="evenodd" />
                                        <path d="m43.461 805.7-1.12 2.88v-4.8" fillRule="evenodd" />
                                        <path d="m43.461 805.7v1.76l-1.12 1.12" fillRule="evenodd" />
                                        <path d="m42.341 808.74v0.48-0.64" fillRule="evenodd" />
                                        <path d="m42.341 809.22v-0.48z" fillRule="evenodd" />
                                        <path d="m42.341 803.78v4.8-4.96" fillRule="evenodd" />
                                        <path d="m42.341 808.58v-4.8z" fillRule="evenodd" />
                                        <path d="m42.341 803.62-0.16 5.76v-6.08" fillRule="evenodd" />
                                        <path d="m42.341 803.62v5.6l-0.16 0.16" fillRule="evenodd" />
                                        <path d="m42.181 803.3-0.16 6.24v-6.24" fillRule="evenodd" />
                                        <path d="m42.181 803.3v6.08l-0.16 0.16" fillRule="evenodd" />
                                        <path d="m42.021 803.3-0.48 5.6v-5.44" fillRule="evenodd" />
                                        <path d="m42.021 803.3v6.24l-0.48-0.64" fillRule="evenodd" />
                                        <path d="m41.541 803.46-1.28 3.36v-2.88" fillRule="evenodd" />
                                        <path d="m41.541 803.46v5.44l-1.28-2.08" fillRule="evenodd" />
                                        <path d="m40.261 803.94-0.64 1.76v-1.6" fillRule="evenodd" />
                                        <path d="m40.261 803.94v2.88l-0.64-1.12" fillRule="evenodd" />
                                        <path d="m39.621 804.1v1.6-1.76" fillRule="evenodd" />
                                        <path d="m39.621 805.7v-1.6z" fillRule="evenodd" />
                                        <path d="m39.621 803.94-0.16 1.6v-1.76" fillRule="evenodd" />
                                        <path d="m39.621 803.94v1.76l-0.16-0.16" fillRule="evenodd" />
                                        <path d="m39.301 803.78v1.44l-0.64-1.28" fillRule="evenodd" />
                                        <path d="m39.461 803.78-0.16 1.44v-1.44" fillRule="evenodd" />
                                        <path d="m39.461 803.78v1.76l-0.16-0.32" fillRule="evenodd" />
                                        <path d="m37.861 789.7-0.16 0.16v-1.76" fillRule="evenodd" />
                                        <path d="m37.701 788.1-0.16 1.76v-3.52" fillRule="evenodd" />
                                        <path d="m37.701 788.1v1.76h-0.16" fillRule="evenodd" />
                                        <path d="m37.541 786.34v3.52-5.28" fillRule="evenodd" />
                                        <path d="m37.541 789.86v-3.52z" fillRule="evenodd" />
                                        <path d="m35.461 790.98h-0.16v-0.48" fillRule="evenodd" />
                                        <path d="m37.541 784.58-2.08 5.92v-5.92" fillRule="evenodd" />
                                        <path d="m37.541 784.58v5.28l-2.08 0.64" fillRule="evenodd" />
                                        <path d="m35.461 784.58-0.16 5.92v-5.92" fillRule="evenodd" />
                                        <path d="m35.461 784.58v5.92h-0.16" fillRule="evenodd" />
                                        <path d="m35.301 784.58-0.64 6.72v-6.72" fillRule="evenodd" />
                                        <path d="m35.301 784.58v6.4l-0.64 0.32" fillRule="evenodd" />
                                        <path d="m34.661 784.58-0.16 5.92v-5.92" fillRule="evenodd" />
                                        <path d="m34.661 784.58v6.72l-0.16-0.8" fillRule="evenodd" />
                                        <path d="m34.501 784.58-0.16 3.52v-3.52" fillRule="evenodd" />
                                        <path d="m34.501 784.58v5.92l-0.16-2.4" fillRule="evenodd" />
                                        <path d="m34.341 784.58-0.16 1.92v-1.92" fillRule="evenodd" />
                                        <path d="m34.341 784.58v3.52l-0.16-1.6" fillRule="evenodd" />
                                        <path d="m34.181 786.02v-1.44z" fillRule="evenodd" />
                                        <path d="m34.181 786.02v-1.44z" fillRule="evenodd" />
                                        <path d="m34.181 784.58v1.92-0.48" fillRule="evenodd" />
                                        <path d="m77.221 828.1-0.8 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m77.221 828.1v0.16h-0.8" fillRule="evenodd" />
                                        <path d="m75.621 828.1h0.8z" fillRule="evenodd" />
                                        <path d="m76.421 828.1v0.16l-0.8-0.16" fillRule="evenodd" />
                                        <path d="m75.621 828.1h-1.28v-0.16" fillRule="evenodd" />
                                        <path d="m74.341 828.1h1.28z" fillRule="evenodd" />
                                        <path d="m74.341 827.94-0.48 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m74.341 827.94v0.16h-0.48" fillRule="evenodd" />
                                        <path d="m73.861 827.94h-1.28v-0.16" fillRule="evenodd" />
                                        <path d="m73.861 827.94v0.16l-1.28-0.16" fillRule="evenodd" />
                                        <path d="m72.581 827.78h-1.12v-0.16" fillRule="evenodd" />
                                        <path d="m72.581 827.78v0.16l-1.12-0.16" fillRule="evenodd" />
                                        <path d="m71.461 827.62-0.16 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m71.461 827.62v0.16h-0.16" fillRule="evenodd" />
                                        <path d="m71.301 827.62-1.6-0.16v-0.16" fillRule="evenodd" />
                                        <path d="m71.301 827.62v0.16l-1.6-0.32" fillRule="evenodd" />
                                        <path d="m68.901 827.3v-0.16z" fillRule="evenodd" />
                                        <path d="m69.701 827.3h-0.8v-0.16" fillRule="evenodd" />
                                        <path d="m69.701 827.3v0.16l-0.8-0.16" fillRule="evenodd" />
                                        <path d="m56.421 822.66v-0.16z" fillRule="evenodd" />
                                        <path d="m56.421 822.5-1.28-0.64v-0.16" fillRule="evenodd" />
                                        <path d="m56.421 822.5v0.16l-1.28-0.8" fillRule="evenodd" />
                                        <path d="m55.141 821.7h-0.32v-0.16" fillRule="evenodd" />
                                        <path d="m55.141 821.7v0.16l-0.32-0.16" fillRule="evenodd" />
                                        <path d="m54.821 821.54h-0.32v-0.16" fillRule="evenodd" />
                                        <path d="m54.821 821.54v0.16l-0.32-0.16" fillRule="evenodd" />
                                        <path d="m54.501 821.38-0.8-0.32v-0.16" fillRule="evenodd" />
                                        <path d="m54.501 821.38v0.16l-0.8-0.48" fillRule="evenodd" />
                                        <path d="m53.701 820.9-0.96-0.48v-0.16" fillRule="evenodd" />
                                        <path d="m53.701 820.9v0.16l-0.96-0.64" fillRule="evenodd" />
                                        <path d="m52.741 820.26-0.8-0.48v-0.16" fillRule="evenodd" />
                                        <path d="m52.741 820.26v0.16l-0.8-0.64" fillRule="evenodd" />
                                        <path d="m51.301 819.14v0.16h-0.16" fillRule="evenodd" />
                                        <path d="m51.941 819.62-0.64-0.32v-0.16" fillRule="evenodd" />
                                        <path d="m51.941 819.62v0.16l-0.64-0.48" fillRule="evenodd" />
                                        <path d="m42.021 809.54-0.16 0.16v-0.32" fillRule="evenodd" />
                                        <path d="m41.861 809.38-0.48-0.48v-0.16" fillRule="evenodd" />
                                        <path d="m41.861 809.38v0.32l-0.48-0.8" fillRule="evenodd" />
                                        <path d="m41.381 808.74-0.48-0.48v-0.32" fillRule="evenodd" />
                                        <path d="m41.381 808.74v0.16l-0.48-0.64" fillRule="evenodd" />
                                        <path d="m40.901 807.94-0.64-0.8v-0.32" fillRule="evenodd" />
                                        <path d="m40.901 807.94v0.32l-0.64-1.12" fillRule="evenodd" />
                                        <path d="m40.261 806.82h-0.16v-0.16" fillRule="evenodd" />
                                        <path d="m40.261 806.82v0.32l-0.16-0.32" fillRule="evenodd" />
                                        <path d="m40.101 806.66-0.64-0.96v-0.32" fillRule="evenodd" />
                                        <path d="m40.101 806.66v0.16l-0.64-1.12" fillRule="evenodd" />
                                        <path d="m39.461 805.38-0.48-0.64v-0.32" fillRule="evenodd" />
                                        <path d="m39.461 805.38v0.32l-0.48-0.96" fillRule="evenodd" />
                                        <path d="m38.661 803.94v0.32l-0.16-0.32" fillRule="evenodd" />
                                        <path d="m38.981 804.42-0.32-0.16v-0.32" fillRule="evenodd" />
                                        <path d="m38.981 804.42v0.32l-0.32-0.48" fillRule="evenodd" />
                                        <path d="m34.661 791.3h-0.16v-0.96" fillRule="evenodd" />
                                        <path d="m34.501 790.34v0.16-0.96" fillRule="evenodd" />
                                        <path d="m34.501 790.34v0.96-0.8" fillRule="evenodd" />
                                        <path d="m34.501 789.54-0.16-0.48v-1.12" fillRule="evenodd" />
                                        <path d="m34.501 789.54v0.96l-0.16-1.44" fillRule="evenodd" />
                                        <path d="m34.341 787.94-0.16 0.32v-2.08" fillRule="evenodd" />
                                        <path d="m34.341 787.94v1.12l-0.16-0.8" fillRule="evenodd" />
                                        <path d="m34.181 786.18v1.92-3.2" fillRule="evenodd" />
                                        <path d="m34.181 786.18v2.08-0.16" fillRule="evenodd" />
                                        <path d="m34.181 784.9v3.04-3.36" fillRule="evenodd" />
                                        <path d="m34.181 784.9v3.2-0.16" fillRule="evenodd" />
                                        <path d="m34.181 784.58-0.16 1.92v-1.92" fillRule="evenodd" />
                                        <path d="m34.181 784.58v3.36l-0.16-1.44" fillRule="evenodd" />
                                        <path d="m34.021 786.02v-1.44z" fillRule="evenodd" />
                                        <path d="m34.021 786.02v-1.44z" fillRule="evenodd" />
                                        <path d="m34.021 784.58v1.92-0.48" fillRule="evenodd" />
                                        <path d="m456.42 733.06-2.08 45.12v-45.12" fillRule="evenodd" />
                                        <path d="m456.42 733.06v45.12h-2.08" fillRule="evenodd" />
                                        <path d="m454.34 733.06-2.08 47.84v-47.84" fillRule="evenodd" />
                                        <path d="m454.34 733.06v47.84h-2.08" fillRule="evenodd" />
                                        <path d="m476.9 728.9-24.64 4.16v-4.16" fillRule="evenodd" />
                                        <path d="m476.9 728.9v4.16h-24.64" fillRule="evenodd" />
                                        <path d="m481.22 779.94v-51.2z" fillRule="evenodd" />
                                        <path d="m481.22 728.74-4.32 51.2v-51.2" fillRule="evenodd" />
                                        <path d="m481.22 728.74v51.2h-4.32" fillRule="evenodd" />
                                        <path d="m77.541 420.1-60.16 4.16v-4.16" fillRule="evenodd" />
                                        <path d="m77.541 420.1v4.16h-60.16" fillRule="evenodd" />
                                        <path d="m17.381 420.1-4.16 4.16v-4.16" fillRule="evenodd" />
                                        <path d="m17.381 420.1v4.16h-4.16" fillRule="evenodd" />
                                        <path d="m77.541 373.38-64 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m77.541 373.38v4.32h-64" fillRule="evenodd" />
                                        <path d="m13.541 373.38-0.32 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m13.541 373.38v4.32h-0.32" fillRule="evenodd" />
                                        <path d="m80.901 61.062-55.68 4.16v-4.16" fillRule="evenodd" />
                                        <path d="m80.901 61.062v4.16h-55.68" fillRule="evenodd" />
                                        <path d="m25.221 61.062-4.96 4.16v-4.16" fillRule="evenodd" />
                                        <path d="m25.221 61.062v4.16h-4.96" fillRule="evenodd" />
                                        <path d="m20.261 28.742-2.88 36.48v-36.48" fillRule="evenodd" />
                                        <path d="m20.261 28.742v36.48h-2.88" fillRule="evenodd" />
                                        <path d="m17.381 28.742-1.28 36.48v-36.48" fillRule="evenodd" />
                                        <path d="m17.381 28.742v36.48h-1.28" fillRule="evenodd" />
                                        <path d="m118.66 799.3-13.76 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m118.66 799.3v3.36h-13.76" fillRule="evenodd" />
                                        <path d="m104.9 799.3-0.8 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m104.9 799.3v0.8h-0.8" fillRule="evenodd" />
                                        <path d="m104.1 799.3-4.64 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m104.1 799.3v0.8h-4.64" fillRule="evenodd" />
                                        <path d="m89.381 799.3-5.44 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m89.381 799.3v0.8h-5.44" fillRule="evenodd" />
                                        <path d="m83.941 799.3-2.4 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m83.941 799.3v3.36h-2.4" fillRule="evenodd" />
                                        <path d="m145.22 541.86-3.36 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m145.22 541.86v0.8h-3.36" fillRule="evenodd" />
                                        <path d="m145.22 612.9-3.36 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m145.22 612.9v4.32h-3.36" fillRule="evenodd" />
                                        <path d="m145.22 575.62-3.36 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m145.22 575.62v4.32h-3.36" fillRule="evenodd" />
                                        <path d="m145.22 743.14-0.48 8v-8" fillRule="evenodd" />
                                        <path d="m145.22 743.14v8h-0.48" fillRule="evenodd" />
                                        <path d="m144.74 743.14-2.88 7.68v-7.68" fillRule="evenodd" />
                                        <path d="m144.74 743.14v7.68h-2.88" fillRule="evenodd" />
                                        <path d="m145.22 668.74-3.36 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m145.22 668.74v4.32h-3.36" fillRule="evenodd" />
                                        <path d="m145.22 556.9-3.36 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m145.22 556.9v4.48h-3.36" fillRule="evenodd" />
                                        <path d="m145.22 687.3-3.36 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m145.22 687.3v4.48h-3.36" fillRule="evenodd" />
                                        <path d="m145.22 650.02-3.36 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m145.22 650.02v4.48h-3.36" fillRule="evenodd" />
                                        <path d="m145.22 706.02-3.36 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m145.22 706.02v4.32h-3.36" fillRule="evenodd" />
                                        <path d="m145.22 594.18-3.36 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m145.22 594.18v4.48h-3.36" fillRule="evenodd" />
                                        <path d="m145.22 724.58-3.36 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m145.22 724.58v4.32h-3.36" fillRule="evenodd" />
                                        <path d="m145.22 631.46-3.36 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m145.22 631.46v4.32h-3.36" fillRule="evenodd" />
                                        <path d="m145.22 771.14-0.48 7.2v-7.2" fillRule="evenodd" />
                                        <path d="m145.22 771.14v7.2h-0.48" fillRule="evenodd" />
                                        <path d="m144.74 771.46-2.88 6.88v-6.88" fillRule="evenodd" />
                                        <path d="m144.74 771.46v6.88h-2.88" fillRule="evenodd" />
                                        <path d="m145.22 756.58-0.48 9.12v-9.12" fillRule="evenodd" />
                                        <path d="m145.22 756.58v9.12h-0.48" fillRule="evenodd" />
                                        <path d="m144.74 757.06-1.28 8.16v-8.16" fillRule="evenodd" />
                                        <path d="m144.74 757.06v8.16h-1.28" fillRule="evenodd" />
                                        <path d="m143.46 757.06-1.6 8.16v-8.16" fillRule="evenodd" />
                                        <path d="m143.46 757.06v8.16h-1.6" fillRule="evenodd" />
                                        <path d="m145.38 650.02-0.16 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m145.38 650.02v4.48h-0.16" fillRule="evenodd" />
                                        <path d="m145.38 541.86-0.16 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m145.38 541.86v0.8h-0.16" fillRule="evenodd" />
                                        <path d="m145.38 668.74-0.16 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m145.38 668.74v4.32h-0.16" fillRule="evenodd" />
                                        <path d="m145.38 687.3-0.16 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m145.38 687.3v4.48h-0.16" fillRule="evenodd" />
                                        <path d="m145.38 556.9-0.16 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m145.38 556.9v4.48h-0.16" fillRule="evenodd" />
                                        <path d="m145.38 631.46-0.16 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m145.38 631.46v4.32h-0.16" fillRule="evenodd" />
                                        <path d="m145.38 575.62-0.16 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m145.38 575.62v4.32h-0.16" fillRule="evenodd" />
                                        <path d="m145.38 612.9-0.16 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m145.38 612.9v4.32h-0.16" fillRule="evenodd" />
                                        <path d="m145.38 594.18-0.16 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m145.38 594.18v4.48h-0.16" fillRule="evenodd" />
                                        <path d="m145.38 706.02-0.16 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m145.38 706.02v4.32h-0.16" fillRule="evenodd" />
                                        <path d="m145.38 724.58-0.16 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m145.38 724.58v4.32h-0.16" fillRule="evenodd" />
                                        <path d="m145.38 743.14-0.16 8v-8" fillRule="evenodd" />
                                        <path d="m145.38 743.14v8h-0.16" fillRule="evenodd" />
                                        <path d="m145.38 771.14-0.16 7.04v-7.04" fillRule="evenodd" />
                                        <path d="m145.38 771.14v7.04h-0.16" fillRule="evenodd" />
                                        <path d="m145.38 756.58-0.16 9.12v-9.12" fillRule="evenodd" />
                                        <path d="m145.38 756.58v9.12h-0.16" fillRule="evenodd" />
                                        <path d="m37.541 424.26-3.36 6.4v-6.4" fillRule="evenodd" />
                                        <path d="m37.541 424.26v6.4h-3.36" fillRule="evenodd" />
                                        <path d="m37.541 668.42-3.36 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m37.541 668.42v4.48h-3.36" fillRule="evenodd" />
                                        <path d="m37.541 444.9-3.36 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m37.541 444.9v4.48h-3.36" fillRule="evenodd" />
                                        <path d="m37.541 463.62-3.36 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m37.541 463.62v4.32h-3.36" fillRule="evenodd" />
                                        <path d="m37.541 742.98-3.36 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m37.541 742.98v4.32h-3.36" fillRule="evenodd" />
                                        <path d="m37.541 482.18-3.36 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m37.541 482.18v4.48h-3.36" fillRule="evenodd" />
                                        <path d="m37.541 500.74-3.36 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m37.541 500.74v4.48h-3.36" fillRule="evenodd" />
                                        <path d="m37.541 724.26-3.36 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m37.541 724.26v4.48h-3.36" fillRule="evenodd" />
                                        <path d="m37.541 761.54-3.36 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m37.541 761.54v4.48h-3.36" fillRule="evenodd" />
                                        <path d="m37.541 519.46-3.36 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m37.541 519.46v4.32h-3.36" fillRule="evenodd" />
                                        <path d="m37.541 538.02-3.36 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m37.541 538.02v4.48h-3.36" fillRule="evenodd" />
                                        <path d="m37.541 705.7-3.36 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m37.541 705.7v4.32h-3.36" fillRule="evenodd" />
                                        <path d="m37.541 687.14-3.36 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m37.541 687.14v4.32h-3.36" fillRule="evenodd" />
                                        <path d="m37.541 556.74-3.36 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m37.541 556.74v4.32h-3.36" fillRule="evenodd" />
                                        <path d="m37.541 780.26-3.36 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m37.541 780.26v4.32h-3.36" fillRule="evenodd" />
                                        <path d="m37.541 575.3-3.36 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m37.541 575.3v4.48h-3.36" fillRule="evenodd" />
                                        <path d="m37.541 594.02-3.36 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m37.541 594.02v4.32h-3.36" fillRule="evenodd" />
                                        <path d="m37.541 649.86-3.36 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m37.541 649.86v4.32h-3.36" fillRule="evenodd" />
                                        <path d="m37.541 612.58-3.36 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m37.541 612.58v4.32h-3.36" fillRule="evenodd" />
                                        <path d="m37.541 631.14-3.36 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m37.541 631.14v4.48h-3.36" fillRule="evenodd" />
                                        <path d="m34.181 444.9-0.16 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m34.181 444.9v4.48h-0.16" fillRule="evenodd" />
                                        <path d="m34.181 424.42-0.16 6.24v-6.24" fillRule="evenodd" />
                                        <path d="m34.181 424.42v6.24h-0.16" fillRule="evenodd" />
                                        <path d="m34.181 780.26-0.16 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m34.181 780.26v4.32h-0.16" fillRule="evenodd" />
                                        <path d="m34.181 575.3-0.16 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m34.181 575.3v4.48h-0.16" fillRule="evenodd" />
                                        <path d="m34.021 577.22v-1.92z" fillRule="evenodd" />
                                        <path d="m34.021 575.3v4.48-2.56" fillRule="evenodd" />
                                        <path d="m34.181 594.02-0.16 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m34.181 594.02v4.32h-0.16" fillRule="evenodd" />
                                        <path d="m34.181 742.98-0.16 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m34.181 742.98v4.48h-0.16" fillRule="evenodd" />
                                        <path d="m34.181 761.54-0.16 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m34.181 761.54v4.48h-0.16" fillRule="evenodd" />
                                        <path d="m34.181 631.14-0.16 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m34.181 631.14v4.48h-0.16" fillRule="evenodd" />
                                        <path d="m34.021 617.06v-4.48z" fillRule="evenodd" />
                                        <path d="m34.181 612.58-0.16 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m34.181 612.58v4.48h-0.16" fillRule="evenodd" />
                                        <path d="m34.181 556.74-0.16 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m34.181 556.74v4.32h-0.16" fillRule="evenodd" />
                                        <path d="m34.181 463.62-0.16 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m34.181 463.62v4.32h-0.16" fillRule="evenodd" />
                                        <path d="m34.181 705.7-0.16 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m34.181 705.7v4.48h-0.16" fillRule="evenodd" />
                                        <path d="m34.181 538.02-0.16 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m34.181 538.02v4.48h-0.16" fillRule="evenodd" />
                                        <path d="m34.181 482.18-0.16 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m34.181 482.18v4.48h-0.16" fillRule="evenodd" />
                                        <path d="m34.181 724.26-0.16 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m34.181 724.26v4.48h-0.16" fillRule="evenodd" />
                                        <path d="m34.181 500.74-0.16 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m34.181 500.74v4.48h-0.16" fillRule="evenodd" />
                                        <path d="m34.181 649.86-0.16 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m34.181 649.86v4.32h-0.16" fillRule="evenodd" />
                                        <path d="m34.021 672.9v-4.48z" fillRule="evenodd" />
                                        <path d="m34.181 668.42-0.16 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m34.181 668.42v4.48h-0.16" fillRule="evenodd" />
                                        <path d="m34.181 519.46-0.16 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m34.181 519.46v4.32h-0.16" fillRule="evenodd" />
                                        <path d="m34.021 691.46v-4.32z" fillRule="evenodd" />
                                        <path d="m34.181 687.14-0.16 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m34.181 687.14v4.32h-0.16" fillRule="evenodd" />
                                        <path d="m147.3 349.38-0.8 3.2v-3.2" fillRule="evenodd" />
                                        <path d="m147.3 349.38v3.2h-0.8" fillRule="evenodd" />
                                        <path d="m146.5 352.74" fillRule="evenodd" />
                                        <path d="m147.3 352.58-0.8 0.16" fillRule="evenodd" />
                                        <path d="m147.3 352.58v0.16h-0.8" fillRule="evenodd" />
                                        <path d="m146.5 352.74v-3.36z" fillRule="evenodd" />
                                        <path d="m146.5 349.38v3.36" fillRule="evenodd" />
                                        <path d="m146.5 352.74v-3.36z" fillRule="evenodd" />
                                        <path d="m146.5 352.74v-3.36z" fillRule="evenodd" />
                                        <path d="m146.5 349.38-34.56 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m146.5 349.38v3.36h-34.56" fillRule="evenodd" />
                                        <path d="m111.94 349.38-1.76 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m111.94 349.38v3.36h-1.76" fillRule="evenodd" />
                                        <path d="m146.5 388.74-36 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m146.5 388.74v0.64h-36" fillRule="evenodd" />
                                        <path d="m110.5 388.74-0.32 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m110.5 388.74v0.64h-0.32" fillRule="evenodd" />
                                        <path d="m147.3 352.74-0.8 93.12v-93.12" fillRule="evenodd" />
                                        <path d="m147.3 352.74v93.12h-0.8" fillRule="evenodd" />
                                        <path d="m146.5 435.78-36.16 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m146.5 435.78v0.64h-36.16" fillRule="evenodd" />
                                        <path d="m110.34 435.78-0.16 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m110.34 435.78v0.64h-0.16" fillRule="evenodd" />
                                        <path d="m110.18 405.38-3.36 42.56v-42.56" fillRule="evenodd" />
                                        <path d="m110.18 405.38v42.56h-3.36" fillRule="evenodd" />
                                        <path d="m110.18 349.38-3.36 49.28v-49.28" fillRule="evenodd" />
                                        <path d="m110.18 349.38v49.28h-3.36" fillRule="evenodd" />
                                        <path d="m107.62 344.42-0.8 4.96v-4.96" fillRule="evenodd" />
                                        <path d="m107.62 344.42v4.96h-0.8" fillRule="evenodd" />
                                        <path d="m107.62 325.86-0.8 12v-12" fillRule="evenodd" />
                                        <path d="m107.62 325.86v12h-0.8" fillRule="evenodd" />
                                        <path d="m107.62 307.3-0.8 12v-12" fillRule="evenodd" />
                                        <path d="m107.62 307.3v12h-0.8" fillRule="evenodd" />
                                        <path d="m107.62 288.58-0.8 12v-12" fillRule="evenodd" />
                                        <path d="m107.62 288.58v12h-0.8" fillRule="evenodd" />
                                        <path d="m107.62 257.38-0.8 24.64v-24.64" fillRule="evenodd" />
                                        <path d="m107.62 257.38v24.64h-0.8" fillRule="evenodd" />
                                        <path d="m308.74 352.58-3.36 94.56v-94.56" fillRule="evenodd" />
                                        <path d="m308.74 352.58v94.56h-3.36" fillRule="evenodd" />
                                        <path d="m350.66 426.98-3.36 23.04v-23.04" fillRule="evenodd" />
                                        <path d="m350.66 426.98v23.04h-3.36" fillRule="evenodd" />
                                        <path d="m388.42 434.34-3.52 15.68v-15.68" fillRule="evenodd" />
                                        <path d="m388.42 434.34v15.68h-3.52" fillRule="evenodd" />
                                        <path d="m388.42 430.98-4.64 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m388.42 430.98v3.36h-4.64" fillRule="evenodd" />
                                        <path d="m377.22 430.98-13.12 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m377.22 430.98v3.36h-13.12" fillRule="evenodd" />
                                        <path d="m364.1 430.98-13.44 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m364.1 430.98v3.36h-13.44" fillRule="evenodd" />
                                        <path d="m347.14 412.58-38.4 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m347.14 412.58v0.8h-38.4" fillRule="evenodd" />
                                        <path d="m350.66 424.9-0.64 2.08v-2.08" fillRule="evenodd" />
                                        <path d="m350.66 424.9v2.08h-0.64" fillRule="evenodd" />
                                        <path d="m350.66 416.9-0.64 2.08v-2.08" fillRule="evenodd" />
                                        <path d="m350.66 416.9v2.08h-0.64" fillRule="evenodd" />
                                        <path d="m350.66 343.62-3.36 4.16v-4.16" fillRule="evenodd" />
                                        <path d="m350.66 343.62v4.16h-3.36" fillRule="evenodd" />
                                        <path d="m350.02 367.62-41.28 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m350.02 367.62v0.64h-41.28" fillRule="evenodd" />
                                        <path d="m350.5 384.58-0.48 3.04v-3.04" fillRule="evenodd" />
                                        <path d="m350.5 384.58v3.04h-0.48" fillRule="evenodd" />
                                        <path d="m350.02 384.58-2.88 3.04v-3.04" fillRule="evenodd" />
                                        <path d="m350.02 384.58v3.04h-2.88" fillRule="evenodd" />
                                        <path d="m350.5 412.58-3.36 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m350.5 412.58v4.32h-3.36" fillRule="evenodd" />
                                        <path d="m385.54 426.98-0.64 4v-4" fillRule="evenodd" />
                                        <path d="m385.54 426.98v4h-0.64" fillRule="evenodd" />
                                        <path d="m409.54 426.98-10.08 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m409.54 426.98v0.64h-10.08" fillRule="evenodd" />
                                        <path d="m393.54 426.98-8 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m393.54 426.98v0.64h-8" fillRule="evenodd" />
                                        <path d="m350.66 401.7v-14.08z" fillRule="evenodd" />
                                        <path d="m350.66 412.58v-4.96z" fillRule="evenodd" />
                                        <path d="m350.66 412.58" fillRule="evenodd" />
                                        <path d="m350.66 407.62-0.64 4.96v-4.96" fillRule="evenodd" />
                                        <path d="m350.66 407.62v4.96h-0.64" fillRule="evenodd" />
                                        <path d="m350.66 387.62-0.64 14.08v-14.08" fillRule="evenodd" />
                                        <path d="m350.66 387.62v14.08h-0.64" fillRule="evenodd" />
                                        <path d="m350.66 365.06-0.64 19.52v-19.52" fillRule="evenodd" />
                                        <path d="m350.66 365.06v19.52h-0.64" fillRule="evenodd" />
                                        <path d="m350.66 347.78-0.64 10.72v-10.72" fillRule="evenodd" />
                                        <path d="m350.66 347.78v10.72h-0.64" fillRule="evenodd" />
                                        <path d="m305.38 352.58v-3.36z" fillRule="evenodd" />
                                        <path d="m305.38 349.22-158.08 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m305.38 349.22v3.36h-158.08" fillRule="evenodd" />
                                        <path d="m147.3 352.58v-3.36z" fillRule="evenodd" />
                                        <path d="m147.3 352.58v-3.36z" fillRule="evenodd" />
                                        <path d="m413.06 442.82-0.64 10.56v-10.56" fillRule="evenodd" />
                                        <path d="m413.06 442.82v10.56h-0.64" fillRule="evenodd" />
                                        <path d="m413.06 422.82-0.64 8.64v-8.64" fillRule="evenodd" />
                                        <path d="m413.06 422.82v8.64h-0.64" fillRule="evenodd" />
                                        <path d="m413.06 404.26-0.64 7.2v-7.2" fillRule="evenodd" />
                                        <path d="m413.06 404.26v7.2h-0.64" fillRule="evenodd" />
                                        <path d="m413.06 385.54-0.64 7.36v-7.36" fillRule="evenodd" />
                                        <path d="m413.06 385.54v7.36h-0.64" fillRule="evenodd" />
                                        <path d="m413.06 365.7-0.64 8.48v-8.48" fillRule="evenodd" />
                                        <path d="m413.06 365.7v8.48h-0.64" fillRule="evenodd" />
                                        <path d="m413.06 340.26-0.64 14.08v-14.08" fillRule="evenodd" />
                                        <path d="m413.06 340.26v14.08h-0.64" fillRule="evenodd" />
                                        <path d="m412.42 443.3-2.88 10.08v-10.08" fillRule="evenodd" />
                                        <path d="m412.42 443.3v10.08h-2.88" fillRule="evenodd" />
                                        <path d="m412.42 423.3-2.88 7.68v-7.68" fillRule="evenodd" />
                                        <path d="m412.42 423.3v7.68h-2.88" fillRule="evenodd" />
                                        <path d="m412.42 404.74-2.88 6.24v-6.24" fillRule="evenodd" />
                                        <path d="m412.42 404.74v6.24h-2.88" fillRule="evenodd" />
                                        <path d="m412.42 386.02-2.88 6.4v-6.4" fillRule="evenodd" />
                                        <path d="m412.42 386.02v6.4h-2.88" fillRule="evenodd" />
                                        <path d="m412.42 366.02-2.88 7.84v-7.84" fillRule="evenodd" />
                                        <path d="m412.42 366.02v7.84h-2.88" fillRule="evenodd" />
                                        <path d="m412.42 340.26-2.88 13.6v-13.6" fillRule="evenodd" />
                                        <path d="m412.42 340.26v13.6h-2.88" fillRule="evenodd" />
                                        <path d="m409.54 450.02-100.8 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m409.54 450.02v3.36h-100.8" fillRule="evenodd" />
                                        <path d="m409.54 340.26-39.2 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m409.54 340.26v3.36h-39.2" fillRule="evenodd" />
                                        <path d="m370.34 340.26-0.48 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m370.34 340.26v0.64h-0.48" fillRule="evenodd" />
                                        <path d="m358.5 340.26-0.32 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m358.5 340.26v0.64h-0.32" fillRule="evenodd" />
                                        <path d="m358.18 340.26-23.68 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m358.18 340.26v3.36h-23.68" fillRule="evenodd" />
                                        <path d="m334.5 340.26-0.48 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m334.5 340.26v0.64h-0.48" fillRule="evenodd" />
                                        <path d="m322.66 340.26-0.48 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m322.66 340.26v0.64h-0.48" fillRule="evenodd" />
                                        <path d="m322.18 340.26-13.44 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m322.18 340.26v3.36h-13.44" fillRule="evenodd" />
                                        <path d="m308.74 340.26-3.36 12.32v-12.32" fillRule="evenodd" />
                                        <path d="m308.74 340.26v12.32h-3.36" fillRule="evenodd" />
                                        <path d="m308.74 447.14-3.36 6.24v-6.24" fillRule="evenodd" />
                                        <path d="m308.74 447.14v6.24h-3.36" fillRule="evenodd" />
                                        <path d="m305.22 448.42-0.16 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m305.22 448.42v5.28h-0.16" fillRule="evenodd" />
                                        <path d="m413.06 453.54-107.84 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m413.06 453.54v0.16h-107.84" fillRule="evenodd" />
                                        <path d="m413.22 442.82-0.16 10.88v-10.88" fillRule="evenodd" />
                                        <path d="m413.22 442.82v10.88h-0.16" fillRule="evenodd" />
                                        <path d="m413.22 422.82-0.16 8.64v-8.64" fillRule="evenodd" />
                                        <path d="m413.22 422.82v8.64h-0.16" fillRule="evenodd" />
                                        <path d="m413.22 404.26-0.16 7.2v-7.2" fillRule="evenodd" />
                                        <path d="m413.22 404.26v7.2h-0.16" fillRule="evenodd" />
                                        <path d="m413.22 385.54-0.16 7.36v-7.36" fillRule="evenodd" />
                                        <path d="m413.22 385.54v7.36h-0.16" fillRule="evenodd" />
                                        <path d="m413.22 365.7-0.16 8.48v-8.48" fillRule="evenodd" />
                                        <path d="m413.22 365.7v8.48h-0.16" fillRule="evenodd" />
                                        <path d="m413.22 340.26-0.16 14.08v-14.08" fillRule="evenodd" />
                                        <path d="m413.22 340.26v14.08h-0.16" fillRule="evenodd" />
                                        <path d="m413.22 340.1-43.36 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m413.22 340.1v0.16h-43.36" fillRule="evenodd" />
                                        <path d="m358.5 340.1-24.48 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m358.5 340.1v0.16h-24.48" fillRule="evenodd" />
                                        <path d="m322.66 340.1-17.44 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m322.66 340.1v0.16h-17.44" fillRule="evenodd" />
                                        <path d="m305.22 340.1-0.16 9.12v-9.12" fillRule="evenodd" />
                                        <path d="m305.22 340.1v9.12h-0.16" fillRule="evenodd" />
                                        <path d="m147.3 352.58-0.8 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m305.06 352.58-157.76 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m305.06 352.58v0.16h-157.76" fillRule="evenodd" />
                                        <path d="m146.5 352.74" fillRule="evenodd" />
                                        <path d="m146.5 352.74v-0.16z" fillRule="evenodd" />
                                        <path d="m146.5 352.74v-0.16z" fillRule="evenodd" />
                                        <path d="m409.54 409.7-13.92 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m409.54 409.7v0.64h-13.92" fillRule="evenodd" />
                                        <path d="m395.62 409.7-9.76 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m395.62 409.7v0.64h-9.76" fillRule="evenodd" />
                                        <path d="m379.78 409.7-8.64 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m379.78 409.7v0.64h-8.64" fillRule="evenodd" />
                                        <path d="m371.78 386.18-0.64 23.52v-23.52" fillRule="evenodd" />
                                        <path d="m371.78 386.18v23.52h-0.64" fillRule="evenodd" />
                                        <path d="m371.78 355.94-0.64 24.16v-24.16" fillRule="evenodd" />
                                        <path d="m371.78 355.94v24.16h-0.64" fillRule="evenodd" />
                                        <path d="m374.66 355.3-10.56 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m374.66 355.3v0.64h-10.56" fillRule="evenodd" />
                                        <path d="m364.1 355.3-0.48 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m364.1 355.3v0.64h-0.48" fillRule="evenodd" />
                                        <path d="m357.54 355.3-6.88 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m357.54 355.3v0.64h-6.88" fillRule="evenodd" />
                                        <path d="m374.66 343.62-0.64 11.68v-11.68" fillRule="evenodd" />
                                        <path d="m374.66 343.62v11.68h-0.64" fillRule="evenodd" />
                                        <path d="m409.54 389.38-37.76 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m409.54 389.38v0.64h-37.76" fillRule="evenodd" />
                                        <path d="m118.5 842.66-7.04 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m118.5 842.66v3.36h-7.04" fillRule="evenodd" />
                                        <path d="m137.22 842.66-4.48 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m137.22 842.66v3.36h-4.48" fillRule="evenodd" />
                                        <path d="m155.78 842.66-4.32 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m155.78 842.66v3.36h-4.32" fillRule="evenodd" />
                                        <path d="m174.34 842.66-4.32 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m174.34 842.66v3.36h-4.32" fillRule="evenodd" />
                                        <path d="m193.06 842.66-4.48 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m193.06 842.66v3.36h-4.48" fillRule="evenodd" />
                                        <path d="m211.62 842.66-4.32 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m211.62 842.66v3.36h-4.32" fillRule="evenodd" />
                                        <path d="m230.34 842.66-4.48 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m230.34 842.66v3.36h-4.48" fillRule="evenodd" />
                                        <path d="m248.9 842.66-4.32 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m248.9 842.66v3.36h-4.32" fillRule="evenodd" />
                                        <path d="m267.46 842.66-4.32 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m267.46 842.66v3.36h-4.32" fillRule="evenodd" />
                                        <path d="m286.18 842.66-4.48 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m286.18 842.66v3.36h-4.48" fillRule="evenodd" />
                                        <path d="m304.74 842.66-3.68 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m304.74 842.66v3.36h-3.68" fillRule="evenodd" />
                                        <path d="m301.06 842.66-0.64 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m301.06 842.66v3.36h-0.64" fillRule="evenodd" />
                                        <path d="m323.46 842.66-4.48 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m323.46 842.66v3.36h-4.48" fillRule="evenodd" />
                                        <path d="m342.02 842.66-4.32 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m342.02 842.66v3.36h-4.32" fillRule="evenodd" />
                                        <path d="m360.74 842.66-4.48 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m360.74 842.66v3.36h-4.48" fillRule="evenodd" />
                                        <path d="m379.3 842.66-4.48 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m379.3 842.66v3.36h-4.48" fillRule="evenodd" />
                                        <path d="m397.86 842.66-4.32 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m397.86 842.66v3.36h-4.32" fillRule="evenodd" />
                                        <path d="m416.58 846.02v-3.36z" fillRule="evenodd" />
                                        <path d="m416.58 842.66-4.48 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m416.58 842.66v3.36h-4.48" fillRule="evenodd" />
                                        <path d="m435.14 842.66-4.32 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m435.14 842.66v3.36h-4.32" fillRule="evenodd" />
                                        <path d="m453.54 842.66-4.16 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m453.54 842.66v3.36h-4.16" fillRule="evenodd" />
                                        <path d="m118.5 846.02-6.56 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m118.5 846.02v0.16h-6.56" fillRule="evenodd" />
                                        <path d="m111.94 846.02-0.32 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m111.94 846.02v0.16h-0.32" fillRule="evenodd" />
                                        <path d="m111.62 846.02" fillRule="evenodd" />
                                        <path d="m111.62 846.02" fillRule="evenodd" />
                                        <path d="m111.62 846.18v-0.16z" fillRule="evenodd" />
                                        <path d="m137.22 846.02-4.48 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m137.22 846.02v0.16h-4.48" fillRule="evenodd" />
                                        <path d="m155.78 846.02-4.32 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m155.78 846.02v0.16h-4.32" fillRule="evenodd" />
                                        <path d="m174.34 846.02-4.32 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m174.34 846.02v0.16h-4.32" fillRule="evenodd" />
                                        <path d="m193.06 846.02-4.48 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m193.06 846.02v0.16h-4.48" fillRule="evenodd" />
                                        <path d="m211.62 846.02-4.32 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m211.62 846.02v0.16h-4.32" fillRule="evenodd" />
                                        <path d="m225.86 846.18v-0.16z" fillRule="evenodd" />
                                        <path d="m230.34 846.02-4.48 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m230.34 846.02v0.16h-4.48" fillRule="evenodd" />
                                        <path d="m248.9 846.02-4.32 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m248.9 846.02v0.16h-4.32" fillRule="evenodd" />
                                        <path d="m267.46 846.02-4.32 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m267.46 846.02v0.16h-4.32" fillRule="evenodd" />
                                        <path d="m286.18 846.02-4.48 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m286.18 846.02v0.16h-4.48" fillRule="evenodd" />
                                        <path d="m304.74 846.02-4.32 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m304.74 846.02v0.16h-4.32" fillRule="evenodd" />
                                        <path d="m323.46 846.02-4.48 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m323.46 846.02v0.16h-4.48" fillRule="evenodd" />
                                        <path d="m342.02 846.02-4.32 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m342.02 846.02v0.16h-4.32" fillRule="evenodd" />
                                        <path d="m360.74 846.02-4.48 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m360.74 846.02v0.16h-4.48" fillRule="evenodd" />
                                        <path d="m379.3 846.02-4.48 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m379.3 846.02v0.16h-4.48" fillRule="evenodd" />
                                        <path d="m397.86 846.18v-0.16z" fillRule="evenodd" />
                                        <path d="m397.86 846.02-2.24 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m397.86 846.02v0.16h-2.24" fillRule="evenodd" />
                                        <path d="m395.62 846.02-2.08 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m395.62 846.02v0.16h-2.08" fillRule="evenodd" />
                                        <path d="m416.58 846.02-4.48 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m416.58 846.02v0.16h-4.48" fillRule="evenodd" />
                                        <path d="m435.14 846.02-4.32 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m435.14 846.02v0.16h-4.32" fillRule="evenodd" />
                                        <path d="m455.62 846.02-2.08 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m455.62 846.02v0.16h-2.08" fillRule="evenodd" />
                                        <path d="m453.54 846.02-4.16 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m453.54 846.02v0.16h-4.16" fillRule="evenodd" />
                                        <path d="m230.34 734.98-2.08 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m230.34 734.98v3.36h-2.08" fillRule="evenodd" />
                                        <path d="m228.26 734.98-0.16 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m228.26 734.98v3.36h-0.16" fillRule="evenodd" />
                                        <path d="m249.06 734.98-4.48 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m249.06 734.98v3.36h-4.48" fillRule="evenodd" />
                                        <path d="m267.62 734.98-2.08 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m267.62 734.98v3.36h-2.08" fillRule="evenodd" />
                                        <path d="m265.54 734.98-2.24 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m265.54 734.98v3.36h-2.24" fillRule="evenodd" />
                                        <path d="m286.34 734.98-4.48 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m286.34 734.98v3.36h-4.48" fillRule="evenodd" />
                                        <path d="m304.9 734.98-3.84 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m304.9 734.98v3.36h-3.84" fillRule="evenodd" />
                                        <path d="m301.06 734.98-0.48 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m301.06 734.98v3.36h-0.48" fillRule="evenodd" />
                                        <path d="m323.62 734.98-4.48 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m323.62 734.98v3.36h-4.48" fillRule="evenodd" />
                                        <path d="m342.18 734.98-4.48 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m342.18 734.98v3.36h-4.48" fillRule="evenodd" />
                                        <path d="m360.74 738.34v-3.36z" fillRule="evenodd" />
                                        <path d="m360.74 734.98-0.32 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m360.74 734.98v3.36h-0.32" fillRule="evenodd" />
                                        <path d="m360.42 734.98-4 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m360.42 734.98v3.36h-4" fillRule="evenodd" />
                                        <path d="m379.46 734.98-4.48 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m379.46 734.98v3.36h-4.48" fillRule="evenodd" />
                                        <path d="m398.02 738.34v-3.36z" fillRule="evenodd" />
                                        <path d="m398.02 734.98-4.32 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m398.02 734.98v3.36h-4.32" fillRule="evenodd" />
                                        <path d="m416.74 734.98-4.48 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m416.74 734.98v3.36h-4.48" fillRule="evenodd" />
                                        <path d="m435.3 734.98-4.32 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m435.3 734.98v3.36h-4.32" fillRule="evenodd" />
                                        <path d="m452.26 736.58-0.16 1.76v-3.36" fillRule="evenodd" />
                                        <path d="m452.26 736.58v1.76h-0.16" fillRule="evenodd" />
                                        <path d="m452.1 734.98-2.56 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m452.1 734.98v3.36h-2.56" fillRule="evenodd" />
                                        <path d="m230.34 734.82-2.08 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m230.34 734.82v0.16h-2.08" fillRule="evenodd" />
                                        <path d="m228.26 734.82-1.92 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m228.26 734.82v0.16h-1.92" fillRule="evenodd" />
                                        <path d="m244.58 734.98v-0.16z" fillRule="evenodd" />
                                        <path d="m249.06 734.82-4.48 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m249.06 734.82v0.16h-4.48" fillRule="evenodd" />
                                        <path d="m267.62 734.82-4.32 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m267.62 734.82v0.16h-4.32" fillRule="evenodd" />
                                        <path d="m286.34 734.82-4.48 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m286.34 734.82v0.16h-4.48" fillRule="evenodd" />
                                        <path d="m304.9 734.82-3.84 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m304.9 734.82v0.16h-3.84" fillRule="evenodd" />
                                        <path d="m301.06 734.82-0.48 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m301.06 734.82v0.16h-0.48" fillRule="evenodd" />
                                        <path d="m323.62 734.82-4.48 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m323.62 734.82v0.16h-4.48" fillRule="evenodd" />
                                        <path d="m342.18 734.82-4.32 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m342.18 734.82v0.16h-4.32" fillRule="evenodd" />
                                        <path d="m360.74 734.82-4.32 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m360.74 734.82v0.16h-4.32" fillRule="evenodd" />
                                        <path d="m379.46 734.82-4.48 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m379.46 734.82v0.16h-4.48" fillRule="evenodd" />
                                        <path d="m398.02 734.82-4.32 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m398.02 734.82v0.16h-4.32" fillRule="evenodd" />
                                        <path d="m416.74 734.82-4.48 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m416.74 734.82v0.16h-4.48" fillRule="evenodd" />
                                        <path d="m435.3 734.82-4.32 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m435.3 734.82v0.16h-4.32" fillRule="evenodd" />
                                        <path d="m452.1 734.98v-0.16z" fillRule="evenodd" />
                                        <path d="m452.1 734.82-2.56 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m452.1 734.82v0.16h-2.56" fillRule="evenodd" />
                                        <path d="m228.26 778.34-2.24 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m228.26 778.34v3.36h-2.24" fillRule="evenodd" />
                                        <path d="m211.78 778.34-4.32 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m211.78 778.34v3.36h-4.32" fillRule="evenodd" />
                                        <path d="m193.22 778.34-4.48 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m193.22 778.34v3.36h-4.48" fillRule="evenodd" />
                                        <path d="m174.5 778.34-4.32 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m174.5 778.34v3.36h-4.32" fillRule="evenodd" />
                                        <path d="m155.94 778.34-57.44 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m155.94 778.34v3.36h-57.44" fillRule="evenodd" />
                                        <path d="m228.1 778.18-2.08 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m228.1 778.18v0.16h-2.08" fillRule="evenodd" />
                                        <path d="m211.78 778.18-4.32 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m211.78 778.18v0.16h-4.32" fillRule="evenodd" />
                                        <path d="m193.22 778.18-4.48 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m193.22 778.18v0.16h-4.48" fillRule="evenodd" />
                                        <path d="m174.5 778.18-4.32 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m174.5 778.18v0.16h-4.32" fillRule="evenodd" />
                                        <path d="m155.94 778.18-10.72 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m155.94 778.18v0.16h-10.72" fillRule="evenodd" />
                                        <path d="m98.501 28.742-1.6 3.52v-3.52" fillRule="evenodd" />
                                        <path d="m98.501 28.742v3.52h-1.6" fillRule="evenodd" />
                                        <path d="m96.901 32.262v-3.52z" fillRule="evenodd" />
                                        <path d="m96.901 32.262v-3.52z" fillRule="evenodd" />
                                        <path d="m82.661 28.742-2.24 3.52v-3.52" fillRule="evenodd" />
                                        <path d="m82.661 28.742v3.52h-2.24" fillRule="evenodd" />
                                        <path d="m80.421 28.742-1.44 3.52v-3.52" fillRule="evenodd" />
                                        <path d="m80.421 28.742v3.52h-1.44" fillRule="evenodd" />
                                        <path d="m78.981 28.742-45.92 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m78.981 28.742v4.32h-45.92" fillRule="evenodd" />
                                        <path d="m33.061 28.742-12.8 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m33.061 28.742v4.32h-12.8" fillRule="evenodd" />
                                        <path d="m96.901 28.742h1.44z" fillRule="evenodd" />
                                        <path d="m96.901 28.742h1.44z" fillRule="evenodd" />
                                        <path d="m17.381 28.742h65.28z" fillRule="evenodd" />
                                        <path d="m17.381 28.742h65.28z" fillRule="evenodd" />
                                        <path d="m16.101 28.742h1.28z" fillRule="evenodd" />
                                        <path d="m16.101 28.742h1.28z" fillRule="evenodd" />
                                        <path d="m145.22 15.302-45.76 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m145.22 15.302v3.36h-45.76" fillRule="evenodd" />
                                        <path d="m99.461 15.302-0.96 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m99.461 15.302v3.36h-0.96" fillRule="evenodd" />
                                        <path d="m145.22 143.3-3.36 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m145.22 143.3v4.32h-3.36" fillRule="evenodd" />
                                        <path d="m145.22 180.58-3.36 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m145.22 180.58v4.32h-3.36" fillRule="evenodd" />
                                        <path d="m145.22 46.182-0.48 8.32v-8.32" fillRule="evenodd" />
                                        <path d="m145.22 46.182v8.32h-0.48" fillRule="evenodd" />
                                        <path d="m144.74 46.662-1.28 7.84v-7.84" fillRule="evenodd" />
                                        <path d="m144.74 46.662v7.84h-1.28" fillRule="evenodd" />
                                        <path d="m143.46 46.662-1.6 7.84v-7.84" fillRule="evenodd" />
                                        <path d="m143.46 46.662v7.84h-1.6" fillRule="evenodd" />
                                        <path d="m145.22 68.742-1.76 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m145.22 68.742v4.48h-1.76" fillRule="evenodd" />
                                        <path d="m143.46 68.742-1.6 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m143.46 68.742v4.48h-1.6" fillRule="evenodd" />
                                        <path d="m145.22 87.462-3.36 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m145.22 87.462v4.32h-3.36" fillRule="evenodd" />
                                        <path d="m145.22 254.98-3.36 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m145.22 254.98v0.64h-3.36" fillRule="evenodd" />
                                        <path d="m145.22 236.42-3.36 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m145.22 236.42v4.32h-3.36" fillRule="evenodd" />
                                        <path d="m145.22 31.462-0.48 7.52v-7.52" fillRule="evenodd" />
                                        <path d="m145.22 31.462v7.52h-0.48" fillRule="evenodd" />
                                        <path d="m144.74 31.942-1.28 6.56v-6.56" fillRule="evenodd" />
                                        <path d="m144.74 31.942v6.56h-1.28" fillRule="evenodd" />
                                        <path d="m143.46 31.942-1.6 6.56v-6.56" fillRule="evenodd" />
                                        <path d="m143.46 31.942v6.56h-1.6" fillRule="evenodd" />
                                        <path d="m145.22 217.86-3.36 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m145.22 217.86v4.32h-3.36" fillRule="evenodd" />
                                        <path d="m145.22 106.02-3.36 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m145.22 106.02v4.32h-3.36" fillRule="evenodd" />
                                        <path d="m145.22 199.14-3.36 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m145.22 199.14v4.48h-3.36" fillRule="evenodd" />
                                        <path d="m145.22 161.86-3.36 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m145.22 161.86v4.48h-3.36" fillRule="evenodd" />
                                        <path d="m145.22 124.58-3.36 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m145.22 124.58v4.48h-3.36" fillRule="evenodd" />
                                        <path d="m145.22 18.662-0.48 5.6v-5.6" fillRule="evenodd" />
                                        <path d="m145.22 18.662v5.6h-0.48" fillRule="evenodd" />
                                        <path d="m144.74 18.662-2.88 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m144.74 18.662v5.28h-2.88" fillRule="evenodd" />
                                        <path d="m101.86 45.862-3.36 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m101.86 45.862v4.32h-3.36" fillRule="evenodd" />
                                        <path d="m101.86 18.662-3.36 20.48v-20.48" fillRule="evenodd" />
                                        <path d="m101.86 18.662v20.48h-3.36" fillRule="evenodd" />
                                        <path d="m145.38 15.302-0.16 8.96v-8.96" fillRule="evenodd" />
                                        <path d="m145.38 15.302v8.96h-0.16" fillRule="evenodd" />
                                        <path d="m145.38 68.742-0.16 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m145.38 68.742v4.48h-0.16" fillRule="evenodd" />
                                        <path d="m145.38 143.3-0.16 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m145.38 143.3v4.32h-0.16" fillRule="evenodd" />
                                        <path d="m145.38 180.58-0.16 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m145.38 180.58v4.32h-0.16" fillRule="evenodd" />
                                        <path d="m145.38 46.182-0.16 8.32v-8.32" fillRule="evenodd" />
                                        <path d="m145.38 46.182v8.32h-0.16" fillRule="evenodd" />
                                        <path d="m145.38 217.86-0.16 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m145.38 217.86v4.32h-0.16" fillRule="evenodd" />
                                        <path d="m145.38 31.462-0.16 7.52v-7.52" fillRule="evenodd" />
                                        <path d="m145.38 31.462v7.52h-0.16" fillRule="evenodd" />
                                        <path d="m145.38 199.14-0.16 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m145.38 199.14v4.48h-0.16" fillRule="evenodd" />
                                        <path d="m145.38 236.42-0.16 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m145.38 236.42v4.32h-0.16" fillRule="evenodd" />
                                        <path d="m145.38 161.86-0.16 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m145.38 161.86v4.48h-0.16" fillRule="evenodd" />
                                        <path d="m145.38 254.98-0.16 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m145.38 254.98v0.64h-0.16" fillRule="evenodd" />
                                        <path d="m145.38 87.462-0.16 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m145.38 87.462v4.32h-0.16" fillRule="evenodd" />
                                        <path d="m145.38 106.02-0.16 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m145.38 106.02v4.32h-0.16" fillRule="evenodd" />
                                        <path d="m145.38 124.58-0.16 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m145.38 124.58v4.48h-0.16" fillRule="evenodd" />
                                        <path d="m145.38 15.142-45.92 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m145.38 15.142v0.16h-45.92" fillRule="evenodd" />
                                        <path d="m99.461 15.142-0.96 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m99.461 15.142v0.16h-0.96" fillRule="evenodd" />
                                        <path d="m98.501 15.142-0.16 13.6v-13.6" fillRule="evenodd" />
                                        <path d="m98.501 15.142v13.6h-0.16" fillRule="evenodd" />
                                        <path d="m99.301 92.102-0.8 13.92v-13.92" fillRule="evenodd" />
                                        <path d="m99.301 92.102v13.92h-0.8" fillRule="evenodd" />
                                        <path d="m99.301 110.66-0.16 2.08v-2.08" fillRule="evenodd" />
                                        <path d="m99.301 110.66v2.08h-0.16" fillRule="evenodd" />
                                        <path d="m99.301 122.66-0.8 1.92v-1.92" fillRule="evenodd" />
                                        <path d="m99.301 122.66v1.92h-0.8" fillRule="evenodd" />
                                        <path d="m99.141 110.66-0.64 2.08v-2.08" fillRule="evenodd" />
                                        <path d="m99.141 110.66v2.08h-0.64" fillRule="evenodd" />
                                        <path d="m99.301 129.38-0.8 13.92v-13.92" fillRule="evenodd" />
                                        <path d="m99.301 129.38v13.92h-0.8" fillRule="evenodd" />
                                        <path d="m99.301 166.5-0.8 14.08v-14.08" fillRule="evenodd" />
                                        <path d="m99.301 166.5v14.08h-0.8" fillRule="evenodd" />
                                        <path d="m99.301 159.94-0.8 1.92v-1.92" fillRule="evenodd" />
                                        <path d="m99.301 159.94v1.92h-0.8" fillRule="evenodd" />
                                        <path d="m99.301 147.94-0.8 1.92v-1.92" fillRule="evenodd" />
                                        <path d="m99.301 147.94v1.92h-0.8" fillRule="evenodd" />
                                        <path d="m99.301 203.78-0.8 3.52v-3.52" fillRule="evenodd" />
                                        <path d="m99.301 203.78v3.52h-0.8" fillRule="evenodd" />
                                        <path d="m99.301 197.22-0.8 1.92v-1.92" fillRule="evenodd" />
                                        <path d="m99.301 197.22v1.92h-0.8" fillRule="evenodd" />
                                        <path d="m99.301 185.22-0.8 1.92v-1.92" fillRule="evenodd" />
                                        <path d="m99.301 185.22v1.92h-0.8" fillRule="evenodd" />
                                        <path d="m99.301 222.5-0.8 13.92v-13.92" fillRule="evenodd" />
                                        <path d="m99.301 222.5v13.92h-0.8" fillRule="evenodd" />
                                        <path d="m99.301 207.3-0.8 10.56v-10.56" fillRule="evenodd" />
                                        <path d="m99.301 207.3v10.56h-0.8" fillRule="evenodd" />
                                        <path d="m99.301 73.382-0.8 14.08v-14.08" fillRule="evenodd" />
                                        <path d="m99.301 73.382v14.08h-0.8" fillRule="evenodd" />
                                        <path d="m99.301 253.06-0.8 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m99.301 253.06v4.32h-0.8" fillRule="evenodd" />
                                        <path d="m99.301 241.06-0.8 1.92v-1.92" fillRule="evenodd" />
                                        <path d="m99.301 241.06v1.92h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 315.62-0.48 13.92v-13.92" fillRule="evenodd" />
                                        <path d="m80.901 315.62v13.92h-0.48" fillRule="evenodd" />
                                        <path d="m80.901 278.34-0.64 13.92v-13.92" fillRule="evenodd" />
                                        <path d="m80.901 278.34v13.92h-0.64" fillRule="evenodd" />
                                        <path d="m80.901 259.62-0.64 4v-4" fillRule="evenodd" />
                                        <path d="m80.901 259.62v4h-0.64" fillRule="evenodd" />
                                        <path d="m80.901 352.74-0.8 16.32v-16.32" fillRule="evenodd" />
                                        <path d="m80.901 352.74v16.32h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 334.18-0.8 9.6v-9.6" fillRule="evenodd" />
                                        <path d="m80.901 334.18v9.6h-0.8" fillRule="evenodd" />
                                        <path d="m80.421 315.62-0.32 13.92v-13.92" fillRule="evenodd" />
                                        <path d="m80.421 315.62v13.92h-0.32" fillRule="evenodd" />
                                        <path d="m80.901 296.9-0.8 8.64v-8.64" fillRule="evenodd" />
                                        <path d="m80.901 296.9v8.64h-0.8" fillRule="evenodd" />
                                        <path d="m80.261 278.34-0.16 13.92v-13.92" fillRule="evenodd" />
                                        <path d="m80.261 278.34v13.92h-0.16" fillRule="evenodd" />
                                        <path d="m80.901 270.34-0.8 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m80.901 270.34v3.36h-0.8" fillRule="evenodd" />
                                        <path d="m80.261 259.62-0.16 4v-4" fillRule="evenodd" />
                                        <path d="m80.261 259.62v4h-0.16" fillRule="evenodd" />
                                        <path d="m80.901 505.54-0.48 13.92v-13.92" fillRule="evenodd" />
                                        <path d="m80.901 505.54v13.92h-0.48" fillRule="evenodd" />
                                        <path d="m80.901 468.26-0.48 13.92v-13.92" fillRule="evenodd" />
                                        <path d="m80.901 468.26v13.92h-0.48" fillRule="evenodd" />
                                        <path d="m80.901 449.54-0.48 14.08v-14.08" fillRule="evenodd" />
                                        <path d="m80.901 449.54v14.08h-0.48" fillRule="evenodd" />
                                        <path d="m80.901 428.58-0.48 16.32v-16.32" fillRule="evenodd" />
                                        <path d="m80.901 428.58v16.32h-0.48" fillRule="evenodd" />
                                        <path d="m80.901 524.1-0.8 13.92v-13.92" fillRule="evenodd" />
                                        <path d="m80.901 524.1v13.92h-0.8" fillRule="evenodd" />
                                        <path d="m80.421 505.54-0.32 13.92v-13.92" fillRule="evenodd" />
                                        <path d="m80.421 505.54v13.92h-0.32" fillRule="evenodd" />
                                        <path d="m80.901 488.9-0.8 11.84v-11.84" fillRule="evenodd" />
                                        <path d="m80.901 488.9v11.84h-0.8" fillRule="evenodd" />
                                        <path d="m80.421 468.26-0.32 13.92v-13.92" fillRule="evenodd" />
                                        <path d="m80.421 468.26v13.92h-0.32" fillRule="evenodd" />
                                        <path d="m80.421 449.54-0.32 14.08v-14.08" fillRule="evenodd" />
                                        <path d="m80.421 449.54v14.08h-0.32" fillRule="evenodd" />
                                        <path d="m80.421 428.58-0.32 16.32v-16.32" fillRule="evenodd" />
                                        <path d="m80.421 428.58v16.32h-0.32" fillRule="evenodd" />
                                        <path d="m80.901 65.222-0.48 10.24v-10.24" fillRule="evenodd" />
                                        <path d="m80.901 65.222v10.24h-0.48" fillRule="evenodd" />
                                        <path d="m80.901 92.102-0.8 4v-4" fillRule="evenodd" />
                                        <path d="m80.901 92.102v4h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 85.382-0.8 2.08v-2.08" fillRule="evenodd" />
                                        <path d="m80.901 85.382v2.08h-0.8" fillRule="evenodd" />
                                        <path d="m80.421 65.222-0.32 10.24v-10.24" fillRule="evenodd" />
                                        <path d="m80.421 65.222v10.24h-0.32" fillRule="evenodd" />
                                        <path d="m80.901 96.102-0.8 9.92v-9.92" fillRule="evenodd" />
                                        <path d="m80.901 96.102v9.92h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 129.38-0.8 1.92v-1.92" fillRule="evenodd" />
                                        <path d="m80.901 129.38v1.92h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 110.66-0.8 13.92v-13.92" fillRule="evenodd" />
                                        <path d="m80.901 110.66v13.92h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 147.94-0.8 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m80.901 147.94v0.16h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 141.22-0.8 2.08v-2.08" fillRule="evenodd" />
                                        <path d="m80.901 141.22v2.08h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 166.5-0.8 6.08v-6.08" fillRule="evenodd" />
                                        <path d="m80.901 166.5v6.08h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 148.1-0.8 13.76v-13.76" fillRule="evenodd" />
                                        <path d="m80.901 148.1v13.76h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 185.22-0.8 1.92v-1.92" fillRule="evenodd" />
                                        <path d="m80.901 185.22v1.92h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 172.58-0.8 8v-8" fillRule="evenodd" />
                                        <path d="m80.901 172.58v8h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 203.78-0.8 2.4v-2.4" fillRule="evenodd" />
                                        <path d="m80.901 203.78v2.4h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 197.22-0.8 1.92v-1.92" fillRule="evenodd" />
                                        <path d="m80.901 197.22v1.92h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 222.5-0.8 7.68v-7.68" fillRule="evenodd" />
                                        <path d="m80.901 222.5v7.68h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 206.18-0.8 11.68v-11.68" fillRule="evenodd" />
                                        <path d="m80.901 206.18v11.68h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 241.06-0.8 3.68v-3.68" fillRule="evenodd" />
                                        <path d="m80.901 241.06v3.68h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 230.18-0.8 6.24v-6.24" fillRule="evenodd" />
                                        <path d="m80.901 230.18v6.24h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 251.3-0.8 3.68v-3.68" fillRule="evenodd" />
                                        <path d="m80.901 251.3v3.68h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 53.702-0.8 7.36v-7.36" fillRule="evenodd" />
                                        <path d="m80.901 53.702v7.36h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 32.262-1.92 8.16v-8.16" fillRule="evenodd" />
                                        <path d="m80.901 32.262v8.16h-1.92" fillRule="evenodd" />
                                        <path d="m80.101 53.702-3.2 7.36v-7.36" fillRule="evenodd" />
                                        <path d="m80.101 53.702v7.36h-3.2" fillRule="evenodd" />
                                        <path d="m78.981 33.062-2.08 7.36v-7.36" fillRule="evenodd" />
                                        <path d="m78.981 33.062v7.36h-2.08" fillRule="evenodd" />
                                        <path d="m99.301 747.62-0.48 4.16v-4.16" fillRule="evenodd" />
                                        <path d="m99.301 747.62v4.16h-0.48" fillRule="evenodd" />
                                        <path d="m99.301 770.82-0.8 7.52v-7.52" fillRule="evenodd" />
                                        <path d="m99.301 770.82v7.52h-0.8" fillRule="evenodd" />
                                        <path d="m99.301 758.34-0.8 3.2v-3.2" fillRule="evenodd" />
                                        <path d="m99.301 758.34v3.2h-0.8" fillRule="evenodd" />
                                        <path d="m98.821 747.62-0.32 4.16v-4.16" fillRule="evenodd" />
                                        <path d="m98.821 747.62v4.16h-0.32" fillRule="evenodd" />
                                        <path d="m99.301 728.9-0.32 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m99.301 728.9v4.32h-0.32" fillRule="evenodd" />
                                        <path d="m99.301 739.78-0.8 3.2v-3.2" fillRule="evenodd" />
                                        <path d="m99.301 739.78v3.2h-0.8" fillRule="evenodd" />
                                        <path d="m98.981 728.9-0.48 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m98.981 728.9v4.32h-0.48" fillRule="evenodd" />
                                        <path d="m99.301 723.46-0.8 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m99.301 723.46v0.8h-0.8" fillRule="evenodd" />
                                        <path d="m99.301 710.34-0.8 13.12v-13.12" fillRule="evenodd" />
                                        <path d="m99.301 710.34v13.12h-0.8" fillRule="evenodd" />
                                        <path d="m99.301 691.78-0.8 13.92v-13.92" fillRule="evenodd" />
                                        <path d="m99.301 691.78v13.92h-0.8" fillRule="evenodd" />
                                        <path d="m99.301 673.06-0.8 14.08v-14.08" fillRule="evenodd" />
                                        <path d="m99.301 673.06v14.08h-0.8" fillRule="evenodd" />
                                        <path d="m99.301 659.3v-4.8z" fillRule="evenodd" />
                                        <path d="m99.301 659.3v-4.8z" fillRule="evenodd" />
                                        <path d="m99.301 666.02-0.8 2.4v-2.4" fillRule="evenodd" />
                                        <path d="m99.301 666.02v2.4h-0.8" fillRule="evenodd" />
                                        <path d="m99.301 654.5-0.8 4.8v-4.8" fillRule="evenodd" />
                                        <path d="m99.301 654.5v4.8h-0.8" fillRule="evenodd" />
                                        <path d="m99.301 647.78-0.8 2.08v-2.08" fillRule="evenodd" />
                                        <path d="m99.301 647.78v2.08h-0.8" fillRule="evenodd" />
                                        <path d="m99.301 635.78-0.8 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m99.301 635.78v5.28h-0.8" fillRule="evenodd" />
                                        <path d="m99.301 629.54-0.8 1.6v-1.6" fillRule="evenodd" />
                                        <path d="m99.301 629.54v1.6h-0.8" fillRule="evenodd" />
                                        <path d="m99.301 617.22-0.8 12.32v-12.32" fillRule="evenodd" />
                                        <path d="m99.301 617.22v12.32h-0.8" fillRule="evenodd" />
                                        <path d="m99.301 599.46-0.8 13.12v-13.12" fillRule="evenodd" />
                                        <path d="m99.301 599.46v13.12h-0.8" fillRule="evenodd" />
                                        <path d="m99.301 598.66-0.8 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m99.301 598.66v0.8h-0.8" fillRule="evenodd" />
                                        <path d="m99.301 593.22-0.8 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m99.301 593.22v0.8h-0.8" fillRule="evenodd" />
                                        <path d="m99.301 580.58-0.8 5.92v-5.92" fillRule="evenodd" />
                                        <path d="m99.301 580.58v5.92h-0.8" fillRule="evenodd" />
                                        <path d="m99.301 579.94-0.8 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m99.301 579.94v0.64h-0.8" fillRule="evenodd" />
                                        <path d="m99.301 561.38-0.8 13.92v-13.92" fillRule="evenodd" />
                                        <path d="m99.301 561.38v13.92h-0.8" fillRule="evenodd" />
                                        <path d="m80.741 792.74-0.32 6.56v-6.56" fillRule="evenodd" />
                                        <path d="m80.741 792.74v6.56h-0.32" fillRule="evenodd" />
                                        <path d="m80.421 792.74-0.48 6.56v-6.56" fillRule="evenodd" />
                                        <path d="m80.421 792.74v6.56h-0.48" fillRule="evenodd" />
                                        <path d="m80.741 784.9-0.8 1.12v-1.12" fillRule="evenodd" />
                                        <path d="m80.741 784.9v1.12h-0.8" fillRule="evenodd" />
                                        <path d="m80.741 766.18-0.8 14.08v-14.08" fillRule="evenodd" />
                                        <path d="m80.741 766.18v14.08h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 728.9-0.8 14.08v-14.08" fillRule="evenodd" />
                                        <path d="m80.901 728.9v14.08h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 758.34-0.8 3.2v-3.2" fillRule="evenodd" />
                                        <path d="m80.901 758.34v3.2h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 747.62-0.8 4.16v-4.16" fillRule="evenodd" />
                                        <path d="m80.901 747.62v4.16h-0.8" fillRule="evenodd" />
                                        <path d="m80.101 742.98v-14.08z" fillRule="evenodd" />
                                        <path d="m80.101 742.98v-14.08z" fillRule="evenodd" />
                                        <path d="m80.901 673.06-0.48 4.16v-4.16" fillRule="evenodd" />
                                        <path d="m80.901 673.06v4.16h-0.48" fillRule="evenodd" />
                                        <path d="m80.901 691.78-0.48 3.68v-3.68" fillRule="evenodd" />
                                        <path d="m80.901 691.78v3.68h-0.48" fillRule="evenodd" />
                                        <path d="m80.901 710.34-0.8 13.92v-13.92" fillRule="evenodd" />
                                        <path d="m80.901 710.34v13.92h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 702.18-0.8 3.52v-3.52" fillRule="evenodd" />
                                        <path d="m80.901 702.18v3.52h-0.8" fillRule="evenodd" />
                                        <path d="m80.421 691.78-0.32 3.68v-3.68" fillRule="evenodd" />
                                        <path d="m80.421 691.78v3.68h-0.32" fillRule="evenodd" />
                                        <path d="m80.901 683.94-0.8 3.2v-3.2" fillRule="evenodd" />
                                        <path d="m80.901 683.94v3.2h-0.8" fillRule="evenodd" />
                                        <path d="m80.421 673.06-0.32 4.16v-4.16" fillRule="evenodd" />
                                        <path d="m80.421 673.06v4.16h-0.32" fillRule="evenodd" />
                                        <path d="m80.901 617.22-0.48 13.92v-13.92" fillRule="evenodd" />
                                        <path d="m80.901 617.22v13.92h-0.48" fillRule="evenodd" />
                                        <path d="m80.901 654.5-0.8 13.92v-13.92" fillRule="evenodd" />
                                        <path d="m80.901 654.5v13.92h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 647.46-0.8 2.4v-2.4" fillRule="evenodd" />
                                        <path d="m80.901 647.46v2.4h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 635.78-0.8 4.96v-4.96" fillRule="evenodd" />
                                        <path d="m80.901 635.78v4.96h-0.8" fillRule="evenodd" />
                                        <path d="m80.421 617.22-0.32 13.92v-13.92" fillRule="evenodd" />
                                        <path d="m80.421 617.22v13.92h-0.32" fillRule="evenodd" />
                                        <path d="m80.901 598.66-0.8 13.92v-13.92" fillRule="evenodd" />
                                        <path d="m80.901 598.66v13.92h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 579.94-0.8 14.08v-14.08" fillRule="evenodd" />
                                        <path d="m80.901 579.94v14.08h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 573.86-0.8 1.44v-1.44" fillRule="evenodd" />
                                        <path d="m80.901 573.86v1.44h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 561.38-0.8 5.76v-5.76" fillRule="evenodd" />
                                        <path d="m80.901 561.38v5.76h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 542.66-0.8 14.08v-14.08" fillRule="evenodd" />
                                        <path d="m80.901 542.66v14.08h-0.8" fillRule="evenodd" />
                                        <path d="m99.301 540.26-0.8 11.04v-11.04" fillRule="evenodd" />
                                        <path d="m99.301 540.26v11.04h-0.8" fillRule="evenodd" />
                                        <path d="m477.86 779.94-0.96 1.6v-1.6" fillRule="evenodd" />
                                        <path d="m477.86 779.94v1.6h-0.96" fillRule="evenodd" />
                                        <path d="m476.9 778.18-5.12 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m476.9 778.18v3.36h-5.12" fillRule="evenodd" />
                                        <path d="m461.86 778.18-7.52 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m461.86 778.18v3.36h-7.52" fillRule="evenodd" />
                                        <path d="m244.42 780.9-6.4 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m244.42 780.9v0.8h-6.4" fillRule="evenodd" />
                                        <path d="m238.02 780.9-6.4 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m238.02 780.9v0.8h-6.4" fillRule="evenodd" />
                                        <path d="m262.98 780.9-4.16 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m262.98 780.9v0.8h-4.16" fillRule="evenodd" />
                                        <path d="m252.1 780.9-3.04 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m252.1 780.9v0.8h-3.04" fillRule="evenodd" />
                                        <path d="m281.7 780.9-14.08 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m281.7 780.9v0.8h-14.08" fillRule="evenodd" />
                                        <path d="m306.34 780.9-1.44 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m306.34 780.9v0.8h-1.44" fillRule="evenodd" />
                                        <path d="m300.26 780.9-2.08 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m300.26 780.9v0.8h-2.08" fillRule="evenodd" />
                                        <path d="m291.62 780.9-5.28 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m291.62 780.9v0.8h-5.28" fillRule="evenodd" />
                                        <path d="m324.74 780.9-1.12 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m324.74 780.9v0.8h-1.12" fillRule="evenodd" />
                                        <path d="m318.82 780.9-0.48 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m318.82 780.9v0.8h-0.48" fillRule="evenodd" />
                                        <path d="m311.62 780.9-4.48 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m311.62 780.9v0.8h-4.48" fillRule="evenodd" />
                                        <path d="m342.66 780.9-0.48 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m342.66 780.9v0.8h-0.48" fillRule="evenodd" />
                                        <path d="m337.54 780.9-1.92 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m337.54 780.9v0.8h-1.92" fillRule="evenodd" />
                                        <path d="m328.9 780.9-3.36 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m328.9 780.9v0.8h-3.36" fillRule="evenodd" />
                                        <path d="m356.1 780.9-3.04 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m356.1 780.9v0.8h-3.04" fillRule="evenodd" />
                                        <path d="m346.5 780.9-3.04 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m346.5 780.9v0.8h-3.04" fillRule="evenodd" />
                                        <path d="m373.86 780.9-0.16 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m373.86 780.9v0.8h-0.16" fillRule="evenodd" />
                                        <path d="m366.98 780.9-5.76 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m366.98 780.9v0.8h-5.76" fillRule="evenodd" />
                                        <path d="m393.38 780.9-13.92 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m393.38 780.9v0.8h-13.92" fillRule="evenodd" />
                                        <path d="m374.82 780.9-0.96 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m374.82 780.9v0.8h-0.96" fillRule="evenodd" />
                                        <path d="m417.38 780.9-0.64 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m417.38 780.9v0.8h-0.64" fillRule="evenodd" />
                                        <path d="m411.94 780.9-1.6 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m411.94 780.9v0.8h-1.6" fillRule="evenodd" />
                                        <path d="m403.62 780.9-4.8 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m403.62 780.9v0.8h-4.8" fillRule="evenodd" />
                                        <path d="m430.66 780.9-3.52 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m430.66 780.9v0.8h-3.52" fillRule="evenodd" />
                                        <path d="m427.14 780.9-9.76 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m427.14 780.9v0.8h-9.76" fillRule="evenodd" />
                                        <path d="m454.34 780.9-2.08 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m454.34 780.9v0.8h-2.08" fillRule="evenodd" />
                                        <path d="m452.26 780.9-4.32 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m452.26 780.9v0.8h-4.32" fillRule="evenodd" />
                                        <path d="m441.38 780.9-5.28 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m441.38 780.9v0.8h-5.28" fillRule="evenodd" />
                                        <path d="m145.38 255.62h10.88z" fillRule="evenodd" />
                                        <path d="m145.38 255.62h10.88z" fillRule="evenodd" />
                                        <path d="m156.1 347.78-0.8 1.44v-1.44" fillRule="evenodd" />
                                        <path d="m156.1 347.78v1.44h-0.8" fillRule="evenodd" />
                                        <path d="m156.1 329.22-0.8 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m156.1 329.22v5.28h-0.8" fillRule="evenodd" />
                                        <path d="m156.1 310.66-0.8 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m156.1 310.66v5.28h-0.8" fillRule="evenodd" />
                                        <path d="m156.1 291.94-0.8 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m156.1 291.94v5.28h-0.8" fillRule="evenodd" />
                                        <path d="m156.1 273.38-0.8 5.28v-5.28" fillRule="evenodd" />
                                        <path d="m156.1 273.38v5.28h-0.8" fillRule="evenodd" />
                                        <path d="m156.1 257.38-0.8 2.56v-2.56" fillRule="evenodd" />
                                        <path d="m156.1 257.38v2.56h-0.8" fillRule="evenodd" />
                                        <path d="m155.3 348.26-1.12 0.96v-0.96" fillRule="evenodd" />
                                        <path d="m155.3 348.26v0.96h-1.12" fillRule="evenodd" />
                                        <path d="m154.18 348.26-1.44 0.96v-0.96" fillRule="evenodd" />
                                        <path d="m154.18 348.26v0.96h-1.44" fillRule="evenodd" />
                                        <path d="m155.3 329.7-2.56 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m155.3 329.7v4.32h-2.56" fillRule="evenodd" />
                                        <path d="m155.3 310.98-2.56 4.48v-4.48" fillRule="evenodd" />
                                        <path d="m155.3 310.98v4.48h-2.56" fillRule="evenodd" />
                                        <path d="m155.3 292.42-2.56 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m155.3 292.42v4.32h-2.56" fillRule="evenodd" />
                                        <path d="m155.3 273.86-2.56 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m155.3 273.86v4.32h-2.56" fillRule="evenodd" />
                                        <path d="m155.3 257.38-2.56 2.24v-2.24" fillRule="evenodd" />
                                        <path d="m155.3 257.38v2.24h-2.56" fillRule="evenodd" />
                                        <path d="m156.26 349.22v-1.44z" fillRule="evenodd" />
                                        <path d="m156.26 349.22v-1.44z" fillRule="evenodd" />
                                        <path d="m156.26 334.5v-5.28z" fillRule="evenodd" />
                                        <path d="m156.26 334.5v-5.28z" fillRule="evenodd" />
                                        <path d="m156.26 315.94v-5.28z" fillRule="evenodd" />
                                        <path d="m156.26 315.94v-5.28z" fillRule="evenodd" />
                                        <path d="m156.26 297.22v-5.28z" fillRule="evenodd" />
                                        <path d="m156.26 297.22v-5.28z" fillRule="evenodd" />
                                        <path d="m156.26 278.66v-5.28z" fillRule="evenodd" />
                                        <path d="m156.26 278.66v-5.28z" fillRule="evenodd" />
                                        <path d="m156.26 259.94v-4.32z" fillRule="evenodd" />
                                        <path d="m156.26 259.94v-4.32z" fillRule="evenodd" />
                                        <path d="m433.06 802.98-0.32 2.72v-2.72" fillRule="evenodd" />
                                        <path d="m433.06 802.98v2.72h-0.32" fillRule="evenodd" />
                                        <path d="m433.06 812.42-0.8 30.24v-30.24" fillRule="evenodd" />
                                        <path d="m433.06 812.42v30.24h-0.8" fillRule="evenodd" />
                                        <path d="m432.74 802.98-0.48 2.72v-2.72" fillRule="evenodd" />
                                        <path d="m432.74 802.98v2.72h-0.48" fillRule="evenodd" />
                                        <path d="m432.26 814.82-5.12 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m432.26 814.82v0.8h-5.12" fillRule="evenodd" />
                                        <path d="m427.14 814.82-0.16 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m427.14 814.82v0.8h-0.16" fillRule="evenodd" />
                                        <path d="m420.26 814.82-9.44 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m420.26 814.82v0.8h-9.44" fillRule="evenodd" />
                                        <path d="m404.1 814.82-7.68 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m404.1 814.82v0.8h-7.68" fillRule="evenodd" />
                                        <path d="m285.54 812.74-20.8 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m285.54 812.74v0.8h-20.8" fillRule="evenodd" />
                                        <path d="m229.7 802.98-0.8 39.68v-39.68" fillRule="evenodd" />
                                        <path d="m229.7 802.98v39.68h-0.8" fillRule="evenodd" />
                                        <path d="m209.86 840.42-0.32 2.24v-2.24" fillRule="evenodd" />
                                        <path d="m209.86 840.42v2.24h-0.32" fillRule="evenodd" />
                                        <path d="m209.86 829.54-0.32 4.8v-4.8" fillRule="evenodd" />
                                        <path d="m209.86 829.54v4.8h-0.32" fillRule="evenodd" />
                                        <path d="m209.54 839.94-0.16 2.72v-2.72" fillRule="evenodd" />
                                        <path d="m209.54 839.94v2.72h-0.16" fillRule="evenodd" />
                                        <path d="m209.86 802.98-0.48 19.84v-19.84" fillRule="evenodd" />
                                        <path d="m209.86 802.98v19.84h-0.48" fillRule="evenodd" />
                                        <path d="m209.38 839.94-0.32 2.72v-2.72" fillRule="evenodd" />
                                        <path d="m209.38 839.94v2.72h-0.32" fillRule="evenodd" />
                                        <path d="m209.54 829.54-0.48 5.12v-5.12" fillRule="evenodd" />
                                        <path d="m209.54 829.54v5.12h-0.48" fillRule="evenodd" />
                                        <path d="m209.38 802.98-0.32 19.84v-19.84" fillRule="evenodd" />
                                        <path d="m209.38 802.98v19.84h-0.32" fillRule="evenodd" />
                                        <path d="m156.74 540.26-57.44 1.6v-1.6" fillRule="evenodd" />
                                        <path d="m156.74 540.26v1.6h-57.44" fillRule="evenodd" />
                                        <path d="m110.5 523.14-2.88 0.96v-0.64" fillRule="evenodd" />
                                        <path d="m110.5 523.14v0.96h-2.88" fillRule="evenodd" />
                                        <path d="m110.5 519.46-2.88 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m110.5 519.46v0.96l-2.88-0.32" fillRule="evenodd" />
                                        <path d="m110.5 504.9-2.88 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m110.5 504.9v0.64h-2.88" fillRule="evenodd" />
                                        <path d="m110.5 500.74-2.88 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m110.5 500.74v0.64h-2.88" fillRule="evenodd" />
                                        <path d="m110.5 486.18-2.88 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m110.5 486.18v0.64h-2.88" fillRule="evenodd" />
                                        <path d="m110.5 482.18-2.88 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m110.5 482.18v0.64h-2.88" fillRule="evenodd" />
                                        <path d="m110.5 467.62-2.88 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m110.5 467.62v0.64h-2.88" fillRule="evenodd" />
                                        <path d="m110.5 463.62-2.88 0.64v-0.64" fillRule="evenodd" />
                                        <path d="m110.5 463.62v0.64h-2.88" fillRule="evenodd" />
                                        <path d="m110.5 444.9-0.32 4.64v-4.64" fillRule="evenodd" />
                                        <path d="m110.5 444.9v4.64h-0.32" fillRule="evenodd" />
                                        <path d="m110.18 447.94-2.56 1.6v-1.6" fillRule="evenodd" />
                                        <path d="m110.18 447.94v1.6h-2.56" fillRule="evenodd" />
                                        <path d="m110.5 430.98v-4.64z" fillRule="evenodd" />
                                        <path d="m110.5 426.34-0.32 4.64v-4.64" fillRule="evenodd" />
                                        <path d="m110.5 426.34v4.64h-0.32" fillRule="evenodd" />
                                        <path d="m110.5 366.82-0.32 4.64v-4.64" fillRule="evenodd" />
                                        <path d="m110.5 366.82v4.64h-0.32" fillRule="evenodd" />
                                        <path d="m110.5 352.74" fillRule="evenodd" />
                                        <path d="m110.18 352.74h0.32z" fillRule="evenodd" />
                                        <path d="m110.18 352.74h0.32z" fillRule="evenodd" />
                                        <path d="m110.5 348.1-2.88 1.28v-1.28" fillRule="evenodd" />
                                        <path d="m110.5 348.1v1.28h-2.88" fillRule="evenodd" />
                                        <path d="m110.5 329.54-2.88 4.64v-4.64" fillRule="evenodd" />
                                        <path d="m110.5 329.54v4.64h-2.88" fillRule="evenodd" />
                                        <path d="m110.5 310.98-2.88 4.64v-4.64" fillRule="evenodd" />
                                        <path d="m110.5 310.98v4.64h-2.88" fillRule="evenodd" />
                                        <path d="m110.5 292.26-2.88 4.64v-4.64" fillRule="evenodd" />
                                        <path d="m110.5 292.26v4.64h-2.88" fillRule="evenodd" />
                                        <path d="m110.5 273.7-2.88 4.64v-4.64" fillRule="evenodd" />
                                        <path d="m110.5 273.7v4.64h-2.88" fillRule="evenodd" />
                                        <path d="m156.1 255.62-48.48 1.76v-1.76" fillRule="evenodd" />
                                        <path d="m156.1 255.62v1.76h-48.48" fillRule="evenodd" />
                                        <path d="m107.62 255.62-8.32 1.76v-1.76" fillRule="evenodd" />
                                        <path d="m107.62 255.62v1.76h-8.32" fillRule="evenodd" />
                                        <path d="m99.301 66.822-0.8 1.92v-1.92" fillRule="evenodd" />
                                        <path d="m99.301 66.822v1.92h-0.8" fillRule="evenodd" />
                                        <path d="m99.301 53.542-0.8 3.2v-3.2" fillRule="evenodd" />
                                        <path d="m99.301 53.542v3.2h-0.8" fillRule="evenodd" />
                                        <path d="m141.86 50.182-43.36 3.36v-3.36" fillRule="evenodd" />
                                        <path d="m141.86 50.182v3.36h-43.36" fillRule="evenodd" />
                                        <path d="m80.901 417.54-3.36 11.04v-11.04" fillRule="evenodd" />
                                        <path d="m80.901 417.54v11.04h-3.36" fillRule="evenodd" />
                                        <path d="m79.621 413.22-0.8 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m79.621 413.22v4.32h-0.8" fillRule="evenodd" />
                                        <path d="m79.621 394.66-0.8 8.48v-8.48" fillRule="evenodd" />
                                        <path d="m79.621 394.66v8.48h-0.8" fillRule="evenodd" />
                                        <path d="m79.621 380.26-0.8 4.32v-4.32" fillRule="evenodd" />
                                        <path d="m79.621 380.26v4.32h-0.8" fillRule="evenodd" />
                                        <path d="m80.901 369.06-3.36 11.2v-11.2" fillRule="evenodd" />
                                        <path d="m80.901 369.06v11.2h-3.36" fillRule="evenodd" />
                                        <path d="m141.86 201.06-27.68 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m141.86 201.06v0.8h-27.68" fillRule="evenodd" />
                                        <path d="m107.46 201.06-5.28 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m107.46 201.06v0.8h-5.28" fillRule="evenodd" />
                                        <path d="m77.221 219.78-1.28 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m77.221 219.78v0.8h-1.28" fillRule="evenodd" />
                                        <path d="m69.221 219.78-31.52 0.8v-0.8" fillRule="evenodd" />
                                        <path d="m69.221 219.78v0.8h-31.52" fillRule="evenodd" />
                                        <path d="m305.38 447.14v-1.28z" fillRule="evenodd" />
                                        <path d="m305.38 447.14v-1.28z" fillRule="evenodd" />
                                        <path d="m305.38 445.86-193.44 2.56v-2.56" fillRule="evenodd" />
                                        <path d="m305.38 445.86v2.56h-193.44" fillRule="evenodd" />
                                        <path d="m111.94 445.86-1.44 2.56v-2.56" fillRule="evenodd" />
                                        <path d="m111.94 445.86v2.56h-1.44" fillRule="evenodd" />
                                        <path d="m305.06 448.42-130.08 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m305.06 448.42v0.16h-130.08" fillRule="evenodd" />
                                        <path d="m174.98 448.42-14.88 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m174.98 448.42v0.16h-14.88" fillRule="evenodd" />
                                        <path d="m305.06 349.06-148.8 0.16v-0.16" fillRule="evenodd" />
                                        <path d="m305.06 349.06v0.16h-148.8" fillRule="evenodd" />
                                        <path d="m455.62 802.66h0.16m25.44-35.04h-24.8m0-32.64h-4.16m-225.76 0v43.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m145.22 756.58v-216.16h-35.04" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m145.22 257.38v-238.72m-84.32 10.08v18.88m0 0.48v12.96m-26.72 0v316.64m23.36 0v42.4m-23.36 0v4.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m34.341 784.58 0.16 3.68 0.48 3.68 0.8 3.52 0.96 3.52 1.44 3.52 1.6 3.2 2.08 3.2 2.08 2.88 2.4 2.88 2.72 2.4 2.88 2.4 3.04 2.08 3.2 1.76 3.36 1.6 3.52 1.12 3.52 0.96 3.68 0.64 3.68 0.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m75.781 828.1h1.44v-3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m77.221 816.74h17.28m0.48 0h11.84m0.48 0h4.16m0 29.28h342.08m2.08 0v-43.36m-344.16 0v54.88m-4.16-4.1603v-27.2" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m107.3 816.74v-14.08h4.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m93.861 840.74h-12m12-21.92h-12m12 1.92h-12m12 1.92h-12m12 2.08h-12m12 1.92h-12m12 2.08h-12m12 1.92h-12m12 2.08h-12m12 1.92h-12m12 2.08h-12m12 1.92h-12m13.12 2.08h11.84m-11.84-2.08h11.84m-11.84-1.92h11.84m-11.84-2.08h11.84m-11.84-1.92h11.84m-11.84-2.08h11.84m-11.84-1.92h11.84m-11.84-2.08h11.84m-11.84-1.92h11.84m-11.84-2.08h11.84m-11.84-1.92h11.84m-11.84-1.92h11.84" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m81.861 840.74v-24m-0.32 0v24m0.32 12.32v-12.32m-0.32 0v12.48m25.44-0.16h-25.12m-0.32 0.16h25.6m-0.16-10.56v10.4m0.16 0.16v-10.56m-0.16-2.08v2.08m0.16 0v-2.08m-0.16-23.84v23.84m0.16 0v-23.84m-20.8 36.64h16m4.96-27.2v-9.44" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m81.861 840.74h-0.32z" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m81.861 853.06h-0.16v0.16h-0.16 0.16v-0.16z" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m106.98 853.06v0.16h0.16-0.16z" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m107.14 842.66h-0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m106.98 840.58h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m106.98 840.58h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m106.98 816.74h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m81.541 840.74h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m81.541 853.38h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m107.14 853.38h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m107.3 842.66h-0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m107.14 840.58h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m107.14 840.58h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m107.14 816.74h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m81.861 816.74v36.32h24.96v-36.32" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.181 840.74v-24m-0.32 0v24m0.32 0h0.16m-0.48 0v0.32m0.8-0.32h-0.48m-0.32 0.32h1.12m-0.32-24.32v24m0.16 0.16v-24.16m-0.64 24v-24m-0.16 24h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.341 840.58h0.16v-23.84" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m93.861 840.74h0.32" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.021 840.74h0.16m-0.32 0h0.16m-0.16 0.32h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.181 840.74h-0.16v0.16h-0.16v0.16-0.16h0.16v-0.16z" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m93.861 841.06h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.981 841.06v-0.16h-0.16z" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.821 840.9h-0.16v-0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.661 816.74h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.181 816.74h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.181 840.74h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.181 840.74h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.181 840.74h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.181 840.74v-0.16h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.661 840.74h-0.16v-0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.501 816.74h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m93.861 840.74v-24" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m93.861 840.9v-0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.981 841.06h-1.12" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.821 840.9h0.16m0-24.16v24.32" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.981 840.74h11.84m-11.84-2.08h11.84m-11.84-1.92h11.84m-11.84-2.08h11.84m-11.84-1.92h11.84m-11.84-2.08h11.84m-11.84-1.92h11.84m-11.84-2.08h11.84m-11.84-1.92h11.84m-11.84-2.08h11.84m-11.84-1.92h11.84m-11.84-1.92h11.84m-12.96 0h-12m12 1.92h-12m12 1.92h-12m12 2.08h-12m12 1.92h-12m12 2.08h-12m12 1.92h-12m12 2.08h-12m12 1.92h-12m12 2.08h-12m12 1.92h-12m12 2.08h-12m-44.32-416.48h-3.36m-25.28-4.16h4.32m64.32 4.16v-4.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m33.221 406.98v-16m-20-13.28v42.4m20-42.4v9.28m1.92-9.28v9.28m2.08-9.28v9.28m1.92-9.28v9.28m2.08-9.28v9.28m1.92-9.28v9.28m2.08-9.28v9.28m1.92-9.28v9.28m2.08-9.28v9.28m1.92-9.28v9.28m1.92-9.28v9.28m2.08-9.28v9.28m1.92 0v-9.28m-23.84 33.12v9.28m1.92-9.28v9.28m2.08-9.28v9.28m1.92-9.28v9.28m2.08-9.28v9.28m1.92-9.28v9.28m2.08-9.28v9.28m1.92-9.28v9.28m2.08-9.28v9.28m1.92-9.28v9.28m1.92-9.28v9.28m2.08-9.28v9.28m1.92 0v-9.28m0-3.84v-16m-1.92 16v-16m-2.08 16v-16m-1.92 16v-16m-1.92 16v-16m-2.08 16v-16m-1.92 16v-16m-2.08 16v-16m-1.92 16v-16m-2.08 16v-16m-1.92 16v-16m-2.08 16v-16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m57.061 406.98v-16m-1.92 16v-16m-2.08 16v-16m-1.92 16v-16m-1.92 16v-16m-2.08 16v-16m-1.92 16v-16m-2.08 16v-16m-1.92 16v-16m-2.08 16v-16m-1.92 16v-16m-2.08 16v-16m-1.92 19.84v9.28m1.92-9.28v9.28m2.08-9.28v9.28m1.92-9.28v9.28m2.08-9.28v9.28m1.92-9.28v9.28m2.08-9.28v9.28m1.92-9.28v9.28m2.08-9.28v9.28m1.92-9.28v9.28m1.92-9.28v9.28m2.08-9.28v9.28m1.92 0v-9.28m-23.84-33.12v9.28m1.92-9.28v9.28m2.08-9.28v9.28m1.92-9.28v9.28m2.08-9.28v9.28m1.92-9.28v9.28m2.08-9.28v9.28m1.92-9.28v9.28m2.08-9.28v9.28m1.92-9.28v9.28m1.92-9.28v9.28m2.08-9.28v9.28m1.92 0v-9.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m33.221 390.98h23.84m0-0.32h-23.84m-0.16 0.16h0.16m23.84-0.16h-24m-0.16 0.32h0.32m0-0.32h0.16m23.68-3.68h-24.16m0.32 0.32h23.84m-23.68 0.16h23.68m-24.16-0.48v4m0.32-0.32v-3.36m0 3.2v-3.04" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m57.061 390.66v0.32" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m33.221 390.98h-0.16m0-0.16h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m33.061 390.66h0.16v0.32" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m57.061 390.66h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m33.061 390.66h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m33.061 390.66h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m33.061 390.66h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m33.221 390.98h23.84" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m32.901 390.98v-0.16h0.16v-0.16h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m33.221 387.3h-0.16v-0.16h-0.16v-0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m57.061 386.98v0.32" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m33.381 387.46h-0.16v-0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m57.061 387.3v0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m33.061 390.98h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m33.061 387.14-0.16-0.16h24.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m33.221 390.66h-0.16v0.16h-0.16v0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m32.901 386.98v0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m32.901 386.98h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m33.221 390.5v0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m32.901 386.98v4" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m33.221 407.3h23.84m0-0.32h-23.84m0 0.32h0.16m-0.16-0.32h-0.32m24.16 3.52h-23.84m-0.32 0.16h24.16m-24-3.2h24m-23.84-0.16h-0.16m24 3.04h-23.68m-0.16 0.16v-3.2m-0.32-0.32v3.84m0.32-0.48v-2.88" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m57.061 406.98v0.32" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m33.221 406.98v0.32h-0.16v-0.16z" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m33.221 407.3h-0.16v-0.16h-0.16v-0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m32.901 410.66h0.16v-0.16h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m57.061 410.5v0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m57.061 407.3h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m33.061 407.3h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m33.061 407.3h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m33.061 407.3h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m33.221 410.5v-0.16h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m57.061 410.34v0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m33.221 406.98h23.84" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m33.061 407.14v-0.16h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m32.901 410.66h0.16m24 0.16h-24.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m32.901 406.98v0.16h0.16v0.16h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m32.901 410.82v-0.16z" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m33.221 407.3v0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m32.901 410.82v-3.84" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m33.221 406.98v-16m-20-13.28v42.4" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m76.901 61.062h0.64v4.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m32.741 61.062v4.16m-10.08 0v-4.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m36.901 46.022v-12.96m0 15.04v12.96m2.08-12.96v12.96m1.92-12.96v12.96m2.08-12.96v12.96m1.92-12.96v12.96m2.08-12.96v12.96m1.92-12.96v12.96m2.08-12.96v12.96m1.92-12.96v12.96m1.92-12.96v12.96m2.08-12.96v12.96m1.92-12.96v12.96m0-15.04v-12.96m-1.92 12.96v-12.96m-2.08 12.96v-12.96m-1.92 12.96v-12.96m-1.92 12.96v-12.96m-2.08 12.96v-12.96m-1.92 12.96v-12.96m-2.08 12.96v-12.96m-1.92 12.96v-12.96m-2.08 12.96v-12.96m-1.92 12.96v-12.96" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m58.821 46.022v-12.96m-1.92 12.96v-12.96m-2.08 12.96v-12.96m-1.92 12.96v-12.96m-1.92 12.96v-12.96m-2.08 12.96v-12.96m-1.92 12.96v-12.96m-2.08 12.96v-12.96m-1.92 12.96v-12.96m-2.08 12.96v-12.96m-1.92 12.96v-12.96m-2.08 15.04v12.96m2.08-12.96v12.96m1.92-12.96v12.96m2.08-12.96v12.96m1.92-12.96v12.96m2.08-12.96v12.96m1.92-12.96v12.96m2.08-12.96v12.96m1.92-12.96v12.96m1.92-12.96v12.96m2.08-12.96v12.96m1.92-12.96v12.96m-21.92-15.04v-12.96" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m36.901 46.342h24m0-0.32h-24m0 0.32h0.16m-0.16-0.32h-0.32m0.32 1.76v-1.44m-0.32-0.32v2.08m24.32-0.32h-24m-0.16 0.16h24.16m-24-1.44h24m-24-0.32h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m37.061 46.502v1.12h23.84" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m36.901 46.022v0.32-0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m36.901 46.022h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m36.901 46.342v-0.16h-0.16v-0.16h-0.16 0.16v0.16h0.16z" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m36.581 48.102h0.16v-0.16h-0.16z" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m36.741 47.942v-0.16h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m60.901 47.782v0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m60.901 46.342h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m36.901 46.342h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m36.901 46.342h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m36.901 46.342h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m36.901 46.342h0.16v0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m36.901 47.782v-0.16h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m60.901 47.622v0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m36.901 46.022h24" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m36.741 46.022h0.16" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m36.581 48.102v-2.08" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m36.741 47.942h0.16m24 0.16h-24.32" fill="none" stroke="#bababa" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m66.981 61.062h10.56v-28h-10.56z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m81.541 853.38h4.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m107.3 853.38h-4.96v4.3203" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m86.341 857.7v-4.3203m-4.8-21.12v21.12" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m77.381 827.94h2.08l2.08-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m456.42 733.06h-4.16m22.4-4.32v4.32m-15.84 0v-4.32m-442.88-663.36h0.16m0-0.16h0.16m17.76 0.16h-18.08m0.16-0.16h17.92m-1.28 0v0.16m-10.08-0.16v0.16m11.36 308v-308m-25.12 349.76h0.16m-0.16-9.44h0.16m-0.16-2.08h0.16m-0.16-9.44h0.16m-0.16-2.24h0.16m-0.16-9.28h0.16m24.96 397.6v-349.6m0.16 0v312.32m77.6 114.72h-0.16m-0.16-0.16h0.16m0.16-11.36v11.52m-0.16-11.36v-0.32m344.16 0.16h-337.28m-6.88-0.16h341.92m2.24-43.2v43.36m-0.16-0.16v-43.36m25.76-3.2v3.36m-0.16-0.16v-3.2m0-70.56h-4.32m-250.72 5.92h204.8m21.12 0.16h-224m-1.92 43.36v-43.52m-80.8-194.56v216.32m0-732.32v233.28m-35.04 282.72h35.04m0-282.72h-35.04m371.04 545.28h-25.6m-0.16-0.16h25.6" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m476.9 778.18v3.52h4.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m470.66 728.74h0.16m3.52 0h0.32m-4 0.64h0.16m3.52 0h0.32m-8-0.64h0.16m3.68 0h0.16m-4 0.64h0.16m3.68 0h0.16m-7.84-0.64h0.16m3.68 0h0.16m-4 0.64h0.16m3.68 0h0.16m4-0.48h3.52" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m474.34 729.06h-3.52v-0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m474.34 729.06v-0.16m-7.52 0h3.68" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m470.5 729.06h-3.68v-0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m470.5 729.06v-0.16m-7.52 0h3.52" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m466.5 729.06h-3.52v-0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m466.5 729.06v-0.16m4.32 0.48v-0.32m0-0.16v-0.16m3.52 0v0.16m0 0.16v0.32m-3.52-0.64h3.52m0 0.64h-3.52m-4 0v-0.32m0-0.16v-0.16m3.68 0v0.16m0 0.16v0.32m-3.68-0.64h3.68m0 0.64h-3.68m-3.84 0v-0.32m0-0.16v-0.16m3.52 0v0.16m0 0.16v0.32m-3.52-0.64h3.52m0 0.64h-3.52m-3.84-0.48h3.36" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m462.5 729.06h-3.36v-0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m462.5 729.06v-0.16m-3.68-0.16h0.32m3.36 0h0.32m-4 0.64h0.32m3.36 0h0.32m-3.68 0v-0.32m0-0.16v-0.16m3.36 0v0.16m0 0.16v0.32m-3.36-0.64h3.36m0 0.64h-3.36m-360.8 127.52h0.16m3.52 0h0.32m-4 0.64h0.16m3.52 0h0.32m-8-0.64h0.16m3.68 0h0.16m-4 0.64h0.16m3.68 0h0.16m-8-0.64h0.16m3.68 0h0.16m-4 0.64h0.16m3.68 0h0.16m4.16-0.32h3.52" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m102.02 857.38h-3.52v-0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m102.02 857.38v-0.16m-7.52 0h3.68" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m98.181 857.38h-3.68v-0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m98.181 857.38v-0.16m-7.68 0h3.68" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.181 857.38h-3.68v-0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.181 857.38v-0.16m4.32 0.32v-0.16m0-0.16v-0.32m3.52 0v0.32m0 0.16v0.16m-3.52-0.64h3.52m0 0.64h-3.52m-4 0v-0.16m0-0.16v-0.32m3.68 0v0.32m0 0.16v0.16m-3.68-0.64h3.68m0 0.64h-3.68m-4 0v-0.16m0-0.16v-0.32m3.68 0v0.32m0 0.16v0.16m-3.68-0.64h3.68m0 0.64h-3.68m-3.84-0.32h3.52" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m90.181 857.38h-3.52v-0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m90.181 857.38v-0.16m-3.84-0.32h0.32m3.52 0h0.16m-4 0.64h0.32m3.52 0h0.16m-3.68 0v-0.16m0-0.16v-0.32m3.52 0v0.32m0 0.16v0.16m-3.52-0.64h3.52m0 0.64h-3.52" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m76.901 33.062h0.64v-4.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m34.341 373.38h3.36m39.84 4.32v-4.32m-64.32 0v4.32m83.68-348.96h-14.24m73.28 749.44h70.08m0 0.16h-70.08m-10.72 0v-0.16m81.12-43.2v43.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m27.621 64.262h0.16m-0.16 0.64h0.16m-5.12-0.64h0.32m4.48 0h0.16m-4.96 0.64h0.32m4.48 0h0.16m0.16-0.48h4.64" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m32.421 64.582h-4.64v-0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m32.421 64.582v-0.16m-9.44 0h4.48" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m27.461 64.582h-4.48v-0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m27.461 64.582v-0.16m0.32 0.48v-0.32m0-0.16v-0.16m4.64 0v0.16m0 0.16v0.32m-4.64-0.64h4.64m0 0.64h-4.64m-4.8 0v-0.32m0-0.16v-0.16m4.48 0v0.16m0 0.16v0.32m-4.48-0.64h4.48m0 0.64h-4.48" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m131.3 261.7h13.92v-4.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m34.021 784.58v1.92l0.16 1.92 0.16 1.76 0.64 3.84 0.96 3.52 0.64 1.92 0.64 1.76 0.8 1.6 0.8 1.76 0.96 1.6 0.96 1.76 1.12 1.44 0.96 1.6 3.84 4.32 1.28 1.28 1.44 1.28 1.44 1.12 1.6 1.12 1.44 1.12 1.6 0.96 1.76 0.96 1.6 0.8 1.76 0.8 5.28 1.92 1.92 0.48 1.76 0.32 1.92 0.32 3.84 0.32 1.76 0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m34.341 784.58 0.16 3.68 0.48 3.84 0.8 3.68 1.12 3.52 1.44 3.52 1.76 3.36 1.92 3.2 2.4 2.88 2.56 2.88 2.72 2.56 2.88 2.24 3.2 2.08 3.36 1.76 3.52 1.44 3.52 1.12 3.68 0.8 3.68 0.64 3.84 0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m68.421 827.14h0.48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m66.501 826.66 0.48 0.16h0.48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m64.741 826.18 0.48 0.16h0.48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m62.981 825.54 0.48 0.16 0.32 0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m61.221 824.9 0.32 0.16 0.48 0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m59.461 824.1 0.32 0.16 0.48 0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m57.701 823.3 0.48 0.16 0.32 0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m56.421 822.5 0.16 0.16 0.32 0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m51.141 818.98v0.16h0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m49.701 817.86 0.64 0.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m48.261 816.58 0.64 0.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m46.821 815.3 0.64 0.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m45.541 813.86 0.64 0.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m44.261 812.42 0.32 0.48 0.32 0.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m43.141 810.98 0.32 0.32 0.16 0.48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m42.021 809.54 0.32 0.32 0.16 0.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m38.501 803.46 0.16 0.16v0.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m37.701 801.7 0.16 0.48 0.16 0.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m36.901 799.94 0.16 0.48 0.32 0.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m36.421 798.18v0.32l0.16 0.48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m35.781 796.26 0.32 0.96" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m35.301 794.5 0.16 0.48v0.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m34.981 792.58v0.48l0.16 0.48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m34.661 791.3v0.16l0.16 0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m305.22 448.42v-99.2" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m308.58 343.62v106.56h101.12" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m413.06 374.18v30.08m-3.36 45.92v-106.56m-51.2-3.36h0.16m51.04 3.36h-101.12" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m477.86 799.46h-24.32m3.36 3.52h29.76m-33.12-2.72v42.4m3.36-22.56v-17.12m-43.2 12.64v27.04m0.8 0v-27.04" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m395.62 802.98v2.56h0.8v-2.56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m395.62 812.26v30.4m0.8 0v-27.04" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m396.42 814.82v-2.56h-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m378.18 802.98v39.68h0.8v-39.68" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m359.46 802.98v39.68h0.8v-39.68" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m323.46 802.98v39.68h0.8v-42.4" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m285.54 802.98v9.76" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m285.54 813.54v29.12h0.8v-42.56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m263.94 802.98v39.68h0.8v-29.12" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m264.74 812.74v-9.76" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m247.78 802.98v4h0.64v-4" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m247.78 842.66h0.64v-29.12h-0.64z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m266.34 778.02v-39.68m-0.8 0v39.68" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m307.14 780.9v-42.56h-0.8v42.56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m325.54 780.9v-42.56h-0.8v42.56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m343.46 780.9v-42.56h-0.8v42.56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m361.22 780.9v-42.56h-0.48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m360.42 738.34v39.68m38.4 2.88v-42.56m-0.8 0v39.68m38.08 2.88v-42.56m-0.8-3.52v43.2m18.24 21.44h-18.24m0 0.8h18.24m0-0.8h0.16m-23.04 0h-13.92m0 0.8h13.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m411.94 799.46h-1.28v0.8h1.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m400.74 799.46h-2.72" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m398.02 800.26h2.72v-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m393.38 799.46h-2.24v0.8h2.24" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m384.42 799.46h-4.96" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m379.46 800.26h4.96v-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m374.82 799.46h-2.56v0.8h2.56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m365.7 799.46h-4.96" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m360.74 800.26h4.96v-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m356.1 799.46h-13.92m0 0.8h13.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m337.54 799.46h-1.44v0.8h1.44" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m326.82 799.46h-3.2" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m324.26 800.26h2.56v-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m318.82 799.3h-13.92m0 0.8h13.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m300.26 799.3h-0.48v0.8h0.48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m290.5 799.3h-4.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m286.34 800.1h4.16v-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m281.7 799.3h-3.2v0.8h3.2" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m271.94 799.3h-4.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m267.62 800.1h4.32v-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m262.98 799.3h-3.2v0.8h3.2" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m253.06 799.3h-4" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m249.06 800.1h4v-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m244.42 799.3h-5.44v0.8h5.44" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m232.26 799.3h-1.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m230.34 800.1h1.92v-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m225.7 799.3h-3.52v0.8h3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m215.62 799.3h-3.84" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m211.78 800.1h3.84v-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m207.14 799.3h-13.92m0 0.8h13.92m-18.56-0.8h-14.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m169.86 799.3h-13.92v0.8h13.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m174.5 800.1h14.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m456.58 733.06v8.16h2.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m465.86 741.22h-5.44m5.44 24h-9.28m11.52-24h8.8m-8.8 24h8.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m456.58 745.7v-4.48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m456.58 765.22v-19.84" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m467.78 741.22h0.16m-4.16 5.92h-0.64m-5.44-1.92h-1.12m7.68 0h-2.08m-4-2.08h-1.6m8.16 0h-3.52m-2.56-1.92h-2.08m9.28 0h-5.44m5.44 21.92h-9.28m9.28-1.92h-9.28m9.28-2.08h-9.28m9.28-1.92h-9.28m6.4-2.08h-6.4m9.28 0h-1.92m-1.92-1.92h-4.32m8.16 0h-1.44m-3.2-2.08h-3.04m7.68 0h-0.96m-4.64-1.92h-1.6m0.64-2.08h-0.16m8.96-5.92h8.8m-8.8 1.92h8.8m-8.8 2.08h8.8m-8.8 1.92h8.8m-8.8 2.08h8.8m-8.8 1.92h8.8m-8.8 2.08h8.8m-8.8 1.92h8.8m-8.8 2.08h8.8m-8.8 1.92h8.8m-8.8 2.08h8.8m-8.8 1.92h8.8m-8.8 2.08h8.8m-13.12-18.08h-0.64m-5.44-1.92h-1.12m7.68 0h-2.08m-4-2.08h-1.6m8.16 0h-3.52m4.64 20h-9.28m9.28-1.92h-9.28m9.28-2.08h-9.28m9.28-1.92h-9.28m6.4-2.08h-6.4m9.28 0h-4.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m457.7 753.22h8.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m461.22 751.14h-3.04m7.68 0h-0.96m-4.64-1.92h-1.6m0.64-2.08h-0.16m8.96-4h8.8m-8.8 2.08h8.8m-8.8 1.92h8.8m-8.8 2.08h8.8m-8.8 1.92h8.8m-8.8 2.08h8.8m-8.8 1.92h8.8m-8.8 2.08h8.8m-8.8 1.92h8.8m-8.8 2.08h8.8m-8.8 1.92h8.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m466.34 749.54h-0.16l-0.32 0.16v15.52" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m466.34 749.54h-0.16l-0.32 0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m466.18 765.22h0.16v-15.68" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m465.86 749.7 0.32-0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m465.86 765.22h0.32v-15.68" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m465.86 749.7v15.52m0-23.84 0.32-0.16m1.6 0h0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m465.86 741.38v-0.48h2.24v24.32" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m465.86 741.38 0.32-0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m466.34 741.38h1.28v23.84h0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m467.94 741.22v-0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m465.86 741.38 0.32-0.16h1.6v24h0.32" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m465.86 741.38v-0.48h2.24v24.32" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m151.3 799.46h-1.12v0.8h1.12" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m143.62 799.46h-6.4" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m137.22 800.26h6.4v-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m102.18 745.7h39.68m0-0.8h-39.68m-24.96-18.72h-39.68m0 0.8h39.68m0-37.92h-39.68m0 0.8h39.68m0-75.36h-39.68m0 0.8h39.68m0-38.08h-39.68m0 0.8h39.68m0 92.32h-39.68" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m37.541 671.14h39.68v-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m102.18 689.86h39.68m0-0.8h-39.68m0-35.36h39.68m0-0.8h-39.68m0-37.6h39.68m0-0.8h-39.68m0-36.48h39.68m0-0.8h-39.68m52 225.76v39.68m0.8 0v-39.68m-22.4-3.52h-13.92m0 0.8h13.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m107.62 540.26v-5.92h-0.8v5.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m107.62 527.78v-3.68" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m107.62 519.46v-3.68h-0.8v12h0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m107.62 509.06v-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m107.62 500.74v-3.52h-0.8v11.84h0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m107.62 490.5v-3.68" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m107.62 482.18v-3.68h-0.8v12h0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m107.62 471.94v-3.68m0-4.64v-14.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m106.82 447.94v24h0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m116.9 501.38h-9.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m107.62 504.9h9.28v-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m116.9 482.82h-9.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m107.62 486.18h9.28v-3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m116.9 464.26h-9.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m107.62 467.62h9.28v-3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m116.9 520.1h-9.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m107.62 523.46h9.28v-1.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m116.9 521.38v-1.28m0 2.08h39.84m0-0.8h-39.84" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m110.5 294.98h13.28v-0.8h-13.28z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m130.34 294.98h2.56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m133.7 294.98h2.4v-0.8h-5.76v0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m142.66 294.98h10.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m152.74 294.18h-10.08v0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m110.5 313.7h21.28m0.64 0h20.32m0-0.8h-19.04" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m132.9 312.9h-22.4v0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m133.7 312.9v-17.92m-0.8 0v17.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m110.5 332.26h12.96v-0.8h-12.96z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m130.02 332.26h22.72m0-0.8h-20.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m131.78 331.46h-1.76v0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m77.221 294.34h-39.52m0 0.64h39.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m37.701 294.34v0.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m80.101 318.18h-5.28v0.64h5.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m37.701 318.82h30.4v-0.64h-30.4z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.101 318.82v-0.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m80.101 337.54h-2.88v0.64h2.88" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m37.701 338.18h32.96v-0.64h-32.96z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.101 338.18v-0.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m131.78 313.7v4.48h0.64v-4.48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m131.78 324.74v6.72" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m132.42 331.46v-6.72h-0.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m132.42 313.7h-0.64m0 17.76h0.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m77.221 539.94h-39.68m0 0.8h39.68m-39.52-283.04h39.52m0-0.8h-39.52m39.52-130.24h-39.52m0 0.8h39.52m0 55.04h-39.52m0 0.8h39.52m0 55.04h-39.52m0 0.8h39.52m24.96-18.56h39.68m0-0.8h-39.68m0-55.2h39.68m0-0.8h-39.68m0-36.32h39.68m0-0.8h-39.68m-88.96 293.44v-42.4" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m8.901 373.38v50.88m4.32-50.88h0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m456.9 823.62v22.4h-3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.341 65.382v8.32h0.8v-0.32h2.56v-8z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.341 87.142v5.28h0.8v-0.48h2.56v-4.48h-2.56v-0.32z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.341 105.7v5.28h0.8v-0.48h2.56v-4.32h-2.56v-0.48z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.341 124.42v5.12h0.8v-0.32h2.56v-1.76" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m37.701 126.66v-1.92h-2.56v-0.32h-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.341 142.98v5.28h0.8v-0.48h2.56v-4.32h-2.56v-0.48z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.341 161.54v5.28h0.8v-0.32h2.56v-4.48h-2.56v-0.48z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.341 180.26v5.28h0.8v-0.48h2.56v-1.76" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m37.701 182.5v-1.76h-2.56v-0.48h-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.341 198.82v5.28h0.8v-0.48h2.56v-4.32h-2.56v-0.48z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.341 217.54v5.12h0.8v-0.32h2.56v-1.76" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m37.701 219.78v-1.92h-2.56v-0.32h-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.341 236.1v5.28h0.8v-0.48h2.56v-1.76" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m37.701 238.34v-1.76h-2.56v-0.48h-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.341 254.66v5.28h0.8v-0.32h2.56v-1.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m37.701 256.9v-1.76h-2.56v-0.48h-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.341 273.38v5.28h0.8v-0.48h2.56v-4.32h-2.56v-0.48z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.341 291.94v5.28h0.8v-0.48h2.56v-1.76" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m37.701 294.34v-1.92h-2.56v-0.48h-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.341 310.66v5.28h0.8v-0.48h2.56v-4.48h-2.56v-0.32z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.341 329.22v5.28h0.8v-0.48h2.56v-4.32h-2.56v-0.48z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.341 347.78v5.28h0.8v-0.32h2.56v-4.48h-2.56v-0.48z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.341 366.5v6.88" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m37.701 373.38v-6.4h-2.56v-0.48h-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.341 236.1v-13.44m0-5.12v-13.44m0-5.28v-13.28m0-5.28v-13.44m0-5.28v-13.28m0-5.28v-13.44m0-5.12v-13.44m0-5.28v-13.28m0-5.28v-13.44m0 292.8v-13.44m0-5.28v-13.28m0-5.28v-13.28m0-5.28v-13.44m0-5.28v-13.28m0-5.28v-13.44m0-5.28v-13.28m3.36-19.04v14.24m0 4.32v14.24m0 4.48v14.24m0 4.32v14.24m0 4.32v14.24m0 4.48v2.72m0 0.64v10.88m0 4.32v3.52m0 0.64v10.08m0 4.48v14.24m0-293.6v14.08m0 4.48v14.24m0 4.32v14.24m0 4.48v14.24m0 4.32v14.24m0 4.48v14.24m0 4.32v14.24m0 4.32v14.24" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m160.1 541.86v-4.16h-0.8v0.48h-2.56v2.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m160.1 524.42v-5.28h-0.8v0.48h-2.56v1.76" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m156.74 522.18v1.76h2.56v0.48h0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m160.1 505.7v-5.12h-0.8v0.32h-2.56v4.48h2.56v0.32z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m160.1 487.14v-5.28h-0.8v0.48h-2.56v4.32h2.56v0.48z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m160.1 468.58v-5.28h-0.8v0.32h-2.56v4.48h2.56v0.48z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m160.1 449.86v-1.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m156.74 448.42v1.12h2.56v0.32h0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m160.1 449.86v13.44m0 5.28v13.28m0 5.28v13.44m0 5.12v13.44m0 5.28v13.28m-3.36-18.08v-14.24m0-4.48v-14.24m0-4.32v-14.24m0-4.48v-14.08m0 88.64v-14.24" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m228.26 738.34v40" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m231.62 780.9v-42.56h-1.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m481.38 799.46h0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m481.38 799.3v-19.36h-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m477.86 781.54v17.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m481.38 799.46v-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m456.9 823.62h33.28m-3.52-3.52h-29.76m33.28 3.52v-24.16m-3.52 3.52v17.12m-470.72-791.36v36.64m18.08 0v-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.021 65.222h-17.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m34.181 73.702h0.16v-3.52h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 92.422h0.16v-5.28h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 110.98h0.16v-5.28h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 129.54h0.16v-5.12h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 148.26h0.16v-5.28h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 166.82h0.16v-5.28h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 185.54h0.16v-5.28h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 204.1h0.16v-5.28h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 222.66h0.16v-5.12h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 241.38h0.16v-5.28h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 259.94h0.16v-5.28h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 278.66h0.16v-5.28h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 297.22h0.16v-5.28h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 315.94h0.16v-5.28h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 334.5h0.16v-5.28h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 353.06h0.16v-5.28h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 373.38h0.16v-6.88h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.341 73.702v13.44m0 5.28v13.28m0 5.28v13.44m0 5.12v13.44m0 5.28v13.28m0 5.28v13.44m0 5.28v13.28m0 5.28v13.44m0 5.12v13.44m0 5.28v13.28m0 5.28v13.44m0 5.28v13.28m0 5.28v13.44m0 5.28v13.28m0 5.28v13.28m0 5.28v13.44" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m37.701 373.38h4.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.341 373.38h-25.44z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m8.901 373.38v51.04h25.12" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m77.061 828.26v29.44m0.16-0.16v-29.44m-0.16 29.6h34.56m-30.08-0.16h-4.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m111.46 857.7v-0.16h-29.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m77.221 857.54h-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m111.62 857.7v-11.36h-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m457.06 846.34v-22.56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m456.9 823.62v22.72h0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m457.06 823.78h33.12v-0.16h-33.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m490.18 799.3h-8.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m481.38 799.46h8.8v-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m481.38 728.74v70.72h8.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m481.22 799.46h0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m481.38 728.74h-29.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m452.26 728.9h24.64v-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m452.1 728.74v6.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m452.1 734.98v1.6h0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m228.1 734.98v43.2m0.16 0.16v-40m-82.88-196.16h15.04m-0.16-0.16h-14.88" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m160.42 542.18v-4.48h-0.16v4.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m160.26 524.42h0.16v-5.28h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m160.26 505.7h0.16v-5.12h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m160.26 487.14h0.16v-5.28h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m160.26 468.58h0.16v-5.28h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m160.26 449.86h0.16v-1.28h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m160.42 449.86v13.44m0 5.28v13.28m0 5.28v13.44m0 5.12v13.44m0 5.28v13.28m-0.16 0v-13.28m0-5.28v-13.44m0-5.12v-13.44m0-5.28v-13.28m0-5.28v-13.44m-118.72-441.76v20.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m40.741 28.742v-20.64h0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m8.901 373.38v50.88" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m8.901 373.38h0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m19.301 424.42h14.56v-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m19.301 424.26v0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m15.941 65.382h18.24z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 373.38v-308m0 21.76h0.16m-0.16-13.44h0.16m-0.16 32h0.16m-0.16-13.28h0.16m-0.16 32h0.16m-0.16-13.44h0.16m-0.16 32h0.16m-0.16-13.44h0.16m-0.16 32h0.16m-0.16-13.28h0.16m-0.16 32h0.16m-0.16-13.44h0.16m-0.16 32h0.16m-0.16-13.28h0.16m-0.16 32h0.16m-0.16-13.44h0.16m-0.16 50.56h0.16m-0.16-13.28h0.16m-0.16-5.28h0.16m-0.16-13.44h0.16m-0.16-157.28h0.16m-0.16 250.56h0.16m-0.16-14.08h0.16m-0.16 33.28h0.16m-0.16-13.92h0.16m-0.16 32h0.16m-0.16-13.92h0.16m-0.16 32.96h0.16m-0.16-14.08h0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m41.701 373.38h-4 39.84" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m41.701 373.38h0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.341 373.38h-25.44" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.341 373.38h0.16m3.2 0h0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m77.221 824.74v-0.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.501 816.74h12.64m-3.68 24h3.36m-11.84 0h7.36m-8.48 0h-12m12-24h-12m25.28 9.76v-9.76m-12.64 15.68v-15.68m-0.32 23.84v0.16m0.32-21.92h12.64m-12.64 1.92h12.64m-12.64 1.92h12.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m107.14 824.74h-12.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m99.621 826.66h7.04m-12.16 0h3.68m2.4 2.08h3.84m-9.92 0h3.2m3.84 1.92h2.4m-9.44 0h2.72m5.28 2.08h0.96m-5.12 1.92h1.12m4.96 2.08h2.4m-8.96 0h2.56m3.52 1.92h2.88m-9.44 0h4m2.08 2.08h3.36m-11.84 0h7.36m-8.48 0h-12m12-2.08h-12m12-1.92h-12m12-2.08h-12m12-1.92h-12m12-2.08h-12m12-1.92h-12m12-2.08h-12m12-1.92h-12m12-2.08h-12m12-1.92h-12m12-1.92h-12m12-2.08h-12m12.64 2.08h12.64m-12.64 1.92h12.64m-12.64 1.92h12.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m107.14 824.74h-12.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m99.621 826.66h7.04m-12.16 0h3.68m2.4 2.08h3.84m-9.92 0h3.2m3.84 1.92h2.4m-9.44 0h2.72m5.28 2.08h0.96m-5.12 1.92h1.12m4.96 2.08h2.4m-8.96 0h2.56m3.52 1.92h2.88m-9.44 0h4m-7.52 0h-12m12-1.92h-12m12-2.08h-12m12-1.92h-12m12-2.08h-12m12-1.92h-12m12-2.08h-12m12-1.92h-12m12-2.08h-12m12-1.92h-12m12-1.92h-12" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m107.3 834.82h-0.16l-0.16 0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m107.14 816.74h-0.32v9.92" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m106.82 834.98v18.08h-24.96v-36.32" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m107.14 826.5v-9.76" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m107.3 834.82h-0.16l-0.16 0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m107.3 816.74h-0.16v9.76" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m107.3 826.5v-9.76" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m107.3 834.82v18.56h-25.92v-21.12" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m107.14 834.82-0.16 0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m107.14 816.74h-0.16v9.92" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m106.98 834.98v18.08h-25.12v-36.32h-0.32" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m107.14 826.5v-9.76" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m107.14 834.82v18.4h-25.6v-36.48" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.821 840.58-0.16 0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.981 816.74h-0.48v15.68" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.181 840.58v0.16m0.8-8.48v-15.52" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.981 840.58v0.48h-1.12v-24.32" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.821 840.58-0.16 0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.661 816.74h-0.16v15.68" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.501 840.58h-0.32v-23.84" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.661 832.26v-15.52m-0.64 24h0.16m0.64-0.16-0.16 0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.821 816.74h-0.16v15.68" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.661 840.74h-0.48v-24h-0.32" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.821 832.26v-15.52" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.821 840.58v0.48h-0.96v-24.32" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.981 816.74h11.84m-11.84 2.08h11.84m-11.84 1.92h11.84m-11.84 1.92h11.84m-11.84 2.08h11.84m-11.84 1.92h11.84m-11.84 2.08h11.84m-11.84 1.92h11.84m-11.84 2.08h11.84m-11.84 1.92h3.36m1.12 0h7.36m-11.84 2.08h2.88m2.56 0h4m-9.44 1.92h2.4m4 0h2.56m-8.96-19.84h11.84m-11.84 1.92h11.84m-11.84 1.92h11.84m-11.84 2.08h11.84m-11.84 1.92h11.84m-11.84 2.08h11.84m-11.84 1.92h11.84m-11.84 2.08h11.84m-11.84 1.92h3.36m1.12 0h7.36m-11.84 2.08h2.88m2.56 0h4m-9.44 1.92h2.4m4 0h2.56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m106.82 834.98v-18.24" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m107.14 816.74h-0.16v18.24" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m107.14 834.82v-18.08m-12.16 23.84v-23.84" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.661 816.74h-0.16v23.84" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.821 816.74h-0.16v24" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m94.821 840.58v-23.84" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m111.46 857.54v-11.52m0-3.36v-40m-4.32 0v32.16m-25.6-2.56v-29.6" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m89.381 799.3h-12.16v25.44" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.501 791.3 0.96-0.32-0.16-0.48 2.56-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m37.701 784.58 0.32 5.12" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m70.661 823.94 1.6 0.32 1.76 0.16 1.6 0.16h1.76" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m70.501 824.1-0.8 2.4-0.48-0.16-0.32 0.96" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m54.181 816.9 1.6 1.12 1.6 0.96" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m54.021 817.06-1.76 1.76-0.32-0.32-0.8 0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m56.421 822.66 0.32-0.96-0.48-0.16 0.96-2.4" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m42.341 803.3 0.96 1.76 1.12 1.6" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m42.181 803.3-2.56 0.8-0.16-0.32-0.96 0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m41.861 809.7 0.8-0.8-0.32-0.32 1.92-1.76" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.341 784.58v1.6l0.16 1.76 0.32 3.2" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m69.061 827.14 4.16 0.64 2.08 0.16h2.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m51.461 818.98 2.4 1.92 2.72 1.6" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m38.821 803.94 0.8 1.44 0.8 1.28 0.8 1.44 0.96 1.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m38.021 789.7 0.32 2.4 0.64 2.24 0.64 2.4 0.8 2.24 0.8 2.08 1.12 2.24" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m44.421 806.66 1.28 2.08 4.8 5.28 1.76 1.44 1.92 1.44" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m57.381 818.98 4.16 2.24 4.48 1.6 2.24 0.64 2.4 0.48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m34.181 784.58v1.6l0.16 1.76 0.16 1.6 0.16 1.76" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m38.661 803.94 1.6 2.88 0.96 1.44 0.8 1.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m51.301 819.14 2.56 1.76 2.56 1.6" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m68.901 827.3 3.2 0.64 1.76 0.16h1.6l1.6 0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.341 784.58v1.6l0.16 1.76 0.32 3.2" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m38.821 803.94 0.8 1.44 0.8 1.28 0.8 1.44 0.96 1.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m51.461 818.98 2.4 1.92 2.72 1.6" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m69.061 827.14 4.16 0.64 2.08 0.16h2.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m56.421 822.5 3.04 1.6 3.04 1.28 3.2 0.96 3.2 0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m42.021 809.54 2.08 2.72 2.24 2.4 2.4 2.4 2.56 2.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m34.661 791.3 0.64 3.2 0.96 3.2 1.12 3.2 1.28 3.04" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m456.42 778.18v-45.12m-4.16 5.28v42.56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m454.34 780.9v-2.72" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m456.42 733.06h20.48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m452.26 728.9v7.68" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m481.22 799.46v-70.56m-4.32 4.16v45.12" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m476.9 779.94h0.96" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m8.901 424.26h25.28m3.36 0h40m0-4.16h-64.32m0-42.4h64.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m60.901 48.102v12.96m-24-12.96v12.96m0-15.04v-12.96m24 12.96v-12.96m-23.84 13.28h-0.16m21.92 1.76v12.96m-1.92-12.96v12.96m-2.08-12.96v12.96m-1.92-12.96v12.96m-1.92-12.96v12.96m-2.08-12.96v12.96m-1.92-12.96v12.96m-2.08-12.96v12.96m-1.92-12.96v12.96m-2.08-12.96v12.96m-1.92-12.96v12.96m-2.08-12.96v12.96m0-15.04v-12.96m2.08 12.96v-12.96m1.92 12.96v-12.96m2.08 12.96v-12.96m1.92 12.96v-12.96m2.08 12.96v-12.96m1.92 12.96v-12.96m2.08 12.96v-12.96m1.92 12.96v-12.96m1.92 12.96v-12.96m2.08 12.96v-12.96m1.92 12.96v-12.96m2.08 12.96v-12.96m-2.08 15.04v12.96m-1.92-12.96v12.96m-2.08-12.96v12.96m-1.92-12.96v12.96m-1.92-12.96v12.96m-2.08-12.96v12.96m-1.92-12.96v12.96m-2.08-12.96v12.96m-1.92-12.96v12.96m-2.08-12.96v12.96m-1.92-12.96v12.96m0-15.04v-12.96m1.92 12.96v-12.96m2.08 12.96v-12.96m1.92 12.96v-12.96m2.08 12.96v-12.96m1.92 12.96v-12.96m2.08 12.96v-12.96m1.92 12.96v-12.96m1.92 12.96v-12.96m2.08 12.96v-12.96m1.92 12.96v-12.96" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m37.061 46.342h-0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m60.901 48.102h-24.32v-2.08h24.32" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m60.901 47.782v-0.16h-23.84v-1.12h23.84v-0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m36.901 46.182h0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m60.901 47.942v-0.16h-24v-1.44h24v-0.32" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m60.901 47.942h-24.32v-1.92h24.32" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m34.021 65.222h46.08m-3.2-4.16h-56.64m-4.16-32.32v36.48m4.16-4.16v-28m98.4 766.24h-19.2" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m104.9 800.1v2.56h2.24" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m111.46 802.66h7.2v-2.4" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m118.66 799.46v-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m104.9 799.3v0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m99.461 799.3v0.8h5.44" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m83.941 800.1h5.44v-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m83.941 799.3v0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m81.541 802.66h2.4v-2.56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m430.66 802.98 4.64-3.68v3.68" fillRule="evenodd" />
                                        <path d="m430.66 802.98v-3.68h4.64" fillRule="evenodd" />
                                        <path d="m435.3 799.3h-4.64v3.68h4.64v-3.68h-4.64v3.68h4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m411.94 802.98 4.8-3.68v3.68" fillRule="evenodd" />
                                        <path d="m411.94 802.98v-3.68h4.8" fillRule="evenodd" />
                                        <path d="m416.74 799.3h-4.8v3.68h4.8v-3.68h-4.8v3.68h4.8z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m393.38 802.98 4.64-3.68v3.68" fillRule="evenodd" />
                                        <path d="m393.38 802.98v-3.68h4.64" fillRule="evenodd" />
                                        <path d="m398.02 799.3h-4.64v3.68h4.64v-3.68h-4.64v3.68h4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m374.82 802.98 4.64-3.68v3.68" fillRule="evenodd" />
                                        <path d="m374.82 802.98v-3.68h4.64" fillRule="evenodd" />
                                        <path d="m379.46 799.3h-4.64v3.68h4.64v-3.68h-4.64v3.68h4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m356.1 802.98 4.64-3.68v3.68" fillRule="evenodd" />
                                        <path d="m356.1 802.98v-3.68h4.64" fillRule="evenodd" />
                                        <path d="m360.74 799.3h-4.64v3.68h4.64v-3.68h-4.64v3.68h4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m337.54 802.98 4.64-3.68v3.68" fillRule="evenodd" />
                                        <path d="m337.54 802.98v-3.68h4.64" fillRule="evenodd" />
                                        <path d="m342.18 799.3h-4.64v3.68h4.64v-3.68h-4.64v3.68h4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m318.82 802.98 4.8-3.68v3.68" fillRule="evenodd" />
                                        <path d="m318.82 802.98v-3.68h4.8" fillRule="evenodd" />
                                        <path d="m323.62 799.3h-4.8v3.68h4.8v-3.68h-4.8v3.68h4.8z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m300.26 802.98 4.64-3.68v3.68" fillRule="evenodd" />
                                        <path d="m300.26 802.98v-3.68h4.64" fillRule="evenodd" />
                                        <path d="m304.9 799.3h-4.64v3.68h4.64v-3.68h-4.64v3.68h4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m281.7 802.98 4.64-3.68v3.68" fillRule="evenodd" />
                                        <path d="m281.7 802.98v-3.68h4.64" fillRule="evenodd" />
                                        <path d="m286.34 799.3h-4.64v3.68h4.64v-3.68h-4.64v3.68h4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m262.98 802.98 4.64-3.68v3.68" fillRule="evenodd" />
                                        <path d="m262.98 802.98v-3.68h4.64" fillRule="evenodd" />
                                        <path d="m267.62 799.3h-4.64v3.68h4.64v-3.68h-4.64v3.68h4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m244.42 802.98 4.64-3.68v3.68" fillRule="evenodd" />
                                        <path d="m244.42 802.98v-3.68h4.64" fillRule="evenodd" />
                                        <path d="m249.06 799.3h-4.64v3.68h4.64v-3.68h-4.64v3.68h4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m225.7 802.98 4.64-3.68v3.68" fillRule="evenodd" />
                                        <path d="m225.7 802.98v-3.68h4.64" fillRule="evenodd" />
                                        <path d="m230.34 799.3h-4.64v3.68h4.64v-3.68h-4.64v3.68h4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m207.14 802.98 4.64-3.68v3.68" fillRule="evenodd" />
                                        <path d="m207.14 802.98v-3.68h4.64" fillRule="evenodd" />
                                        <path d="m211.78 799.3h-4.64v3.68h4.64v-3.68h-4.64v3.68h4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m188.58 802.98 4.64-3.68v3.68" fillRule="evenodd" />
                                        <path d="m188.58 802.98v-3.68h4.64" fillRule="evenodd" />
                                        <path d="m193.22 799.3h-4.64v3.68h4.64v-3.68h-4.64v3.68h4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m169.86 802.98 4.64-3.68v3.68" fillRule="evenodd" />
                                        <path d="m169.86 802.98v-3.68h4.64" fillRule="evenodd" />
                                        <path d="m174.5 799.3h-4.64v3.68h4.64v-3.68h-4.64v3.68h4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m151.3 802.98 4.64-3.68v3.68" fillRule="evenodd" />
                                        <path d="m151.3 802.98v-3.68h4.64" fillRule="evenodd" />
                                        <path d="m155.94 799.3h-4.64v3.68h4.64v-3.68h-4.64v3.68h4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m132.58 802.98 4.64-3.68v3.68" fillRule="evenodd" />
                                        <path d="m132.58 802.98v-3.68h4.64" fillRule="evenodd" />
                                        <path d="m137.22 799.3h-4.64v3.68h4.64v-3.68h-4.64v3.68h4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m430.66 781.7 4.64-3.68v3.68" fillRule="evenodd" />
                                        <path d="m430.66 781.7v-3.68h4.64" fillRule="evenodd" />
                                        <path d="m435.3 778.02h-4.64v3.68h4.64v-3.68h-4.64v3.68h4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m411.94 781.7 4.8-3.68v3.68" fillRule="evenodd" />
                                        <path d="m411.94 781.7v-3.68h4.8" fillRule="evenodd" />
                                        <path d="m416.74 778.02h-4.8v3.68h4.8v-3.68h-4.8v3.68h4.8z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m393.38 781.7 4.64-3.68v3.68" fillRule="evenodd" />
                                        <path d="m393.38 781.7v-3.68h4.64" fillRule="evenodd" />
                                        <path d="m398.02 778.02h-4.64v3.68h4.64v-3.68h-4.64v3.68h4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m374.82 781.7 4.64-3.68v3.68" fillRule="evenodd" />
                                        <path d="m374.82 781.7v-3.68h4.64" fillRule="evenodd" />
                                        <path d="m379.46 778.02h-4.64v3.68h4.64v-3.68h-4.64v3.68h4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m356.1 781.7 4.64-3.68v3.68" fillRule="evenodd" />
                                        <path d="m356.1 781.7v-3.68h4.64" fillRule="evenodd" />
                                        <path d="m360.74 778.02h-4.64v3.68h4.64v-3.68h-4.64v3.68h4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m337.54 781.7 4.64-3.68v3.68" fillRule="evenodd" />
                                        <path d="m337.54 781.7v-3.68h4.64" fillRule="evenodd" />
                                        <path d="m342.18 778.02h-4.64v3.68h4.64v-3.68h-4.64v3.68h4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m318.82 781.7 4.8-3.68v3.68" fillRule="evenodd" />
                                        <path d="m318.82 781.7v-3.68h4.8" fillRule="evenodd" />
                                        <path d="m323.62 778.02h-4.8v3.68h4.8v-3.68h-4.8v3.68h4.8z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m300.26 781.7 4.64-3.68v3.68" fillRule="evenodd" />
                                        <path d="m300.26 781.7v-3.68h4.64" fillRule="evenodd" />
                                        <path d="m304.9 778.02h-4.64v3.68h4.64v-3.68h-4.64v3.68h4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m281.7 781.7 4.64-3.68v3.68" fillRule="evenodd" />
                                        <path d="m281.7 781.7v-3.68h4.64" fillRule="evenodd" />
                                        <path d="m286.34 778.02h-4.64v3.68h4.64v-3.68h-4.64v3.68h4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m262.98 781.7 4.64-3.68v3.68" fillRule="evenodd" />
                                        <path d="m262.98 781.7v-3.68h4.64" fillRule="evenodd" />
                                        <path d="m267.62 778.02h-4.64v3.68h4.64v-3.68h-4.64v3.68h4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m244.42 781.7 4.64-3.68v3.68" fillRule="evenodd" />
                                        <path d="m244.42 781.7v-3.68h4.64" fillRule="evenodd" />
                                        <path d="m249.06 778.02h-4.64v3.68h4.64v-3.68h-4.64v3.68h4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m145.22 778.18v-7.04h-0.48v0.32h-2.88v6.88" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.22 765.7v-9.12h-0.48v0.48h-2.88v8.16h2.88v0.48z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.22 751.14v-8h-3.36v1.76" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m141.86 745.7v5.12h2.88v0.32h0.48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m141.86 728.9h3.36v-4.32h-3.36z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m141.86 710.34h3.36v-4.32h-3.36z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.22 691.78v-4.48h-3.36v1.76" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m141.86 689.86v1.92h3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m141.86 673.06h3.36v-4.32h-3.36z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.22 654.5v-4.48h-3.36v2.88" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m141.86 653.7v0.8h3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m141.86 635.78h3.36v-4.32h-3.36z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.22 617.22v-4.32h-3.36v1.6" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m141.86 615.3v1.92h3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m141.86 598.66h3.36v-4.48h-3.36z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.22 579.94v-4.32h-3.36v1.6" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m141.86 578.02v1.92h3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m141.86 561.38h3.36v-4.48h-3.36z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.22 542.66v-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m141.86 541.86v0.8h3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.22 542.66v14.24m0 4.48v14.24m0 4.32v14.24m0 4.48v14.24m0 4.32v14.24m0 4.32v14.24m0 4.48v14.24m0 4.32v14.24m0 4.48v14.24m0 4.32v14.24m0 4.32v14.24m0 8v5.44m0 9.12v5.44m-3.36-14.08v-6.24m0-7.68v-14.24m0-4.32v-14.24m0-4.32v-14.24m0-4.48v-14.24m0-4.32v-14.24m0-4.48v-14.24m0-4.32v-14.24m0-4.32v-14.24m0-4.48v-14.24m0-4.32v-14.24m0-4.48v-14.24m0 228.8v-6.24" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m145.38 778.34v-7.2h-0.16v7.2" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.22 765.7h0.16v-9.12h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.22 751.14h0.16v-8h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.22 728.9h0.16v-4.32h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.22 710.34h0.16v-4.32h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.22 691.78h0.16v-4.48h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.22 673.06h0.16v-4.32h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.22 654.5h0.16v-4.48h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.22 635.78h0.16v-4.32h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.22 617.22h0.16v-4.32h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.22 598.66h0.16v-4.48h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.22 579.94h0.16v-4.32h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.22 561.38h0.16v-4.48h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.38 542.66v-0.48m0-0.16v-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.22 541.86v0.8h0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.38 541.86h-0.16m0.16 223.84v5.44m-0.16 0v-5.44" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m34.181 424.26v6.4" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.021 430.66h3.52v-6.4" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 444.9v4.48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.021 449.38h3.52v-4.48h-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 463.62v4.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.021 467.94h3.52v-4.32h-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 482.18v4.48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.021 486.66h3.52v-4.48h-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 500.74v4.48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.021 505.22h3.52v-4.48h-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 519.46v4.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.021 523.78h3.52v-4.32h-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 538.02v4.48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.021 542.5h3.52v-1.76" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m37.541 539.94v-1.92h-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 556.74v4.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.021 561.06h3.52v-4.32h-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 579.78h3.36v-1.76" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m37.541 577.22v-1.92h-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 598.34h3.36v-4.32h-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 616.9h3.36v-1.6" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m37.541 614.5v-1.92h-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 635.62h3.36v-4.48h-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 654.18h3.36v-4.32h-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 672.9h3.36v-1.76" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m37.541 670.34v-1.92h-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 691.46h3.36v-1.6" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m37.541 689.06v-1.92h-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 710.02h3.36v-4.32h-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 728.74h3.36v-1.76" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m37.541 726.18v-1.92h-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 747.3h3.36v-4.32h-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 766.02h3.36v-4.48h-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 780.26v4.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m37.541 784.58v-4.32h-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.181 780.26v-14.24m0-4.48v-14.08m3.36-316.8v14.24m0 4.48v14.24m0 4.32v14.24m0 4.48v14.08m0 4.48v14.24m0 4.32v14.24m0 4.48v14.24m0 4.32v14.24m0 4.48v14.24m0 4.32v14.24m0 4.32v14.24m0 4.48v14.24m0 4.32v14.24m0 4.48v14.24m0 4.32v14.24m0 4.32v14.24m0 4.48v14.24m0 4.32v14.24m0 4.48v14.24" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m34.021 424.42v6.24m0 14.24v4.48m0 14.24v4.32m0 14.24v4.48m0 14.08v4.48m0 14.24v4.32m0 14.24v4.48m0 14.24v4.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.021 575.3v4.48h0.16v-4.48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.021 594.02v4.32h0.16v-4.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.021 612.58v4.48h0.16v-4.48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.021 631.14v4.48h0.16v-4.48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.021 649.86v4.32h0.16v-4.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.021 668.42v4.48h0.16v-4.48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.021 687.14v4.32h0.16v-4.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.021 705.7v4.48h0.16v-4.48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.021 724.26v4.48h0.16v-4.48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.021 742.98v4.48h0.16v-4.48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.021 761.54v4.48h0.16v-4.48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m34.021 780.26v4.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m347.62 468.9h0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m147.3 349.38h-37.12m0 3.36h36.32m0.8 0v-0.16m-37.12 36.8h36.32m0-0.64h-36.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m146.5 389.38v-0.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m146.5 352.74v36m0 0.64v46.4m0 0.64v9.44m0.8 0v-93.12" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m146.5 352.74h0.16m0.64 0h0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m146.5 435.78h-36.32m0 0.64h36.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m146.5 436.42v-0.64m-35.52-25.92h5.28m-5.28 21.6h5.28m-5.28-20h5.28m-5.28 1.76h5.28m-5.28 1.6h5.28m-5.28 1.6h5.28m-5.28 1.76h5.28m-5.28 1.6h5.28m-5.28 1.6h5.28m-5.28 1.76h5.28m-5.28 1.6h5.28m-5.28 1.76h5.28m-5.28 1.6h5.28m-5.28 1.6h5.28m-5.28 1.76h5.28m-5.28-20h5.28m-5.28 1.76h5.28m-5.28 1.6h5.28m-5.28 1.6h5.28m-5.28 1.76h5.28m-5.28 1.6h5.28m-5.28 1.6h5.28m-5.28 1.76h5.28m-5.28 1.6h5.28m-5.28 1.76h5.28m-5.28 1.6h5.28m-5.28 1.6h5.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m116.26 431.46v-21.6m0.32 0h0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m116.58 431.46h0.16v-21.6" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m116.26 431.46h0.32v-21.6h-0.32z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m110.98 431.46v-21.6m-0.48 0h0.16m-0.16 21.6v-0.48m0-4.64v-16.48m0.16 21.6h-0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m110.66 431.46h0.32v-21.6h-0.32z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m110.34 405.38v-6.56m8.32 6.56v-6.56m-6.56 6.56v-6.56m1.6 6.56v-6.56m1.76 6.56v-6.56m1.6 6.56v-6.56m1.6 6.56v-6.56m-6.56 6.56v-6.56m1.6 6.56v-6.56m1.76 6.56v-6.56m1.6 6.56v-6.56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m118.66 398.82h-8.32m0-0.32v-0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m118.66 398.5v-0.16h-8.32" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m110.34 398.66h8.32v-0.16h-8.32z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m118.66 405.38h-8.32" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m110.34 405.7v0.16h8.32v-0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m110.34 405.7h8.32v-0.32h-8.32z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m110.18 444.9v-8.48m0-0.64v-4.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m110.18 426.34v-20.96h-3.36v42.56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m110.18 398.66v-9.28m0-0.64v-17.28m0-4.64v-14.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m106.82 344.42v54.24h3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m107.62 348.1v-3.68h-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m107.62 337.86v-3.68" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m107.62 329.54v-3.68h-0.8v12h0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m107.62 319.3v-3.68" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m107.62 310.98v-3.68h-0.8v12h0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m107.62 300.58v-3.68" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m107.62 292.26v-3.68h-0.8v12h0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m107.62 282.02v-3.68m0-4.64v-16.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m106.82 257.38v24.64h0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m308.74 447.14v-33.76m0-0.8v-44.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m308.74 367.62v-15.04" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m305.38 352.58v93.28m3.36 1.28h0.16m41.76 2.88v-15.68m0-3.36v-4m-3.36 0v23.04m41.12 0v-15.68m-3.52 0v15.68" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m350.66 434.34h26.56v-3.36h-26.56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m383.78 434.34h1.12" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m388.42 434.34v-3.36h-4.64v3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m350.66 412.58h-41.92m0 0.8h38.4" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m308.74 412.58v0.8m38.4 0v-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m350.66 426.98v-2.08h-0.64v2.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m347.3 426.98h3.36m0-8v-2.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m350.02 416.9v2.08h0.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m350.66 347.78v-4.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m347.3 343.62v4.16h2.72" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m350.02 347.78h0.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m350.02 367.62h-41.28m0 0.64h41.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m308.74 367.62v0.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m347.14 384.58v3.04m3.36 0v-3.04" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m347.14 413.38v3.52h3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m350.5 416.9v-4.32m35.04 18.4v-3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m384.9 426.98v4h0.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m385.54 427.62h8v-0.64h-8.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m399.46 427.62h10.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m409.54 426.98h-10.08v0.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m409.54 427.62v-0.64m-47.84 15.52v-2.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m361.7 448.42h-6.08v-13.92h6.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m377.7 440.42v2.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m377.7 434.5h5.92v13.92h-5.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m375.62 434.5v5.92m-13.92-5.92v5.92m0 8v-5.6m16 5.6v-5.92m0-8v5.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m375.62 440.42h-13.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m375.62 434.5h-13.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m361.7 442.5h13.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m377.7 442.5h-0.16m-0.32 0h-1.6" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m361.7 448.42h16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m375.62 440.42h1.6m-1.6-5.92h2.08m-4 0v5.92m-2.08-5.92v5.92m-1.92-5.92v5.92m-2.08-5.92v5.92m-1.92-5.92v5.92m-2.08-5.92v5.92m-1.92-5.92v5.92m0 8v-5.6m1.92 5.6v-5.6m2.08 5.6v-5.6m1.92 5.6v-5.6m2.08 5.6v-5.6m1.92 5.6v-5.6m2.08 5.6v-5.6m1.92 5.6v-5.6m2.08 5.6v-5.92m0-8v5.92m-4-5.92v5.92m-2.08-5.92v5.92m-1.92-5.92v5.92m-2.08-5.92v5.92m-1.92-5.92v5.92m-2.08-5.92v5.92m0 8v-5.6m2.08 5.6v-5.6m1.92 5.6v-5.6m2.08 5.6v-5.6m1.92 5.6v-5.6m2.08 5.6v-5.6m1.92 5.6v-5.6" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m361.22 442.5v0.32h16.32" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m377.54 442.5v-2.56h-1.92" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m361.7 442.5h-0.48m14.4-2.24h1.6" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m361.22 442.5v0.16h0.48" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m375.62 440.26h1.76" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m361.22 442.5h16v-2.08h-1.6" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m361.22 442.66v0.16h16.32v-2.72h-1.92" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m361.22 442.66h16v-2.4h-1.6" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m350.66 412.58v-4.96h-0.64v4.96" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m350.66 401.7v-14.08h-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m350.02 387.62v14.08h0.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m350.66 384.58v-19.52h-0.64v2.56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m350.02 368.26v16.32m-2.88 0h3.52m0-26.08v-2.56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m350.66 355.3v-7.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m350.02 347.78v10.72h0.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m305.38 349.22h-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m152.74 349.22h-5.44v0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m305.06 352.58h0.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m147.3 352.58h157.76m0.32 0v-3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m409.54 343.62v10.24h2.88v0.48h0.64v-14.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m409.54 366.02v7.84h2.88v0.32h0.64v-8.48h-0.64v0.32z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m409.54 386.02v3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m409.54 390.02v2.4h2.88v0.48h0.64v-7.36h-0.64v0.48h-2.88" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m409.54 404.74v4.96" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m409.54 410.34v0.64h2.88v0.48h0.64v-7.2h-0.64v0.48h-2.88" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m409.54 423.3v3.68" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m409.54 427.62v3.36h2.88v0.48h0.64v-8.64h-0.64v0.48h-2.88" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m409.54 443.3v6.72" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m413.06 453.38v-10.56h-0.64v0.48h-2.88" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m409.54 443.3v-12.32m0-7.68v-12.32m0-6.24v-12.32m0-6.4v-12.16m0-7.84v-12.16m3.52 0.48v11.36m0 8.48v11.36m0 7.36v11.36m0 7.2v11.36m0 8.64v11.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m409.54 450.02h-21.12m-3.52 0h-34.24m-3.36 0h-38.56m-3.36 3.36h107.68" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m413.06 340.26h-43.2v0.64h0.48v2.72h3.68" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m374.66 343.62h34.88" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m358.5 340.26h-24.48v0.64h0.48v2.72h12.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m350.66 343.62h7.52v-2.72h0.32v-0.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m322.66 340.26h-17.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m308.74 343.62h13.44v-2.72h0.48v-0.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m322.66 340.26h11.36m24.48 0h11.36m0.48 3.36h-12.16m-23.68 0h-12.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m305.38 340.26v8.96m3.36 3.36v-8.96m0 106.4v-2.88m-3.36 1.28v4.96" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m305.22 494.34h42.4v-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m305.06 448.58v5.12m0.16-0.16v-5.12m-0.16 5.28h108.16m-0.16-0.16h-107.84" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m413.22 453.7v-10.88h-0.16v10.72" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m413.06 431.46h0.16v-8.64h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m413.06 411.46h0.16v-7.2h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m413.06 392.9h0.16v-7.36h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m413.06 374.18h0.16v-8.48h-0.16z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m413.22 354.34v-14.24" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m413.06 340.26v14.08h0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m413.22 354.34v11.36m0 8.48v11.36m0 7.36v11.36m0 7.2v11.36m0 8.64v11.36m-0.16 0v-11.36m0-8.64v-11.36m0-45.76v-11.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m413.22 340.1h-43.36v0.16h43.2" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m334.02 340.26h24.48v-0.16h-24.48z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m322.66 340.1h-17.6" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m305.22 340.26h17.44v-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m322.66 340.1h11.36m24.48 0h11.36m0 0.16h-11.36m-24.48 0h-11.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m305.06 340.1v8.96m0.16 0.16v-8.96" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m305.06 349.22h0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m147.3 352.58h-36.32v0.16h35.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m147.3 352.74h157.76v-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m146.5 352.74h0.8m157.92 141.6v-40.64m3.36 0v37.12m39.04 3.36h-42.4m3.36-3.36h35.52m3.52-37.12v40.48m-3.52-3.36v-37.12" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m409.54 409.7h-23.68v0.64h23.68" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m379.78 409.7h-8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m371.14 410.34h8.64v-0.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m409.54 410.34v-0.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m371.78 409.7v-19.68" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m371.78 389.38v-3.2h-0.64v24.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m371.78 380.1v-24.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m371.14 355.94v24.16h0.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m350.66 355.94h6.88v-0.64h-6.88" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m363.62 355.94h7.52m0.64 0h2.88" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m374.02 355.3h-10.4v0.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m350.66 355.3v0.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m374.66 355.94v-12.32m-0.64 0v11.68" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m374.66 343.62h-0.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m409.54 389.38h-37.76m0 0.64h37.76" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m409.54 390.02v-0.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m453.54 842.66h-4.16v3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m435.14 842.66h-4.32v3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m435.14 846.02v-3.36m-18.56 0h-2.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m413.7 842.66h-1.6v3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m416.58 846.02v-3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m397.86 842.66h-1.44" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m395.62 842.66h-2.08v3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m397.86 846.02v-3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m379.3 842.66h-4.48v3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m379.3 846.02v-3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m360.74 842.66h-4.48v3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m360.74 846.02v-3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m342.02 842.66h-4.32v3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m342.02 846.02v-3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m323.46 842.66h-4.48v3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m323.46 846.02v-3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m304.74 842.66h-4.32v3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m304.74 846.02v-3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m286.18 842.66h-4.48v3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m286.18 846.02v-3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m267.46 842.66h-4.32v3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m267.46 846.02v-3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m248.9 842.66h-4.32v3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m248.9 846.02v-3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m230.34 842.66h-4.48v3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m230.34 846.02v-3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m211.62 842.66h-4.32v3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m211.62 846.02v-3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m193.06 842.66h-4.48v3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m193.06 846.02v-3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m174.34 842.66h-4.32v3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m174.34 846.02v-3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m155.78 842.66h-4.32v3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m155.78 846.02v-3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m137.22 842.66h-4.48v3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m137.22 846.02v-3.36m-18.72 0h-7.04m0 3.36h0.16m6.88 0v-3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m244.58 846.02h4.32m-23.04 0h4.48m-23.04 0h4.32m-23.04 0h4.48m-23.04 0h4.32m-22.88 0h4.32m-23.04 0h4.48m-25.6 0h6.88m204.96-3.36h14.24m4.32 0h14.24m4.48 0h14.08m4.48 0h14.24m4.32 0h14.24m4.48 0h14.24m4.32 0h14.24m-330.88 0h14.24m4.48 0h14.24m4.32 0h14.24m4.32 0h14.24m4.48 0h14.24m4.32 0h14.24m4.48 0h14.24m4.32 0h14.24m4.32 0h14.24m4.48 0h14.24m4.32 0h14.24" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m111.62 846.18h6.88v-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m111.62 846.02v0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m132.74 846.18h4.48v-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m132.74 846.02v0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m151.46 846.18h4.32v-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m151.46 846.02v0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m170.02 846.18h4.32v-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m170.02 846.02v0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m188.58 846.18h4.48v-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m188.58 846.02v0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m207.3 846.18h4.32v-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m207.3 846.02v0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m225.86 846.18h4.48v-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m225.86 846.02v0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m244.58 846.18h4.32v-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m244.58 846.02v0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m263.14 846.18h4.32v-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m263.14 846.02v0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m281.7 846.18h4.48v-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m281.7 846.02v0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m300.42 846.18h4.32v-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m300.42 846.02v0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m318.98 846.18h4.48v-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m318.98 846.02v0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m337.7 846.18h4.32v-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m337.7 846.02v0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m356.26 846.18h4.48v-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m356.26 846.02v0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m374.82 846.18h4.48v-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m374.82 846.02v0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m393.54 846.18h4.32v-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m393.54 846.02v0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m412.1 846.18h4.48v-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m412.1 846.02v0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m430.82 846.18h4.32v-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m430.82 846.02v0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m449.38 846.18h6.24v-0.16h-2.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m449.38 846.02v0.16m2.88-111.2h-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m449.54 734.82v3.52h2.72" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m430.98 734.82v3.52h5.12" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m412.26 734.82v3.52h4.48v-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m393.7 734.82v3.52h5.12" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m398.02 738.34v-3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m374.98 734.82v3.52h4.48v-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m356.42 734.82v3.52h4" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m360.74 738.34v-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m337.86 734.98h-0.16v3.36h4.48v-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m319.14 734.82v3.52h4.48v-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m300.58 734.82v3.52h4.32v-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m281.86 734.82v3.52h4.48v-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m263.3 734.82v3.52h2.24" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m266.34 738.34h1.28v-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m244.58 734.98v3.36h4.48v-3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m228.26 738.34h0.16m1.92 0v-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m228.26 738.34h-0.16m221.44 0h-13.44m-5.12 0h-14.24m-4.48 0h-13.44m-5.12 0h-14.24m-4.48 0h-13.76m-4.8 0h-12.96m-0.8 0h-0.48m-4.48 0h-12.16m-0.8 0h-1.12m-4.48 0h-12m-0.8 0h-1.44m-4.32 0h-14.24m-4.48 0h-14.24m-4.32 0h-14.24m-4.48 0h-12.96" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m452.1 734.82h-2.56m-14.24 0h-4.32m-14.24 0h-4.48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m393.7 734.82h4.32v0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m379.46 734.82h-4.48m-14.24 0h-4.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m342.18 734.82h-4.32v0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m323.62 734.82h-4.48m-14.24 0h-4.32m-14.24 0h-4.48m-14.24 0h-4.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m249.06 734.82h-4.48v0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m249.06 734.98v-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m230.34 734.82h-4v0.16h1.76" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m435.3 734.82h14.24" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m226.02 778.18v3.52m-14.24-3.36h-4.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m207.46 778.18v3.52h4.32v-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m193.22 778.34h-4.48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m188.74 778.18v3.52h4.48v-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m174.5 778.34h-4.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m170.18 778.18v3.52h4.32v-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m155.94 778.34h-10.72m-3.36 0h-42.56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m98.501 781.7h57.44v-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m226.02 781.7h-14.24m-4.32 0h-14.24m-4.48 0h-14.24m-4.32 0h-14.24" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m228.1 778.18h-2.08m0 0.16h2.24m-16.48-0.16h-4.32m-14.24 0h-4.48m-14.24 0h-4.32m-14.24 0h-10.72" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m96.901 28.742v3.52h1.6" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.901 32.262h1.76v-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m96.901 32.262h-14.24" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m82.661 28.742h-66.56m4.16 4.32h56.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m78.981 33.062v-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m98.501 28.742h-1.6z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m15.941 28.742h66.72" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m82.661 28.742h14.24m2.56-13.6v-7.04" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m100.26 15.142v-7.04h-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m101.86 18.662h40m3.36 0v-3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m141.86 18.662v5.28h2.88v0.32h0.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m141.86 31.942v6.56h2.88v0.48h0.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.38 31.462h-0.64v0.48h-2.88" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m141.86 46.662v3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m141.86 53.542v0.96h3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.38 46.182h-0.64v0.48h-2.88" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m141.86 68.742v4.48h3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.38 68.742h-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m141.86 87.462v4.32h3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.38 87.462h-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m141.86 106.02v4.32h3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.38 106.02h-3.52m0 18.56v2.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m141.86 127.46v1.6h3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.38 124.58h-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m141.86 143.3v4.32h3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.38 143.3h-3.52m0 18.56v1.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m141.86 164.58v1.76h3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.38 161.86h-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m141.86 180.58v4.32h3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.38 180.58h-3.52m0 18.56v1.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m141.86 201.86v1.76h3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.38 199.14h-3.52m0 18.72v1.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m141.86 220.58v1.6h3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.38 217.86h-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m141.86 236.42v4.32h3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.38 236.42h-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m141.86 255.62v-0.64h3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m141.86 198.96v-14.24m0-4.32v-14.24m0-4.48v-14.24m0-4.32v-14.24m0-4.48v-14.24m0-4.32v-14.24m0-4.32v-14.24m0-4.48v-14.24m0-7.84v-8.16m0-6.56v-8m0 231.04v-14.24m0-4.32v-14.24m0-4.32v-14.24" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m101.86 50.182v-4.32h-3.36v10.88" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m101.86 39.142v-20.48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m98.501 32.262v6.88h3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m98.501 18.662v10.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m145.38 255.62v-0.64m0-14.24v-4.32m0-14.24v-4.32m0-14.24v-4.48m0-14.24v-4.32m0-14.24v-4.48m0-14.24v-4.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.38 124.58v4.48h-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.38 110.34v-4.32m0-14.24v-4.32m0-14.24v-4.48m0-14.24v-8.32m0-7.2v-7.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m145.38 24.262v-9.12h-47.04" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m98.501 15.302h46.72m-46.88-0.16v13.6m0.16-10.08v-3.36m0 76.8v13.92m0.8 0v-13.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m98.501 110.66v2.08h0.8v-2.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m98.501 122.66v1.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m99.301 124.58v-1.92h-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m98.501 129.38v13.92m0.8 0v-13.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m98.501 147.94v1.92h0.8v-1.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m98.501 159.94v1.92m0 4.64v14.08m0.8 0v-14.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m99.301 161.86v-1.92h-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m98.501 185.22v1.92h0.8v-1.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m98.501 197.22v1.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m99.301 199.14v-1.92h-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m98.501 203.78v14.08m0 4.64v13.92m0.8 0v-13.92m0-4.64v-14.08m0-116.32v-14.08m-0.8 0v14.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m99.301 255.62v-2.56h-0.8v4.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m99.301 242.98v-1.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m98.501 241.06v1.92h0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.101 352.74v16.32m0.8-25.28v-9.6m0-4.64v-13.92m-0.8 0v2.56m0 0.64v10.72m0 4.64v3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.101 338.18v5.6h0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.901 305.54v-8.64m0-4.64v-13.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.901 273.7v-3.36h-0.8v3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.101 278.34v13.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.101 296.9v8.64h0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.901 263.62v-4" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.101 259.62v4h0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.101 428.58v16.32m0 4.64v14.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.101 468.26v13.92h0.8v-13.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.901 463.62v-14.08m0-4.64v-27.36m-0.8 71.36v11.84m0 4.8v13.92m0 4.64v13.92m0.8 0v-13.92m0-4.64v-13.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.901 500.74v-11.84h-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.101 65.222v10.24h0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.101 85.382v2.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.901 87.462v-2.08h-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.101 92.102v13.92m0.8 0v-13.92m-0.8 18.56v13.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.101 129.38v1.92h0.8v-1.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.901 124.58v-13.92m-0.8 30.56v2.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.901 143.3v-2.08h-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.101 147.94v13.92m0.8 0v-13.92m-0.8 18.56v14.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.101 185.22v1.92h0.8v-1.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.901 180.58v-14.08m-0.8 30.72v1.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.901 199.14v-1.92h-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.101 203.78v14.08m0 4.64v13.92m0.8 0v-13.92m0-4.64v-14.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.101 241.06v3.68h0.8v-3.68" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.101 251.3v3.68" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.901 254.98v-3.68h-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m76.901 33.062v7.36h4v-8.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m76.901 53.702v7.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.901 75.462v-21.76h-4" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m99.301 778.34v-7.52h-0.8v10.88" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m99.301 761.54v-3.2h-0.8v3.2" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m99.301 751.78v-4.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m98.501 747.62v4.16h0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m99.301 742.98v-3.2h-0.8v3.2" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m99.301 733.22v-4.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m98.501 728.9v4.32h0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m99.301 724.26v-13.92m-0.8 0v13.92m0.8-18.56v-13.92m-0.8 0v13.92m0.8-18.56v-14.08m-0.8 0v14.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m99.301 668.42v-2.4h-0.8v2.4" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m99.301 659.3v-4.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m98.501 654.5v4.8h0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m99.301 649.86v-2.08h-0.8v2.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m99.301 641.06v-5.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m98.501 635.78v5.28h0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m99.301 631.14v-13.92m-0.8 0v13.92m0.8-18.56v-13.92m-0.8 0v13.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m99.301 594.02v-0.8h-0.8v0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m99.301 586.5v-6.56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m98.501 579.94v6.56h0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m99.301 575.3v-13.92m-0.8 0v13.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.741 799.3v-6.56h-0.8v6.56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.741 786.02v-1.12" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m79.941 784.9v1.12h0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.741 780.26v-14.08m-0.8 0v14.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.901 761.54v-3.2h-0.8v3.2" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.901 751.78v-4.16m0-4.64v-14.08m-0.8 0v14.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.101 747.62v4.16h0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.901 724.26v-13.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.901 705.7v-3.52h-0.8v3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.101 710.34v13.92m0.8-28.8v-3.68" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.901 687.14v-3.2h-0.8v3.2" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.101 691.78v3.68h0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.901 677.22v-4.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.101 673.06v4.16h0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.901 668.42v-13.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.901 649.86v-2.4h-0.8v2.4" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.101 654.5v13.92m0.8-27.68v-4.96m0-4.64v-13.92m0-4.64v-13.92m-0.8 0v13.92m0 4.64v13.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.101 635.78v4.96h0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.901 594.02v-14.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.901 575.3v-1.44h-0.8v1.44" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.101 579.94v14.08m0.8-26.88v-5.76" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.101 561.38v5.76h0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.901 556.74v-14.08m-0.8 0v14.08m19.2-5.44v-9.44" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m98.501 540.26v11.04h0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m454.34 781.54h7.52v-3.36h-5.44" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m471.78 781.54h6.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m476.9 778.18h-5.12v3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m226.02 781.7h18.4m0-0.8h-12.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m249.06 781.7h3.04v-0.8h-3.04" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m258.82 781.7h4.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m262.98 780.9h-4.16v0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m267.62 781.7h14.08m0-0.8h-14.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m286.34 781.7h5.28v-0.8h-5.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m298.18 781.7h2.08m6.08-0.8h-1.44" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m300.26 780.9h-2.08v0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m304.9 781.7h6.72v-0.8h-4.48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m318.34 781.7h0.48m5.92-0.8h-1.12" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m318.82 780.9h-0.48v0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m323.62 781.7h5.28v-0.8h-3.36" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m335.62 781.7h1.92m5.12-0.8h-0.48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m337.54 780.9h-1.92v0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m342.18 781.7h4.32v-0.8h-3.04" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m353.06 781.7h3.04" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m356.1 780.9h-3.04v0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m360.74 781.7h6.24v-0.8h-5.76" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m373.7 780.9v0.8h1.12" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m379.46 781.7h13.92m0-0.8h-13.92m-4.64 0h-1.12" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m398.02 781.7h5.6v-0.8h-4.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m410.34 781.7h1.6" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m411.94 780.9h-1.6v0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m416.74 781.7h13.92m0-0.8h-13.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m435.3 781.7h6.08v-0.8h-5.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m447.94 781.7h6.4v-0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m452.26 780.9h-4.32v0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m57.061 377.7v9.28m-23.84-9.28v9.28m23.84 23.84v9.28m-23.84-9.28v9.28m0-13.12v-16m23.84 16v-16m-23.84-0.32h0.16m-0.16 16.64h0.16m21.76-29.6v9.28m-2.08-9.28v9.28m-1.92-9.28v9.28m-1.92-9.28v9.28m-2.08-9.28v9.28m-1.92-9.28v9.28m-2.08-9.28v9.28m-1.92-9.28v9.28m-2.08-9.28v9.28m-1.92-9.28v9.28m-2.08-9.28v9.28m-1.92-9.28v9.28m21.92 23.84v9.28m-2.08-9.28v9.28m-1.92-9.28v9.28m-1.92-9.28v9.28m-2.08-9.28v9.28m-1.92-9.28v9.28m-2.08-9.28v9.28m-1.92-9.28v9.28m-2.08-9.28v9.28m-1.92-9.28v9.28m-2.08-9.28v9.28m-1.92-9.28v9.28m0-13.12v-16m1.92 16v-16m2.08 16v-16m1.92 16v-16m2.08 16v-16m1.92 16v-16m2.08 16v-16m1.92 16v-16m2.08 16v-16m1.92 16v-16m1.92 16v-16m2.08 16v-16m1.92 16v-16m-1.92-13.28v9.28m-2.08-9.28v9.28m-1.92-9.28v9.28m-1.92-9.28v9.28m-2.08-9.28v9.28m-1.92-9.28v9.28m-2.08-9.28v9.28m-1.92-9.28v9.28m-2.08-9.28v9.28m-1.92-9.28v9.28m-2.08-9.28v9.28m20 23.84v9.28m-2.08-9.28v9.28m-1.92-9.28v9.28m-1.92-9.28v9.28m-2.08-9.28v9.28m-1.92-9.28v9.28m-2.08-9.28v9.28m-1.92-9.28v9.28m-2.08-9.28v9.28m-1.92-9.28v9.28m-2.08-9.28v9.28m0-13.12v-16m2.08 16v-16m1.92 16v-16m2.08 16v-16m1.92 16v-16m2.08 16v-16m1.92 16v-16m2.08 16v-16m1.92 16v-16m1.92 16v-16m2.08 16v-16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m57.061 386.98h-24.16v4h24.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m33.221 390.66h0.16m23.68-3.36v0.16m-23.84 3.36h-0.16m24-0.16h0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m57.061 387.46h-23.84v3.2h23.84" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m57.061 387.3v-0.32h-24.16v4h24.16v-0.32" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m57.061 387.3h-23.84v3.36h23.84" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m33.221 407.3h0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m57.061 410.82h-24.16v-3.84h24.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m57.061 410.5v-0.16h-23.84v-2.88h23.84v-0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m33.221 407.3h-0.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m57.061 410.66v-0.16h-23.84v-3.2h23.84v-0.32" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m57.061 410.66h-24.16v-3.68h24.16" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m156.26 255.62h-10.88" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m152.74 257.38v2.24h2.56v0.32h0.8v-4.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m152.74 273.86v4.32h2.56v0.48h0.8v-5.28h-0.8v0.48z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m152.74 292.42v1.76" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m152.74 294.98v1.76h2.56v0.48h0.8v-5.28h-0.8v0.48h-2.56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m152.74 310.98v1.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m152.74 313.7v1.76h2.56v0.48h0.8v-5.28h-0.8v0.32h-2.56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m152.74 329.7v1.76" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m152.74 332.26v1.76h2.56v0.48h0.8v-5.28h-0.8v0.48h-2.56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m152.74 348.26v0.96" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m156.1 349.22v-1.44h-0.8v0.48h-2.56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m152.74 348.26v-14.24m0-4.32v-14.24m0-4.48v-14.24m0-4.32v-14.24m0-4.32v-14.24m3.36 0.32v13.44m0 5.28v13.28m0 5.28v13.44m0 5.28v13.28m0 5.28v13.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m156.26 352.74v-3.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m156.26 349.06v-1.28 4.96" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m156.26 334.5v-5.28z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m156.26 315.94v-5.28z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m156.26 297.22v-5.28z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m156.26 278.66v-5.28z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m156.26 259.94v-4.32z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m156.26 259.94v13.44m0 5.28v13.28m0 5.28v13.44m0 5.28v13.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m156.26 334.5v13.28z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m156.26 329.22v-13.28m0-5.28v-13.44m0-5.28v-13.28m0-5.28v-13.44" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m432.26 802.98v2.72h0.8v-2.72" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m432.26 812.42v2.4" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m432.26 815.62v27.04h0.8v-30.24h-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m432.26 814.82h-5.28v0.8h5.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m420.26 814.82h-9.44v0.8h2.88" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m414.5 815.62h5.76v-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m404.1 814.82h-7.68" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m396.42 815.62h7.68v-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m285.54 812.74h-20.8m0 0.8h20.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m228.9 802.98v39.68h0.8v-39.68" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m209.06 802.98v19.84h0.8v-19.84" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m209.06 829.54v5.12h0.48v-0.32h0.32v-4.8z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m209.06 839.94v2.72h0.8v-2.24h-0.32v-0.48z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m209.06 839.94v-5.28m0.8-0.32v6.08" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m156.74 540.26h-49.12m-0.8 0h-8.32m0.8 1.6h42.56m3.36 0h0.16m0 0h14.72" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m106.82 524.1h3.68v-4.64h-3.68z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m110.5 519.46h-2.88" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m107.62 524.1h2.88v-4.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m106.82 505.54h3.68v-4.8h-3.68z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m110.5 500.74h-2.88" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m107.62 505.54h2.88v-4.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m106.82 486.82h3.68v-4.64h-3.68z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m110.5 482.18h-2.88" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m107.62 486.82h2.88v-4.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m106.82 468.26h3.68v-4.64h-3.68z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m110.5 463.62h-2.88" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m107.62 468.26h2.88v-4.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m106.82 449.54h3.68v-4.64h-3.68z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m110.5 444.9h-0.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m107.62 449.54h2.88v-4.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m106.82 430.98h3.68v-4.64h-3.68z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m110.5 426.34h-0.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m110.18 430.98h0.32v-4.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m106.82 371.46h3.68v-4.64h-3.68z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m110.5 366.82h-0.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m110.18 371.46h0.32v-4.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m106.82 352.74h3.68v-4.64h-3.68z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m110.5 348.1h-2.88" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m110.18 352.74h0.32v-4.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m106.82 334.18h3.68v-4.64h-3.68z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m110.5 329.54h-2.88" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m107.62 334.18h2.88v-4.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m106.82 315.62h3.68v-4.64h-3.68z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m110.5 310.98h-2.88" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m107.62 315.62h2.88v-4.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m106.82 296.9h3.68v-4.64h-3.68z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m110.5 292.26h-2.88" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m107.62 296.9h2.88v-4.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m106.82 278.34h3.68v-4.64h-3.68z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m110.5 273.7h-2.88" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m107.62 278.34h2.88v-4.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m98.501 257.38h8.32m0.8 0h45.12m3.52-1.76h-11.04m-3.36 0h-42.56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m99.301 68.742v-1.92h-0.8v1.92" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m99.301 53.542v3.2h-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m141.86 50.182h-40m-3.36 3.36h43.36m-64.32 364v2.56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m77.541 424.26v4.32h2.56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.901 417.54h-1.28m-0.8 0h-1.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m79.621 417.54h-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m78.821 380.26v4.32h0.8v-4.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m78.821 403.14h0.8v-8.48h-0.8z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m78.821 413.22v4.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m79.621 417.54v-4.32h-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m79.621 380.26h-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m80.901 380.26v-27.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m80.101 369.06h-2.56v4.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m77.541 377.7v2.56h1.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m79.621 380.26h1.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m77.221 87.462 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 87.462h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 92.102v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 106.02 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 106.02h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 110.66v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 124.58 3.68 4.8h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 124.58h3.68v4.8" fillRule="evenodd" />
                                        <path d="m80.901 129.38v-4.8h-3.68v4.8h3.68v-4.8h-3.68v4.8z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 143.3 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 143.3h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 147.94v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 161.86 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 161.86h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 166.5v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 180.58 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 180.58h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 185.22v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 199.14 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 199.14h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 203.78v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 217.86 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 217.86h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 222.5v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 236.42 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 236.42h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 241.06v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m98.501 87.462 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m98.501 87.462h3.68v4.64" fillRule="evenodd" />
                                        <path d="m102.18 92.102v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m98.501 106.02 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m98.501 106.02h3.68v4.64" fillRule="evenodd" />
                                        <path d="m102.18 110.66v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m98.501 124.58 3.68 4.8h-3.68" fillRule="evenodd" />
                                        <path d="m98.501 124.58h3.68v4.8" fillRule="evenodd" />
                                        <path d="m102.18 129.38v-4.8h-3.68v4.8h3.68v-4.8h-3.68v4.8z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m98.501 143.3 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m98.501 143.3h3.68v4.64" fillRule="evenodd" />
                                        <path d="m102.18 147.94v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m98.501 68.742 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m98.501 68.742h3.68v4.64" fillRule="evenodd" />
                                        <path d="m102.18 73.382v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m98.501 161.86 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m98.501 161.86h3.68v4.64" fillRule="evenodd" />
                                        <path d="m102.18 166.5v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m98.501 180.58 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m98.501 180.58h3.68v4.64" fillRule="evenodd" />
                                        <path d="m102.18 185.22v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m98.501 199.14 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m98.501 199.14h3.68v4.64" fillRule="evenodd" />
                                        <path d="m102.18 203.78v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m98.501 217.86 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m98.501 217.86h3.68v4.64" fillRule="evenodd" />
                                        <path d="m102.18 222.5v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m98.501 236.42 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m98.501 236.42h3.68v4.64" fillRule="evenodd" />
                                        <path d="m102.18 241.06v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 254.98 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 254.98h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 259.62v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 273.7 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 273.7h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 278.34v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 292.26 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 292.26h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 296.9v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 310.98 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 310.98h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 315.62v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 329.54 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 329.54h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 334.18v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 348.1 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 348.1h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 352.74v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 444.9 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 444.9h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 449.54v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 463.62 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 463.62h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 468.26v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 482.18 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 482.18h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 486.82v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 500.74 3.68 4.8h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 500.74h3.68v4.8" fillRule="evenodd" />
                                        <path d="m80.901 505.54v-4.8h-3.68v4.8h3.68v-4.8h-3.68v4.8z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 519.46 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 519.46h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 524.1v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 538.02 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 538.02h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 542.66v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 556.74 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 556.74h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 561.38v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 575.3 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 575.3h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 579.94v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 594.02 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 594.02h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 598.66v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 612.58 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 612.58h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 617.22v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 631.14 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 631.14h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 635.78v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 649.86 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 649.86h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 654.5v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 668.42 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 668.42h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 673.06v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 687.14 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 687.14h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 691.78v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 705.7 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 705.7h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 710.34v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 724.26 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 724.26h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 728.9v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 742.98 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 742.98h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 747.62v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 761.54 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 761.54h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 766.18v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m98.501 556.74 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m98.501 556.74h3.68v4.64" fillRule="evenodd" />
                                        <path d="m102.18 561.38v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m98.501 575.3 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m98.501 575.3h3.68v4.64" fillRule="evenodd" />
                                        <path d="m102.18 579.94v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m98.501 594.02 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m98.501 594.02h3.68v4.64" fillRule="evenodd" />
                                        <path d="m102.18 598.66v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m98.501 612.58 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m98.501 612.58h3.68v4.64" fillRule="evenodd" />
                                        <path d="m102.18 617.22v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m98.501 631.14 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m98.501 631.14h3.68v4.64" fillRule="evenodd" />
                                        <path d="m102.18 635.78v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m98.501 649.86 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m98.501 649.86h3.68v4.64" fillRule="evenodd" />
                                        <path d="m102.18 654.5v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m98.501 668.42 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m98.501 668.42h3.68v4.64" fillRule="evenodd" />
                                        <path d="m102.18 673.06v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m98.501 687.14 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m98.501 687.14h3.68v4.64" fillRule="evenodd" />
                                        <path d="m102.18 691.78v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m98.501 705.7 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m98.501 705.7h3.68v4.64" fillRule="evenodd" />
                                        <path d="m102.18 710.34v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m98.501 724.26 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m98.501 724.26h3.68v4.64" fillRule="evenodd" />
                                        <path d="m102.18 728.9v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m98.501 742.98 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m98.501 742.98h3.68v4.64" fillRule="evenodd" />
                                        <path d="m102.18 747.62v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m77.221 780.26 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m77.221 780.26h3.68v4.64" fillRule="evenodd" />
                                        <path d="m80.901 784.9v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m98.501 761.54 3.68 4.64h-3.68" fillRule="evenodd" />
                                        <path d="m98.501 761.54h3.68v4.64" fillRule="evenodd" />
                                        <path d="m102.18 766.18v-4.64h-3.68v4.64h3.68v-4.64h-3.68v4.64z" fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.12" />
                                        <path d="m102.18 201.86h5.28v-0.8h-5.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m114.18 201.86h27.68" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m141.86 201.06h-27.68v0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m77.221 219.78h-1.28v0.8h1.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m69.221 219.78h-31.52" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m37.701 220.58h31.52v-0.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m110.82 448.42h45.92m148.64-2.56h-194.56m-0.32 0v2.56m49.6 0.16h144.96m0.32-0.16h-145.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m160.1 448.42v0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m156.1 349.22h148.96m0-0.16h-148.8" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".8" />
                                        <path d="m156.26 349.06v0.16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".32" />
                                        <path d="m466.34 741.38v8.16m-0.16-8.32v8.32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".96" />
                                        <path d="m465.86 749.7v-8.32z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".96" />
                                        <path d="m465.86 751.14h-9.28m1.12 2.08h-1.12m2.08-4h-2.08m2.56-2.08h-2.56m2.72 0h3.84m0.64 0h2.08m-5.6 2.08h5.6m-1.6-4h1.6m-1.12-2.08h1.12m-3.68 2.08h-4.48m3.52-2.08h-3.04m2.24-1.92h-1.76" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".96" />
                                        <path transform="translate(8.501 7.9419)" d="m30.185 815.87-1.1932-0.0618 0.0063-10.643c0.0055-9.316 0.03776-10.588 0.2589-10.201 0.13895 0.24306 0.25546 0.65407 0.2589 0.91334 0.0034 0.25928 0.07446 0.49792 0.15782 0.53033 0.08336 0.0324 0.53263 0.7351 0.99839 1.5615 0.46576 0.82643 1.1533 1.9556 1.5278 2.5094 0.37454 0.55372 0.68099 1.1379 0.68099 1.2982s0.13921 0.32786 0.30936 0.37241c0.17015 0.0446 0.47685 0.33541 0.68157 0.64637 0.8285 1.2584 5.1542 5.8834 6.6152 7.0728 0.85848 0.6989 1.6117 1.4099 1.6739 1.5801 0.06214 0.17015 0.20706 0.30902 0.32205 0.30861 0.11498-4.2e-4 0.84545 0.42614 1.6233 0.94792 2.6348 1.7675 3.6485 2.4116 3.7952 2.4116 0.08043 0 0.49244 0.19792 0.91558 0.43981l0.76934 0.43981-9.104-0.0325c-5.0072-0.0179-9.641-0.0603-10.297-0.0943z" fill="#fff" fillOpacity=".99221" fillRule="evenodd" />
                                        <path transform="translate(8.501 7.9419)" d="m29.699 793.79-0.70723-1.612v-4.8741c0-2.8359 0.06918-4.9169 0.16543-4.9764 0.09099-0.0562 0.21462 0.27716 0.27473 0.74087 0.27818 2.1458 2.4305 9.0114 3.4539 11.017 0.1991 0.39027 0.32009 0.77738 0.26888 0.86025-0.12009 0.19431-1.2362 0.4329-2.0856 0.44583l-0.66279 0.0101z" fill="#fff" fillOpacity=".99221" fillRule="evenodd" />
                                        <path transform="translate(8.501 7.9419)" d="m40.855 808.98c-1.7357-1.4786-5.0401-5.0384-6.1098-6.582-0.38558-0.5564-0.45818-0.78175-0.30209-0.93783 0.113-0.113 0.20688-0.36853 0.20864-0.56785 0.0018-0.203 0.30661-0.61428 0.69306-0.9351l0.68987-0.57271 0.51868 0.83788c0.89262 1.442 5.2351 6.0703 6.9268 7.3828l1.5862 1.2307-0.64858 0.6642c-0.35672 0.36532-0.8154 0.66421-1.0193 0.66421-0.20389 0-0.4517 0.081-0.55069 0.17998-0.12212 0.12212-0.76274-0.31646-1.9928-1.3643z" fill="#fff" fillOpacity=".99221" fillRule="evenodd" />
                                        <path transform="translate(8.501 7.9419)" d="m50.059 815.24c-1.3609-0.68537-1.4642-0.77537-1.3796-1.2012 0.05033-0.2532 0.01347-0.5384-0.08191-0.63377-0.16887-0.16887 0.40676-1.8227 0.63441-1.8227 0.05547 0 0.92056 0.43772 1.9224 0.97273 2.1809 1.1646 6.3053 2.6809 9.0378 3.3226 0.19445 0.0457-1.675 0.0876-4.1543 0.0931l-4.5078 0.0101z" fill="#fff" fillOpacity=".99221" fillRule="evenodd" />
                                        <path transform="translate(8.501 7.9419)" d="m29.047 815.54c-0.06033-0.15722-0.05884-1.967 0.0033-4.0217 0.06215-2.0547 0.12182-6.5996 0.1326-10.1 0.01576-5.118 0.05946-6.2255 0.22321-5.6569 0.11199 0.38891 0.33477 0.90598 0.49507 1.149 0.80831 1.2257 2.8021 4.5926 2.8021 4.732 0 0.0877 0.33808 0.5147 0.7513 0.9488 0.41322 0.43411 1.4526 1.5996 2.3098 2.5899 1.8704 2.161 6.3685 6.4721 7.3122 7.0083 0.37138 0.21099 1.3116 0.81551 2.0894 1.3434 0.77782 0.52788 1.9711 1.2576 2.6516 1.6216l1.2374 0.66183-9.9492 5e-3c-9.0034 4e-3 -9.9597-0.0225-10.059-0.28121z" fill="#fff" fillOpacity=".99221" fillRule="evenodd" />
                                        <path transform="translate(8.501 7.9419)" d="m29.081 815.65c-0.05926-0.0959-0.05117-4.7638 0.01797-10.373 0.10156-8.2392 0.16564-10.065 0.3335-9.5042 0.1638 0.5475 1.504 2.9134 3.4119 6.0235 0.46216 0.75332 3.7384 4.3238 6.1926 6.7488 2.4144 2.3856 3.3205 3.148 5.2318 4.4019 1.2714 0.83409 2.8685 1.8216 3.5491 2.1945l1.2374 0.67798-9.9333 2e-3c-6.3415 2e-3 -9.9722-0.0606-10.041-0.17185z" fill="#fff" fillOpacity=".99221" fillRule="evenodd" />
                                        <path transform="translate(8.501 7.9419)" d="m29.047 815.54c-0.06052-0.15771-0.05863-3.4391 0.0042-7.292 0.06283-3.8529 0.12202-8.3974 0.13152-10.099 0.01305-2.3358 0.05973-2.9459 0.19055-2.4906 0.09529 0.33164 0.94111 1.8828 1.8796 3.4472 2.1454 3.576 5.2766 7.2142 9.8589 11.455 1.0888 1.0077 4.9523 3.6363 6.8831 4.6829l1.0607 0.57498-9.9492 4e-3c-9.0158 4e-3 -9.9596-0.0229-10.059-0.28273z" fill="#fff" fillOpacity=".99221" fillRule="evenodd" />
                                        <path transform="translate(8.501 7.9419)" d="m0.39775 819.56v-27.202h27.788l0.18866 0.51928c0.10376 0.28561 0.26503 0.67297 0.35837 0.86081l0.16972 0.34152 0.0217 9.8794 0.01497-4.8834 0.01497-4.8835 0.73963 1.4981-0.09046 0.16096-0.09047 0.16096 0.14129 0.2799c0.07771 0.15395 0.24207 0.44051 0.36523 0.6368 0.12317 0.1963 0.46166 0.76459 0.75221 1.2629s0.74782 1.254 1.0162 1.6794 0.59642 0.95239 0.72907 1.1712c0.3146 0.51882 0.70672 1.0606 0.96318 1.3307 0.11282 0.11884 0.36898 0.43483 0.56924 0.70221 0.69107 0.92263 1.7897 2.1576 3.6762 4.1322 1.2476 1.3059 2.0815 2.111 2.9788 2.8761 0.35145 0.29966 0.8794 0.77447 1.1732 1.0551 0.34612 0.33061 0.69297 0.61142 0.98511 0.79754 0.24799 0.15799 1.1412 0.74268 1.9849 1.2993 1.9569 1.2911 2.7974 1.8186 3.0044 1.8856 0.2119 0.0686 0.58267 0.25305 1.1371 0.56553l0.44194 0.2491-0.7955 0.0442 0.30936 0.0328c0.17015 0.0181 0.47047 0.033 0.66739 0.0331l0.35803 3.2e-4 1.0156 0.46147c0.7284 0.33096 1.7583 0.73154 3.6415 1.4164 2.2788 0.82873 2.7632 0.98937 3.6645 1.2151 0.57121 0.14305 1.1778 0.28363 1.3479 0.31239 0.23731 0.0401 0.33784 0.0809 0.43164 0.175 0.06725 0.0675 0.16669 0.13325 0.22097 0.14613 0.05428 0.0129 0.8047 0.16342 1.6676 0.33454 1.8077 0.35848 2.9771 0.4913 4.3182 0.49043 0.43243-2.8e-4 1.0299 0.0229 1.3276 0.0515l0.54138 0.052v26.06h-67.75zm47.398-3.5754c0.04861-8e-3 -1.4032-0.0123-3.2262-0.01l-3.3146 5e-3 2.9894 0.0226c2.8003 0.0211 3.3306 0.0186 3.5513-0.0173zm-18.904-8.1471c-0.0065-1.5009-0.01173-0.2729-0.01173 2.729s0.0053 4.2299 0.01173 2.729c0.0065-1.5009 0.0065-3.957 0-5.458zm5.8557 8.0877c-0.29776-8e-3 -0.785-8e-3 -1.0828 0s-0.05414 0.0139 0.54138 0.0139c0.59552 0 0.83914-6e-3 0.54138-0.0139zm1.812 2e-4c-0.17622-8e-3 -0.46459-8e-3 -0.64082 0-0.17622 8e-3 -0.03204 0.0153 0.32041 0.0153 0.35245 0 0.49663-7e-3 0.32041-0.0153zm1.812 0c-0.17622-8e-3 -0.46459-8e-3 -0.64082 0s-0.03204 0.0153 0.32041 0.0153 0.49663-7e-3 0.32041-0.0153zm-7.977-0.0418c-0.04254-0.0111-0.11214-0.0111-0.15468 0-0.04254 0.0111-0.0077 0.0202 0.07734 0.0202 0.08507 0 0.11988-9e-3 0.07734-0.0202zm1.5222-3e-3c-0.2748-8e-3 -0.71232-8e-3 -0.97227 6e-5 -0.25995 8e-3 -0.03512 0.0142 0.49963 0.0141 0.53475-3e-5 0.74744-6e-3 0.47264-0.0142zm-1.985-0.0435c-0.10257-9e-3 -0.28156-9e-3 -0.39775-2.5e-4 -0.11619 9e-3 -0.03227 0.0167 0.18649 0.0168 0.21876 1.4e-4 0.31383-7e-3 0.21126-0.0166zm-0.73054-0.0424c-0.04254-0.0111-0.11214-0.0111-0.15468 0-0.04254 0.0111-0.0077 0.0202 0.07734 0.0202 0.08507 0 0.11988-9e-3 0.07734-0.0202zm-0.17678-15.051c-0.0064-2.0236-0.01156-0.36792-0.01156 3.6792s0.0052 5.7027 0.01156 3.6792c0.0064-2.0236 0.0064-5.3348 0-7.3583zm0.04397-4.8151c-0.0082-0.20169-0.01497-0.0485-0.01502 0.34041-5.7e-5 0.3889 0.0067 0.55392 0.01492 0.3667 0.0083-0.18723 0.0083-0.50543 1.02e-4 -0.70711zm0.44028-0.26675c-0.01057-0.055-0.01962-0.0204-0.02011 0.0768-4.91e-4 0.0972 0.0082 0.1422 0.01922 0.1 0.01106-0.0423 0.01146-0.12181 8.92e-4 -0.17678zm-0.04526-0.21872c-0.01411-0.0353-0.02458-0.0248-0.0267 0.0267-0.0019 0.0466 0.0085 0.0727 0.02321 0.058 0.01469-0.0147 0.01625-0.0528 0.0035-0.0847zm-0.35203-0.24523c-0.01016-0.0672-0.01874-0.0227-0.01907 0.0988-3.31e-4 0.12154 8e-3 0.1765 0.01847 0.12215 0.01049-0.0544 0.01076-0.1538 6.03e-4 -0.22098zm0.11854-0.29123c0.03127-0.0235 0.02496-0.0301-0.01768-0.0184-0.03646 0.01-0.07091 0.0562-0.07656 0.1028-0.0072 0.0595-2e-3 0.065 0.01768 0.0184 0.01537-0.0365 0.04982-0.0827 0.07656-0.1028z" fill="#fff" fillOpacity=".99221" fillRule="evenodd" />
                                        <path transform="translate(8.501 7.9419)" d="m0.39775 808.95v-27.202h12.595c6.9274 0 12.596 0.0149 12.597 0.0331s0.02827 0.31157 0.06107 0.65186c0.0506 0.52496 0.05038 0.63191-0.0014 0.70589-0.03359 0.048-0.06107 0.15542-0.06107 0.23882 0 0.11866 0.03681 0.18619 0.16928 0.31057l0.16928 0.15894 0.1888 1.1437c0.15989 0.96851 0.26274 1.4152 0.67154 2.9168 0.26551 0.97524 0.58409 2.0814 0.70795 2.4582 0.37825 1.1505 1.0094 2.8714 1.214 3.31l0.1937 0.41526 0.0176 9.7319 0.029-4.2426c0.01595-2.3334 0.0334-4.4714 0.03878-4.7509l0.0098-0.50823 0.12199 0.26517c0.10518 0.22862 0.11301 0.27178 0.05682 0.31321-0.03584 0.0264-0.05405 0.0761-0.04047 0.11049 0.01819 0.046 0.02561 0.0421 0.02818-0.0149 8e-3 -0.17681 0.12961-0.0534 0.30986 0.31431l0.19197 0.39165-0.08323 0.1409-0.08323 0.14091 0.17967 0.34028c0.09882 0.18716 0.3593 0.63859 0.57884 1.0032 0.21954 0.3646 0.62967 1.0507 0.91138 1.5247 0.4864 0.81837 1.1327 1.8535 1.6918 2.7095 0.13983 0.2141 0.38274 0.5323 0.53979 0.70711 0.15705 0.1748 0.42067 0.49967 0.58581 0.72194 1.2458 1.6767 4.8271 5.4579 6.6934 7.0672 0.38891 0.33533 0.92248 0.81647 1.1857 1.0692 0.32387 0.31095 0.6668 0.58259 1.0607 0.84016 0.32013 0.20935 1.3577 0.8904 2.3056 1.5134 1.8998 1.2486 2.4042 1.5619 2.6604 1.6523 0.22182 0.0783 0.73749 0.33771 1.1845 0.59594l0.35355 0.20425-0.39775 0.0221c-0.33909 0.0188-0.37168 0.0269-0.22097 0.0548 0.09723 0.018 0.39911 0.0329 0.67084 0.0331l0.49406 4.9e-4 0.98001 0.44559c0.89395 0.40646 2.292 0.93946 5.3231 2.0294 0.99048 0.35616 2.4391 0.7592 3.2712 0.91012 0.32098 0.0582 0.42371 0.0967 0.53226 0.19952 0.12142 0.11499 0.23107 0.14685 1.127 0.32746 2.4889 0.50175 3.5777 0.63932 5.0583 0.63908 0.43752-8e-5 1.0391 0.0233 1.3369 0.0518l0.54138 0.052v15.453h-67.75zm47.266 7.049c0.07292-0.0186-1.3291-0.0315-3.1157-0.0287-2.4623 4e-3 -2.858 0.0107-1.6352 0.0287 2.5141 0.037 4.6054 0.037 4.7509 0zm-13.115-0.077c-0.18838-8e-3 -0.49663-8e-3 -0.68501 0-0.18838 8e-3 -0.03425 0.0151 0.3425 0.0151 0.37676 0 0.53088-7e-3 0.3425-0.0151zm1.9004 3.7e-4c-0.11546-9e-3 -0.30439-9e-3 -0.41984 0s-0.02099 0.0166 0.20992 0.0166c0.23092 0 0.32538-7e-3 0.20992-0.0166zm1.7236 2.9e-4c-0.09115-0.01-0.24031-0.01-0.33146 0-0.09115 0.01-0.01657 0.0173 0.16573 0.0173 0.1823 0 0.25688-8e-3 0.16573-0.0173zm-7.8003-0.0413c-0.03038-0.0123-0.0801-0.0123-0.11049 0-0.03038 0.0123-0.0055 0.0223 0.05524 0.0223 0.06077 0 0.08563-0.01 0.05524-0.0223zm1.3479-4e-3c-0.16407-8e-3 -0.43255-8e-3 -0.59662 0-0.16407 9e-3 -0.02983 0.0155 0.29831 0.0155s0.46238-7e-3 0.29831-0.0155zm-1.8554-0.043c-0.06641-0.0101-0.18573-0.0103-0.26516-4.5e-4 -0.07943 0.01-0.0251 0.0181 0.12074 0.0183 0.14584 2.4e-4 0.21083-8e-3 0.14442-0.0179zm-0.6858-0.0419c-0.03038-0.0123-0.0801-0.0123-0.11048 0-0.03038 0.0123-0.0055 0.0223 0.05524 0.0223 0.06077 0 0.08563-0.01 0.05524-0.0223zm-0.28728-6.4972c-0.0067-0.84644-0.01222-0.16675-0.01222 1.5104-5e-6 1.6772 0.0055 2.3697 0.01222 1.539 0.0067-0.83073 0.0067-2.203 8e-6 -3.0494zm0.13116-1.5052c-0.01016-0.0672-0.01874-0.0227-0.01907 0.0988-3.32e-4 0.12154 8e-3 0.1765 0.01847 0.12214 0.01049-0.0543 0.01076-0.15379 6.03e-4 -0.22097zm0.0014-5.9414c-0.0066-1.0531-0.012-0.2044-0.01201 1.886-3e-6 2.0904 0.0054 2.952 0.012 1.9147s0.0066-2.7476 6e-6 -3.8007zm0.04369-5.7913c-9e-3 -0.12842-0.01638-0.0346-0.01649 0.20845-1.15e-4 0.24306 0.0072 0.34814 0.01628 0.2335 0.0091-0.11465 0.0092-0.31352 2.09e-4 -0.44195zm0.43994-0.37629c-0.01121-0.043-0.02111-0.0185-0.02201 0.0544-9.01e-4 0.0729 0.0083 0.1081 0.02037 0.0782 0.01211-0.0299 0.01284-0.0896 0.0016-0.13259zm-0.04463-0.24114c-0.01411-0.0353-0.02458-0.0248-0.0267 0.0267-0.0019 0.0466 0.0085 0.0727 0.02321 0.058 0.01469-0.0147 0.01625-0.0528 0.0035-0.0847zm-0.35249-0.22322c-0.01057-0.055-0.01962-0.0204-0.02011 0.0768s0.0082 0.14221 0.01922 0.1c0.01106-0.0423 0.01146-0.12181 8.92e-4 -0.17678z" fill="#fff" fillOpacity=".99221" fillRule="evenodd" />
                                        <path transform="translate(8.501 7.9419)" d="m0.39775 808.95v-27.202h12.595c6.9274 0 12.596 0.0149 12.597 0.0331s0.02827 0.31157 0.06107 0.65186c0.0506 0.52496 0.05038 0.63191-0.0014 0.70589-0.03359 0.048-0.06107 0.15542-0.06107 0.23882 0 0.11863 0.03682 0.18622 0.16919 0.31057l0.16919 0.15894 0.18598 1.127c0.15465 0.9371 0.26465 1.4173 0.65295 2.8505 0.64143 2.3675 1.4545 4.8058 1.9555 5.8641l0.18178 0.384v4.4074c0 2.4241 0.0082 4.3991 0.01812 4.389 0.01-0.0101 0.02488-1.9415 0.03314-4.292 0.0083-2.3505 0.02888-4.2596 0.04581-4.2426 0.01693 0.017 0.08055 0.14355 0.14137 0.28119 0.09157 0.20723 0.09957 0.25448 0.04656 0.27483-0.03522 0.0135-0.06246 0.05-0.06054 0.0812 0.0027 0.0444 0.0083 0.0446 0.02578 1e-3 0.05107-0.12657 0.14001-0.0335 0.3213 0.3364l0.19197 0.39165-0.08153 0.13801c-0.08025 0.13585-0.07996 0.14124 0.01859 0.34407 0.05506 0.11333 0.34485 0.61579 0.64398 1.1166 0.29913 0.50079 0.7083 1.1889 0.90928 1.5292 0.90579 1.5337 1.8847 3.0309 2.2537 3.4471 0.15085 0.17015 0.44018 0.52812 0.64295 0.7955 0.88192 1.1629 2.5268 2.9709 4.5273 4.9762 0.8147 0.8167 1.7546 1.7172 2.0887 2.001s0.85088 0.74643 1.1484 1.028c0.33084 0.31305 0.72999 0.63623 1.0277 0.83211 4.3347 2.8518 4.7156 3.0952 5.0303 3.2148 0.26463 0.10056 0.78238 0.36111 1.2459 0.627l0.35355 0.2028-0.37565 3e-3c-0.25122 2e-3 -0.34637 0.016-0.28726 0.0414 0.04861 0.0209 0.33002 0.0394 0.62534 0.0411l0.53696 3e-3 0.96565 0.43578c0.53111 0.23967 1.3453 0.57706 1.8094 0.74975 1.5664 0.5829 4.369 1.589 4.6805 1.6802 0.4756 0.13928 1.8635 0.47706 2.2097 0.53779 0.23009 0.0404 0.34333 0.0859 0.44194 0.1776 0.1189 0.11061 0.24664 0.14627 1.2374 0.34543 0.60767 0.12216 1.3733 0.27285 1.7015 0.33487 0.8494 0.16055 2.3058 0.29058 3.2483 0.29002 0.43752-2.6e-4 1.0391 0.0229 1.3369 0.0515l0.54138 0.052v15.453h-67.75zm47.133 7.049c0.11143-0.0479-1.9918-0.0497-2.2981-2e-3 -0.13641 0.0213 0.24413 0.0355 0.99437 0.0372 0.66844 2e-3 1.2551-0.0143 1.3037-0.0352zm-13.115-0.0767c-0.11546-9e-3 -0.30439-9e-3 -0.41984 0s-0.02099 0.0166 0.20992 0.0166c0.23092 0 0.32538-7e-3 0.20992-0.0166zm1.9445 8.3e-4c-0.06684-0.0101-0.17622-0.0101-0.24307 0-0.06684 0.0101-0.01215 0.0184 0.12153 0.0184 0.13369 0 0.18838-8e-3 0.12153-0.0184zm1.6785 5e-3c-0.01469-0.0147-0.0528-0.0163-0.0847-3e-3 -0.03525 0.0141-0.02478 0.0246 0.0267 0.0267 0.04659 2e-3 0.07269-9e-3 0.058-0.0232zm-7.6668-0.0468c-0.03038-0.0123-0.0801-0.0123-0.11049 0-0.03038 0.0123-0.0055 0.0223 0.05524 0.0223 0.06077 0 0.08563-0.01 0.05524-0.0223zm1.1711-3e-3c-0.09115-0.01-0.24031-0.01-0.33146 0-0.09115 0.01-0.01657 0.0173 0.16573 0.0173 0.1823 0 0.25688-8e-3 0.16573-0.0173zm-1.7231-0.0424c-0.04225-0.0111-0.1218-0.0115-0.17678-9e-4 -0.05497 0.0106-0.0204 0.0196 0.07682 0.0201 0.09723 4.9e-4 0.14221-8e-3 0.09995-0.0192zm-0.92882-5.3261c-0.0082-0.20169-0.01497-0.0485-0.01502 0.3404-5.6e-5 0.38891 0.0067 0.55393 0.01492 0.3667 0.0083-0.18722 0.0083-0.50542 1.02e-4 -0.7071zm0.13093-6.3214c-0.01057-0.055-0.01962-0.0204-0.02011 0.0768-4.91e-4 0.0972 0.0082 0.14221 0.01922 0.1 0.01106-0.0422 0.01146-0.1218 8.92e-4 -0.17677zm0.0012-0.77392c-0.0091-0.11545-0.01655-0.021-0.01655 0.20993 0 0.23091 0.0074 0.32537 0.01655 0.20992 0.0091-0.11546 0.0091-0.30439 0-0.41985zm-0.0013-0.64081c-0.01053-0.0547-0.01915-0.01-0.01915 0.0994 0 0.10938 0.0086 0.15413 0.01915 0.0994 0.01053-0.0547 0.01053-0.14418 0-0.19887zm0.04466-6.6512c-0.01013-0.0668-0.01841-0.0122-0.01841 0.12154 0 0.13369 0.0083 0.18838 0.01841 0.12153 0.01013-0.0668 0.01013-0.17622 0-0.24307zm0.44048-0.41708c-0.01411-0.0353-0.02458-0.0248-0.0267 0.0267-0.0019 0.0466 0.0085 0.0727 0.02321 0.058 0.01469-0.0147 0.01626-0.0528 0.0035-0.0847zm-0.04419-0.26516c-0.01411-0.0353-0.02458-0.0248-0.0267 0.0267-0.0019 0.0466 0.0085 0.0727 0.02321 0.058 0.01469-0.0147 0.01625-0.0528 0.0035-0.0847zm-0.35312-0.2008c-0.01121-0.043-0.02111-0.0185-0.02201 0.0544-9.01e-4 0.0729 0.0083 0.10811 0.02037 0.0782 0.01211-0.0299 0.01284-0.0896 0.0016-0.13258z" fill="#fff" fillOpacity=".99221" fillRule="evenodd" />
                                        <path transform="translate(8.501 7.9419)" d="m0.39775 808.95v-27.202h12.595c6.9274 0 12.596 0.0149 12.597 0.0331s0.02827 0.31157 0.06107 0.65186c0.0506 0.52496 0.05038 0.63191-0.0014 0.70589-0.03359 0.048-0.06107 0.15542-0.06107 0.23882 0 0.11871 0.03679 0.18615 0.16942 0.31057l0.16942 0.15894 0.12109 0.7513c0.19764 1.2262 0.31144 1.7323 0.75533 3.3588 0.60637 2.2218 1.4991 4.881 1.9191 5.7164l0.1802 0.35839 0.0088 4.1442 0.0088 4.1442 0.0291-3.6239c0.016-1.9932 0.03348-3.793 0.03883-3.9996l0.0097-0.37565 0.12726 0.26171c0.11795 0.24257 0.12175 0.26573 0.05192 0.31679-0.04144 0.0303-0.06045 0.07-0.04226 0.0882s0.03308 0.01 0.03308-0.0185c0-0.0284 0.0254-0.0516 0.05644-0.0516s0.14194 0.17239 0.24643 0.38308l0.18999 0.38308-0.07567 0.16781-0.07567 0.16782 0.21997 0.38823c0.45815 0.80861 1.8754 3.1664 2.4645 4.0999 0.71668 1.1358 0.97621 1.5099 1.2575 1.8126 0.11296 0.12153 0.38767 0.46089 0.61046 0.75412 1.3093 1.7233 4.8157 5.4202 6.6042 6.963 0.34823 0.30039 0.85384 0.7552 1.1236 1.0107 0.57489 0.54451 0.56059 0.53431 2.9346 2.0933 2.6216 1.7216 2.7047 1.7723 3.5797 2.1853 0.25522 0.12046 0.62314 0.31077 0.81759 0.42291l0.35355 0.20388-0.33146 1e-3c-0.23042 7e-4 -0.31125 0.0141-0.26516 0.0438 0.03646 0.0236 0.29729 0.0431 0.57961 0.0435l0.51332 6.8e-4 0.90089 0.40349c1.1191 0.50123 1.4121 0.61518 4.0266 1.5662 2.4575 0.89387 3.3355 1.1609 4.6525 1.4149 0.30514 0.0589 0.43155 0.10595 0.54292 0.20222 0.07984 0.069 0.15039 0.1255 0.15676 0.1255 0.0064 0 0.60728 0.11954 1.3353 0.26565 2.2982 0.46122 2.7513 0.51645 4.7267 0.57624 0.75351 0.0228 1.4744 0.0541 1.602 0.0695l0.23202 0.028v15.457h-67.75zm46.824 7.049c0.07292-0.0186-0.34472-0.0341-0.92808-0.0346-0.59226-4.6e-4 -1.0119 0.0148-0.95018 0.0346 0.14041 0.045 1.7015 0.045 1.8783 0zm-12.871-0.0753c-0.05436-0.0105-0.15379-0.0108-0.22097-6e-4 -0.06718 0.0101-0.0227 0.0187 0.09883 0.0191 0.12153 3.3e-4 0.1765-8e-3 0.12214-0.0185zm1.9439 2e-3c-0.03038-0.0123-0.0801-0.0123-0.11048 0-0.03038 0.0123-0.0055 0.0223 0.05524 0.0223 0.06077 0 0.08563-0.01 0.05524-0.0223zm-4.8605-0.0439c-0.02992-0.0121-0.08958-0.0129-0.13258-2e-3 -0.043 0.0112-0.01852 0.0211 0.0544 0.022s0.1081-8e-3 0.07818-0.0204zm-1.636-0.0445c-0.03038-0.0123-0.0801-0.0123-0.11049 0-0.03038 0.0123-0.0055 0.0223 0.05524 0.0223 0.06077 0 0.08563-0.01 0.05524-0.0223zm-0.73308-19.648c-0.01226-0.0304-0.02229-6e-3 -0.02229 0.0552 0 0.0608 0.01003 0.0856 0.02229 0.0552s0.01226-0.0801 0-0.11048zm0.04511-0.92532c-0.01411-0.0352-0.02458-0.0248-0.0267 0.0267-0.0019 0.0466 0.0085 0.0727 0.02321 0.058 0.01469-0.0147 0.01626-0.0528 0.0035-0.0847z" fill="#fff" fillOpacity=".99221" fillRule="evenodd" />
                                        <path transform="translate(8.501 7.9419)" d="m59.074 818.54c-0.89502-0.19508-1.1379-0.25083-1.3775-0.31617-0.21019-0.0573-0.7328-0.21994-1.8841-0.58628l-1.5933-0.50695-1.338-0.54739c-0.7359-0.30106-1.3438-0.54738-1.3508-0.54738-0.0071 0-0.01401-3e-3 -0.01544-6e-3 -0.0014-3e-3 -0.10456-0.0479-0.22917-0.0988-0.37399-0.15258-0.95926-0.43672-1.7183-0.83418-0.60113-0.31479-1.1138-0.58987-1.1321-0.60752-0.0037-4e-3 0.04007-0.14649 0.09719-0.3177 0.10133-0.30373 0.10394-0.31324 0.10715-0.39101 0.0027-0.065 2.98e-4 -0.0896-0.01294-0.13314-0.02698-0.0888-0.0973-0.18117-0.1712-0.22482l-0.02526-0.0149 7.5e-4 -0.39116 0.07691-0.19141 0.07691-0.1914 0.05288-2e-3c0.037-2e-3 0.05481 7.1e-4 0.05931 8e-3 5e-3 8e-3 0.0065 8e-3 0.0066 3.9e-4 9.6e-5 -8e-3 0.26252-0.01 1.2857-0.01h1.2856l0.31009 0.15462c0.3541 0.17656 0.7 0.33884 1.1109 0.52114 0.42012 0.18642 0.62102 0.27059 0.63395 0.26563 0.0063-2e-3 0.93765 0.32639 2.0696 0.7307l2.0581 0.73511 0.44916 0.12843c0.24704 0.0706 0.45856 0.12843 0.47005 0.12843 0.01149 0 0.02206 3e-3 0.02349 7e-3 0.0032 8e-3 1.0153 0.29783 1.0415 0.29783 0.0103 0 0.02081 3e-3 0.02335 7e-3 0.0025 4e-3 0.0094 6e-3 0.0153 3e-3 0.0059-2e-3 0.01303-2.8e-4 0.01591 4e-3 0.0029 5e-3 0.0083 7e-3 0.01197 4e-3 0.0037-2e-3 0.0088-7.4e-4 0.01143 3e-3 0.0026 4e-3 0.0095 6e-3 0.01537 4e-3 0.0059-2e-3 0.013-3.4e-4 0.01584 4e-3 0.0028 5e-3 0.0155 8e-3 0.02813 8e-3 0.01264 0 0.02298 3e-3 0.02298 7e-3 0 0.0138 0.17485 0.0515 1.0234 0.22079 0.4791 0.0956 0.87227 0.17665 0.8737 0.18017 0.0014 4e-3 0.01593 6e-3 0.03223 6e-3 0.01629 0 0.0402 2e-3 0.05313 5e-3l0.02351 5e-3 -0.33082 0.99238c-0.18195 0.54582-0.33212 0.99369-0.33371 0.99529-0.0016 2e-3 -0.02898-6e-3 -0.06086-0.0175-0.07826-0.0275-0.20228-0.0344-0.2695-0.015-0.11418 0.033-0.20942 0.11342-0.25662 0.21677-0.0143 0.0313-0.06242 0.16679-0.10695 0.30107-0.04453 0.13427-0.08276 0.24388-0.08496 0.24356s-0.49299-0.10717-1.0906-0.23744zm-6.3014-2.5569c-0.19196-1e-3 -0.50837-1e-3 -0.70312 0-0.19476 1e-3 -0.0377 2e-3 0.34902 2e-3 0.38672 0 0.54607-9.5e-4 0.3541-2e-3zm2.8236-8e-3c-0.41357-1e-3 -1.0903-1e-3 -1.5039 0s-0.0752 2e-3 0.75195 2e-3c0.82715 0 1.1655-9.1e-4 0.75195-2e-3zm1.7188-8e-3c-0.15576-1e-3 -0.41064-1e-3 -0.56641 0s-0.02832 2e-3 0.2832 2e-3 0.43896-9.6e-4 0.2832-2e-3zm0.79245-8e-3c-0.08515-1e-3 -0.22226-1e-3 -0.30469 0-0.08243 1e-3 -0.01276 2e-3 0.15481 2e-3 0.16758 0 0.23502-1e-3 0.14987-2e-3zm0.53615-8e-3c-0.06097-1e-3 -0.16292-1e-3 -0.22656-1e-5 -0.06364 1e-3 -0.01376 2e-3 0.11085 2e-3 0.12461 0 0.17668-1e-3 0.11571-2e-3zm0.42921-8e-3c-0.05264-1e-3 -0.13877-1e-3 -0.19141 0-0.05264 1e-3 -0.0096 2e-3 0.0957 2e-3 0.10527 0 0.14834-1e-3 0.0957-2e-3zm0.31992-8e-3c-0.03996-1e-3 -0.10324-1e-3 -0.14062 2e-5 -0.03738 1e-3 -0.0047 3e-3 0.07266 3e-3 0.07734-1e-5 0.10793-1e-3 0.06796-3e-3zm0.25821-8e-3c-0.03115-1e-3 -0.08213-1e-3 -0.11328 0-0.03115 1e-3 -0.0057 3e-3 0.05664 3e-3 0.06231 0 0.08779-1e-3 0.05664-3e-3zm0.19922-8e-3c-0.02471-2e-3 -0.06514-2e-3 -0.08984 0-0.02471 2e-3 -0.0045 3e-3 0.04492 3e-3 0.04941 0 0.06963-1e-3 0.04492-3e-3zm0.15234-8e-3c-0.01826-2e-3 -0.04814-2e-3 -0.06641 0-0.01826 2e-3 -0.0033 3e-3 0.0332 3e-3 0.03652 0 0.05147-1e-3 0.0332-3e-3zm0.10938-8e-3c-0.01396-2e-3 -0.03682-2e-3 -0.05078 0s-0.0025 3e-3 0.02539 3e-3c0.02793 0 0.03936-1e-3 0.02539-3e-3zm0.08203-7e-3c0.0097-3e-3 0.01758-7e-3 0.01758-0.0108 0-7e-3 -0.07718-0.0269-0.08301-0.021-0.0022 2e-3 0.0076 7e-3 0.02191 0.01 0.0398 9e-3 0.04425 0.0149 0.01423 0.0202-0.02037 4e-3 -0.02236 5e-3 -0.0078 6e-3 0.01074 5.1e-4 0.02744-1e-3 0.03711-4e-3zm-0.07829-0.0389c-0.0026-3e-3 -0.0093-3e-3 -0.01497-6.1e-4 -0.0062 2e-3 -0.0044 4e-3 0.0047 5e-3 0.0082 3.4e-4 0.01285-2e-3 0.01025-4e-3zm-0.03125-8e-3c-0.0026-3e-3 -0.0093-3e-3 -0.01497-6.1e-4 -0.0062 2e-3 -0.0044 4e-3 0.0047 5e-3 0.0082 3.3e-4 0.01285-2e-3 0.01025-4e-3zm-0.03125-8e-3c-0.0026-3e-3 -0.0093-3e-3 -0.01497-6.2e-4 -0.0062 3e-3 -0.0044 4e-3 0.0047 5e-3 0.0082 3.4e-4 0.01285-1e-3 0.01025-4e-3zm-0.03125-8e-3c-0.0026-3e-3 -0.0093-3e-3 -0.01497-6.2e-4 -0.0062 2e-3 -0.0044 4e-3 0.0047 5e-3 0.0082 3.4e-4 0.01285-2e-3 0.01025-4e-3zm-0.03304-7e-3c-0.02712-0.0102-0.12972-0.0326-0.12408-0.0271 0.0091 9e-3 0.0876 0.0298 0.11236 0.0299 0.01074 5e-5 0.01602-1e-3 0.01172-3e-3zm-8.8327-0.0379c-0.01073-0.01-0.44707-0.22371-0.45027-0.22052-0.0046 5e-3 0.44549 0.23115 0.45027 0.22663 0.0018-2e-3 0.0018-4e-3 0-6e-3zm8.6882 3e-3c-0.0064-4e-3 -0.01699-8e-3 -0.02344-8e-3 -0.01042 0-0.01042 8.4e-4 0 8e-3 0.0064 4e-3 0.01699 8e-3 0.02344 8e-3 0.01042 0 0.01042-8.5e-4 0-8e-3zm-0.04118-0.0125c-0.0026-3e-3 -0.0093-3e-3 -0.01497-6.2e-4 -0.0062 3e-3 -0.0044 4e-3 0.0047 5e-3 0.0082 3.4e-4 0.01285-1e-3 0.01025-4e-3zm-0.03125-8e-3c-0.0026-3e-3 -0.0093-3e-3 -0.01497-6.2e-4 -0.0062 2e-3 -0.0044 4e-3 0.0047 5e-3 0.0082 3.4e-4 0.01285-2e-3 0.01025-4e-3zm-0.03125-8e-3c-0.0026-3e-3 -0.0093-3e-3 -0.01497-6.1e-4 -0.0062 2e-3 -0.0044 4e-3 0.0047 5e-3 0.0082 3.4e-4 0.01285-2e-3 0.01025-4e-3zm-0.03125-8e-3c-0.0026-3e-3 -0.0093-3e-3 -0.01497-6.1e-4 -0.0062 2e-3 -0.0044 4e-3 0.0047 5e-3 0.0082 3.3e-4 0.01285-2e-3 0.01025-4e-3zm-0.03125-8e-3c-0.0026-3e-3 -0.0093-3e-3 -0.01497-6.2e-4 -0.0062 3e-3 -0.0044 4e-3 0.0047 5e-3 0.0082 3.4e-4 0.01285-1e-3 0.01025-4e-3zm-0.03125-8e-3c-0.0026-3e-3 -0.0093-3e-3 -0.01497-6.2e-4 -0.0062 2e-3 -0.0044 4e-3 0.0047 5e-3 0.0082 3.4e-4 0.01285-2e-3 0.01025-4e-3zm-0.03125-8e-3c-0.0026-3e-3 -0.0093-3e-3 -0.01497-6.1e-4 -0.0062 2e-3 -0.0044 4e-3 0.0047 5e-3 0.0082 3.4e-4 0.01285-2e-3 0.01025-4e-3zm-0.04085-0.0109c-0.0086-4e-3 -0.0209-7e-3 -0.02734-7e-3 -0.01042-3.9e-4 -0.01042 4.1e-4 0 7e-3 0.0064 4e-3 0.01875 7e-3 0.02734 7e-3l0.01563-4.3e-4zm-0.04509-0.0125c-0.0026-3e-3 -0.0093-3e-3 -0.01497-6.2e-4 -0.0062 2e-3 -0.0044 4e-3 0.0047 5e-3 0.0082 3.4e-4 0.01285-2e-3 0.01025-4e-3zm-0.03125-8e-3c-0.0026-3e-3 -0.0093-3e-3 -0.01497-6.1e-4 -0.0062 2e-3 -0.0044 4e-3 0.0047 5e-3 0.0082 3.4e-4 0.01285-2e-3 0.01025-4e-3zm-0.03125-8e-3c-0.0026-3e-3 -0.0093-3e-3 -0.01497-6.1e-4 -0.0062 2e-3 -0.0044 4e-3 0.0047 5e-3 0.0082 3.3e-4 0.01285-2e-3 0.01025-4e-3zm-0.03125-8e-3c-0.0026-3e-3 -0.0093-3e-3 -0.01497-6.2e-4 -0.0062 3e-3 -0.0044 4e-3 0.0047 5e-3 0.0082 3.4e-4 0.01285-1e-3 0.01025-4e-3zm-0.05469-0.0156c-0.0026-3e-3 -0.0093-3e-3 -0.01497-6.1e-4 -0.0062 2e-3 -0.0044 4e-3 0.0047 5e-3 0.0082 3.4e-4 0.01285-2e-3 0.01025-4e-3zm-0.03125-8e-3c-0.0026-3e-3 -0.0093-3e-3 -0.01497-6.1e-4 -0.0062 2e-3 -0.0044 4e-3 0.0047 5e-3 0.0082 3.3e-4 0.01285-2e-3 0.01025-4e-3zm-0.05469-0.0156c-0.0026-3e-3 -0.0093-3e-3 -0.01497-6.2e-4 -0.0062 2e-3 -0.0044 4e-3 0.0047 5e-3 0.0082 3.4e-4 0.01285-2e-3 0.01025-4e-3zm-0.03125-8e-3c-0.0026-3e-3 -0.0093-3e-3 -0.01497-6.1e-4 -0.0062 2e-3 -0.0044 4e-3 0.0047 5e-3 0.0082 3.4e-4 0.01285-2e-3 0.01025-4e-3zm-0.05469-0.0156c-0.0026-3e-3 -0.0093-3e-3 -0.01497-6.2e-4 -0.0062 3e-3 -0.0044 4e-3 0.0047 5e-3 0.0082 3.4e-4 0.01285-1e-3 0.01025-4e-3zm-0.04085-0.0109c-0.0086-4e-3 -0.0209-7e-3 -0.02734-7e-3 -0.01042-3.8e-4 -0.01042 4.1e-4 0 7e-3 0.0064 4e-3 0.01875 7e-3 0.02734 7e-3l0.01563-4.3e-4zm-0.04509-0.0125c-0.0026-3e-3 -0.0093-3e-3 -0.01497-6.1e-4 -0.0062 2e-3 -0.0044 4e-3 0.0047 5e-3 0.0082 3.3e-4 0.01285-2e-3 0.01025-4e-3zm-0.05469-0.0156c-0.0026-3e-3 -0.0093-3e-3 -0.01497-6.2e-4 -0.0062 2e-3 -0.0044 4e-3 0.0047 5e-3 0.0082 3.4e-4 0.01285-2e-3 0.01025-4e-3zm-0.04085-0.0109c-0.0086-4e-3 -0.0209-7e-3 -0.02734-7e-3 -0.01042-3.8e-4 -0.01042 4.1e-4 0 7e-3 0.0064 4e-3 0.01875 7e-3 0.02734 7e-3l0.01563-4.3e-4zm-0.05469-0.0156c-0.0086-4e-3 -0.0209-7e-3 -0.02734-7e-3 -0.01042-3.8e-4 -0.01042 4.2e-4 0 7e-3 0.0064 4e-3 0.01875 7e-3 0.02734 7e-3l0.01563-4.3e-4zm-0.04508-0.0125c-0.0026-3e-3 -0.0093-3e-3 -0.01497-6.1e-4 -0.0062 2e-3 -0.0044 4e-3 0.0047 5e-3 0.0082 3.4e-4 0.01285-2e-3 0.01025-4e-3zm-0.05469-0.0156c-0.0026-3e-3 -0.0093-3e-3 -0.01497-6.2e-4 -0.0062 3e-3 -0.0044 4e-3 0.0047 5e-3 0.0082 3.4e-4 0.01285-1e-3 0.01025-4e-3zm-0.05469-0.0156c-0.0026-3e-3 -0.0093-3e-3 -0.01497-6.1e-4 -0.0062 2e-3 -0.0044 4e-3 0.0047 5e-3 0.0082 3.4e-4 0.01285-2e-3 0.01025-4e-3zm-0.06429-0.0187c-0.0086-4e-3 -0.0209-7e-3 -0.02734-7e-3 -0.01042-3.8e-4 -0.01042 4.2e-4 0 7e-3 0.0064 4e-3 0.01875 7e-3 0.02734 7e-3l0.01563-4.3e-4zm-0.05469-0.0156c-0.0086-4e-3 -0.0209-7e-3 -0.02734-7e-3 -0.01042-3.8e-4 -0.01042 4.1e-4 0 7e-3 0.0064 4e-3 0.01875 7e-3 0.02734 7e-3l0.01563-4.3e-4zm-0.06852-0.0203c-0.0026-3e-3 -0.0093-3e-3 -0.01497-6.2e-4 -0.0062 2e-3 -0.0044 4e-3 0.0047 5e-3 0.0082 3.4e-4 0.01285-2e-3 0.01025-4e-3zm-0.05469-0.0156c-0.0026-3e-3 -0.0093-3e-3 -0.01497-6.1e-4 -0.0062 2e-3 -0.0044 4e-3 0.0047 5e-3 0.0082 3.3e-4 0.01285-2e-3 0.01025-4e-3zm-0.07813-0.0234c-0.0026-3e-3 -0.0093-3e-3 -0.01497-6.1e-4 -0.0062 2e-3 -0.0044 4e-3 0.0047 5e-3 0.0082 3.4e-4 0.01285-2e-3 0.01025-4e-3zm-0.07813-0.0234c-0.0026-3e-3 -0.0093-3e-3 -0.01497-6.2e-4 -0.0062 2e-3 -0.0044 4e-3 0.0047 5e-3 0.0082 3.4e-4 0.01285-2e-3 0.01025-4e-3zm-0.06429-0.0187c-0.0086-4e-3 -0.0209-7e-3 -0.02734-7e-3 -0.01042-3.9e-4 -0.01042 4.1e-4 0 7e-3 0.0064 4e-3 0.01875 7e-3 0.02734 7e-3l0.01563-4.3e-4zm-0.07813-0.0234c-0.0086-4e-3 -0.0209-7e-3 -0.02734-7e-3 -0.01042-3.8e-4 -0.01042 4.1e-4 0 7e-3 0.0064 4e-3 0.01875 7e-3 0.02734 7e-3l0.01563-4.3e-4zm-0.10156-0.0312c-0.0086-4e-3 -0.0209-7e-3 -0.02734-7e-3 -0.01042-3.8e-4 -0.01042 4.1e-4 0 7e-3 0.0064 4e-3 0.01875 7e-3 0.02734 7e-3l0.01563-4.3e-4zm-0.10156-0.0312c-0.0086-4e-3 -0.0209-7e-3 -0.02734-7e-3 -0.01042-3.8e-4 -0.01042 4.1e-4 0 7e-3 0.0064 4e-3 0.01875 7e-3 0.02734 7e-3l0.01563-4.3e-4zm-0.10156-0.0312c-0.0086-4e-3 -0.0209-7e-3 -0.02734-7e-3 -0.01042-3.8e-4 -0.01042 4.1e-4 0 7e-3 0.0064 4e-3 0.01875 7e-3 0.02734 7e-3l0.01563-4.3e-4zm-7.903-0.0186c-0.01096-0.0102-0.22591-0.11316-0.22591-0.10824 0 7e-3 0.22104 0.11883 0.22591 0.11429 0.0018-2e-3 0.0018-4e-3 0-6e-3zm7.778-0.0204c-0.0086-4e-3 -0.0209-7e-3 -0.02734-7e-3 -0.01042-3.9e-4 -0.01042 4.1e-4 0 7e-3 0.0064 4e-3 0.01875 7e-3 0.02734 7e-3l0.01563-4.3e-4zm-0.14844-0.0469c-0.0086-4e-3 -0.0209-7e-3 -0.02734-7e-3 -0.01042-3.8e-4 -0.01042 4.1e-4 0 7e-3 0.0064 4e-3 0.01875 7e-3 0.02734 7e-3l0.01563-4.3e-4zm-7.8711-0.0547c-0.0062-4e-3 -0.01302-5e-3 -0.01517-3e-3 -0.0021 2e-3 0.0012 7e-3 0.0074 0.0109 0.0062 4e-3 0.01302 5e-3 0.01517 3e-3 0.0021-2e-3 -0.0012-7e-3 -0.0074-0.0109zm7.6722-8e-3c-0.02348-8e-3 -0.04633-0.0139-0.05078-0.0124-0.01047 3e-3 0.05735 0.0275 0.07785 0.0276 0.0086 3e-5 -0.0036-7e-3 -0.02706-0.0151zm-7.7581-0.0337c0-2e-3 -0.0055-5e-3 -0.01212-8e-3 -7e-3 -3e-3 -0.01009-1e-3 -0.0074 3e-3 0.0046 7e-3 0.01947 0.011 0.01947 5e-3zm-0.09375-0.0476c0-6e-3 -0.09501-0.0522-0.09923-0.048-0.0021 2e-3 0.01667 0.0145 0.04181 0.0275 0.04553 0.0235 0.05742 0.0277 0.05742 0.0205zm7.6016 7.9e-4c0-2e-3 -7e-3 -5e-3 -0.01564-7e-3 -0.0086-2e-3 -0.01367-9e-4 -0.01126 3e-3 0.0042 7e-3 0.02689 0.0102 0.02689 4e-3zm-0.04336-0.0116c-0.0041-4e-3 -0.15508-0.0561-0.33555-0.11631-1.0816-0.36111-2.2645-0.8031-3.3074-1.2359-0.12612-0.0523-0.23075-0.0937-0.23252-0.0919-0.0068 7e-3 0.78958 0.3306 1.2795 0.52029 0.52078 0.20163 1.1188 0.42203 1.6354 0.60276 0.25854 0.0904 0.95652 0.32789 0.96383 0.32789 0.0023 0 8e-4 -3e-3 -0.0033-7e-3zm-7.7457-0.0855c0-8e-3 -0.05512-0.0349-0.0603-0.0297-2e-3 2e-3 0.0098 0.0108 0.02636 0.0195 0.03541 0.0187 0.03394 0.0182 0.03394 0.0102zm-0.10156-0.0549c0-8e-3 -0.03945-0.0269-0.04467-0.0217-2e-3 2e-3 0.0064 9e-3 0.01859 0.0156 0.02661 0.0144 0.02608 0.0143 0.02608 6e-3zm-0.09398-0.0562c-0.01853-0.0117-0.02854-8e-3 -0.01206 4e-3 0.0083 6e-3 0.01697 9e-3 0.01931 7e-3 0.0023-2e-3 -9.21e-4 -8e-3 -0.0072-0.0115zm-0.05469-0.0312c-0.01853-0.0117-0.02853-8e-3 -0.01206 4e-3 0.0083 6e-3 0.01697 9e-3 0.01931 7e-3 0.0023-2e-3 -9.21e-4 -8e-3 -0.0072-0.0115zm-0.05469-0.0312c-0.01853-0.0117-0.02854-8e-3 -0.01206 4e-3 0.0083 6e-3 0.01697 9e-3 0.01931 7e-3 0.0023-2e-3 -9.21e-4 -8e-3 -0.0072-0.0115zm-0.04665-0.0231c0-4e-3 -0.0037-8e-3 -0.0083-8e-3s-0.0061 4e-3 -0.0034 8e-3 0.0064 8e-3 0.0083 8e-3 0.0034-4e-3 0.0034-8e-3zm-0.03906-0.0234c0-4e-3 -0.0037-8e-3 -0.0083-8e-3s-0.0061 4e-3 -0.0034 8e-3 0.0064 8e-3 0.0083 8e-3 0.0034-4e-3 0.0034-8e-3zm-0.02344-0.0156c0-4e-3 -0.0037-8e-3 -0.0083-8e-3s-0.0061 4e-3 -0.0034 8e-3 0.0064 8e-3 0.0083 8e-3 0.0034-4e-3 0.0034-8e-3zm-0.03906-0.0234c0-4e-3 -0.0037-8e-3 -0.0083-8e-3s-0.0061 4e-3 -0.0034 8e-3 0.0064 8e-3 0.0083 8e-3 0.0034-4e-3 0.0034-8e-3zm-0.02344-0.0156c0-4e-3 -0.0037-8e-3 -0.0083-8e-3s-0.0061 4e-3 -0.0034 8e-3 0.0064 8e-3 0.0083 8e-3 0.0034-4e-3 0.0034-8e-3zm-0.02344-0.0156c0-4e-3 -0.0037-8e-3 -0.0083-8e-3s-0.0061 4e-3 -0.0034 8e-3 0.0064 8e-3 0.0083 8e-3 0.0034-4e-3 0.0034-8e-3zm-0.03125-0.0234c0-4e-3 -0.0037-8e-3 -0.0083-8e-3s-0.0061 4e-3 -0.0034 8e-3 0.0064 8e-3 0.0083 8e-3 0.0034-4e-3 0.0034-8e-3zm-0.02702-0.0229c-0.0028-5e-3 -0.0089-8e-3 -0.01346-8e-3 -0.0052 0-0.0046 4e-3 0.0016 0.0119 0.01071 0.0129 0.02029 0.01 0.01188-4e-3zm-0.03125-0.0234c-0.0028-5e-3 -0.0089-8e-3 -0.01346-8e-3 -0.0052 0-0.0046 4e-3 0.0016 0.0119 0.01071 0.0129 0.02029 0.01 0.01188-4e-3zm-0.07473-0.0671c-0.02323-0.0235-0.04577-0.0428-0.05008-0.0428-0.0043 0 0.01295 0.021 0.03835 0.0467s0.04794 0.0449 0.05008 0.0428c0.0021-2e-3 -0.01512-0.0231-0.03835-0.0467zm-0.06231-0.0662c0-4e-3 -0.0037-8e-3 -0.0083-8e-3s-0.0061 4e-3 -0.0034 8e-3 0.0064 8e-3 0.0083 8e-3 0.0034-4e-3 0.0034-8e-3zm-0.01563-0.0234c0-4e-3 -0.0037-8e-3 -0.0083-8e-3s-0.0061 4e-3 -0.0034 8e-3 0.0064 8e-3 0.0083 8e-3 0.0034-4e-3 0.0034-8e-3zm-0.04935-0.11084c-0.0025-6e-3 -0.0043-4e-3 -0.0047 5e-3 -3.39e-4 8e-3 0.0015 0.0128 0.0041 0.0103 0.0026-3e-3 0.0029-9e-3 6.16e-4 -0.015zm-0.0074-0.1333c-0.0016-0.0226-0.0029-4e-3 -0.0029 0.041 0 0.0451 0.0013 0.0636 0.0029 0.041s0.0016-0.0595 0-0.082zm0.0075-0.0741c-2e-3 -8e-3 -0.0037-3e-3 -0.0039 0.01-1.6e-4 0.0129 0.0015 0.0191 0.0036 0.0138 0.0021-5e-3 0.0023-0.0158 2.89e-4 -0.0234zm0.0078-0.0469c-2e-3 -8e-3 -0.0037-3e-3 -0.0039 0.01-1.59e-4 0.0129 0.0015 0.0191 0.0036 0.0138 0.0021-5e-3 0.0023-0.0158 2.9e-4 -0.0234zm0.0078-0.0469c-2e-3 -8e-3 -0.0037-3e-3 -0.0039 0.01-1.6e-4 0.0129 0.0015 0.0191 0.0036 0.0138 0.0021-5e-3 0.0023-0.0158 2.89e-4 -0.0234zm0.0078-0.0548c-2e-3 -8e-3 -0.0036-1e-3 -0.0036 0.0137 0 0.015 0.0016 0.0212 0.0036 0.0137 2e-3 -8e-3 2e-3 -0.0198 0-0.0273zm0.0082-0.20313c-0.0015-0.0333-0.0027-6e-3 -0.0027 0.0606s0.0012 0.0938 0.0027 0.0605 0.0015-0.0878 0-0.12109zm-0.0082-0.10156c-2e-3 -8e-3 -0.0036-1e-3 -0.0036 0.0137 0 0.015 0.0016 0.0212 0.0036 0.0137 2e-3 -8e-3 2e-3 -0.0198 0-0.0273zm-8e-3 -0.043c-0.0022-5e-3 -0.0039-9.8e-4 -0.0039 0.01 0 0.0108 0.0018 0.0151 0.0039 0.01 0.0022-5e-3 0.0022-0.0142 0-0.0195zm-0.0077-0.0308c-0.0025-6e-3 -0.0043-4e-3 -0.0047 5e-3 -3.39e-4 8e-3 0.0015 0.0128 0.0041 0.0102 0.0026-3e-3 0.0029-9e-3 6.17e-4 -0.015zm-0.01305-0.0569c-0.01227-0.0323-0.01677-0.0201-0.0058 0.0156 0.0052 0.0169 0.01049 0.0252 0.01178 0.0185 0.0013-7e-3 -0.0014-0.0221-6e-3 -0.0342zm-0.03135-0.0667c0-4e-3 -0.0037-8e-3 -0.0083-8e-3s-0.0061 4e-3 -0.0034 8e-3 0.0064 8e-3 0.0083 8e-3 0.0034-4e-3 0.0034-8e-3zm-0.01921-0.0307c-0.0028-5e-3 -0.0089-8e-3 -0.01346-8e-3 -0.0052 0-0.0046 4e-3 0.0016 0.0119 0.01071 0.0129 0.02029 0.01 0.01188-4e-3zm-0.02623-0.0335c-0.0056-6e-3 -0.0092-6e-3 -0.0092-1e-3 0 0.0104 0.0092 0.0197 0.01445 0.0145 0.0022-2e-3 -1.24e-4 -8e-3 -0.0052-0.0133zm-0.01188-0.0393c-0.0022-5e-3 -0.0039-9.8e-4 -0.0039 0.01 0 0.0107 0.0018 0.0151 0.0039 0.01 0.0022-5e-3 0.0022-0.0142 0-0.0195zm-0.0073-0.0977c-0.0017-0.0161-0.0031-3e-3 -0.0031 0.0293 0 0.0322 0.0014 0.0454 0.0031 0.0293s0.0017-0.0425 0-0.0586zm0.0076-0.0819c-0.0019-0.01-0.0035-4e-3 -0.0036 0.0136-8.7e-5 0.0172 0.0014 0.0251 0.0034 0.0177 2e-3 -7e-3 2e-3 -0.0215 1.58e-4 -0.0312zm0.0077-0.0585c-2e-3 -8e-3 -0.0037-3e-3 -0.0039 0.01-1.59e-4 0.0129 0.0015 0.0191 0.0036 0.0138 0.0021-5e-3 0.0023-0.0158 2.9e-4 -0.0234zm0.0078-0.0469c-2e-3 -8e-3 -0.0037-3e-3 -0.0039 0.01-1.6e-4 0.0129 0.0015 0.0191 0.0036 0.0138 0.0021-5e-3 0.0023-0.0158 2.89e-4 -0.0234zm0.0076-0.0431c-0.0022-5e-3 -0.0039-9.8e-4 -0.0039 0.01 0 0.0107 0.0018 0.0151 0.0039 0.01 0.0022-5e-3 0.0022-0.0142 0-0.0195zm0.0078-0.0391c-0.0022-5e-3 -0.0039-9.8e-4 -0.0039 0.01 0 0.0108 0.0018 0.0151 0.0039 0.01 0.0022-5e-3 0.0022-0.0142 0-0.0195zm8e-3 -0.0308c-0.0025-6e-3 -0.0043-4e-3 -0.0047 5e-3 -3.39e-4 8e-3 0.0015 0.0128 0.0041 0.0102 0.0026-3e-3 0.0029-9e-3 6.17e-4 -0.015zm0.0078-0.0312c-0.0025-6e-3 -0.0043-4e-3 -0.0047 5e-3 -3.39e-4 8e-3 0.0015 0.0128 0.0041 0.0102 0.0026-3e-3 0.0029-9e-3 6.16e-4 -0.015zm0.0078-0.0312c-0.0025-6e-3 -0.0043-4e-3 -0.0047 5e-3 -3.39e-4 8e-3 0.0015 0.0128 0.0041 0.0102 0.0026-3e-3 0.0029-9e-3 6.17e-4 -0.015zm0.0078-0.0312c-0.0025-6e-3 -0.0043-4e-3 -0.0047 5e-3 -3.39e-4 8e-3 0.0015 0.0128 0.0041 0.0102 0.0026-3e-3 0.0029-9e-3 6.16e-4 -0.015zm0.0078-0.0312c-0.0025-6e-3 -0.0043-4e-3 -0.0047 5e-3 -3.39e-4 8e-3 0.0015 0.0128 0.0041 0.0102 0.0026-3e-3 0.0029-9e-3 6.17e-4 -0.015zm0.0078-0.0312c-0.0025-6e-3 -0.0043-4e-3 -0.0047 5e-3 -3.39e-4 8e-3 0.0015 0.0128 0.0041 0.0102 0.0026-3e-3 0.0029-9e-3 6.16e-4 -0.015zm0.01743-0.0493-4.29e-4 -0.0156-0.0067 0.0156c-0.0037 9e-3 -0.0069 0.0209-0.0071 0.0273-3.82e-4 0.0104 4.12e-4 0.0104 0.0071 0 0.0042-6e-3 0.0074-0.0188 0.0071-0.0273zm0.01382-0.0601c-0.0025-6e-3 -0.0043-4e-3 -0.0047 5e-3 -3.39e-4 8e-3 0.0015 0.0128 0.0041 0.0103 0.0026-3e-3 0.0029-9e-3 6.16e-4 -0.015z" fill="#fff" fillOpacity=".99221" fillRule="evenodd" />
                                        <path transform="translate(8.501 7.9419)" d="m38.819 816.88v-3.4002h6.4432l0.28218 0.18708c1.288 0.85391 1.9202 1.2518 2.232 1.4048 0.05996 0.0294 0.08777 0.0398 0.12252 0.0458 0.08184 0.0142 0.21229 0.0694 0.45775 0.19368 0.2072 0.10493 0.3137 0.16379 0.80378 0.44423l0.41708 0.23867-0.35494-4e-3c-0.3387-4e-3 -0.3796-2e-3 -0.34527 0.0112 0.0053 2e-3 0.0395 8e-3 0.07596 0.0124 0.05416 7e-3 0.15351 9e-3 0.54276 0.011l0.47647 2e-3v4.253h-11.154zm8.3847-0.87403c0.02608-6e-3 0.03275-0.0105 0.02648-0.0168-0.0023-2e-3 -0.39858-6e-3 -0.88066-9e-3 -0.8173-4e-3 -0.99827-3e-3 -1.0105 0.01-0.0019 2e-3 -3.58e-4 6e-3 0.0034 0.0102 0.0052 5e-3 0.08647 8e-3 0.33937 0.01 0.53625 5e-3 1.4949 2e-3 1.5219-4e-3z" fill="#fff" fillOpacity=".99221" fillRule="evenodd" />
                                        <path transform="translate(8.501 7.9419)" d="m41.539 816.67v-2.4043l4.9199 2e-5 0.10938 0.0708c0.61359 0.39717 0.95924 0.60765 1.1855 0.72192 0.07641 0.0386 0.11364 0.0527 0.15514 0.0587 0.07159 0.0104 0.27035 0.0978 0.53181 0.23392 0.16801 0.0875 0.25257 0.13451 0.64216 0.35717l0.34277 0.19591v0.0866l-0.27734-2e-3c-0.20747-1e-3 -0.27734-5.2e-4 -0.27734 3e-3 0 0.0172 0.12394 0.0276 0.36426 0.0304l0.19043 2e-3v3.0497h-7.8867zm5.6618-0.66649c0.02807-6e-3 0.0364-0.0123 0.02097-0.0168-0.0049-1e-3 -0.40006-5e-3 -0.87809-7e-3 -0.84216-4e-3 -0.96073-3e-3 -0.99918 7e-3 -0.01161 3e-3 -0.0092 0.01 0.0053 0.0145 0.01795 6e-3 0.46849 9e-3 1.1775 8e-3 0.5314-6.3e-4 0.6513-2e-3 0.67353-6e-3z" fill="#fff" fillOpacity=".99221" fillRule="evenodd" />
                                        <path transform="translate(8.501 7.9419)" d="m41.539 816.67v-2.4043h4.9203l0.07013 0.0454c0.62443 0.4043 0.97492 0.61869 1.2068 0.73821 0.0886 0.0457 0.12344 0.0596 0.16697 0.0666 0.06944 0.0112 0.20989 0.0697 0.42288 0.17614 0.19353 0.0968 0.3097 0.16055 0.74707 0.4103l0.35254 0.20132v0.087l-0.27734-2e-3c-0.20747-1e-3 -0.27734-5.2e-4 -0.27734 3e-3 0 8e-3 0.01659 0.0115 0.07496 0.0179 0.07342 8e-3 0.21935 0.0136 0.36352 0.0137l0.11621 6e-5v3.0508h-7.8867zm4.499-0.66109c-0.01235-7.8e-4 -0.03257-7.8e-4 -0.04492 0-0.01235 7.7e-4 -0.0022 1e-3 0.02246 1e-3 0.02471 0 0.03481-6.4e-4 0.02246-1e-3zm0.71094-4e-5c-0.0854-5.9e-4 -0.22515-5.9e-4 -0.31055 0-0.0854 5.8e-4 -0.01553 1e-3 0.15527 1e-3 0.1708 0 0.24067-4.8e-4 0.15527-1e-3zm-1.113-4e-3c-0.038-6.4e-4 -0.10128-6.4e-4 -0.14062-1e-5 -0.03935 6.4e-4 -0.0083 1e-3 0.06908 1e-3 0.07734 0 0.10954-5.2e-4 0.07154-1e-3zm0.19122 1.3e-4c-0.0059-8.9e-4 -0.01642-9.1e-4 -0.02344-4e-5 -7e-3 8.7e-4 -0.0022 2e-3 0.01067 2e-3 0.01289 2e-5 0.01863-6.9e-4 0.01277-2e-3zm1.3068-1.3e-4c-0.02405-6.8e-4 -0.06448-6.8e-4 -0.08984 0-0.02537 6.8e-4 -0.0057 1e-3 0.04373 1e-3 0.04941 1e-5 0.07017-5.5e-4 0.04612-1e-3zm-1.7616-5e-3c-0.0154-2e-3 -0.03034-4e-3 -0.0332-6e-3 -0.0036-2e-3 -4e-3 -2e-3 -0.0013 1e-3 0.0055 6e-3 0.01635 8e-3 0.04102 8e-3 0.0205-7e-5 0.0202-2.1e-4 -0.0065-3e-3zm1.8279 1e-3c-0.0026-1e-3 -0.0079-1e-3 -0.01172-1.4e-4 -0.0038 9.9e-4 -0.0016 2e-3 0.0048 2e-3 0.0064 8e-5 0.0096-7.3e-4 0.0069-2e-3zm0.01742-4e-3c-0.0013-1e-3 -0.0047-1e-3 -0.0075-3.1e-4 -0.0031 1e-3 -0.0022 2e-3 0.0024 2e-3 0.0041 1.7e-4 0.0064-7.6e-4 0.0051-2e-3zm0.01278-5e-3c0-2e-3 -0.0027-4e-3 -0.0061-4e-3 -0.0033 0-5e-3 2e-3 -0.0037 4e-3s0.0041 4e-3 0.0061 4e-3 0.0037-2e-3 0.0037-4e-3zm-1.8604-7e-3c-0.0038-9.8e-4 -0.0099-9.8e-4 -0.01367 0-0.0038 9.9e-4 -6.83e-4 2e-3 0.0068 2e-3 0.0075 0 0.0106-8e-4 0.0068-2e-3zm1.8027-2.2e-4c-0.02202-6.9e-4 -0.05806-6.9e-4 -0.08008 0-0.02202 7e-4 -4e-3 1e-3 0.04004 1e-3s0.06206-5.7e-4 0.04004-1e-3zm-1.7656-4e-3c-0.0048-9.3e-4 -0.01274-9.3e-4 -0.01758 0-0.0048 9.4e-4 -8.78e-4 2e-3 0.0088 2e-3 0.0097 0 0.01362-7.6e-4 0.0088-2e-3zm0.88305-1.6e-4c-0.03048-6.6e-4 -0.08146-6.6e-4 -0.11328 0-0.03182 6.6e-4 -0.0069 1e-3 0.05542 1e-3 0.06231 0 0.08834-5.4e-4 0.05786-1e-3zm0.50367-1e-5c-0.06929-5.9e-4 -0.18267-5.9e-4 -0.25195 0-0.06929 6e-4 -0.0126 1e-3 0.12598 1e-3 0.13857 0 0.19526-4.9e-4 0.12598-1e-3zm-1.1135-4e-3c-0.04365-6.3e-4 -0.11396-6.3e-4 -0.15625 0-0.04229 6.3e-4 -0.0066 1e-3 0.07936 1e-3 0.08594 0 0.12054-5.1e-4 0.07689-1e-3zm0.32057 1e-5c-0.02632-6.8e-4 -0.06938-6.8e-4 -0.0957 0-0.02632 6.7e-4 -0.0048 1e-3 0.04785 1e-3 0.05264 0 0.07417-5.6e-4 0.04785-1e-3z" fill="#fff" fillOpacity=".99221" fillRule="evenodd" />
                                        <path transform="translate(8.501 7.9419)" d="m41.539 816.67v-2.4043h4.9209l0.12254 0.0793c0.58095 0.37608 0.92434 0.58553 1.1577 0.70613 0.083 0.0429 0.11678 0.0563 0.16169 0.0641 0.08133 0.0141 0.23058 0.0781 0.48671 0.20862 0.17059 0.0869 0.28292 0.14902 0.68461 0.37832l0.35254 0.20125v0.088l-0.27734-2e-3c-0.18182-1e-3 -0.27734-7.9e-4 -0.27734 2e-3 0 2e-3 0.0044 6e-3 0.0098 8e-3 0.02717 0.0124 0.2393 0.0239 0.44236 0.0241l0.10254 7e-5v3.0508h-7.8867zm5.114-0.66113c-0.04365-6.3e-4 -0.11396-6.3e-4 -0.15625 0-0.04229 6.3e-4 -0.0066 1e-3 0.07936 1e-3 0.08594 0 0.12054-5.1e-4 0.07689-1e-3zm-1.0405-4e-3c-0.02083-7e-4 -0.05599-7e-4 -0.07813-1e-5 -0.02214 7e-4 -0.0051 1e-3 0.03788 1e-3 0.04297 0 0.06108-5.7e-4 0.04025-1e-3zm0.21268 1.5e-4c-0.0048-9.3e-4 -0.01274-9.3e-4 -0.01758 0-0.0048 9.3e-4 -8.79e-4 2e-3 0.0088 2e-3 0.0097 0 0.01362-7.6e-4 0.0088-2e-3zm1.2931-1.4e-4c-0.01548-7.4e-4 -0.04185-7.4e-4 -0.05859-1e-5 -0.01675 7.4e-4 -0.0041 1e-3 0.02814 1e-3 0.03223 0 0.04593-6e-4 0.03045-1e-3zm-1.7355-5e-3c-0.02561-6e-3 -0.04429-8e-3 -0.04068-4e-3 0.0051 5e-3 0.01668 7e-3 0.03677 7e-3 0.01745 6e-5 0.01748 4e-5 0.0039-3e-3zm1.8175 1e-3c-0.0026-1e-3 -0.0079-1e-3 -0.01172-1.4e-4 -0.0038 9.9e-4 -0.0016 2e-3 0.0048 2e-3 0.0064 8e-5 0.0096-7.3e-4 0.0069-2e-3zm0.02141-4e-3c0.0099-3e-3 0.01196-9e-3 0.0029-9e-3 -0.0032 0-0.0059 2e-3 -0.0059 4e-3s-0.0031 4e-3 -0.0068 5e-3c-0.0038 9.9e-4 -0.0051 2e-3 -0.0029 2e-3 0.0021 2.2e-4 0.0079-6.6e-4 0.0127-2e-3zm-1.8535-0.0118c-0.0027-1e-3 -0.0071-1e-3 -0.0098 0s-4.88e-4 2e-3 0.0049 2e-3c0.0054 0 0.0076-8.9e-4 0.0049-2e-3zm1.7892-3e-4c-0.01334-7.6e-4 -0.03619-7.7e-4 -0.05078-1e-5 -0.01459 7.5e-4 -0.0037 1e-3 0.02425 1e-3 0.02793 1e-5 0.03987-6.1e-4 0.02653-1e-3zm-1.7521-4e-3c-0.0038-9.8e-4 -0.0099-9.8e-4 -0.01367 0-0.0038 9.8e-4 -6.84e-4 2e-3 0.0068 2e-3 0.0075 0 0.0106-8.1e-4 0.0068-2e-3zm0.81654-1.7e-4c-0.01013-8.1e-4 -0.02771-8.1e-4 -0.03906-2e-5s-0.0031 1e-3 0.01842 1e-3c0.02148 1e-5 0.03077-6.3e-4 0.02064-1e-3zm0.08002 3e-4c-0.0026-1e-3 -0.0079-1e-3 -0.01172-1.5e-4 -0.0038 9.9e-4 -0.0016 2e-3 0.0048 2e-3 0.0064 8e-5 0.0096-7.3e-4 0.0069-2e-3zm0.4201-3.6e-4c-0.038-6.4e-4 -0.10128-6.4e-4 -0.14062 0-0.03935 6.3e-4 -0.0083 1e-3 0.06908 1e-3 0.07734 0 0.10954-5.2e-4 0.07154-1e-3zm-1.0703-4e-3c-0.02512-6.8e-4 -0.06731-6.8e-4 -0.09375 0-0.02644 6.7e-4 -0.0059 1e-3 0.04567 1e-3 0.05156 0 0.0732-5.5e-4 0.04808-1e-3z" fill="#fff" fillOpacity=".99221" fillRule="evenodd" />
                                        <path transform="translate(8.501 7.9419)" d="m42.176 816.67v-2.4043h4.2844l0.11267 0.0729c0.58201 0.37657 0.92738 0.58753 1.1615 0.70944 0.08193 0.0427 0.12462 0.0598 0.16824 0.0673 0.03989 7e-3 0.08935 0.0234 0.16187 0.054 0.15301 0.0645 0.4006 0.18946 0.63473 0.32023 0.09086 0.0507 0.66505 0.37826 0.79883 0.45565l0.08203 0.0475-0.35196-3e-3c-0.24348-2e-3 -0.35274-1e-3 -0.35449 1e-3 -0.0042 7e-3 0.01906 0.0123 0.07904 0.0186 0.09492 0.01 0.26451 0.0134 0.67128 0.0135l0.38762 9e-5 0.05092 0.0252v3.0257h-7.8867zm4.415-0.66096c-0.0048-9.3e-4 -0.01274-9.3e-4 -0.01758 0-0.0048 9.3e-4 -8.79e-4 2e-3 0.0088 2e-3 0.0097 0 0.01362-7.6e-4 0.0088-2e-3zm-0.99805-4e-3c-0.0102-8.1e-4 -0.0269-8.1e-4 -0.03711 0-0.0102 8e-4 -0.0019 1e-3 0.01855 1e-3 0.02041 0 0.02876-6.6e-4 0.01855-1e-3zm0.23047 1.8e-4c-0.0038-9.9e-4 -0.0099-9.9e-4 -0.01367 0-0.0038 9.8e-4 -6.83e-4 2e-3 0.0068 2e-3 0.0075 0 0.0106-8e-4 0.0068-2e-3zm1.2793-1.7e-4c-0.0091-8.2e-4 -0.02407-8.2e-4 -0.0332 0-0.0091 8.2e-4 -0.0017 1e-3 0.0166 1e-3 0.01826 0 0.02573-6.7e-4 0.0166-1e-3zm-1.7275-3e-3c0-9.5e-4 -0.0018-3e-3 -0.0039-4e-3s-0.0039-5.5e-4 -0.0039 2e-3c0 2e-3 0.0018 4e-3 0.0039 4e-3s0.0039-7.7e-4 0.0039-2e-3zm1.8232-6.4e-4c-0.0013-1e-3 -0.0047-1e-3 -0.0075-3.1e-4 -0.0031 1e-3 -0.0022 2e-3 0.0024 2e-3 0.0041 1.7e-4 0.0064-7.5e-4 0.0051-2e-3zm-1.8352-3e-3c-0.0046-4e-3 -0.02353-6e-3 -0.02126-3e-3 0.0014 2e-3 0.0071 4e-3 0.0127 4e-3s0.0095-6.4e-4 0.0086-1e-3zm1.8587-1e-3c0.0099-3e-3 0.01196-9e-3 0.0029-9e-3 -0.0032 0-0.0059 2e-3 -0.0059 4e-3s-0.0031 4e-3 -0.0068 5e-3c-0.0038 9.9e-4 -0.0051 2e-3 -0.0029 2e-3 0.0021 2.2e-4 0.0079-6.6e-4 0.0127-2e-3zm-0.07412-0.0121c-8e-3 -8.4e-4 -0.02206-8.5e-4 -0.03125-3e-5 -0.0092 8.3e-4 -0.0026 2e-3 0.01454 2e-3 0.01719 1e-5 0.0247-6.6e-4 0.01671-2e-3zm-1.7442-4e-3c-0.0027-1e-3 -0.0071-1e-3 -0.0098 0s-4.89e-4 2e-3 0.0049 2e-3c0.0054 0 0.0076-8.8e-4 0.0049-2e-3zm0.81062-2e-4c-0.0059-8.9e-4 -0.01642-9.1e-4 -0.02344-4e-5 -7e-3 8.7e-4 -0.0022 2e-3 0.01067 2e-3 0.01289 2e-5 0.01864-6.9e-4 0.01277-2e-3zm0.08579 4.3e-4c-0.0013-1e-3 -0.0047-1e-3 -0.0075-3.1e-4 -0.0031 1e-3 -0.0022 2e-3 0.0024 2e-3 0.0041 1.7e-4 0.0064-7.5e-4 0.0051-2e-3zm0.33203 0c-0.0013-1e-3 -0.0047-1e-3 -0.0075-3.1e-4 -0.0031 1e-3 -0.0022 2e-3 0.0024 2e-3 0.0041 1.7e-4 0.0064-7.5e-4 0.0051-2e-3zm0.03906 0c-0.0013-1e-3 -0.0047-1e-3 -0.0075-3.1e-4 -0.0031 1e-3 -0.0022 2e-3 0.0024 2e-3 0.0041 1.7e-4 0.0064-7.5e-4 0.0051-2e-3z" fill="#fff" fillOpacity=".99221" fillRule="evenodd" />
                                        <path transform="translate(8.501 7.9419)" d="m42.176 816.67v-2.4043h4.285l0.13858 0.0897c0.57196 0.37004 0.93125 0.58863 1.153 0.70145 0.07395 0.0376 0.11452 0.053 0.1591 0.0603 0.09927 0.0163 0.42779 0.17161 0.79172 0.37435 0.10498 0.0585 0.83032 0.47268 0.86914 0.49631 0.0062 4e-3 -0.06643 4e-3 -0.34223 2e-3 -0.25854-2e-3 -0.35076-1e-3 -0.35277 2e-3 -0.0045 7e-3 0.01252 0.0112 0.07629 0.0179 0.09148 0.01 0.29674 0.0136 0.69579 0.0137l0.36223 1e-4 0.05092 0.0252v3.0257h-7.8867zm3.6455-0.6647c-0.0027-1e-3 -0.0071-1e-3 -0.0098 0s-4.88e-4 2e-3 0.0049 2e-3c0.0054 0 0.0076-8.8e-4 0.0049-2e-3zm1.2696 3e-5c-0.0026-1e-3 -0.0079-1e-3 -0.01172-1.5e-4 -0.0038 9.9e-4 -0.0016 2e-3 0.0048 2e-3 0.0064 8e-5 0.0096-7.3e-4 0.0069-2e-3zm-1.7159-3e-3c0-9.5e-4 -0.0018-3e-3 -0.0039-4e-3s-0.0039-5.5e-4 -0.0039 2e-3c0 2e-3 0.0018 4e-3 0.0039 4e-3s0.0039-7.7e-4 0.0039-2e-3zm1.8232-6.4e-4c-0.0013-1e-3 -0.0047-1e-3 -0.0075-3.1e-4 -0.0031 1e-3 -0.0022 2e-3 0.0024 2e-3 0.0041 1.7e-4 0.0064-7.5e-4 0.0051-2e-3zm-1.8349-3e-3c0-8.3e-4 -0.0044-2e-3 -0.0098-3e-3s-0.0098-3.5e-4 -0.0098 1e-3c0 2e-3 0.0044 3e-3 0.0098 3e-3s0.0098-6.8e-4 0.0098-1e-3zm1.8616-4e-3c0.0048-4e-3 0.0057-6e-3 0.0024-6e-3 -0.0028-7e-5 -0.0078 3e-3 -0.01102 6e-3 -0.0075 8e-3 -0.0013 8e-3 0.0086 1.2e-4zm-0.08714-9e-3c-0.0027-1e-3 -0.0071-1e-3 -0.0098 0s-4.89e-4 2e-3 0.0049 2e-3c0.0054 0 0.0076-8.9e-4 0.0049-2e-3zm-0.93359-4e-3c-0.0027-1e-3 -0.0071-1e-3 -0.0098 0s-4.88e-4 2e-3 0.0049 2e-3c0.0054 0 0.0076-8.8e-4 0.0049-2e-3z" fill="#fff" fillOpacity=".99221" fillRule="evenodd" />
                                        <path transform="translate(8.501 7.9419)" d="m45.277 816.67v-2.4043h1.1835l0.13386 0.0865c0.62793 0.40576 1.0185 0.64132 1.2081 0.72868 0.05029 0.0232 0.06005 0.0265 0.10092 0.0342 0.02833 5e-3 0.03392 5e-3 0.07504-2e-3 0.05208-9e-3 0.08149-0.0182 0.1225-0.0389l0.02986-0.015 0.2538 0.13862c0.22081 0.12059 0.34215 0.1828 0.93349 0.47855 0.37383 0.18697 0.68027 0.3415 0.68099 0.34341 7.16e-4 2e-3 0.0038 3e-3 0.0069 3e-3s0.0596 0.027 0.12565 0.0601c0.10006 0.05 1.5736 0.72351 1.7041 0.77882 0.05692 0.0241 0.37482 0.15111 0.45312 0.18099 0.03545 0.0135 0.24639 0.0908 0.46875 0.17179l0.4043 0.14721 9.86e-4 0.85596 9.85e-4 0.85596h-7.8867zm4.0342-0.64936c-0.0102-8e-4 -0.0269-8e-4 -0.03711 0-0.0102 8.1e-4 -0.0019 1e-3 0.01855 1e-3 0.02041 0 0.02876-6.6e-4 0.01855-1e-3zm-0.17188-4e-3c-0.01235-7.7e-4 -0.03257-7.7e-4 -0.04492 0-0.01235 7.8e-4 -0.0022 1e-3 0.02246 1e-3 0.02471 0 0.03482-6.3e-4 0.02246-1e-3zm-0.16211-8e-3c-0.0048-9.3e-4 -0.01274-9.3e-4 -0.01758 0-0.0048 9.3e-4 -8.79e-4 2e-3 0.0088 2e-3 0.0097 0 0.01362-7.6e-4 0.0088-2e-3zm-0.04102-4e-3c-0.0038-9.9e-4 -0.0099-9.9e-4 -0.01367 0-0.0038 9.8e-4 -6.84e-4 2e-3 0.0068 2e-3 0.0075 0 0.0106-8e-4 0.0068-2e-3zm-3.5615-3e-3c0-9.5e-4 -0.0018-3e-3 -0.0039-4e-3s-0.0039-5.5e-4 -0.0039 2e-3c0 2e-3 0.0018 4e-3 0.0039 4e-3s0.0039-7.7e-4 0.0039-2e-3zm3.5302-6.4e-4c-0.0013-1e-3 -0.0047-1e-3 -0.0075-3.1e-4 -0.0031 1e-3 -0.0022 2e-3 0.0024 2e-3 0.0041 1.7e-4 0.0064-7.5e-4 0.0051-2e-3zm-3.5448-4e-3c-0.0026-1e-3 -0.0079-1e-3 -0.01172-1.4e-4 -0.0038 9.9e-4 -0.0016 2e-3 0.0048 2e-3 0.0064 8e-5 0.0096-7.3e-4 0.0069-2e-3zm1.8621-1e-3c0.0032-2e-3 0.0046-5e-3 0.0031-6e-3 -0.0014-1e-3 -0.0055 2.1e-4 -9e-3 4e-3 -0.0069 7e-3 -0.0034 8e-3 0.0058 3e-3zm1.6681 2e-3c0-8.2e-4 -0.0035-2e-3 -0.0078-4e-3 -0.0043-1e-3 -0.0068-4.5e-4 -0.0056 1e-3 0.0021 3e-3 0.01345 5e-3 0.01345 2e-3zm0.53822-5e-3c-0.01013-8e-4 -0.02771-8.1e-4 -0.03906-1e-5 -0.01135 7.9e-4 -0.0031 1e-3 0.01842 1e-3 0.02148 1e-5 0.03077-6.3e-4 0.02064-1e-3zm0.15706-6e-5c-1.7e-5 -2e-3 -0.04776-0.0302-0.1061-0.0635-0.12803-0.0731-0.1627-0.0923-0.15754-0.0871 0.0021 2e-3 0.06016 0.0361 0.12891 0.0754 0.06875 0.0393 0.12559 0.073 0.1263 0.0748 0.0016 4e-3 0.0085 4e-3 0.0084 3.7e-4zm-0.6904-4e-3c-0.0027-1e-3 -0.0071-1e-3 -0.0098 0s-4.88e-4 2e-3 0.0049 2e-3c0.0054 0 0.0076-8.9e-4 0.0049-2e-3zm0.06046-2.7e-4c-0.0081-8.4e-4 -0.02041-8.3e-4 -0.02734 3e-5 -0.0069 8.7e-4 -3.04e-4 2e-3 0.01474 2e-3 0.01504-2e-5 0.02071-7.2e-4 0.01261-2e-3zm0.21298-6e-5c-0.02417-6.9e-4 -0.06372-6.9e-4 -0.08789 0-0.02417 6.8e-4 -0.0044 1e-3 0.04395 1e-3 0.04834 0 0.06811-5.6e-4 0.04395-1e-3zm0.12578-0.16446c-0.0036-3e-3 -0.21992-0.12689-0.24004-0.13725-0.0054-3e-3 -0.0085-4e-3 -7e-3 -2e-3 0.0031 3e-3 0.24617 0.14254 0.24895 0.14256 9.66e-4 1e-5 8.8e-5 -1e-3 -2e-3 -3e-3zm-0.25176-0.14289c0-3e-3 -0.26197-0.15173-0.26353-0.15012-1e-3 1e-3 0.25862 0.15107 0.26255 0.15165 5.37e-4 8e-5 9.77e-4 -6.1e-4 9.77e-4 -2e-3zm-0.2834-0.16208c-0.01782-0.0172-0.54529-0.29371-0.55935-0.29317-0.0016 6e-5 0.06736 0.0358 0.1533 0.0793 0.14938 0.0757 0.25108 0.12968 0.35742 0.18962 0.04906 0.0276 0.05548 0.0308 0.04863 0.0242zm-0.59746-0.31103c-0.07134-0.0347-0.20448-0.0881-0.21808-0.0875-0.0025 1.1e-4 0.01476 7e-3 0.0384 0.0156 0.04728 0.0169 0.12721 0.0505 0.17578 0.074 0.01719 8e-3 0.03301 0.0151 0.03516 0.0151 0.0021 0-0.01191-8e-3 -0.03125-0.0171z" fill="#fff" fillOpacity=".99221" fillRule="evenodd" />
                                        <path transform="translate(8.501 7.9419)" d="m44.844 815.93v-2.4043h0.48176l0.1722 0.11401c1.2632 0.83637 1.9326 1.259 2.244 1.4168 0.09357 0.0474 0.11688 0.0566 0.16462 0.0649 0.03714 6e-3 0.10775 0.031 0.17917 0.0623 0.03915 0.0172 0.05313 0.0216 0.04514 0.0145-0.0051-5e-3 -0.10106-0.0446-0.14629-0.061-0.02676-0.01-0.03384-0.0135-0.02539-0.0137 0.02736-5.3e-4 0.09729-0.02 0.13423-0.0374l0.03852-0.0181 0.17144 0.0935c0.31178 0.17014 0.4 0.21541 1.1753 0.60325 0.62726 0.31376 0.72021 0.35913 0.96289 0.47004 0.52661 0.24066 1.3609 0.61902 1.4141 0.64127 0.20312 0.0851 0.45875 0.1839 0.73144 0.28284l0.14356 0.0521v1.1233h-7.8867zm4.288 0.0929c-0.0081-8.5e-4 -0.02041-8.3e-4 -0.02734 3e-5 -0.0069 8.6e-4 -3.03e-4 2e-3 0.01474 2e-3 0.01504-2e-5 0.02071-7.3e-4 0.01261-2e-3zm-0.15414-8e-3c-0.0026-1e-3 -0.0079-1e-3 -0.01172-1.4e-4 -0.0038 9.9e-4 -0.0016 2e-3 0.0048 2e-3 0.0064 8e-5 0.0096-7.3e-4 0.0069-2e-3zm-0.04304-4e-3c-0.0027-1e-3 -0.0071-1e-3 -0.0098 0s-4.89e-4 2e-3 0.0049 2e-3c0.0054 0 0.0076-8.8e-4 0.0049-2e-3zm-3.5596-3e-3c0-9.5e-4 -0.0018-3e-3 -0.0039-4e-3s-0.0039-5.5e-4 -0.0039 2e-3c0 2e-3 0.0018 4e-3 0.0039 4e-3s0.0039-7.7e-4 0.0039-2e-3zm-0.01668-5e-3c-0.0013-1e-3 -0.0047-1e-3 -0.0075-3.1e-4 -0.0031 1e-3 -0.0022 2e-3 0.0024 2e-3 0.0041 1.7e-4 0.0064-7.6e-4 0.0051-2e-3zm3.5303-6.3e-4c-0.0013-2e-3 -2.6e-4 -4e-3 0.0024-4e-3 0.0026 0 4e-3 -8.1e-4 3e-3 -2e-3 -9.89e-4 -9.9e-4 -0.0058-7.5e-4 -0.01075 5.4e-4 -0.0067 2e-3 -0.0076 3e-3 -0.0037 6e-3 0.0071 5e-3 0.01205 4e-3 0.0091-4.8e-4zm-1.6621-4e-3c0-2e-3 -7.75e-4 -4e-3 -0.0017-4e-3 -9.48e-4 0-0.0028 2e-3 -0.0041 4e-3s-5.53e-4 4e-3 0.0017 4e-3c0.0023 0 0.0041-2e-3 0.0041-4e-3zm2.1942 1e-3c-0.0081-8.5e-4 -0.02041-8.3e-4 -0.02734 3e-5 -0.0069 8.6e-4 -3.04e-4 2e-3 0.01474 2e-3 0.01504-2e-5 0.02071-7.3e-4 0.01261-2e-3zm0.16437-1e-3c-0.0019-6e-3 -0.11233-0.07-0.1201-0.0699-0.0034 2e-5 0.02055 0.0154 0.05312 0.0341 0.03257 0.0188 0.05839 0.0354 0.05739 0.0371-1e-3 2e-3 0.0011 3e-3 0.0046 3e-3s0.0058-2e-3 5e-3 -4e-3zm-0.63102-2e-3c-0.0048-9.2e-4 -0.01359-9.5e-4 -0.01953-5e-5 -0.0059 9e-4 -2e-3 2e-3 0.0087 2e-3 0.01074 3e-5 0.0156-7.1e-4 0.0108-2e-3zm0.16792-1.1e-4c-0.0091-8.2e-4 -0.02407-8.2e-4 -0.0332 0-0.0091 8.3e-4 -0.0017 1e-3 0.0166 1e-3 0.01826 0 0.02573-6.7e-4 0.0166-1e-3zm0.33496-0.073c0-3e-3 -0.02635-0.0179-0.03171-0.0178-3e-3 6e-5 0.0016 4e-3 0.01023 0.01 0.01488 9e-3 0.02148 0.0116 0.02148 8e-3zm-0.08594-0.0511c-0.03818-0.0214-0.05712-0.0304-0.05046-0.0238 0.0059 6e-3 0.08478 0.049 0.08952 0.049 0.0032 1e-5 -0.01436-0.0113-0.03906-0.0252zm-0.07454-0.0425c-8.96e-4 -8.2e-4 -0.03151-0.0186-0.06803-0.0396-0.03652-0.0209-0.07236-0.0417-0.07965-0.046-0.0073-4e-3 -0.01255-6e-3 -0.01171-3e-3 0.0017 5e-3 0.15673 0.0947 0.15935 0.0921 9.13e-4 -9.1e-4 9.28e-4 -2e-3 3.3e-5 -3e-3zm-0.16988-0.098c-0.0073-5e-3 -0.01729-8e-3 -0.01729-4e-3 0 3e-3 0.02126 0.0133 0.02315 0.0115 9.18e-4 -9e-4 -0.0017-4e-3 -0.0059-7e-3zm-0.05376-0.0297c-0.01039-7e-3 -0.02066-0.0113-0.02282-0.0105-0.0042 1e-3 0.0312 0.0223 0.0378 0.0224 0.0021 1e-5 -0.0046-5e-3 -0.01498-0.0118zm-0.03396-0.0195c-0.0032-2e-3 -0.04002-0.0232-0.08192-0.047-0.04189-0.0238-0.07881-0.0448-0.08203-0.0467-0.04133-0.0243-0.09084-0.0509-0.09221-0.0496-9.61e-4 9.6e-4 0.05674 0.0353 0.12822 0.0762 0.07148 0.0409 0.13081 0.0736 0.13183 0.0726 1e-3 -1e-3 -7.29e-4 -4e-3 -0.0039-6e-3zm-0.28264-0.16109c-0.01595-0.0117-0.1164-0.0657-0.11995-0.0645-0.0021 7.1e-4 0.02475 0.0174 0.05976 0.037 0.035 0.0196 0.0644 0.035 0.06531 0.0341 9.17e-4 -8.9e-4 -0.0014-4e-3 -0.0051-7e-3zm-0.15475-0.0844c0-2e-3 -0.0026-4e-3 -0.0059-6e-3 -6e-3 -2e-3 -8e-3 2e-3 -0.0033 7e-3 0.0037 4e-3 0.0091 3e-3 0.0091-8.9e-4zm-0.01595-0.01c-0.01238-0.0108-0.3725-0.19391-0.38111-0.19378-4e-3 5e-5 0.05165 0.0297 0.12363 0.066 0.07197 0.0362 0.15896 0.0809 0.19331 0.0992 0.03435 0.0184 0.0632 0.0326 0.06413 0.0317 9.23e-4 -9.2e-4 9.46e-4 -2e-3 5.1e-5 -3e-3zm-0.3903-0.19578c0-3e-3 -0.03829-0.0216-0.04382-0.0213-0.0028 1.7e-4 0.0055 5e-3 0.01843 0.0117 0.02531 0.0123 0.02539 0.0124 0.02539 0.01z" fill="#fff" fillOpacity=".99221" fillRule="evenodd" />
                                        <path transform="translate(8.501 7.9419)" d="m44.844 815.93v-2.4043l0.48242 8e-5 0.20898 0.13829c1.2803 0.84721 1.9302 1.2564 2.2305 1.4044 0.07121 0.0351 0.10482 0.0474 0.14965 0.0548 0.03097 5e-3 0.07988 0.0222 0.15816 0.0555 0.03072 0.013 0.05664 0.0229 0.05761 0.022 9.6e-4 -9.6e-4 -0.0075-6e-3 -0.01875-0.0107-0.01127-5e-3 -0.02356-0.0105-0.0273-0.0124-0.01305-7e-3 -0.10271-0.0417-0.11972-0.0468l-0.01715-5e-3 0.03082-5e-3c0.04215-7e-3 0.07922-0.0185 0.11923-0.037l0.03372-0.0156 0.17526 0.0955c0.31445 0.17132 0.43808 0.23481 1.1694 0.6005 0.49014 0.2451 0.72217 0.35924 0.8457 0.41603 0.34865 0.16028 1.4476 0.65954 1.5192 0.69017 0.16137 0.0691 0.46142 0.18527 0.74548 0.2887l0.14356 0.0523v1.1232h-7.8867zm4.2861 0.0929c-0.0048-9.3e-4 -0.01274-9.3e-4 -0.01758 0-0.0048 9.3e-4 -8.79e-4 2e-3 0.0088 2e-3 0.0097 0 0.01362-7.6e-4 0.0088-2e-3zm-0.15234-8e-3c-0.0027-1e-3 -0.0071-1e-3 -0.0098 0s-4.88e-4 2e-3 0.0049 2e-3c0.0054 0 0.0076-8.9e-4 0.0049-2e-3zm-0.0411-4e-3c-0.0013-1e-3 -0.0047-1e-3 -0.0075-3.1e-4 -0.0031 1e-3 -0.0022 2e-3 0.0024 2e-3 0.0041 1.7e-4 0.0064-7.5e-4 0.0051-2e-3zm-3.5781-8e-3c-0.0013-1e-3 -0.0047-1e-3 -0.0075-3.1e-4 -0.0031 1e-3 -0.0022 2e-3 0.0024 2e-3 0.0041 1.7e-4 0.0064-7.6e-4 0.0051-2e-3zm3.5304-6.3e-4c-0.0013-2e-3 -0.0042-4e-3 -0.0063-4e-3s-0.0028 2e-3 -0.0015 4e-3 0.0042 4e-3 0.0063 4e-3 0.0028-2e-3 0.0015-4e-3zm-1.6621-4e-3c0-2e-3 -7.75e-4 -4e-3 -0.0017-4e-3 -9.48e-4 0-0.0028 2e-3 -0.0041 4e-3s-5.53e-4 4e-3 0.0017 4e-3c0.0023 0 0.0041-2e-3 0.0041-4e-3zm2.1924 1e-3c-0.0048-9.3e-4 -0.01359-9.5e-4 -0.01953-5e-5 -0.0059 8.9e-4 -2e-3 2e-3 0.0087 2e-3 0.01074 3e-5 0.0156-7e-4 0.0108-2e-3zm0.16693-1.8e-4c-9e-6 -4e-3 -0.03287-0.0244-0.03946-0.0244-3e-3 2e-5 0.0025 5e-3 0.01213 0.0105 0.0097 6e-3 0.01816 0.0119 0.01888 0.0136 0.0016 4e-3 0.0085 4e-3 0.0085 2.7e-4zm-0.63566-4e-3c-0.0026-1e-3 -0.0079-1e-3 -0.01172-1.4e-4 -0.0038 9.9e-4 -0.0016 2e-3 0.0048 2e-3 0.0064 8e-5 0.0096-7.3e-4 0.0069-2e-3zm0.54192-0.0521c-0.0054-4e-3 -0.01152-8e-3 -0.01367-8e-3 -0.0021-4e-5 0.0014 3e-3 0.0078 8e-3 0.015 0.01 0.01856 0.01 0.0059 0zm-0.08789-0.0508c-0.0013-2e-3 -0.0045-4e-3 -0.0071-4e-3 -0.0028 3e-5 -0.0023 2e-3 0.0012 4e-3 0.0075 5e-3 0.0089 5e-3 0.0059 0zm-0.05209-0.0316c-0.01576-9e-3 -0.02933-0.0152-0.03015-0.0144-0.0023 2e-3 0.04631 0.03 0.05295 0.0302 0.0032 7e-5 -7e-3 -7e-3 -0.0228-0.0158zm-0.05565-0.0323c-8.96e-4 -7.9e-4 -0.03327-0.0195-0.07194-0.0415s-0.07427-0.0425-0.0791-0.0455c-0.0048-3e-3 -0.0088-4e-3 -0.0088-2e-3 0 4e-3 0.15726 0.0948 0.15976 0.0923 9.37e-4 -9.4e-4 9.71e-4 -2e-3 7.6e-5 -3e-3zm-0.16374-0.0917c0-4e-3 -0.01973-0.0135-0.02233-0.0108-9.87e-4 9.8e-4 0.0032 4e-3 0.0093 8e-3 0.01331 7e-3 0.01304 7e-3 0.01304 3e-3zm-0.0625-0.0334c0-8.3e-4 -0.0048-4e-3 -0.01074-8e-3l-0.01074-7e-3 0.0092 8e-3c9e-3 8e-3 0.01226 0.01 0.01226 7e-3zm-0.03918-0.0262c-0.01237-8e-3 -0.20989-0.12032-0.22645-0.12859-0.03999-0.02-0.0043 2e-3 0.10871 0.0667 0.06589 0.0378 0.12064 0.068 0.12165 0.0672 1e-3 -8.4e-4 -7.46e-4 -3e-3 -0.0039-5e-3zm-0.27556-0.15783c-0.0091-7e-3 -0.06986-0.0372-0.07453-0.0371-0.0018 1e-5 0.01514 0.0103 0.0377 0.0229 0.03815 0.0213 0.05446 0.0276 0.03682 0.0142zm-0.158-0.0861c-0.0027-3e-3 -0.0057-5e-3 -0.0067-4e-3 -0.0027 3e-3 0.0028 0.0101 0.0075 0.0101 0.0026 0 0.0023-2e-3 -7.87e-4 -6e-3zm-0.01197-7e-3c-0.0034-3e-3 -0.05038-0.0258-0.05327-0.0258-0.0017 4e-5 0.0092 7e-3 0.02421 0.0154 0.01499 8e-3 0.02803 0.0145 0.02897 0.0136 9.44e-4 -9.5e-4 9.84e-4 -2e-3 8.9e-5 -3e-3zm-0.11491-0.0594c-0.01143-9e-3 -0.09104-0.0485-0.09672-0.0482-0.0043 1.8e-4 0.09759 0.0539 0.10258 0.0542 0.0011 4e-5 -0.0016-3e-3 -0.0059-6e-3zm-0.13086-0.0686c-0.02049-0.0126-0.13303-0.0668-0.1349-0.065-0.0018 2e-3 0.13856 0.0728 0.14467 0.0732 0.0021 1.2e-4 -0.0022-4e-3 -0.0098-8e-3zm-0.14453-0.0676c0-3e-3 -0.02257-0.0138-0.02813-0.0135-0.0028 1.6e-4 2e-3 4e-3 0.01055 8e-3 0.01862 9e-3 0.01758 8e-3 0.01758 6e-3z" fill="#fff" fillOpacity=".99221" fillRule="evenodd" />
                                        <path transform="translate(8.501 7.9419)" d="m42.836 814.35v-2.4043h0.07878l0.05403 0.0371c0.02972 0.0204 0.05725 0.0382 0.0612 0.0396 0.0039 1e-3 -0.01805-0.0149-0.04888-0.0361l-0.05605-0.0386 0.25454-2e-3 0.88581 0.6091c0.8619 0.59265 0.89008 0.61242 1.044 0.73237l0.1582 0.12328 0.74805 0.44894c0.49385 0.29639 0.8768 0.5294 1.127 0.68572l0.37891 0.23678 0.0082 0.0302c0.0045 0.0166 0.0094 0.0342 0.011 0.039l0.0029 9e-3 -0.0696 8e-5 -0.0696 7e-5 0.01953 0.0123c0.04967 0.0312 0.2379 0.13718 0.30469 0.17157 0.09254 0.0476 0.12478 0.0606 0.17941 0.0719 0.04452 9e-3 0.09058 0.0252 0.17395 0.0603 0.02636 0.0111 0.04866 0.0194 0.04957 0.0185 0.0022-2e-3 -0.08348-0.0389-0.13794-0.0591l-0.04361-0.0162 0.03105-5e-3c0.04058-6e-3 0.07568-0.0173 0.11733-0.0366l0.03383-0.0156 0.15367 0.0838c0.32653 0.17818 0.50344 0.2689 1.2884 0.66076 0.55266 0.27587 0.63599 0.3163 0.90625 0.43969 0.1042 0.0476 0.20132 0.0919 0.21582 0.0986l0.02637 0.0121v0.39728h-7.8867zm6.29 1.6673c-0.0027-1e-3 -0.0071-1e-3 -0.0098 0s-4.88e-4 2e-3 0.0049 2e-3c0.0054 0 0.0076-8.9e-4 0.0049-2e-3zm-0.2373-0.02085c-0.0013-2e-3 -0.0042-4e-3 -0.0063-4e-3s-0.0028 2e-3 -0.0015 4e-3 0.0042 4e-3 0.0063 4e-3 0.0028-2e-3 0.0015-4e-3zm-1.6621-4e-3c0-2e-3 -7.74e-4 -4e-3 -0.0017-4e-3 -9.47e-4 0-0.0028 2e-3 -0.0041 4e-3s-5.53e-4 4e-3 0.0017 4e-3c0.0023 0 0.0041-2e-3 0.0041-4e-3zm2.1886 1e-3c-0.0026-1e-3 -0.0079-1e-3 -0.01172-1.5e-4 -0.0038 9.9e-4 -0.0016 2e-3 0.0048 2e-3 0.0064 8e-5 0.0096-7.3e-4 0.0069-2e-3zm0.17082-4e-4c0-4e-3 -0.03549-0.0254-0.03783-0.023-9.59e-4 9.6e-4 0.0054 6e-3 0.01414 0.0107 0.0087 5e-3 0.01588 0.0104 0.01588 0.0121 0 2e-3 0.0018 3e-3 0.0039 3e-3s0.0039-1e-3 0.0039-3e-3zm-0.63778-3e-3c-0.0013-1e-3 -0.0047-1e-3 -0.0075-3e-4 -0.0031 1e-3 -0.0022 2e-3 0.0024 2e-3 0.0041 1.7e-4 0.0064-7.6e-4 0.0051-2e-3zm0.54457-0.0525c-0.0051-4e-3 -0.01122-8e-3 -0.01367-8e-3 -0.0024 2e-5 8.24e-4 3e-3 0.0073 8e-3 0.01522 0.01 0.01802 0.01 0.0064 1.4e-4zm-0.08843-0.0507c-0.0013-2e-3 -0.0045-4e-3 -0.0071-4e-3 -0.0028 3e-5 -0.0023 2e-3 0.0012 4e-3 0.0075 5e-3 0.0089 5e-3 0.0059 0zm-0.03144-0.0189c-6e-3 -5e-3 -0.05097-0.0295-0.04668-0.025 0.0058 6e-3 0.0424 0.0282 0.04668 0.0283 0.0023 4e-5 0.0023-1e-3 0-3e-3zm-0.10143-0.0595c-0.07146-0.0418-0.13121-0.0748-0.13266-0.0733-0.0023 2e-3 0.14718 0.0886 0.15415 0.089 0.0032 1.8e-4 -0.0065-7e-3 -0.02148-0.0156zm-0.13861-0.0772c0-3e-3 -0.01696-0.0124-0.02264-0.0123-0.0024 2e-5 0.01914 0.0155 0.02167 0.0156 5.37e-4 1e-5 9.76e-4 -1e-3 9.76e-4 -3e-3zm-0.06444-0.0358c-0.0013-2e-3 -0.0063-6e-3 -0.01097-8e-3 -0.0074-4e-3 -0.0072-3e-3 0.0012 4e-3 0.01094 9e-3 0.0133 0.01 0.0098 4e-3zm-0.03918-0.0248c-0.01045-7e-3 -0.20345-0.11695-0.2206-0.12551-0.0075-4e-3 -0.01191-5e-3 -0.0098-3e-3 0.0056 6e-3 0.22972 0.13347 0.23427 0.13357 0.0021 4e-5 3.31e-4 -2e-3 -0.0039-5e-3zm-0.27344-0.15633c-0.01492-0.0104-0.07796-0.0427-0.07324-0.0376 0.0056 6e-3 0.07156 0.0427 0.07715 0.0428 0.0021 5e-5 3.32e-4 -2e-3 -0.0039-5e-3zm-0.15614-0.0845c-0.0013-2e-3 -0.0045-4e-3 -0.0071-4e-3 -0.0028 3e-5 -0.0023 2e-3 0.0012 4e-3 0.0075 5e-3 0.0089 5e-3 0.0059 0zm-0.014-9e-3c-0.0034-3e-3 -0.05036-0.0258-0.05327-0.0258-0.0017 3e-5 0.0093 7e-3 0.0243 0.0153 0.01504 8e-3 0.02808 0.0145 0.02897 0.0136 8.95e-4 -8.7e-4 8.95e-4 -2e-3 0-3e-3zm-0.1149-0.0593c-0.01227-9e-3 -0.09225-0.0494-0.09432-0.0473-0.0017 2e-3 0.09528 0.0531 0.10017 0.0532 0.0011 1e-5 -0.0016-3e-3 -0.0058-6e-3zm-0.13868-0.0727c-0.02581-0.0148-0.125-0.0622-0.125-0.0597 0 2e-3 0.13752 0.0717 0.14258 0.0719 0.0021 1e-4 -0.0058-5e-3 -0.01758-0.0122zm-0.13672-0.0637c0-2e-3 -0.02203-0.0138-0.02617-0.0136-0.0017 9e-5 3e-3 4e-3 0.01055 8e-3 0.0154 8e-3 0.01563 9e-3 0.01563 6e-3zm-1.7578-0.97867c-0.0032-2e-3 -0.0076-4e-3 -0.0098-4e-3 -0.0021 0-0.0013 2e-3 2e-3 4e-3 0.0032 2e-3 0.0076 4e-3 0.0098 4e-3 0.0021 0 0.0013-2e-3 -2e-3 -4e-3zm-0.08984-0.0586c-0.0097-6e-3 -0.01934-0.0117-0.02148-0.0117-0.0021 0 4e-3 5e-3 0.01367 0.0117 0.0097 6e-3 0.01934 0.0117 0.02148 0.0117 0.0021 0-4e-3 -5e-3 -0.01367-0.0117zm-0.10156-0.0664c-0.0097-6e-3 -0.01934-0.0117-0.02148-0.0117-0.0021 0 4e-3 5e-3 0.01367 0.0117 0.0097 6e-3 0.01934 0.0117 0.02148 0.0117 0.0021 0-4e-3 -5e-3 -0.01367-0.0117zm-0.10156-0.0664c-0.0097-6e-3 -0.01934-0.0117-0.02148-0.0117-0.0021 0 4e-3 5e-3 0.01367 0.0117 0.0097 6e-3 0.01934 0.0117 0.02148 0.0117 0.0021 0-4e-3 -5e-3 -0.01367-0.0117zm-0.14258-0.0937c-0.01934-0.0129-0.03691-0.0234-0.03906-0.0234-0.0021 0 0.01191 0.0105 0.03125 0.0234s0.03691 0.0234 0.03906 0.0234c0.0021 0-0.01191-0.0105-0.03125-0.0234zm-0.1543-0.10156c-0.01611-0.0107-0.03105-0.0195-0.0332-0.0195-0.0021 0 0.0093 9e-3 0.02539 0.0195 0.01611 0.0107 0.03105 0.0195 0.0332 0.0195 0.0021 0-0.0093-9e-3 -0.02539-0.0195zm-0.15658-0.10299c-8.95e-4 -7.8e-4 -6e-3 -4e-3 -0.01139-6e-3 -0.0092-4e-3 -0.0093-4e-3 -0.0022 1e-3 0.0062 5e-3 0.01894 9e-3 0.01358 5e-3zm-0.03307-0.0215c-0.0078-7e-3 -0.10004-0.0674-0.10641-0.0695-0.0037-1e-3 0.01793 0.0146 0.04801 0.0351s0.05636 0.0374 0.0584 0.0376c0.0023 1.6e-4 0.0023-1e-3 0-3e-3zm-0.23255-0.15418c-0.01126-9e-3 -1.5938-1.063-1.6735-1.1144-0.2735-0.17639-0.69429-0.43538-0.69927-0.4304-8.05e-4 8e-4 0.0481 0.0312 0.10867 0.0675 0.38772 0.23235 0.5327 0.32641 1.5317 0.99364 0.39943 0.26678 0.728 0.48506 0.73014 0.48506 0.0021 0 0.0032-6e-4 0.0023-1e-3z" fill="#fff" fillOpacity=".99221" fillRule="evenodd" />
                                        <path transform="translate(8.501 7.9419)" d="m37.938 812.31v-2.4043h1.2979l1.2979 1e-5 0.06055 0.0498c0.57639 0.47415 1.1669 1.0115 1.4062 1.2797 0.04971 0.0557 0.20106 0.18825 0.35183 0.30813 0.1239 0.0985 0.37902 0.27964 0.60911 0.43246 0.07634 0.0507 0.08593 0.0525 0.0144 3e-3l-0.04224-0.0294 0.0149-2e-3c0.01239-1e-3 0.0114-2e-3 -0.0059-2e-3 -0.02022-6.4e-4 -0.02372-3e-3 -0.13086-0.0762-0.06055-0.0416-0.12124-0.0833-0.13487-0.0928l-0.02478-0.0172 0.0365-5e-3c0.04196-6e-3 0.0932-0.0205 0.12443-0.0362l0.02158-0.0109 0.15619 0.10722c0.0859 0.059 0.16585 0.11448 0.17767 0.12333 0.01182 9e-3 0.29746 0.20593 0.63476 0.43793 1.1771 0.80964 1.1435 0.78603 1.36 0.95466l0.10489 0.0817 0.55664 0.33382v0.0467c0 0.0337-0.0013 0.0467-0.0047 0.0467-0.0036 0-0.0036 1e-3 0 5e-3s0.0047 0.10607 0.0047 0.4375v0.43281h-7.8867zm7.75 1.4414c-0.01284-7e-3 -0.01918-7e-3 -0.0095-1.2e-4 0.0042 3e-3 0.01022 6e-3 0.01344 6e-3 0.0034-1e-5 0.0018-2e-3 -0.0039-6e-3zm-0.02767-0.0191c-0.0093-9e-3 -0.10604-0.0692-0.1077-0.0676-0.0012 1e-3 0.02195 0.0182 0.05147 0.0377s0.05461 0.0346 0.05576 0.0334c0.0012-1e-3 0.0014-3e-3 4.67e-4 -4e-3zm-0.23405-0.1528c0-2e-3 -1.3268-0.88718-1.582-1.0554-0.27647-0.18228-0.78092-0.49502-0.78763-0.48831-0.0021 2e-3 0.0173 0.0142 0.13529 0.0849 0.17225 0.10312 0.38416 0.23575 0.58984 0.36916 0.05264 0.0341 0.44284 0.29373 0.86712 0.57687 0.42428 0.28313 0.77277 0.51479 0.77441 0.51479 0.0016 0 3e-3 -8.8e-4 3e-3 -2e-3zm-2.3035-1.6338c-0.02191-6.9e-4 -0.05882-6.9e-4 -0.08203 0s-0.0053 1e-3 0.03983 1e-3c0.04512 0 0.06411-5.6e-4 0.04221-1e-3z" fill="#fff" fillOpacity=".99221" fillRule="evenodd" />
                                        <path transform="translate(8.501 7.9419)" d="m42.699 814.66v-2.4043h0.70404l0.07278 0.0455c0.19876 0.12422 0.37396 0.23951 1.1286 0.7426 0.44962 0.29977 0.81852 0.544 0.81979 0.54274 0.0024-2e-3 -1.5495-1.0377-1.7091-1.1402-0.05072-0.0326-0.13705-0.0872-0.19184-0.12151-0.05479-0.0343-0.10128-0.0639-0.10332-0.0657-0.0021-2e-3 0.03953-3e-3 0.09781-3e-3h0.10152l0.45492 0.31293c0.87247 0.60015 0.87809 0.60412 1.0975 0.77495l0.0957 0.0745 0.49805 0.29909c0.63274 0.37997 0.94557 0.56933 1.2109 0.73298 0.13265 0.0818 0.53659 0.33355 0.54004 0.33657 0.0031 3e-3 0.02224 0.0653 0.02238 0.0733 5.2e-5 3e-3 -0.0083 5e-3 -0.02238 6e-3 -0.02155 1e-3 -0.02142 1e-3 0.0033 1e-3l0.02576-3.4e-4 0.0072 0.0176c0.0093 0.0227 0.02958 0.0573 0.04649 0.0795 0.0073 0.01 0.01255 0.0182 0.0116 0.0192-0.0024 2e-3 0.11937 0.0682 0.17809 0.0962 0.04798 0.0229 0.07426 0.0316 0.14092 0.0467 0.0277 6e-3 0.11883 0.0402 0.18463 0.0687 0.0083 4e-3 0.01401 5e-3 0.01279 3e-3 -0.0026-4e-3 -0.06122-0.0291-0.13053-0.0556l-0.04805-0.0183 0.02071-3e-3c0.03755-5e-3 0.08262-0.0181 0.12313-0.0361l0.03992-0.0177 0.16125 0.0879c0.32433 0.1767 0.4307 0.23122 1.2765 0.65437 0.50461 0.25246 0.64322 0.31994 0.87207 0.42462l0.14355 0.0657v0.76431h-7.8867zm6.1895 1.3418c-0.0013-2e-3 -0.0042-4e-3 -0.0063-4e-3s-0.0028 2e-3 -0.0015 4e-3 0.0042 4e-3 0.0063 4e-3 0.0028-2e-3 0.0015-4e-3zm0.52433-2e-3c-0.0013-1e-3 -0.0047-1e-3 -0.0075-3.1e-4 -0.0031 1e-3 -0.0022 2e-3 0.0024 2e-3 0.0041 1.7e-4 0.0064-7.5e-4 0.0051-2e-3zm0.17088-2e-3c-0.0036-6e-3 -0.03347-0.0242-0.03568-0.022-1e-3 1e-3 0.0053 6e-3 0.01404 0.0108 0.0087 5e-3 0.01588 0.0104 0.01588 0.0121 0 2e-3 0.0019 3e-3 0.0041 3e-3 0.0023 0 3e-3 -2e-3 0.0016-4e-3zm-0.08583-0.0506c-0.0013-2e-3 -0.0063-6e-3 -0.01097-8e-3 -0.0074-4e-3 -0.0072-3e-3 0.0012 4e-3 0.01094 9e-3 0.01331 0.01 0.0098 4e-3zm-0.09376-0.0547c-0.0013-2e-3 -0.0045-4e-3 -0.0071-4e-3 -0.0028 3e-5 -0.0023 2e-3 0.0012 4e-3 0.0075 5e-3 0.0089 5e-3 0.0059 0zm-0.0293-0.0173c0-2e-3 -0.04401-0.0259-0.0455-0.0245-0.0014 1e-3 0.03808 0.0252 0.04257 0.0258 0.0016 1.9e-4 0.0029-4e-4 0.0029-1e-3zm-0.08203-0.0469c0-2e-3 -0.08629-0.0522-0.13086-0.0766-0.01289-7e-3 -0.02168-0.0109-0.01953-9e-3 0.0035 4e-3 0.14583 0.0868 0.14903 0.0868 7.46e-4 0 0.0014-7.4e-4 0.0014-2e-3zm-0.16742-0.0961c-0.0051-4e-3 -0.01122-8e-3 -0.01367-8e-3 -0.0024 2e-5 8.23e-4 4e-3 0.0073 8e-3 0.01494 0.01 0.01835 0.01 0.0064-1.3e-4zm-0.05914-0.0331c-0.0027-3e-3 -0.0067-6e-3 -9e-3 -6e-3s-7.63e-4 3e-3 0.0034 6e-3c0.0098 7e-3 0.01171 7e-3 0.0056 1.3e-4zm-0.03722-0.0228c-0.0075-5e-3 -0.16172-0.093-0.20497-0.11691-0.01182-7e-3 -0.01973-0.01-0.01758-8e-3 0.0052 6e-3 0.2216 0.12949 0.22646 0.12966 0.0021 8e-5 3.31e-4 -2e-3 -0.0039-5e-3zm-0.27315-0.15465c-3e-3 -5e-3 -0.06868-0.0405-0.07078-0.0384-0.0014 1e-3 0.06792 0.0419 0.07181 0.042 6.64e-4 1e-5 2.01e-4 -2e-3 -1e-3 -4e-3zm-0.15643-0.0862c-0.0013-2e-3 -0.0045-4e-3 -0.0071-4e-3 -0.0028 3e-5 -0.0023 2e-3 0.0012 4e-3 0.0075 5e-3 0.0089 5e-3 0.0059 0zm-0.014-9e-3c-0.0035-3e-3 -0.05223-0.0266-0.04952-0.0238 0.0056 6e-3 0.04016 0.0249 0.04561 0.025 3e-3 1.1e-4 0.0048-4.7e-4 0.0039-1e-3zm-0.1112-0.0568c-6e-3 -6e-3 -0.09578-0.0521-0.09762-0.0503-0.0015 1e-3 0.09495 0.0536 0.09957 0.0538 9.67e-4 5e-5 8.8e-5 -2e-3 -2e-3 -4e-3zm-0.12891-0.0664c-0.0048-5e-3 -0.12934-0.0667-0.13341-0.0665-0.0028 1.9e-4 0.13124 0.0694 0.13537 0.0699 9.67e-4 1.1e-4 8.8e-5 -1e-3 -2e-3 -3e-3zm-0.1502-0.0724c0-2e-3 -0.02203-0.0138-0.02617-0.0136-0.0017 9e-5 3e-3 4e-3 0.01055 8e-3 0.0154 8e-3 0.01563 9e-3 0.01563 6e-3zm-0.59766-0.25387c0-1e-3 -4e-3 -4e-3 -0.0088-6e-3 -0.0084-4e-3 -0.0085-4e-3 -0.0012 2e-3 8e-3 6e-3 0.01 7e-3 0.01 4e-3zm-0.02734-0.0156c0-1e-3 -4e-3 -4e-3 -0.0088-6e-3 -0.0084-4e-3 -0.0085-4e-3 -0.0012 2e-3 8e-3 6e-3 0.01 7e-3 0.01 4e-3zm-0.03125-0.0192c0-8.4e-4 -0.0027-3e-3 -0.0061-4e-3 -0.0035-1e-3 -5e-3 -6.8e-4 -0.0037 2e-3 0.0023 4e-3 0.0097 5e-3 0.0097 2e-3zm-0.02344-0.012c0-1e-3 -4e-3 -4e-3 -0.0088-6e-3 -0.0084-4e-3 -0.0085-4e-3 -0.0012 2e-3 8e-3 6e-3 0.01 7e-3 0.01 4e-3zm-0.06641-0.0391c0-1e-3 -4e-3 -4e-3 -0.0088-6e-3 -0.0084-4e-3 -0.0085-4e-3 -0.0012 2e-3 8e-3 6e-3 0.01 7e-3 0.01 4e-3zm-0.02148-0.0138c-0.0013-2e-3 -0.0045-4e-3 -0.0071-4e-3 -0.0028 4e-5 -0.0023 2e-3 0.0012 4e-3 0.0075 5e-3 0.0089 5e-3 0.0059 0zm-0.98828-0.625c-0.0013-2e-3 -0.0042-4e-3 -0.0063-4e-3s-0.0028 2e-3 -0.0015 4e-3 0.0042 4e-3 0.0063 4e-3 0.0028-2e-3 0.0015-4e-3zm-0.07617-0.0488c0-3e-3 -0.03132-0.0228-0.03336-0.0207-0.0011 1e-3 0.0047 7e-3 0.01277 0.0121 0.0144 0.01 0.02058 0.0125 0.02058 9e-3zm-0.10156-0.0664c0-3e-3 -0.03132-0.0228-0.03336-0.0207-0.0011 1e-3 0.0047 6e-3 0.01277 0.012 0.0144 0.01 0.02058 0.0125 0.02058 9e-3zm-0.10156-0.0664c0-3e-3 -0.03132-0.0228-0.03336-0.0207-0.0011 1e-3 0.0047 6e-3 0.01277 0.012 0.0144 0.01 0.02058 0.0125 0.02058 9e-3zm-0.125-0.0822c0-4e-3 -0.06682-0.0457-0.06905-0.0435-0.0012 1e-3 0.01255 0.0118 0.03052 0.0236 0.03146 0.0206 0.03853 0.0243 0.03853 0.0199zm-0.16015-0.1059c0-4e-3 -0.05515-0.0379-0.05734-0.0357-0.0011 1e-3 0.01 0.01 0.0247 0.0196 0.02597 0.017 0.03264 0.0203 0.03264 0.0161zm-0.18359-0.12088c0-1e-3 -4e-3 -4e-3 -0.0088-6e-3 -8e-3 -4e-3 -0.0083-4e-3 -0.0034 2e-3 5e-3 6e-3 0.01222 9e-3 0.01222 5e-3zm-0.03326-0.0217c-0.0014-2e-3 -0.01772-0.0142-0.03636-0.0267-0.03631-0.0243-0.07546-0.0474-0.06905-0.0407 4e-3 4e-3 0.10444 0.0714 0.10665 0.0714 6.77e-4 0 1.18e-4 -2e-3 -0.0012-4e-3z" fill="#fff" fillOpacity=".99221" fillRule="evenodd" />
                                    </g>
                                </svg>

                                {selectedRoom !== " " && <p>Выбрана аудитория {selectedRoom.id}</p>}
                                {selectedRoom !== " " && <button className="gidro1_container" onClick={() => handleBookAuditorium(selectedRoom.id)}>Забронировать</button>}
                            </div>
                        </div>
                </div>
            )}
            <div className='ButtonToMainPage'><button onClick={handleGoToMainPage}>Перейти на главную страницу</button></div>
            <ToastContainer />
        </div>
    );
}

export default Gidro1;
