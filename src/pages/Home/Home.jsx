import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from '../../components/Card/Cards';
import './Home.css';
import { Base_url } from '../../Constents/constents';

function Home() {
    const [note, setNote] = useState([]);

    useEffect(() => {
        fetchNote();
    }, []);

    const fetchNote = () => {
        axios.get(`${Base_url}/display`)
            .then(response => {
                console.log(response.data);
                setNote(response.data); // Update the state with fetched data
            })
            .catch(error => {
                console.log(error);
            });
    }

    const formatCreatedAt = (createdAt) => {
        const date = new Date(createdAt);
        return date.toLocaleString(); // Format the date and time according to the user's locale
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

export default Home;
