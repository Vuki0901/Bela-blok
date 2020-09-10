import React from 'react';

import './Blok.css';

export default function Blok(props) {

    let rezultati;
    let k = 0;
    rezultati = props.rezultati.map(el => {
        return (
            <p key={++k}>
                {el}
                <br />
            </p>
        )
    })

    
    const arr = props.rezultati
    let s = 0;
    for (let i = 0; i < arr.length; i++){
        s += arr[i]
    }
    

    return(
        <span className="Blok">
            <p className="title">{props.team}</p>
            <hr />
            {rezultati}
            <hr />
            <p>{s}</p>
        </span>
    )
}