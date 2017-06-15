import AltContainer from 'alt-container';
import React from 'react';
import Notes from './Notes.jsx';
import Editable from './Editable.jsx';
import NoteActions from '../actions/NoteActions';
import LaneActions from '../actions/LaneActions';
import NoteStore from '../stores/NoteStore';

export default class Lane extends React.Component {

    constructor(props) {
        super(props);

        this.addNote = this.addNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
    }

    render() {
        const { lane, ...props } = this.props;
        return (
            <div {...props}>
                <Lane.Header
                    activateLaneEdit={this.activateLaneEdit}
                    addNote={this.addNote}
                    lane={lane}
                    editName={this.editName}
                    deleteLane={this.deleteLane}
                />
                <Lane.Notes
                    activateNoteEdit={this.activateLaneEdit}
                    deleteNote={this.deleteNote}
                    editNote={this.editNote}
                    lane={lane}
                />
            </div>);
    }

    editNote(id, task) {
        // Don't modify if trying set an empty value
        if (!task.trim()) {
            NoteActions.update({ id, editing: false });
            return;
        }
        NoteActions.update({ id, task, editing: false });
    }

    addNote(onEdit) {
        onEdit.stopPropagation();

        const laneId = this.props.lane.id;
        const note = NoteActions.create({ task: 'New task' });

        LaneActions.attachToLane({
            noteId: note.id,
            laneId
        });
    }

    editName = (name) => {
        const laneId = this.props.lane.id;
        // Don't modify if trying set an empty value
        if (!name.trim()) {
            LaneActions.update({ id: laneId, editing: false });
            return;
        }
        LaneActions.update({ id: laneId, name, editing: false });
    };

    deleteLane = () => {
        const laneId = this.props.lane.id;
        LaneActions.delete(laneId);
    };

    activateLaneEdit = () => {
        const laneId = this.props.lane.id;
        LaneActions.update({ id: laneId, editing: true });
    };

    activateNoteEdit(id) {
        NoteActions.update({ id, editing: true });
    }

    deleteNote(noteId, e) {
        e.stopPropagation();

        const laneId = this.props.lane.id;
        LaneActions.detachFromLane({ laneId, noteId });
        NoteActions.delete(noteId);
    }
}

Lane.Header = function LaneHeader({ activateLaneEdit, addNote, lane, editName, deleteLane }) {

    return (
        <div className="lane-header" onClick={activateLaneEdit}>
            <div className="lane-add-note">
                <button onClick={addNote}>+</button>
            </div>
            <Editable className="lane-name" editing={lane.editing}
                value={lane.name} onEdit={editName} />
            <div className="lane-delete">
                <button onClick={deleteLane}>x</button>
            </div>
        </div>);

}

Lane.Notes = function LaneNotes({ activateNoteEdit, deleteNote, editNote, lane }) {
    return (
        <AltContainer
            stores={[NoteStore]}
            inject={{
                notes: () => NoteStore.getNotesByIds(lane.notes)
            }}
        >
            <Notes
                onValueClick={activateNoteEdit}
                onDelete={deleteNote}
                onEdit={editNote}
            />
        </AltContainer>
    );
}