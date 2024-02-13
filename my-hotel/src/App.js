import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [roomType, setRoomType] = useState('1bed');
  const [price, setPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const roomTypePrices = {
    '1bed': 100,
    '2bed': 150,
    '3bed': 200,
    '4bed': 250
  };

  const calculatePrice = () => {
    const roomPrice = roomTypePrices[roomType] || 0 ;

    // Calculate the difference in milliseconds between the check-out and check-in dates
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();

    // Calculate the number of days
    const totalDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    // Ensure check-out date is after check-in date or on the same day
    if (totalDays < 0) {
      setErrorMessage('Check-out date must be on or after check-in date');
      return;
    }

    // Calculate total price
    const totalPrice = roomPrice * totalDays;
    const totalPriceINR = totalPrice * 83.2; // Assuming 1 USD = 83.2 INR
    setPrice(totalPriceINR.toFixed(2)); // Round to 2 decimal places
  };

  const bookRoom = () => {
    calculatePrice();
    const data = {
      name,
      email,
      adults,
      kids,
      check_in: checkInDate.toISOString(),
      check_out: checkOutDate.toISOString(),
      room_type: roomType,
      price
    };

    axios.post('/book_room', data)
      .then(response => {
        console.log(response.data);
        setErrorMessage(`Room booked successfully. Total Price: ₹${price}`);
      })
      .catch(error => {
        console.error('Error booking room:', error);
        setErrorMessage('Error booking room');
      });
  };

  return (
    <div className="App">
      <h1>Chandan's Hotel Booking App</h1>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Number of Adults:</label>
        <input type="number" value={adults} onChange={e => setAdults(parseInt(e.target.value))} />
      </div>
      <div>
        <label>Number of Kids:</label>
        <input type="number" value={kids} onChange={e => setKids(parseInt(e.target.value))} />
      </div>
      <div>
        <label>Check-in Date:</label>
        <DatePicker selected={checkInDate} onChange={date => setCheckInDate(date)} />
      </div>
      <div>
        <label>Check-out Date:</label>
        <DatePicker selected={checkOutDate} onChange={date => setCheckOutDate(date)} />
      </div>
      <div>
        <label>Room Type:</label>
        <select value={roomType} onChange={e => setRoomType(e.target.value)}>
          <option value="1bed">1 Bed</option>
          <option value="2bed">2 Beds</option>
          <option value="3bed">3 Beds</option>
          <option value="4bed">4 Beds</option>
        </select>
      </div>
      <div>
        <button onClick={bookRoom}>Book Room</button>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default App;
