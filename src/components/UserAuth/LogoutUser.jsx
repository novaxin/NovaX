import React from 'react'
import axios from 'axios';
import { Base_url } from '../../Constents/constents';

function LogoutUser() {
    const handleLogout = () => {
        axios.post(`${Base_url}/logout`)
            .then(response => {
                console.log(response.data);  // Handle success

            })
            .catch(error => {
                console.log('Error logging out:', error);  // Handle error
            });
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

export default LogoutUser