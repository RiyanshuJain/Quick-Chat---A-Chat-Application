import React, { useState } from 'react'
import { Link } from "react-router-dom";

import "./Join.css";

let user;

const sendUser = () => {
    user = document.getElementById('joinInput').value;
    document.getElementById('joinInput').value = "";
}

export default function Join() {
    const [name, setname] = useState("");
    return (
        <div className="JoinPage">

            <div className="JoinContainer">

                <h1>Quick Chat</h1>

                <input onChange={(e) => setname(e.target.value)} placeholder="Enter Your Name" type="text" id="joinInput" />

                <Link onClick={(event) => !name ? event.preventDefault() : null} to="/chat">
                    <button onClick={sendUser} className="joinbtn">Enter</button>
                </Link>

            </div>

        </div>
    )
}

export { user }