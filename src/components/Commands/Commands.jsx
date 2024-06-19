import React, { useEffect, useState, useContext } from 'react';
import './Commands.css';
import axios from 'axios';
import { Base_url, formatCreatedAt } from '../../Constents/constents';  // Adjust this import based on your actual file structure and constants
import { AuthContext } from '../../context/AuthContext';
import CommandCard from './CommandfullCard';


function Commands({ note_id }) {
    const [selectedOption, setSelectedOption] = useState('recent');
    const [displayCommant, setDisplayCommant] = useState([]);
    const [newCommant, setNewCommant] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isTooLong, setIsTooLong] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Track loading state

    const { isLoggedIn, username } = useContext(AuthContext);

    useEffect(() => {
        fetchCommant(selectedOption);
    }, [selectedOption, note_id]);

    const handleCommantChange = (event) => {
        const { value } = event.target;
        setNewCommant(value);
        if (value.length > 100) {
            setIsTooLong(true);
        } else {
            setIsTooLong(false);
        }
    };

    const postNoteCommant = () => {
        if (isSubmitting) return;

        setIsSubmitting(true);

        axios.post(`${Base_url}/post_command/${note_id}`, { commant: newCommant, user: username })
            .then(response => {
                console.log('Command saved successfully:', response.data);
                fetchCommant(selectedOption);  // Fetch updated list after saving
                setNewCommant('');  // Clear the input field
            })
            .catch(error => {
                console.log('Error saving command:', error);
                // Optionally, add UI feedback to inform the user about the error
            })
            .finally(() => {
                setIsSubmitting(false);  // Reset submission status
            });
    };

    const fetchCommant = (filter) => {
        setIsLoading(true); // Set loading state before fetch

        axios.get(`${Base_url}/display_command/${note_id}?filter=${filter}`)
            .then(response => {
                setDisplayCommant(response.data);
            })
            .catch(error => {
                console.error('Error fetching commands:', error);
            })
            .finally(() => {
                setIsLoading(false); // Reset loading state after fetch
            });
    };

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const stopCommantClosing = (event) => {
        event.stopPropagation();
    };

    return (
        <>
            <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModal2Label" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header" onClick={stopCommantClosing}>
                            <h5 className="modal-title mr-3" id="exampleModal2Label">Commands</h5>
                            <select
                                className='commandfilter mr-3'
                                value={selectedOption}
                                onChange={handleChange}
                                onClick={stopCommantClosing}
                            >
                                <option value="recent">Recent</option>
                                <option value="oldest">Oldest</option>
                                <option value="random">Random</option>
                            </select>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); postNoteCommant(); }}>
                            <div onClick={stopCommantClosing} className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                                <div className="container-fluid">
                                    {isLoading ? (
                                        <p>Loading...</p>
                                    ) : displayCommant.length === 0 ? (
                                        <p>No commands found.</p>
                                    ) : (
                                        displayCommant.map((command, index) => (
                                            <div className="row" key={index}>
                                                <div className="col-12">
                                                    <div className="card card-commands">
                                                        <div className="card-body">
                                                            <p>{command.id} --- {command.command}</p>
                                                            <div className="card-footer">
                                                                <p className='d-inline p-2 counters'>{command.username}</p>
                                                                <p className='d-inline p-2 counters'>{formatCreatedAt(command.created)}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                            <div className="modal-footer" onClick={stopCommantClosing}>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col d-flex bd-highlight">
                                            <input
                                                value={newCommant}
                                                onChange={handleCommantChange}
                                                type="text"
                                                className={`post-command-input p-2 w-100 bd-highlight ${isTooLong ? 'text-too-long' : ''}`}
                                                placeholder='Enter the command'
                                            />
                                            <button type="submit" className="btn btn-card p-2 flex-shrink-1 bd-highlight" onClick={postNoteCommant}>Save changes</button>
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

export default Commands;
