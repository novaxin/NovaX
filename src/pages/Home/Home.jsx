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
                setNote(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const formatCreatedAt = (createdAt) => {
        const date = new Date(createdAt);
        return date.toLocaleString();
    }

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <Cards notes={note} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
