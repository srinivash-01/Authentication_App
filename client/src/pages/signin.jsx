import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
export default function SignIn() {
    const history = useHistory();
    const [Email, setemail] = useState('')
    const [Password, setPassword] = useState('')
    function handleEmail(e) {
        const email = e.target.value;
        setemail(email);
    }
    function handlePassword(e) {
        const password = e.target.value;
        setPassword(password)
    }
    function handleSignup() {
        history.push('/signup');
    }
    function handleSubmit(e) {
        e.preventDefault();
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!Email || !Password) {
            alert("Enter valid data")
        }
        else {
            console.log(Password.length > 8)
            if (!Email.match(mailformat)) {
                alert("Invalid Email")
            }
            else if (Password.length < 8) {
                alert("Invalid Password")
            }
            else {
                console.log(Email);
                console.log(Password);
                const user = {
                    Email: Email,
                    Password: Password
                }
                console.log(user)
                axios.post("/SignIn", { user })
                    .then((response) => {
                        // Handle successful response
                        console.log( response.data);
                        const res_data = response.data;
                        alert('User found!');
                        // console.log('User data in signin component:', user);
                        history.push({
                            pathname: '/home',
                            state: { user: res_data }
                        });
                        // You can also do something else with the response data if needed
                    })
                    .catch((error) => {
                        if (error.response) {
                            if (error.response.status === 401) {
                              alert('Incorrect password!');
                            } else if (error.response.status === 404) {
                              alert('User not found!');
                            } else {
                              alert('Error checking user. Please try again later.');
                            }
                          } else {
                            alert('Network error. Please try again later.');
                          }
                    });
            }
        }
    }



    //css

    const formStyle = {
        textAlign: "center",
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flexWrap: "wrap",
        alignContent: "center",
        alignItems: "center"
    };
return (
    <div>

        <form onSubmit={handleSubmit} style={formStyle}>
            <h1>LOGIN</h1>
            <div>
                <label htmlFor="Email">Email:</label>
                <input
                    style={{ marginLeft: "34px" }}
                    type="email"
                    id="email"
                    name="email"
                    value={Email}
                    placeholder="Email"
                    onChange={handleEmail}
                    required
                />

            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    value={Password}
                    onChange={handlePassword}
                />

            </div>
            <div style={{
                marginTop: "15px",
                width: "186px",
                textAlign: "center",
                display: "flex",
                justifyContent: "space-between"
            }}>
                <button onClick={handleSignup} >SIGN UP</button>
                <button type='submit' onClick={handleSubmit}>SIGN IN</button>
            </div>

        </form>


    </div>
)
};