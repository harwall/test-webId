import React, { useState, useEffect } from 'react';

function AverageAge(UserList) {
  const [averageAge, setAverageAge] = useState(null);
  const [currentYear] = useState(new Date().getFullYear());

  useEffect(()=> {
    var requestAverageAge = {
      method: 'GET',
      redirect: 'follow'
    };
    console.log('UserList', UserList.checkedUsers)

    fetch((`https://infallible-tereshkova-717266.netlify.app/.netlify/functions/server/average?ids=${UserList.checkedUsers}`), requestAverageAge)
    .then(response => response.json())
    .then((result) => {
      console.log('averageAge', result)
      setAverageAge(result);
    })
    .catch(error => console.log('error', error));
  }, [UserList])

  return (
    <div className="App">

      {averageAge && averageAge.average &&
        <p>l'âge moyen est de : {currentYear - (averageAge.average)} ans</p>
      }

    </div>
  );
}

export default AverageAge;
