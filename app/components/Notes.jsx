import React from 'react'
import Editable from './Editable.jsx';
import Note from './Note.jsx';
import LaneActions from '../actions/LaneActions';

export default function Notes({ notes, onValueClick, onEdit, onDelete }) {
    return (
        <ol className="notes">{notes.map(note =>

            <Note
                className="note"
                id={note.id}
                key={note.id}
                onMove={LaneActions.move}
            >
                <Editable
                    editing={note.editing}
                    value={note.task}
                    onValueClick={onValueClick.bind(null, note.id)}
                    onEdit={onEdit.bind(null, note.id)}
                    onDelete={onDelete.bind(null, note.id)} />
            </Note>
        )}</ol>
    );
}