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

  useEffect(()=> {
    console.log('checkedUsers', checkedUsers)
  }, [checkedUsers])


  return (
    <div className="App">
      {listUsers.length > 0 &&
        <div>
          {listUsers.map((user) =>
          <div key={user.id}>
            <input type="checkbox" id={user.id} name={user.id} onChange={(e) => handleOnChange(e, user.id)}/>
            <label htmlFor={user.id}>{user.name}</label>
          </div>
          )}
        </div>
      }

      <AverageAge checkedUsers={checkedUsers} />

    </div>
  );
}

export default App;
