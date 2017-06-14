import React from 'react';
import AltContainer from 'alt-container';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class App extends React.Component {

    render() {
        return (
            <div>
                <button onClick={this.addNote}>+</button>
                <AltContainer
                    stores={[NoteStore]}
                    inject={{
                        notes: () => NoteStore.getState().notes
                    }}
                >
                    <Notes onEdit={this.editNote} onDelete={this.deleteNote} />
                </AltContainer>
            </div>
        );
    }

    addNote = () => {
        NoteActions.create({ task: 'New task' });
    };

    editNote = (id, task) => {
        // Don't modify if trying set an empty value
        if (!task.trim()) {
            return;
        }

        NoteActions.update({ id, task });
    };

    deleteNote = (id, e) => {
        e.stopPropagation();

        NoteActions.delete(id);
    }
}