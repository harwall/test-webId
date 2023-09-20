import './App.css';
import AverageAge from './AverageAge';
import React, { useState, useEffect } from 'react';

function App() {
  const [listUsers, setListUsers] = useState([]);
  const [checkedUsers, setCheckedUsers] = useState([]);

  const handleOnChange = (e, userId) => {
    const checkedUsersCopy = [...checkedUsers]
    if(e.target.checked) {
      setCheckedUsers([...checkedUsers, userId]);
    } else {
      checkedUsersCopy.splice((checkedUsersCopy.indexOf(userId)), 1);
      setCheckedUsers(checkedUsersCopy);
    }
  };

  useEffect(()=> {
    var requestUsers = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://infallible-tereshkova-717266.netlify.app/.netlify/functions/server/users", requestUsers)
    .then(response => response.json())
    .then((result) => {
      setListUsers(result);
    })
    .catch(error => console.log('error', error));
  }, [])

  return (
    <div className="App">
      <div className="averageAge">
        <h1 className="averageAge__title">Average age calculator</h1>

        <div className="averageAge__columnContainer">
          <div className="averageAge__column averageAge__column--left">
            {listUsers.length > 0 &&
              <div className="averageAge__listContainer">
                {listUsers.map((user) =>
                  <div className="averageAge__listItem" key={user.id}>
                    <input className="averageAge__listItemInput" type="checkbox" id={user.id} name={user.id} onChange={(e) => handleOnChange(e, user.id)}/>
                    <label className="averageAge__listItemLabel" htmlFor={user.id}>{user.name}</label>
                  </div>
                )}
              </div>
            }
          </div>
          <div className="averageAge__column averageAge__column--right">
            <AverageAge checkedUsers={checkedUsers} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
