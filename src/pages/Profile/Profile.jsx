import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Base_url,formatCreatedAt } from '../../Constents/constents';
import Cards from '../../components/Card/Cards';

function Profile() {
    const { isLoggedIn, username } = useContext(AuthContext);
    const [note, setNote] = useState([]);

    useEffect(() => {
        if (isLoggedIn) {
            fetchUserNote();
        }
    }, [username]);

    const fetchUserNote = () => {
        axios.get(`${Base_url}/display_user_note/${username}`)
            .then(response => {
                console.log('User notes retrieved successfully:', response.data);
                setNote(response.data);
            })
            .catch(error => {
                console.error('Error retrieving user notes:', error);
            });
    };


    if (!isLoggedIn) {
        return null;
    }

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <Cards notes={note} formatCreatedAt={formatCreatedAt} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
