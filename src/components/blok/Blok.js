import React from 'react';

import './Blok.css';

export default function Blok(props) {

    let rezultati;
    rezultati = props.rezultati.map(el => {
        return (
            <p key={props.rezultati.indexOf(el)}>
                {el}
                <br />
            </p>
        )
    })

    return(
        <span className="Blok">
            <p className="title">{props.team}</p>
            <hr />
            {rezultati}
        </span>
    )
}