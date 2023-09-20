import logo from './birthday-cake.svg';
import React, { useState, useEffect } from 'react';

function AverageAge(UserList) {
  const [averageAge, setAverageAge] = useState(null);
  const [currentYear] = useState(new Date().getFullYear());

  useEffect(()=> {
    var requestAverageAge = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch((`https://infallible-tereshkova-717266.netlify.app/.netlify/functions/server/average?ids=${UserList.checkedUsers}`), requestAverageAge)
    .then(response => response.json())
    .then((result) => {
      setAverageAge(result);
    })
    .catch(error => console.log('error', error));
  }, [UserList])

  return (
    <div className="result">
      <img src={logo} className="result__birthdayCake" alt="birthday cake" />
      {averageAge && averageAge.error &&
        <p>
          Erreur : &nbsp;
          {averageAge.error}
        </p>
      }
      {averageAge && averageAge.average &&
        <p>
          Âge moyen des personnes sélectionnées
          <br />
          <span className="result__number">
            {Math.round(currentYear - (averageAge.average))} ans
          </span>
        </p>
      }
    </div>
  );
}

export default AverageAge;
