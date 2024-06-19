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
    const [note_id, setNote_id] = useState(null);
    const [alert, setAlert] = useState(false)
    const [actionType, setActionType] = useState(null);

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    useEffect(() => {
        setTimeout(() => {
            setAlert(false);
        }, 100);
    }, []);

    const fetchNoteid = (note_id_card) => {
        setNote_id(note_id_card);
    };

    const LikeorDislike = (action, note_id) => {
        if (!isLoggedIn) {
            alert('You need to be logged in to perform this action.');

            return;
        }
        const updatedAction = {
            like_or_dislike: action,
            note_id: note_id,
            username: username,
        };

        axios.post(`${Base_url}/like_or_dislike/${username}`, updatedAction)
            .then(response => {
                console.log(response)
                setActionType(action);
                setAlert(true)
            })
            .catch(error => {
                console.log('Error liking or disliking the note:', error);
            });
    };



    return (
        <div className="container">
            {alert && (
                <div className="alert alert-primary" role="alert">
                    {actionType === 'like' ? 'You liked' : 'You disliked'}
                </div>
            )}
            <div className="row">
                {notes.map((note, index) => (
                    <div key={index} className="col-12">
                        <div className="card mt-2">
                            <div className="card-body">
                                <pre className="note-text">
                                    {expandedIndex === index ? note.note : note.note.slice(0, 100)}
                                    {note.note.length > 100 && (
                                        <span className='readmore-btn' onClick={() => toggleExpand(index)}>
                                            {expandedIndex === index ? '...less' : '...more'}
                                        </span>
                                    )}
                                </pre>
                                <div className="card-footer">
                                    <p className='d-inline p-2 counters'><BiUser /> {note.username}</p>
                                    <p className='d-inline p-2 counters' onClick={() => LikeorDislike('like', note.id)}><BiSolidUpvote /> {note.likes}</p>
                                    <p className='d-inline p-2 counters' onClick={() => LikeorDislike('dislike', note.id)}><BiSolidDownvote /> {note.dislikes}</p>
                                    <p className='d-inline p-2 counters'><FaEye /> {note.views}</p>
                                    <p className='d-inline p-2 counters' onClick={() => fetchNoteid(note.id)} data-toggle="modal" data-target="#exampleModal2"><BiComment /> {note.commend_count}<Commands note_id={note_id} /></p>
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
