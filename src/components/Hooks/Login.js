import { useState } from "react";
import PropTypes from 'prop-types';
import { authenticate } from "../Helper/Utilities";
import { useRef } from 'react';

const Login = ({setToken}) => {
    const [username, setUsername] = useState();
    const usernameRef = useRef();

    const [password, setPassword] = useState();
    const passwordRef = useRef();

    sessionStorage.clear();

    const loginUser = async credentials => {
        let retValue = null;

        try {
            const response = await authenticate("POST", JSON.stringify(credentials), "");
    
            const data = await response.json();
            if (!response.ok)
                console.log("ERROR : ", response.statusText);
    
            retValue = data;

        } catch (err) {
            console.log("ERROR : ", err);
        }
    
        return retValue;
    };
    
    
    const handleSubmit = async event => {
        event.preventDefault();

        if (!username) {
            alert("Username required!");
            usernameRef.current.focus();
            return;
        }

        if (!password) {
            alert("Password required!");
            passwordRef.current.focus();
            return;
        }

        const crudUsers = await loginUser({
            username : username,
            password : password
        });

        if (crudUsers.length === 0) {
            alert("Invalid login credentials!");
            return;
        }

        //console.log("token saved = ", crudUsers[0]);
        setToken(crudUsers[0]);
    };

    return (
        <div className="wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text"
                           onChange={event => setUsername(event.target.value)}
                           ref={usernameRef}
                    />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password"
                           onChange={event => setPassword(event.target.value)}
                           ref={passwordRef}
                    />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
};

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};

export default Login;
