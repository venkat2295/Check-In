import React, { useState } from 'react';
import Card from './Card'; // Assuming you have a Card component
import Heading from './Heading'; // Import the Heading component
import './CardList.css'; // Import the CSS file

const CardList = ({ data }) => {
  const [users, setUsers] = useState(data);

  const toggleCheckin = (index) => {
    const newUsers = [...users];
    newUsers[index].checked = !newUsers[index].checked;
    setUsers(newUsers);
  };

  return (
    <div className="card-list">
      <div className="heading">
        <Heading />
      </div>
      <div className="cards-container">
        {users.map((user, index) => (
          <Card
            key={index}
            name={user.Name}
            email={user["Email ID"]}
            college={user["College Name"]}
            phone={user["Phone No."]}
            checked={user.checked}
            onToggle={() => toggleCheckin(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CardList;