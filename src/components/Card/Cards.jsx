import React from 'react';
import './Card.css';
import { BiComment, BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import { FaEye } from "react-icons/fa";

function Cards({ notes, formatCreatedAt }) {
    return (
        <div className="container">
            <div className="row">
                {notes.map((note, index) => (
                    <div key={index} className="col-12">
                        <div className="card mt-2">
                            <div className="card-body">
                                <div className="note-text">{note.note}</div>
                                <div className="card-footer">
                                    <p className='d-inline p-2 counters'><BiSolidUpvote /> {note.likes}</p>
                                    <p className='d-inline p-2 counters'><BiSolidDownvote /> {note.dislikes}</p>
                                    <p className='d-inline p-2 counters'><FaEye /> {note.views}</p>
                                    <p className='d-inline p-2 counters'><BiComment />D1</p>
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
