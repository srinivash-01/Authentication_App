import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from "axios";
const Home = () => {
    const [Update_data, SetUpdateData] = useState(false);
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [mobileno, setMobileno] = useState('');

    const location = useLocation();
    const history = useHistory();
    var { user } = location.state || {};

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };


    const handleDateChange = (e) => {
        const rawDate = e.target.value;
        const selectedDate = new Date(rawDate);
        const formattedDate = formatDate(selectedDate);
        setDob(formattedDate);
    };



    useEffect(() => {
        if (!user) {
            alert('Please log in.');
            history.push('/');
        } else {
            setAge(user.info.age);
            setGender(user.info.gender);
            const currentDate = new Date(user.info.dob);
            const formattedCurrentDate = formatDate(currentDate);
            setDob(formattedCurrentDate);
            setMobileno(user.info.mobileno)

        }
    }, []);


    function handleUpdate() {
        SetUpdateData(!Update_data);
    }

    function handleLogout() {
        alert('Successfully Logged Out');
        history.push('/');
        user = {};
    }
    function handleSubmit() {
        SetUpdateData(!Update_data);
        user.info.age = age;
        user.info.gender = gender;
        user.info.dob = dob;
        user.info.mobileno = mobileno;
        console.log(user)

        axios.post('/api/user', user)
            .then((res) => {

                history.push({
                    pathname: '/home',
                    state: { user: user }
                });
            })
            .catch((err) => alert(err));
    }
    const genderOptions = ['Male', 'Female', 'Other'];




    return (
        <div>
            {!Update_data && user ? (
                <div>
                    <h1>Welcome, {user && user.name ? user.name : 'Guest'}!</h1>
                    <p>Age: {user.info.age ? user.info.age : 'Not Updated'}</p>
                    <p>Gender: {user.info.gender ? user.info.gender : 'Not Updated'}</p>
                    <p>Date of birth [yyyy/MM/dd] : {user.info.dob ? dob : 'Not Updated'}</p>
                    <p>Mobile No: {user.info.mobileno ? user.info.mobileno : 'Not Updated'}</p>
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={handleLogout}>Log Out</button>
                </div>

            ) : (
                user ? <div>
                    <div>
                        <label>Age:</label>
                        <input type="text" placeholder="Enter age" value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <div>
                        <label>Gender:</label>
                        <select value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="">Select Gender</option>
                            {genderOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Date of Birth:</label>
                        <input type="date" placeholder="Enter date of birth" label={dob} value={dob} onChange={handleDateChange} />
                    </div>
                    <div>
                        <label>Mobile No:</label>
                        <input type="text" placeholder="Enter mobile number" value={mobileno} onChange={(e) => setMobileno(e.target.value)} />
                    </div>
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={() => { SetUpdateData(!Update_data) }}>Cancel</button>
                </div> : null
            )}

        </div>
    );
};

export default Home;
