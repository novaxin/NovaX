import React, { useEffect, useState } from 'react';
import './AddNote.css';
import { Base_url, RelaodPage } from '../../Constents/constents';
import axios from 'axios';

function AddNote() {
    const [newNote, setNewNote] = useState('');
    const [charCount, setCharCount] = useState(0);
    const [errorMessage, setErrorMessage] = useState(''); // State to hold error message
    const [countDisplayStyle, setCountDisplayStyle] = useState({ color: 'var(--text' });

    useEffect(() => {
        handleSubmit();
    }, []);

    const handleChange = (event) => {
        const { value } = event.target;
        setNewNote(value);
        setCharCount(value.length);
        if (value.length > 400) {
            setErrorMessage('Note length should be within 30 characters.');
            setCountDisplayStyle({ color: '#DC3545' });
        } else {
            setErrorMessage('');
            setCountDisplayStyle({ color: 'var(--text'});
        }
    };

    const handleSubmit = () => {
        if (charCount > 400) {
            setErrorMessage('Note length should be within 30 characters.');
        } else {
            axios.post(`${Base_url}/postnote`, { note: newNote })
                .then(response => {
                    console.log('Note saved successfully:', response.data);
                    RelaodPage();
                })
                .catch(error => {
                    console.error('Error saving note:', error);
                });
        }
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <button type="button" className='btn textarea' placeholder='post note' data-toggle="modal" data-target="#exampleModal">POST NOTE</button>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form action="" method='post'>
                            <div className="modal-body">
                                <textarea value={newNote} onChange={handleChange} name="notes" id="" className='Note-post-input' placeholder='Enter the content'></textarea>
                            </div>
                            <div className="modal-footer">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col">
                                            <p style={countDisplayStyle}><b>{charCount}/300</b></p>
                                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                                        </div>
                                        <div className="col">
                                            <button type="button" className="btn btn-card m-1" data-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-card" onClick={handleSubmit}>Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddNote;
