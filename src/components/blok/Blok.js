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
            {props.team}
            <hr />
            {rezultati}
        </span>
    )
}