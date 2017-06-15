import React from 'react';

export default function Note(props) {

    return <li {...props}>{props.children}</li>;

}