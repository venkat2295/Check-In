import React, { useState, useEffect } from 'react';
import Card from './Card';
import Heading from './Heading';
import './CardList.css';

const CardList = ({ users }) => {
  const [localUsers, setLocalUsers] = useState(users);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  const toggleCheckin = async (index) => {
    const newUsers = [...localUsers];
    newUsers[index].checked = !newUsers[index].checked;

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = localUsers.filter((user) =>
    user.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.EmailID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card-list">
      <div className="heading">
        <Heading />
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div className="cards-container">
        {filteredUsers.map((user, index) => (
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