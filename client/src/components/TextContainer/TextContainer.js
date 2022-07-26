import React from 'react';

import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    {
      console.log(users)
    }
    {
      users
        ? (
          <div>
            <h1>Online Users</h1>
            <div className="activeContainer">
              <h2>
                {
                  users.map((e, i) => {
                    if (e) return <li key={i}>{e}</li>
                  })
                }
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;