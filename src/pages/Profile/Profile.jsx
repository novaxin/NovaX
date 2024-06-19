import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Base_url } from '../../Constents/constents'; // Adjust import as per your constants
import Cards from '../../components/Card/Cards';
import CommandfullCard from '../../components/Commands/CommandfullCard';
import './Profile.css';

function Profile() {
    const { isLoggedIn, username } = useContext(AuthContext);
    const [note, setNote] = useState([]);
    const [commant, setCommant] = useState([]);
    const [tab, setTab] = useState('command'); // Default to 'command' tab

    useEffect(() => {
        if (isLoggedIn && username) {
            fetchUserNote();
            fetchCommant();
        }
    }, [isLoggedIn, username]);

    const fetchUserNote = () => {
        axios.get(`${Base_url}/display_user_note/${username}`)
            .then(response => {
                setNote(response.data);
            })
            .catch(error => {
                console.error('Error retrieving user notes:', error);
            });
    };

    const fetchCommant = () => {
        axios.get(`${Base_url}/display_user_command/${username}`)
            .then(response => {
                setCommant(response.data);
            })
            .catch(error => {
                console.error('Error retrieving user commands:', error);
            });
    };

    const handleTabChange = (value) => {
        setTab(value);
    };

    if (!isLoggedIn) {
        return null;
    }

    return (
        <div className='container'>
            <div className="row text-center">
                <div className="col">
                    <h2
                        className={`tab ${tab === 'note' ? 'active' : ''}`}
                        onClick={() => handleTabChange('note')}
                    >
                        MY NOTES
                    </h2>
                </div>
                <div className="col">
                    <h2
                        className={`tab ${tab === 'command' ? 'active' : ''}`}
                        onClick={() => handleTabChange('command')}
                    >
                        MY COMMENTS
                    </h2>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    {tab === "command" ? <CommandfullCard commant={commant} /> : <Cards notes={note} />}
                </div>
            </div>
        </div>
    );
}

export default Profile;
