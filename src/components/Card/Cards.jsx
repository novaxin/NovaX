import React, { useState, useContext, useEffect } from 'react';
import './Card.css';
import { BiComment, BiSolidDownvote, BiSolidUpvote, BiUser } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import Commands from '../Commands/Commands';
import { Base_url, formatCreatedAt } from '../../Constents/constents';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

function Cards({ notes }) {
    const { isLoggedIn, username } = useContext(AuthContext);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [likedNotes, setLikedNotes] = useState(new Set());
    const [dislikedNotes, setDislikedNotes] = useState(new Set());

    useEffect(() => {
        // Load liked and disliked notes from localStorage or cookies on component mount
        const likedNotesStorage = JSON.parse(localStorage.getItem('likedNotes')) || [];
        const dislikedNotesStorage = JSON.parse(localStorage.getItem('dislikedNotes')) || [];

        setLikedNotes(new Set(likedNotesStorage));
        setDislikedNotes(new Set(dislikedNotesStorage));
    }, []);

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const LikeorDislike = (action, note_id) => {
        if (!isLoggedIn) {
            window.alert('You need to be logged in to perform this action.');
            return;
        }

        const updatedAction = {
            like_or_dislike: action,
            note_id: note_id,
            toggle_status: !likedNotes.has(note_id) && !dislikedNotes.has(note_id), // Determine toggle status based on current state
            username: username,
        };

        axios.post(`${Base_url}/like_or_dislike/${username}`, updatedAction)
            .then(response => {
                const { like_or_dislike_data } = response.data;

                // Update likedNotes and dislikedNotes sets based on action
                const updatedLikedNotes = new Set(likedNotes);
                const updatedDislikedNotes = new Set(dislikedNotes);

                if (action === 'like') {
                    if (updatedLikedNotes.has(note_id)) {
                        updatedLikedNotes.delete(note_id);
                    } else {
                        updatedLikedNotes.add(note_id);
                        updatedDislikedNotes.delete(note_id);
                    }
                } else if (action === 'dislike') {
                    if (updatedDislikedNotes.has(note_id)) {
                        updatedDislikedNotes.delete(note_id);
                    } else {
                        updatedDislikedNotes.add(note_id);
                        updatedLikedNotes.delete(note_id);
                    }
                }

                setLikedNotes(updatedLikedNotes);
                setDislikedNotes(updatedDislikedNotes);

                localStorage.setItem('likedNotes', JSON.stringify([...updatedLikedNotes]));
                localStorage.setItem('dislikedNotes', JSON.stringify([...updatedDislikedNotes]));

                // Handle any other state updates or UI changes as needed
            })
            .catch(error => {
                console.log('Error liking or disliking the note:', error);
            });
    };

    return (
        <div className="container">
            <div className="row">
                {notes.map((note, index) => (
                    <div key={index} className="col-12">
                        <div className="card mt-2">
                            <div className="card-body">
                                <p className='username-display'><BiUser /> {note.username}</p>
                                <pre className="note-text">
                                    {note.id} ---- {expandedIndex === index ? note.note : note.note.slice(0, 100)}
                                    {note.note.length > 100 && (
                                        <span className='readmore-btn' onClick={() => toggleExpand(index)}>
                                            {expandedIndex === index ? '...less' : '...more'}
                                        </span>
                                    )}
                                </pre>
                                <div className="card-footer">
                                    <p className='d-inline p-2 counters' style={{ color: likedNotes.has(note.id) ? 'var(--primary)' : 'var(--text-light)' }} onClick={() => LikeorDislike('like', note.id)}><BiSolidUpvote /> {note.likes}</p>
                                    <p className='d-inline p-2 counters' style={{ color: dislikedNotes.has(note.id) ? 'var(--primary)' : 'var(--text-light)' }} onClick={() => LikeorDislike('dislike', note.id)}><BiSolidDownvote /> {note.dislikes}</p>
                                    <p className='d-inline p-2 counters'><FaEye /> {note.views}</p>
                                    <p className='d-inline p-2 counters' data-toggle="modal" data-target="#exampleModal2">
                                        <BiComment /> {note.commend_count}<Commands note_id={note.id} />
                                    </p>
                                    <p className='d-inline p-2'>{formatCreatedAt(note.created)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cards;
