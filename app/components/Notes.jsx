import React from 'react'
import Note from './Note.jsx'

export default function Notes({ notes, onEdit, onDelete }) {
    return (
        <ul>
            {notes.map(note =>
                <li key={note.id}>
                    <Note
                        task={note.task}
                        onEdit={onEdit.bind(null,note.id)}
                        onDelete={onDelete.bind(null,note.id)}
                    />
                </li>)}
        </ul>
    );
}