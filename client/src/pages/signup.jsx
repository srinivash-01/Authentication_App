import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';
export default function Signup() {
    const history = useHistory();
    const [Name,setName] = useState('')
    const [Email, setemail] = useState('')
    const [Password, setPassword] = useState('')

    function handleName(e){
        const name = e.target.value;
        setName(name);
    }
    function handleEmail(e) {
        const email = e.target.value;
        setemail(email);
    }
    function handlePassword(e) {
        const password = e.target.value;
        setPassword(password)
    }
    function handleSignIN(){
        history.push('/');
    }
    function handleSubmit(e) {
        e.preventDefault();
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!Email || !Password|| !Name) {
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
                console.log(Name);
                console.log(Email);
                console.log(Password);
                const user = {
                    name: Name,
                    email: Email,
                    password: Password
                }
                console.log(user)
                axios.post("/AddUser", { user })
                    .then((response) => {
                        console.log('Post successful!', response);
                        if(response.status == 200){
                            alert("Success");
                            history.push('/');
                        }else{
                            alert("Error in Saving");
                        }
                    })
                    .catch((error) => {
                        console.error('Error posting data:', error);
                        if(error.response.data.message.email){
                            alert("USer already exist");   
                        }else{
                            alert(error);   
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
                <h1>Sign UP</h1>
                <div>
                    <label htmlFor="Name">Name:</label>
                    <input
                        style={{ marginLeft: "34px" }}
                        type="text"
                        id="Name"
                        name="Name"
                        value={Name}
                        placeholder="Name"
                        onChange={handleName}
                        required
                    />

                </div>
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
                <button onClick={handleSignIN} >SIGN IN</button>
                <button type='submit' onClick={handleSubmit}>Submit</button>

                </div>
                
            </form>
            
        </div>
    )
};