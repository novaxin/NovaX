import React, { useState } from 'react';
import './Card.css';
import { BiComment, BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import { FaEye } from "react-icons/fa";

function Cards({ notes, formatCreatedAt }) {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleExpand = (index) => {
        if (expandedIndex === index) {
            setExpandedIndex(null);
        } else {
            setExpandedIndex(index);
        }
    };

    return (
        <div className="container">
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
