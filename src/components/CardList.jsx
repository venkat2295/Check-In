import React, { useState, useEffect } from 'react';
import Card from './Card'; // Assuming you have a Card component
import Heading from './Heading'; // Import the Heading component
import './CardList.css'; // Import the CSS file

const CardList = ({ users }) => {
  const [localUsers, setLocalUsers] = useState(users);

  useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  const toggleCheckin = async (index) => {
    const newUsers = [...localUsers];
    newUsers[index].checked = !newUsers[index].checked;

    // Update the status in the database
    try {
      const response = await fetch(`http://localhost:3000/users/${newUsers[index]._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ checked: newUsers[index].checked }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user status');
      }

      setLocalUsers(newUsers);
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  return (
    <div className="card-list">
      <div className="heading">
        <Heading />
      </div>
      <div className="cards-container">
        {localUsers.map((user, index) => (
          <Card
            key={index}
            name={user.Name}
            email={user.EmailID}
            college={user.CollegeName}
            checked={user.checked}
            onToggle={() => toggleCheckin(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CardList;