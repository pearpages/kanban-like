import React from 'react';

export default class Note extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false
        };

        this.renderEdit = this.renderEdit.bind(this);
        this.renderNote = this.renderNote.bind(this);
        this.edit = this.edit.bind(this);
        this.checkEnter = this.checkEnter.bind(this);
        this.finishEdit = this.finishEdit.bind(this);
    }

    render() {
        if (this.state.editing) {
            return this.renderEdit();
        }

        return this.renderNote();
    }

    renderEdit() {
        return <input type="text"
            ref={
                (e) => e ? e.selectionStart = this.props.task.length : null
            }
            autoFocus={true}
            defaultValue={this.props.task}
            onBlur={this.finishEdit}
            onKeyPress={this.checkEnter}
        />
    }

    renderNote() {
        return <div onClick={this.edit}>{this.props.task}</div>
    }

    edit() {
        // Enter edit mode.
        this.setState({
            editing: true
        });
    }

    checkEnter(e) {
        // The user hit *enter*, let's finish up.
        if (e.key === 'Enter') {
            this.finishEdit(e);
        }
    }

    finishEdit(e) {
        const value = e.target.value;

        if (this.props.onEdit) {
            this.props.onEdit(value);

            this.setState({
                editing: false
            })
        }
    }
}